import { OrderDetailColumns } from "../../../modules/domain/Constants/OrderCloumns";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,

} from "@nextui-org/react";
import { IOrderDetails } from "../../../modules/domain/Models/Order";
import { useFetchLiterals, useFetchModels } from "../../hooks/useCommonData";
import { ReactNode, useCallback } from "react";
import { ILiteral } from "../../../modules/domain/Models/Literals";
import { IModels } from "../../../modules/domain/Models/Models";

interface Props {
    data: Omit<IOrderDetails[], 'order_id' | 'id'>
    aditionalCollumns?: { key: string, label: string }[]
    HeaderTable?: ReactNode
}

const OrderDetailTable = (props: Props) => {
    const { data, aditionalCollumns, HeaderTable } = props;
    const Literals = useFetchLiterals().data as ILiteral[];
    const Models = useFetchModels().data as IModels[]

    const renderCell = useCallback((data: Omit<IOrderDetails[], 'order_id' | 'id'>, columnKey: React.Key) => {
        const cellValue = data[columnKey as keyof Omit<IOrderDetails[], 'order_id' | 'id'>];
        switch (columnKey) {

            case "element_size":
                return Literals.length ? Literals.find((literal) => literal.id == cellValue)?.literal_name : cellValue

            case "element_gender":
                return Literals.length ? Literals.find((literal) => literal.id == cellValue)?.literal_name : cellValue

            case "model_id":
                return Models.length ? Models.find((model) => model.id == cellValue)?.model_name : cellValue
            default:
                return cellValue;
        }
    }, [data, Literals, Models]);

    return (
        <>
            {(Models && Literals) && <Table
                aria-label="Example static collection table"
                isHeaderSticky
                isStriped
                topContent={HeaderTable || 'Detalle de Orden'}
            >
                <TableHeader columns={(aditionalCollumns || []).concat(OrderDetailColumns)}>
                    {(column) => <TableColumn
                        allowsSorting={true}
                        key={column.key}>
                        {column.label}
                    </TableColumn>}
                </TableHeader>
                <TableBody items={data}>
                    {(item: IOrderDetails) => (
                        <TableRow key={item.id} className="h-16">
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>}
        </>
    )
}

export default OrderDetailTable