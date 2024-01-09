
import { SupaBaseClient } from "../../../core/utils/supabaseClient";


export class OrderService {

    private supabaseClient: SupaBaseClient

    constructor() {
        this.supabaseClient = new SupaBaseClient()
    }


    async getOrders() {

        try {
            // const headers: any = {};
            // headers['apikey'] = CONFIG.SUPABASE_ANON_KEY
            // headers['Authorization'] = `Bearer ${CONFIG.SUPABASE_ANON_KEY}`

            // const { data } = await RequestService({
            //     method: METHODS.GET,
            //     url: `${CONFIG.ORDERS_API_URL}`,
            //     headers: headers
            // });
            const { data } = await this.supabaseClient.client.from("orders").select(`
            id, 
            order_client, 
            order_stage,
            order_owner,
            order_release,
            order_description,
            created_at,
            clients ( id, client_name ),
            stages ( id, stage_name)
          `);
            return data;
        } catch (error) {
            throw error;
        }
    }
}