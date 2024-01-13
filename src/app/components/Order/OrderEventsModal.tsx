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
            <Modal isOpen={isOpen} size={'5xl'} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Detalle de Eventos</ModalHeader>
                            <ModalBody>
                                <Table
                                    aria-label="Example static collection table"
                                    isHeaderSticky
                                    isStriped
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
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cambiar estado
                                </Button>
                                <Button color="danger" variant="light" onPress={ ()=>(navigate(`/detail/${orderId}`)) }>
                                    Ver Detalle
                                </Button>
                                <Button color="primary" onPress={onClose}>
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