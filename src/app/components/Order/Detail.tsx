
import { OrderDetailColumns } from "../../../modules/domain/Constants/OrderCloumns";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,

} from "@nextui-org/react";
import { IOrderDetails } from "../../../modules/domain/Models/Order";
import { useFetchOrderDetail } from "../../hooks/useOrderDetail";
import { useParams } from "react-router-dom";

function DetailOrder() {

    let { orderId } = useParams();
    const {
        data
    } = useFetchOrderDetail(orderId as string);


    return (
        <div className="w-full">
            {data && <Table
                aria-label="Example static collection table"
                isHeaderSticky
                isStriped
                topContent={"DETALLE DE ORDEN"}
            >
                <TableHeader columns={OrderDetailColumns}>
                    {(column) => <TableColumn
                        allowsSorting={true}
                        key={column.key}>
                        {column.label}
                    </TableColumn>}
                </TableHeader>
                <TableBody items={data}>
                    {(item: IOrderDetails) => (
                        <TableRow key={item.id} className="h-16">
                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>}
        </div>
    );
}

export default DetailOrder;