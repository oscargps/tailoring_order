
import { SupaBaseClient } from "../../../core/utils/supabaseClient";


export class OrderDetailService {

    private supabaseClient: SupaBaseClient

    constructor() {
        this.supabaseClient = new SupaBaseClient()
    }


    async getElements(orderId:string) {

        try {
            const { data } = await this.supabaseClient.client.from("order_by_element").select(`
            id,
            order_id,
            model_id:order_by_element_model_id_fkey (id, model_name ),
            element_quantity,
            element_description,
            element_gender:order_by_element_element_gender_fkey (id, literal_name ),
            element_size:order_by_element_element_size_fkey (id, literal_name )
          `).eq('order_id', orderId);
            return data;
        } catch (error) {
            throw error;
        }
    }
}