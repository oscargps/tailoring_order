import { InvoicesUseCase } from "../../bussines/invoices.usecase";
import { InvoicesService } from "../services/invoices.service";
import { IinvoiceDTO } from "../../domain/Models/Invoices";

class InvoicesController { 

    private  invoicesService: InvoicesService;

    private invoicesUseCase: InvoicesUseCase;

    constructor() {
        this.invoicesService = new InvoicesService();
        this.invoicesUseCase = new InvoicesUseCase();
    }

    getAllInvoices() {
        return this.invoicesUseCase.getInvoices(this.invoicesService);
    }

    createInvoice(invoice: IinvoiceDTO) {

        return this.invoicesUseCase.createInvoice(this.invoicesService, invoice);
    }
}
export default InvoicesController;