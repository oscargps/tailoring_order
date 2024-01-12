
import { StorageHelper } from "../../../core/utils/storageHelper";
import { SupaBaseClient } from "../../../core/utils/supabaseClient";
import { CommonDataService } from "./i-data-service";


export class ClientsService implements CommonDataService {

    private supabaseClient: SupaBaseClient

    constructor() {
        this.supabaseClient = new SupaBaseClient()
    }


    async getData() {

        try {
            const savedClients = StorageHelper.get('Clients')
            if(savedClients){
                return savedClients
            }else{
                const { data } = await this.supabaseClient.client.from('clients')
                    .select(`*`).throwOnError();
                StorageHelper.save('Clients', data)
                    return data;
            }
        } catch (error) {
            throw error;
        }
    }
}