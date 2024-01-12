
import { StorageHelper } from "../../../core/utils/storageHelper";
import { SupaBaseClient } from "../../../core/utils/supabaseClient";
import { CommonDataService } from "./i-data-service";


export class StageService implements CommonDataService {

    private supabaseClient: SupaBaseClient

    constructor() {
        this.supabaseClient = new SupaBaseClient()
    }


    async getData() {

        try {
            const savedStages = StorageHelper.get('Stages')
            if (savedStages) {
                return savedStages
            } else {
                const { data } = await this.supabaseClient.client.from('stages')
                    .select(`*`).throwOnError();
                StorageHelper.save('Stages', data)

                return data;
            }
        } catch (error) {
            throw error;
        }
    }
}