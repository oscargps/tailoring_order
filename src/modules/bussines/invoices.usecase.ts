import { Iinvoice, IinvoiceDTO } from "../domain/Models/Invoices";
import { InvoicesService } from "../infrastructure/services/invoices.service";

export class InvoicesUseCase {

    async getInvoices(RequestService: InvoicesService): Promise<Iinvoice[]> {
        const response = await RequestService.getData();
        return this.mapInvoices(response);
    }

    async createInvoice(RequestService: InvoicesService, invoice: IinvoiceDTO) {
        return new Promise((resolve, reject) => {
            try {
                const res = RequestService.createInvoice(invoice);
                resolve(res);
            } catch (error) {
                reject(error);
            }
        });
    }

    private mapInvoices(dto: IinvoiceDTO[]): Iinvoice[] {
        return dto.map((invoice) => ({
            id: invoice.id,
            invoiceId: invoice.invoice_id,
            customerName: invoice.clients.client_name,
            customerNit: invoice.clients.client_nit,
            order: invoice.order,
            total: invoice.invoice_total,
            totalWithTax: invoice.invoice_total_with_taxes,
            fecha: invoice.created_at
        }));
    }
} 