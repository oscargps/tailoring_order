import { Select, SelectItem, Textarea, SelectedItems, Chip, Button, useDisclosure } from "@nextui-org/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import AddElementOrderModal from "../../components/Order/NewOrder/AddElementOrderModal";
import OrderDetailTable from "../../components/Order/OrderDetailTable";
import { IOrderDetails, initialStateOrder } from "../../../modules/domain/Models/Order";
import { useFetchClients, useFetchLiterals, useFetchModels, useFetchStages } from "../../hooks/useCommonData";
import { IClient } from "../../../modules/domain/Models/Clients";
import { IStage } from "../../../modules/domain/Models/Stages";
import { PlusIcon } from "../../components/Icons/PlusIcon";
import IconTick from "../../components/Icons/Tick";
import TrashIcon from "../../components/Icons/Trash";
import { Order } from "../../validations/Order";
import { Toaster, toast } from 'sonner'
import { StorageHelper } from "../../../core/utils/storageHelper";
import { useNavigate } from "react-router-dom";
import { ILiteral } from "../../../modules/domain/Models/Literals";
import { IModels } from "../../../modules/domain/Models/Models";


const initialStateOrder: initialStateOrder = {
    order_client: '',
    order_stages: '',
    order_description: '',
    order_elements: []
}


const NewOrder = () => {
    const [elements, setElements] = useState<IOrderDetails[]>([])
    const [mappedElements, setMappedElements] = useState<IOrderDetails[]>([])
    const [counter, setCounter] = useState<number>(0)
    const [orderData, setOrderData] = useState<initialStateOrder>(StorageHelper.get('NewOrder') || initialStateOrder)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const navigate = useNavigate()
    const Clients = useFetchClients().data as IClient[];
    const Stages = useFetchStages().data as IStage[]
    const Literals = useFetchLiterals().data as ILiteral[]
    const Models = useFetchModels().data as IModels[]

    const addItem = useCallback((e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setOrderData({
            ...orderData,
            [e.target.id || e.target.name]: e.target.value
        })

    }, [orderData])

    const addElement = (element: IOrderDetails) => {
        element.id = counter + 1
        setCounter(element.id)
        const actualElements = [...elements]
        actualElements.push(element)
        setElements(actualElements)
    }

    const deleteElement = (id: number) => {
        const actualElements = [...elements]
        const indexElementToDelete = actualElements.findIndex(e => e.id === id)
        actualElements.splice(indexElementToDelete, 1)
        setElements(actualElements)
    }

    useEffect(() => {
        const savedNewOrder = StorageHelper.get('NewOrder') as initialStateOrder
        if (savedNewOrder) {
            setOrderData(savedNewOrder)
            setElements(savedNewOrder.order_elements)
            const maxElementsId = savedNewOrder.order_elements.reduce((element, currentElement) => {
                return currentElement.id > element.id ? currentElement : element;
            }, savedNewOrder.order_elements[0]).id;
            setCounter(maxElementsId)
        }
    }, [])

    useEffect(() => {
        const newMappedElements = elements.map(element => (
            {
                ...element,
                action: (<Button className="m-4" isIconOnly color="danger" onPress={() => { deleteElement(element.id) }}>
                    <TrashIcon />
                </Button>)
            }
        ))
        setMappedElements(newMappedElements)
        setOrderData({
            ...orderData,
            order_elements: elements
        })
    }, [elements])

    const validateData = useCallback(() => {
        try {
            Order.parse(orderData)
            StorageHelper.save('NewOrder', orderData)
            navigate("/new-order-review");
        } catch (error) {
            toast.warning('Verifica la información ingresada')
        }
    }, [orderData])

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <h1>
                        Detalle de Orden
                    </h1>
                    <div className="flex gap-3">
                        <Button color="primary" endContent={<PlusIcon />} onPress={() => { onOpen() }}>
                            Agregar
                        </Button>
                    </div>
                </div>
            </div>
        );
    }, [

    ]);

    return (
        <>
            <Toaster position="top-left" richColors />
            <AddElementOrderModal
                literals={Literals}
                models={Models}
                addElementFunction={addElement}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />
            <div className=" flex flex-col items-center  md:flex-row md:justify-between ">
                {Clients && <Select
                    label="Cliente"
                    name="order_client"
                    variant="underlined"
                    isMultiline={true}
                    onChange={addItem}
                    defaultSelectedKeys={orderData.order_client}
                    classNames={{
                        base: "max-w-xs m-4",
                        trigger: "min-h-unit-20 py-2",
                    }}
                >
                    {Clients.map((client: IClient) => (
                        <SelectItem key={client.id} value={client.id}>
                            {client.client_name}
                        </SelectItem>
                    ))}
                </Select>}
                {Stages && <Select
                    items={Stages}
                    label="Etapas"
                    name="order_stages"
                    variant="underlined"
                    isMultiline={true}
                    selectionMode="multiple"
                    onChange={addItem}
                    defaultSelectedKeys={orderData.order_stages}
                    classNames={{
                        base: "max-w-xs m-4",
                        trigger: "min-h-unit-20 py-2",
                    }}
                    renderValue={(items: SelectedItems<IStage>) => {
                        return (
                            <div className="flex flex-wrap gap-2">
                                {items.map((item) => (
                                    <Chip key={item.key}>{item.data?.stage_name}</Chip>
                                ))}
                            </div>
                        );
                    }}
                >
                    {(stage) => (
                        <SelectItem key={stage.id} textValue={stage.stage_name}>
                            {stage.stage_name}
                        </SelectItem>
                    )}
                </Select>}

                <Textarea
                    id="order_description"
                    value={orderData.order_description}
                    label="Detalles"
                    placeholder="Información de la orden..."
                    className="w-full m-4"
                    onChange={addItem}
                />
            </div>
            <div className="flex flex-col items-center md:items-start">
                <OrderDetailTable
                    HeaderTable={topContent}
                    aditionalCollumns={[{ key: 'action', label: 'Acción' }]}
                    data={mappedElements} />
                <Button className="m-4 w-full md:w-2/6" color="success" size="lg" startContent={<IconTick />} onPress={validateData}>

                    Finalizar
                </Button>
            </div>
        </>
    )
}

export default NewOrder