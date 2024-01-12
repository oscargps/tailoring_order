
import { StorageHelper } from "../../../core/utils/storageHelper";
import { SupaBaseClient } from "../../../core/utils/supabaseClient";
import { CommonDataService } from "./i-data-service";


export class ModelsService implements CommonDataService {

    private supabaseClient: SupaBaseClient

    constructor() {
        this.supabaseClient = new SupaBaseClient()
    }


    async getData() {

        try {
            const savedModels = StorageHelper.get('Models')
            if (savedModels) {
                return savedModels
            } else {
                const { data } = await this.supabaseClient.client.from('models')
                    .select(`*`).throwOnError();
                StorageHelper.save('Models', data)

                return data;
            }
        } catch (error) {
            throw error;
        }
    }
}