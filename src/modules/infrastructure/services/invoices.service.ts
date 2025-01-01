import { StorageHelper } from "../../../core/utils/storageHelper";
import { SupaBaseClient } from "../../../core/utils/supabaseClient";
import { IinvoiceDTO } from "../../domain/Models/Invoices";
import { CommonDataService } from "./i-data-service";

export class InvoicesService implements CommonDataService {
    private supabaseClient: SupaBaseClient;

    constructor() {
        this.supabaseClient = new SupaBaseClient();
    }

    async getData() {
        const savedInvoices = StorageHelper.get('Invoices');
        if (savedInvoices) {
            return savedInvoices;
        } else {
            const { data } = await this.supabaseClient.client.from('invoices')
                .select(`*, clients (client_name, client_nit)`).throwOnError();
            StorageHelper.save('Invoices', data);
            return data;
        }
    }

    async createInvoice(invoice: IinvoiceDTO) {
        const { data, error } = await this.supabaseClient.client
            .from('invoices')
            .insert([invoice])
            .throwOnError();
        if (error) throw error;
        return data;
    }
}