
import { SupaBaseClient } from "../../../core/utils/supabaseClient";
import { IOrderDto } from "../../domain/Models/Order";


export class OrderService {

    private supabaseClient: SupaBaseClient

    constructor() {
        this.supabaseClient = new SupaBaseClient()
    }


    async getOrders() {

        try {
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
            return data as IOrderDto[];
        } catch (error) {
            throw error;
        }
    }
}