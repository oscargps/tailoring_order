import { IinvoiceDTO, InvoiceDocumentProps, Item } from "../../modules/domain/Models/Invoices"
import { numberToText } from "../../modules/domain/utils/NumberToText";

export const InvoiceDataMapperToDocument = (items: Item[], invoiceData: Record<string, string>): InvoiceDocumentProps => {
    const total = items.reduce((acc, item) => acc + item.totalWithTax, 0);
    return {
        invoiceNumber: invoiceData.number,
        date: new Date().toLocaleDateString('es-ES', {day: 'numeric', month: 'long', year: 'numeric'}),
        city: process.env.INVOICE_CITY,
        companyName: invoiceData.client.toUpperCase(),
        companyNit: invoiceData.nit,
        personName: process.env.INVOICE_COMPANY_NAME,
        personNit: process.env.INVOICE_COMPANY_NIT,
        amountText: numberToText(total) + ' pesos mcte',
        signatureName: process.env.INVOICE_SIGNATURE_NAME,
        signatureId: process.env.INVOICE_SIGNATURE_ID,
        items: items.map((item) => ({
            description: item.type + item.detail,
            quantity: item.qty,
            unitPrice: item.priceWithTax,
            total: item.totalWithTax
        })),
        total
    }

}

export const InvoiceDataMapperToSave = ( invoiceData: Record<string, string>): Partial<IinvoiceDTO> => {
    return {
        invoice_id: invoiceData.number,
        client: invoiceData.client_id,
        order: invoiceData.order || null,
        invoice_total: invoiceData.total,
        invoice_total_with_taxes: invoiceData.totalWithTax,
    }
}