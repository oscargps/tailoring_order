import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@nextui-org/react";
import { useCallback, useState } from "react";
import { IOrderDetails } from "../../../../modules/domain/Models/Order";
import { ILiteral } from "../../../../modules/domain/Models/Literals";
import { IModels } from "../../../../modules/domain/Models/Models";
import { Element } from "../../../validations/Order";
interface Props {
    literals: ILiteral[]
    models: IModels[]
    isOpen: boolean
    onOpenChange: () => void
    addElementFunction: (e: any) => void
}

const initialStateElement = {
    model_id: 0,
    element_size: "",
    element_gender: "",
    element_quantity: "0",
    element_description: "",
}


const AddElementOrderModal = (props: Props) => {

    const { literals, models, isOpen, onOpenChange, addElementFunction } = props;
    const [element, setElement] = useState<Partial<IOrderDetails> | null>(initialStateElement)
    const [error, setError] = useState<boolean>(false);

    const addItem = useCallback((e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setElement({
            ...element,
            [e.target.id || e.target.name]: e.target.value
        })

    }, [element])

    const addElement = useCallback(() => {
        try {
            setError(false)
            Element.parse(element)
            addElementFunction(element)
            setElement({
                ...element,
                element_quantity: initialStateElement.element_quantity
            })
        } catch (error) {
            setError(true)
        }
    }, [element])
    return (
        <>
            <Modal isOpen={isOpen} size={'lg'} onOpenChange={onOpenChange} placement="top">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Detalle de Eventos</ModalHeader>
                            <ModalBody className="flex flex-col items-center">
                                <Select
                                    name="model_id"
                                    label="Modelo"
                                    variant="underlined"
                                    placeholder="Seleccione un modelo"
                                    className="max-w-xs m-4"
                                    onChange={addItem}
                                    isInvalid={error}
                                    isRequired
                                >
                                    {models.map((model: any) => (
                                        <SelectItem key={model.id} value={model.id}>
                                            {model.model_name}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <Select
                                    label="Genero"
                                    variant="underlined"
                                    className="max-w-xs m-4"
                                    name="element_gender"
                                    onChange={addItem}
                                    isInvalid={error}
                                    isRequired
                                >
                                    {literals.filter((literal) => literal.literal_type === 'gender').map((literal: ILiteral) => (
                                        <SelectItem key={literal.id} value={literal.id}>
                                            {literal.literal_name}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <Select
                                    label="Talla"
                                    variant="underlined"
                                    className="max-w-xs m-4"
                                    name="element_size"
                                    onChange={addItem}
                                    isInvalid={error}
                                    value={element?.element_size}
                                    isRequired
                                >
                                    {literals.filter((literal) => literal.literal_type === 'size').map((literal: ILiteral) => (
                                        <SelectItem key={literal.id} value={literal.id}>
                                            {literal.literal_name}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <Input className="m-4 w-full md:w-4/6 "
                                    size="sm"
                                    type="text"
                                    id='element_quantity'
                                    value={element?.element_quantity}
                                    isInvalid={error}
                                    label="Cantidad" onChange={addItem} />
                                <Input className="m-4  w-full md:w-4/6"
                                    size="sm"
                                    type="text"
                                    id="element_description"
                                    label="Observación"
                                    onChange={addItem} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onPress={onClose}>
                                    Cerrar
                                </Button>

                                <Button color="success" onPress={() => {
                                    addElement();
                                    onClose();
                                }}>
                                    Agregar
                                </Button>
                                <Button color="primary" onPress={() => { addElement() }}>
                                    Agregar y continuar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );

}

export default AddElementOrderModal