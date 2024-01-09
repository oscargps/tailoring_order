import { IClient } from "./Clients";
import { IStage } from "./Stages";

export interface IOrder {
    id: string,
    order_client: string,
    order_stage: string,
    order_owner: string,
    order_release: string,
    order_description: string,
    created_at: string,
    clients: Partial<IClient>
    stages: Partial<IStage>
}