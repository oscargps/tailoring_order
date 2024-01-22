import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@nextui-org/modal";
import {
    Button,
    Checkbox,
    Input,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    getKeyValue,
} from "@nextui-org/react";
import { IOrderDetails } from "../../../modules/domain/Models/Order";
import { useFetchLiterals, useFetchModels } from "../../hooks/useCommonData";
import { ILiteral } from "../../../modules/domain/Models/Literals";
import { IModels } from "../../../modules/domain/Models/Models";
import { useCallback, useEffect, useState } from "react";

const EventColumns = [
    {
        key: "element",
        label: "Detalle",
    },
    {
        key: "new_quantity",
        label: "Cantidad",
    },
    {
        key: "check",
        label: "Total",
    },
];

interface Props {
    selectedElements: string[];
    actualElements: IOrderDetails[];
    isOpen: boolean;
    onOpenChange: () => void;
    onSubmit: (e: any) => void;
}
const UpdateOrderModal = (props: Props) => {
    const { actualElements, isOpen, onOpenChange, selectedElements, onSubmit } =
        props;
    const Literals = useFetchLiterals().data as ILiteral[];
    const Models = useFetchModels().data as IModels[];
    const [totalElements, setTotalElements] = useState<string[]>([]);
    const [elementsUpdated, setElementsUpdated] = useState<
        Record<string, number | undefined>
    >({});

    const updateElement = (e: React.ChangeEvent<HTMLInputElement>) => {
        const actualUpdatedElements = { ...elementsUpdated };
        const newQuantity = e.target.value ? parseInt(e.target.value, 10) : 0;
        actualUpdatedElements[e.target.id] = newQuantity;
        setElementsUpdated(actualUpdatedElements);
    };

    useEffect(() => {
        setElementsUpdated({});
        setTotalElements([]);
    }, [selectedElements]);

    const mapElements = useCallback(() => {
        return selectedElements.map((element: string) => {
            const selectedElement = actualElements.find(
                (selectedEl) => selectedEl.id == parseInt(element)
            );
            if (selectedElement) {
                const elementId = selectedElement?.id;
                const isTotalElement = totalElements.includes(elementId.toString());
                const model = Models
                    ? Models.find((model) => model.id === selectedElement?.model_id)
                        ?.model_name
                    : selectedElement?.model_id;
                const size = Literals
                    ? Literals.find(
                        (literal) => literal.id === selectedElement?.element_size
                    )?.literal_name
                    : selectedElement?.element_size;
                const gender = Literals
                    ? Literals.find(
                        (literal) => literal.id === selectedElement?.element_gender
                    )?.literal_name
                    : selectedElement?.element_gender;

                return {
                    id: selectedElement?.id,
                    element: `${model}/${gender}/T:${size}/${selectedElement?.element_quantity}`,
                    new_quantity: (
                        <Input
                            className="m-4 w-4/6 md:w-2/6"
                            size="sm"
                            type="number"
                            isRequired
                            isInvalid={
                                (elementsUpdated[elementId] || 0) >
                                selectedElement?.element_quantity
                            }
                            inputMode="numeric"
                            pattern="[0-9\s]{13,19}"
                            id={elementId.toString()}
                            isDisabled={isTotalElement}
                            onChange={updateElement}
                            value={elementsUpdated[elementId]?.toString()}
                        />
                    ),
                    check: (
                        <Checkbox
                            name={selectedElement?.id?.toString()}
                            isSelected={totalElements.includes(
                                selectedElement?.id?.toString()
                            )}
                            onChange={addTotalElements}
                        ></Checkbox>
                    ),
                };
            }
        });
    }, [selectedElements, totalElements, elementsUpdated]);

    const addTotalElements = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedElement = e.target.name;
        const actualTotalElements = [...totalElements];
        const totalElementId = actualTotalElements.findIndex(
            (el) => el == selectedElement
        );
        if (totalElementId >= 0) {
            actualTotalElements.splice(totalElementId, 1);
        } else {
            actualTotalElements.push(selectedElement);
            setElementsUpdated({
                ...elementsUpdated,
                [selectedElement]: actualElements.find(
                    (selectedEl) => selectedEl.id == parseInt(selectedElement)
                )?.element_quantity,
            });
        }
        setTotalElements(actualTotalElements);
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                size={"5xl"}
                onOpenChange={onOpenChange}
                placement="top"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Detalle de Eventos
                            </ModalHeader>
                            <ModalBody>
                                <Table
                                    aria-label="Example static collection table"
                                    isHeaderSticky
                                >
                                    <TableHeader columns={EventColumns}>
                                        {(column) => (
                                            <TableColumn key={column.key}>{column.label}</TableColumn>
                                        )}
                                    </TableHeader>
                                    <TableBody items={mapElements()}>
                                        {(item) => (
                                            <TableRow key={item?.id} className="h-16">
                                                {(columnKey) => (
                                                    <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                                                )}
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button
                                    color="success"
                                    onPress={() => {
                                        onSubmit(elementsUpdated);
                                        onClose();
                                    }}
                                >
                                    Confirmar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default UpdateOrderModal;
