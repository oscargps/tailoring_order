
import { OrderColumns } from "../../../modules/domain/Constants/OrderCloumns";
import { useFetchOrders } from "../../hooks/useOrders";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    useDisclosure
} from "@nextui-org/react";
import { PlusIcon } from "../Icons/PlusIcon";
import { useCallback, useMemo, useState } from "react";
import { SearchIcon } from "../Icons/SearchIcon";
import { IOrder } from "../../../modules/domain/Models/Order";
import OrderEventsModal from "./OrderEventsModal";
import { useNavigate } from "react-router-dom";
import { RefreshIcon } from "../Icons/RefreshIcon";
import { StorageHelper } from "../../../core/utils/storageHelper";

function Orders() {
    const [filterValue, setFilterValue] = useState("");
    const [selectedOrder, setSelectedOrder] = useState<IOrder | undefined>(undefined);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const navigate = useNavigate()

    const {
        data
    } = useFetchOrders();


    const onSearchChange = useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = useCallback(() => {
        setFilterValue("")
    }, [])
    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Search by name..."
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Button color="primary" endContent={<PlusIcon />} onPress={() => (navigate('/new-order'))}>
                            Nueva Orden
                        </Button>
                        <Button color="secondary" isIconOnly onPress={() => {
                            StorageHelper.remove('Orders')
                            window.location.reload()
                        }}>
                            <RefreshIcon />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }, [
        filterValue,
        data?.length,
    ]);

    const renderCell = useCallback((data: Omit<IOrder, 'order_by_event'>, columnKey: React.Key) => {
        const cellValue = data[columnKey as keyof Omit<IOrder, 'order_by_event'>];

        switch (columnKey) {

            case "order_client":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div className="w-full">
            <OrderEventsModal
                data={selectedOrder?.order_by_event}
                orderId={selectedOrder?.id as string}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />
            {data && <Table
                aria-label="Example static collection table"
                isHeaderSticky
                isStriped
                topContent={topContent}
                onRowAction={(key) => {
                    const order = data.find((order: IOrder) => {
                        return order.id == key
                    })
                    setSelectedOrder(order)
                    onOpen()
                }}
            >
                <TableHeader columns={OrderColumns}>
                    {(column) => <TableColumn
                        allowsSorting={true}
                        key={column.key}>
                        {column.label}
                    </TableColumn>}
                </TableHeader>
                <TableBody items={data}>
                    {(order: IOrder) => {
                        const { order_by_event, ...rest } = order
                        return (
                            <TableRow key={order.id} className="h-16">
                                {(columnKey) => <TableCell>{renderCell(rest, columnKey)}</TableCell>}
                            </TableRow>
                        )
                    }}
                </TableBody>
            </Table>}
        </div>
    );
}

export default Orders;