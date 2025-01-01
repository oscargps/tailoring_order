import {
    Button,
    CircularProgress,
    Input,
    Select,
    SelectItem,
    useDisclosure,
} from "@nextui-org/react";
import InvoiceItem from "../../../components/Invoices/InvoiceItem";
import numeral from "numeral";
import { useCallback, useEffect, useState } from "react";
import ItemsTable from "../../../components/Invoices/ItemsTable";
import { Item } from "../../../../modules/domain/Models/Invoices";
import InvoiceViewer from "../../../components/Invoices/pdf/Viewer";
import { InvoiceDataMapperToDocument, InvoiceDataMapperToSave } from "../../../mapper/InvoiceDataMapper";
import { useFetchClients } from "../../../hooks/useCommonData";
import { IClient } from "../../../../modules/domain/Models/Clients";
import { useFetchOrders } from "../../../hooks/useOrders";
import { IOrder } from "../../../../modules/domain/Models/Order";
import { useCreateInvoice } from "../../../hooks/useInvoices";
import { toast, Toaster } from "sonner";
import { StorageHelper } from "../../../../core/utils/storageHelper";
import { useNavigate } from "react-router-dom";

const InvoiceForm = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [totalInvoice, setTotalInvoice] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [showInvoiceViewer, setShowInvoiceViewer] = useState<boolean>(false);
    const [invoiceData, setInvoiceData] = useState({
        number: "",
        client: "",
        client_id: "",
        nit: "",
        order: "",
    });
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { mutate, isLoading, isError, isSuccess } = useCreateInvoice()
    const navigate = useNavigate()
    const Clients = useFetchClients().data as IClient[];
    const Orders = useFetchOrders().data as IOrder[];
    const addItem = (newItem: Item) => {
        const actualItems = items;
        const priceWithTax = Math.ceil(getPriceWithTax(newItem.price, newItem.tax));
        const totalWithTax = newItem.qty * priceWithTax;

        setItems([...actualItems, { ...newItem, totalWithTax, priceWithTax }]);
    };

    const deleteItem = useCallback((itemId: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    }, []);
    const getPriceWithTax = (price: number, tax: number): number =>
        (price * 100) / (100 - tax);

    const generateInvoice = () => {
        const invoiceDataToSave = InvoiceDataMapperToSave({ ...invoiceData, total: total.toString(), totalWithTax: totalInvoice.toString() });
        //@ts-expect-error - The mapper type doesn't match the mutation input type but the values are correct
        mutate(invoiceDataToSave)
    }

    const handleShowInvoiceViewer = () => {
        setShowInvoiceViewer(true);
        onOpen();
    }

    useEffect(() => {
        setTotal(
            items.reduce(
                (accumulator, currentValue) => accumulator + currentValue.total,
                0
            )
        );
        setTotalInvoice(
            items.reduce(
                (accumulator, currentValue) =>
                    accumulator + (currentValue.totalWithTax ?? 0),
                0
            )
        );
    }, [items]);

    useEffect(() => {
        if (isSuccess) {
            toast.success("Factura creada correctamente");
            StorageHelper.remove('Invoices');
            setTimeout(() => {
                navigate("/invoices");
            }, 500);
        }
        if (isError) {
            toast.error("Error al crear la factura");
        }
    }, [isSuccess, isError, navigate]);

    return (
        <>
            <Toaster position="top-center" richColors />

            {showInvoiceViewer && (
                <InvoiceViewer
                    data={InvoiceDataMapperToDocument(items, invoiceData)}
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    generateInvoiceFn={generateInvoice}
                />
            )}
            <div>
                <div className="Invoice-Header flex flex-row gap-2 my-4">
                    <Input
                        type="text"
                        label="Numero de factura"
                        className="w-2/6"
                        value={invoiceData.number}
                        onValueChange={(value) =>
                            setInvoiceData({ ...invoiceData, number: value })
                        }
                    />
                    {Clients && (
                        <>
                            <Select
                                label="Cliente"
                                id="client"
                                defaultSelectedKeys={["na"]}
                                onChange={(e) =>
                                    setInvoiceData({
                                        ...invoiceData,
                                        client:
                                            Clients.find((client) => client.id == e.target.value)
                                                ?.client_name || "",
                                        client_id: e.target.value,
                                        nit:
                                            Clients.find((client) => client.id == e.target.value)
                                                ?.client_nit || "",
                                    })
                                }
                            >
                                {Clients.map((client) => (
                                    <SelectItem key={client.id}>{client.client_name}</SelectItem>
                                ))}
                            </Select>
                            <Input
                                type="text"
                                className="w-2/6"
                                label="Nit"
                                value={invoiceData.nit}
                                disabled
                                onValueChange={(value) =>
                                    setInvoiceData({ ...invoiceData, nit: value })
                                }
                            />
                        </>
                    )}
                    {Orders && invoiceData.client && (
                        <>
                            <Select
                                label="Orden"
                                id="order"
                                className="w-2/6"
                                onChange={(e) =>
                                    setInvoiceData({
                                        ...invoiceData,
                                        order: e.target.value,
                                    })
                                }
                            >
                                {Orders.filter(
                                    (order) => order.order_client_id == invoiceData.client_id
                                ).map((order) => (
                                    <SelectItem key={order.id}>{order.id + ' - ' + order.order_client}</SelectItem>
                                ))}
                            </Select>
                        </>
                    )}
                </div>
                <div className="Invoice-Body flex flex-col gap-2">
                    <InvoiceItem addItemFun={addItem} />
                    <ItemsTable items={items} deleteFun={deleteItem} />
                </div>
                <div className="flex flex-row justify-between items-center mt-4">
                    <div>
                        <span className="text-2xl font-bold mb-2 block">
                            Total factura: $ {numeral(total).format("0,0")}
                        </span>
                        <span className="text-2xl font-bold">
                            Total a cobrar: $ {numeral(totalInvoice).format("0,0")}
                        </span>
                    </div>
                    {isLoading ? <CircularProgress /> : <Button
                        color="primary"
                        size="lg"
                        onClick={() => {
                            if (invoiceData.number && invoiceData.client && items.length > 0) {
                                handleShowInvoiceViewer();
                            } else {
                                toast.error("Faltan datos para generar la factura");
                            }
                        }}
                    >
                        Previsualizar
                    </Button>}
                </div>
            </div>
        </>
    );
};

export default InvoiceForm;
