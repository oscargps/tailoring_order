import { useParams } from "react-router-dom";
import { useFetchelementsByStage } from "../hooks/useOrderDetail";
import OrderDetailTable from "../components/Order/OrderDetailTable";
import {
    Button,
    ButtonGroup,
    Select,
    SelectItem,
    useDisclosure,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { IOrderByStage, IStage } from "../../modules/domain/Models/Stages";
import { useFetchLiterals, useFetchStages } from "../hooks/useCommonData";
import ArrowRightIcon from "../components/Icons/ArrowRightIcon";
import { IOrder, IOrderData, IOrderDetails } from "../../modules/domain/Models/Order";
import UpdateOrderModal from "../components/Order/UpdateOrderModal";
import { Toaster, toast } from "sonner";
import { ILiteral } from "../../modules/domain/Models/Literals";
import { StorageHelper } from "../../core/utils/storageHelper";
import { useUpdateOrder } from "../hooks/useOrders";

const UpdateOrder = () => {
    let { orderId } = useParams();
    const [isTotal, setTotal] = useState<boolean>(true);
    const [selectedStageFrom, setSelectedStageFrom] = useState<string>("");
    const [selectedStageTo, setSelectedStageTo] = useState<string>("");
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [mappedElements, setMappedElements] = useState<IOrderDetails[]>([]);
    const [mappedStages, setMappedStages] = useState<IOrderByStage[]>([]);

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const Stages = useFetchStages().data as IStage[];
    const Literals = useFetchLiterals().data as ILiteral[];
    const { data } = useFetchelementsByStage(orderId as string);
    const actualOrder = (StorageHelper.get("Orders") as IOrder[]).find(
        (order) => order.id == orderId
    );

    const { mutate, isLoading, isError, isSuccess } = useUpdateOrder()

    useEffect(() => {
        if (data) {
            let mappedStages = {};
            actualOrder?.order_by_stages.forEach((order_by_stage) => {
                if (order_by_stage.id) {
                    mappedStages = {
                        ...mappedStages,
                        [order_by_stage?.id]: order_by_stage,
                    };
                }
            });
            setMappedStages(Object.values(mappedStages));

            const mappedElements = data
                ?.filter(
                    (elementBystage) =>
                        elementBystage.order_stage_id.id == parseInt(selectedStageFrom)
                )
                .map((elementByStage) => ({
                    order_id: orderId,
                    ...elementByStage.element_id,
                    element_quantity: elementByStage.element_quantity,
                })) as IOrderDetails[];
            setMappedElements(mappedElements);
        }
    }, [data, selectedStageFrom, Stages]);

    useEffect(() => {
        if(!isLoading){
            if(isSuccess){
                if(isOpen) onClose()
                setSelectedStageFrom('')
                toast.success("Orden Actualizada!");
                setTimeout(() =>{
                    StorageHelper.remove('Orders')
                    window.location.assign('/dashboard')
                },2000)
            }
            if(isError){
                toast.error("Hubo un error!");
            }
        }
    },[isLoading])


    const validate = (data: Record<number, number>) => {
        const updatedElements = Object.entries(data);
        let validate = false;
        if (
            updatedElements.length &&
            !updatedElements.some((e) => e[1] == 0) &&
            updatedElements.length == selectedRows.length
        ) {
            validate = updatedElements.every((updatedElement) => {
                const updatedElementId = updatedElement[0];
                const updatedElementQty = updatedElement[1];
                const selectedElement = mappedElements.find(
                    (mappedElement) => mappedElement.id === parseInt(updatedElementId)
                );
                if (
                    selectedElement &&
                    updatedElementQty > selectedElement?.element_quantity
                ) {
                    toast.warning("Cantidades mayores a las disponibles");
                    return false;
                }
                return true;
            });
        } else {
            toast.error("Error validando cantidades");
        }
        if (validate) {
            send(data);
        }
    };

    const send = (data?: Record<number, number> | any) => {
        if (selectedStageFrom == selectedStageTo || !selectedStageTo) {
            toast.error("Selecciona un nuevo proceso valido");
        } else {
            const dataToSend: IOrderData = {
                order_id: parseInt(orderId as string),
                stage_to: parseInt(selectedStageTo),
                stage_from: parseInt(selectedStageFrom),
                event_type: Literals.find(
                    (literal) => literal.literal_name == (isTotal ? "Total" : "Parcial")
                )?.id || 0,
                elements: [],
            };
            if (data && !isTotal) {
                dataToSend.elements = selectedRows.map((elem) => ({
                    element_id: parseInt(elem),
                    element_new_quantity: data[elem],
                }));
            } else {
                dataToSend.elements = mappedElements.map((elem) => ({
                    element_id: elem.id,
                    element_new_quantity: elem.element_quantity,
                }));
            }
            mutate(dataToSend)
        }
    };

    const setSelectionRows = (selectedRows: string | string[]) => {
        if (selectedRows == "all") {
            const elements = mappedElements?.map((element) => element.id.toString());
            setSelectedRows(elements);
        } else {
            setSelectedRows([...selectedRows]);
        }
    };

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                    {Stages && (
                        <div className="flex items-center mb-2">
                            <Select
                                label="Actual Proceso"
                                name="stage_from"
                                defaultSelectedKeys={[selectedStageFrom]}
                                onChange={(e) => {
                                    setSelectedStageFrom(e.target.value);
                                }}
                                classNames={{
                                    base: "max-w-xs ",
                                }}
                            >
                                {mappedStages.map((mappedStage: IOrderByStage) => (
                                    <SelectItem
                                        key={mappedStage.id.toString()}
                                        value={mappedStage.id.toString()}
                                    >
                                        {
                                            Stages.find((stage) => stage.id == mappedStage.stage_id)
                                                ?.stage_name
                                        }
                                    </SelectItem>
                                ))}
                            </Select>
                            <ArrowRightIcon className="mt-4 ml-2" />
                            <Select
                                label="Nuevo Proceso"
                                name="stage_to"
                                defaultSelectedKeys={[selectedStageTo]}
                                onChange={(e) => {
                                    setSelectedStageTo(e.target.value);
                                }}
                                classNames={{
                                    base: "max-w-xs ",
                                }}
                            >
                                {mappedStages.map((mappedStage: IOrderByStage) => (
                                    <SelectItem key={mappedStage.id} value={mappedStage.id}>
                                        {
                                            Stages.find((stage) => stage.id == mappedStage.stage_id)
                                                ?.stage_name
                                        }
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                    )}
                    <div className="flex">
                        <ButtonGroup>
                            <Button
                                onPress={() => {
                                    setTotal(false);
                                }}
                                color={isTotal ? "default" : "primary"}
                            >
                                Parcial
                            </Button>
                            <Button
                                onPress={() => {
                                    setTotal(true);
                                }}
                                color={isTotal ? "primary" : "default"}
                            >
                                Total
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        );
    }, [isTotal, selectedStageFrom, selectedStageTo, mappedStages]);

    return (
        <>
            <Toaster position="top-left" richColors />
            <UpdateOrderModal
                selectedElements={selectedRows}
                actualElements={mappedElements}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onSubmit={validate}
            />
            <p className="m-4 text-xl">Actualizar orden</p>
            {data && (
                <>
                    {" "}
                    <div></div>
                    <div className="flex flex-col items-center md:items-start">
                        <OrderDetailTable
                            HeaderTable={topContent}
                            emptyContent={"Selecciona el proceso actual"}
                            allowMultiple={!isTotal}
                            selectionFunction={setSelectionRows}
                            data={mappedElements}
                        />
                        <Button
                            className="m-4 w-full md:w-2/6"
                            color="success"
                            size="lg"
                            isLoading={isLoading}
                            isDisabled={!Boolean(selectedStageFrom) || isLoading}
                            onPress={isTotal ? send : onOpen}
                        >
                            {isTotal ? "Confirmar" : "Continuar"}
                        </Button>
                    </div>
                </>
            )}
        </>
    );
};

export default UpdateOrder;
