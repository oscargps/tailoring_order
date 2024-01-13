
import { SupaBaseClient } from "../../../core/utils/supabaseClient";
import { IOrderDto, initialStateOrder } from "../../domain/Models/Order";


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
            stages ( id, stage_name),
            order_by_event (*)
          `);
            return data as IOrderDto[];
        } catch (error) {
            throw error;
        }
    }

    async createOrder(order: initialStateOrder) {
        return new Promise(async (resolve, reject) => {

            try {
                const { data, error } = await this.supabaseClient.client.functions.invoke('create-order', {
                    body: { dataRq: order },
                });


                if (error) {
                    reject(error)
                } else {
                    resolve(data)
                }
            } catch (error) {

                reject(error)
            }
        })


    }
}