
import { SupaBaseClient } from "../../../core/utils/supabaseClient";
import { IElementByStage, IOrderDetailsDTO } from "../../domain/Models/Order";


export class OrderDetailService {

    private supabaseClient: SupaBaseClient

    constructor() {
        this.supabaseClient = new SupaBaseClient()
    }


    async getElements(orderId: string) {

        try {
            const { data } = await this.supabaseClient.client.from("order_by_element").select(`
            id,
            order_id,
            model_id:order_by_element_model_id_fkey (id, model_name ),
            element_quantity,
            element_description,
            element_gender:order_by_element_element_gender_fkey (id, literal_name ),
            element_size:order_by_element_element_size_fkey (id, literal_name )
          `).eq('order_id', orderId).throwOnError();
            return data as IOrderDetailsDTO[];
        } catch (error) {
            throw error;
        }
    }
    async getElementsByStage(orderId: string) {

        try {
            const { data } = await this.supabaseClient.client.from("elements_by_stage").select(`
            order_id,
            element_id:elements_by_stage_element_id_fkey ( * ),
            element_quantity,
            order_stage_id: elements_by_stage_order_stage_id_fkey (*),
            order_by_stages (*),
            last_event_id: elements_by_stage_last_event_id_fkey (*)
          `).eq('order_id', orderId).throwOnError();
            return data as IElementByStage[];
        } catch (error) {
            throw error;
        }
    }
}