import { useCallback } from "react";
import { Iinvoice } from "../../../modules/domain/Models/Invoices";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import numeral from "numeral";


const InvoiceColumns = [
    { key: "invoiceId", label: "ID" },
    { key: "customerName", label: "Cliente" },
    { key: "order", label: "Orden" },
    { key: "total", label: "Total" },
    { key: "totalWithTax", label: "Total con retencion" },
    { key: "fecha", label: "Fecha" },

    ]

interface InvoicesTableProps {
    data: Iinvoice[];
    HeaderTable?: React.ReactNode;
    emptyContent?: React.ReactNode;
}

const InvoicesTable = (props: InvoicesTableProps) => {

    const { data, HeaderTable, emptyContent } = props;

    const renderCell = useCallback((data: Iinvoice, columnKey: React.Key) => {
        const cellValue = data[columnKey as keyof Iinvoice];
        switch (columnKey) {
            case "fecha":
                return cellValue ? new Date(cellValue).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
            case "total":
                return `$ ${numeral(cellValue).format('0,0')}`;
            case "totalWithTax":
                return `$${numeral(cellValue).format('0,0')}`;
            default:
                return cellValue;
        }
    }, []);

    return (
        <>
            <Table
                aria-label="Example static collection table"
                isHeaderSticky
                isStriped
                color="primary"
                topContent={HeaderTable || 'Detalle de facturas'}
            >
                <TableHeader columns={InvoiceColumns}>
                    {(column) => <TableColumn
                        allowsSorting={true}
                        key={column.key}>
                        {column.label}
                    </TableColumn>}
                </TableHeader>
                <TableBody items={data} emptyContent={emptyContent}
                >
                    {(item: Iinvoice) => (
                        <TableRow key={item.id} className="h-16">
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}

export default InvoicesTable;