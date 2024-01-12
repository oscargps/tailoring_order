
import { StorageHelper } from "../../../core/utils/storageHelper";
import { SupaBaseClient } from "../../../core/utils/supabaseClient";
import { CommonDataService } from "./i-data-service";


export class LiteralsService implements CommonDataService{

    private supabaseClient: SupaBaseClient

    constructor() {
        this.supabaseClient = new SupaBaseClient()
    }


    async getData() {

        try {
            const savedLiterals = StorageHelper.get('Literals')
            if (savedLiterals) {
                return savedLiterals
            } else {
                const { data } = await this.supabaseClient.client.from('literals')
                    .select(`*`).throwOnError();
                StorageHelper.save('Literals', data)
                return data;
            }
        } catch (error) {
            throw error;
        }
    }
}