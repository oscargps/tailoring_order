import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import { useCallback } from "react";
import numeral from 'numeral'
import TrashIcon from "../Icons/Trash";
import { Item } from "../../../modules/domain/Models/Invoices";

interface ItemsTableProps {
    items: Item[]
    HeaderTable?: React.ReactNode
    emptyContent?: React.ReactNode
    deleteFun: (id: string) => void
}

const InvoiceItemColumns = [
    { key: "type", label: "Tipo" },
    { key: "detail", label: "Detalle" },
    { key: "qty", label: "Cantidad" },
    { key: "price", label: "Precio unitario" },
    { key: "priceWithTax", label: "Precio unitario con retencion" },
    { key: "total", label: "Total antes de retencion" },
    { key: "tax", label: "Retencion" },
    { key: "totalWithTax", label: "Total con retencion" },
    { key: "action", label: "Eliminar" },
]

const ItemsTable = ({ items, emptyContent, HeaderTable, deleteFun }: ItemsTableProps) => {
    const renderCell = useCallback((data: Item, columnKey: React.Key) => {
        const cellValue = data[columnKey as keyof Item];
        switch (columnKey) {
            case "price":
            case "priceWithTax":
            case "total":
            case "totalWithTax":
                return "$" + numeral(cellValue).format('0,0');
            case "tax":
                return cellValue + "%"
            case "action":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip color="danger" content="Eliminar">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <TrashIcon onClick={() => deleteFun(data.id)} />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, [deleteFun]);

    return (
        <>
            <Table
                aria-label="Example static collection table"
                isHeaderSticky
                isStriped
                color="primary"
                topContent={HeaderTable || 'Detalle de Orden'}
            >
                <TableHeader columns={InvoiceItemColumns}>
                    {(column: Record<string, string>) => <TableColumn
                        allowsSorting={true}
                        key={column.key}>
                        {column.label}
                    </TableColumn>}
                </TableHeader>
                <TableBody items={items} emptyContent={emptyContent}
                >
                    {(item: Item) => (
                        <TableRow key={item.id} className="h-16">
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}

export default ItemsTable