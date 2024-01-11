import { IClient } from "./Clients";
import { ILiteral } from "./Literals";
import { IModels } from "./Models";
import { IStage } from "./Stages";

export interface IOrder {
    id: string,
    order_client_id: string,
    order_client: string,
    order_stage_id: string,
    order_stage: string,
    order_owner: string,
    order_release: string | null,
    order_description: string,
    created_at: string,
    order_by_event?: IOrderByEvent[]
}
export interface IOrderDto {
    id: string,
    order_client: string,
    order_stage: string,
    order_owner: string,
    order_release: string | null,
    order_description: string,
    created_at: string,
    clients: Partial<IClient>
    stages: Partial<IStage>
    order_by_event?: IOrderByEvent[]
}

interface IOrderByEvent {
    id: string
    order_id: string
    order_stage_from: string
    order_stage_to: string
    event_owner?: string
    event_description?: string
    created_at: string
}

export interface IOrderDetails {
    id: string,
    order_id: string,
    model_id: string,
    element_size: string,
    element_gender: string,
    element_quantity: string,
    element_description: string,
}
export interface IOrderDetailsDTO {
    id: string,
    order_id: string,
    model_id: Partial<IModels>,
    element_size: Partial<ILiteral>,
    element_gender: Partial<ILiteral>,
    element_quantity: string,
    element_description: string,
}