import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from "@nextui-org/react";
import { IOrder } from "../../../modules/domain/Models/Order";
import { useNavigate } from "react-router-dom";

const EventColumns = [
    {
        key: "event_type",
        label: "Tipo de evento",
    },
    {
        key: "quantity",
        label: "Cantidad",
    },
    {
        key: "order_stage_from",
        label: "Etapa Anterior",
    },
    {
        key: "order_stage_to",
        label: "Etapa Nueva",
    },
    {
        key: "created_at",
        label: "Fecha Evento",
    },
    {
        key: "event_description",
        label: "Descripción de evento",
    },
]

interface Props {
    data: IOrder['order_by_event']
    orderId: string
    isOpen: boolean
    onOpenChange: () => void
}
const OrderEventsModal = (props: Props) => {
    const { data, isOpen, onOpenChange, orderId } = props;
    const navigate = useNavigate()

    return (
        <>
            <Modal isOpen={isOpen} size={'4xl'} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Detalle de Eventos</ModalHeader>
                            <ModalBody>
                                <Table
                                    aria-label="Example static collection table"
                                    isStriped
                                    classNames={{
                                        base: "max-h-[80%] overflow-scroll overflow-hidden",
                                        table:"overflow-hidden"
                                      }}
                                >
                                    <TableHeader columns={EventColumns}>
                                        {(column) => <TableColumn
                                            allowsSorting={true}
                                            key={column.key}>
                                            {column.label}
                                        </TableColumn>}
                                    </TableHeader>
                                    <TableBody items={data}>
                                        {(item) => (
                                            <TableRow key={item.id} className="h-16">
                                                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="warning"  onPress={()=>(navigate(`/update-order/${orderId}`))}>
                                    Cambiar estado
                                </Button>
                                <Button color="primary"  onPress={ ()=>(navigate(`/detail/${orderId}`)) }>
                                    Ver Detalle
                                </Button>
                                <Button color="danger" onPress={onClose}>
                                    Cerrar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default OrderEventsModal