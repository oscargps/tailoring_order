export interface Iinvoice {
    id?: number;
    invoiceId: string;
    customerId: string;
    customerName: string;
    customerNit: string;
    order?: string;
    total: number
    totalWithTax: number
    fecha: string;
}

export interface IinvoiceDTO {
    id: number;
    invoice_id: string;
    order?: string | null;
    client: string;
    invoice_total: number | string;
    invoice_total_with_taxes: number | string;
    created_at: string;
    clients: {
        client_name: string;
        client_nit: string;
    }
}

export type Item = {
    id: string;
    type: string;
    detail: string;
    qty: number;
    price: number;
    priceWithTax: number;
    tax: number;
    total: number;
    totalWithTax: number;
};

export interface InvoiceDocumentProps {
    invoiceNumber: string
    date: string
    city?: string
    companyName?: string
    companyNit?: string
    personName?: string
    personNit?: string
    amountText: string
    items: Array<{
        description: string
        quantity: number
        unitPrice: number
        total: number
    }>
    total: number
    signatureName?: string
    signatureId?: string
}