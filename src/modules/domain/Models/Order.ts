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
    order_client: number,
    order_stage: number,
    order_owner: number,
    order_release: string | null,
    order_description: string,
    created_at: string,
    clients: Partial<IClient>
    stages: Partial<IStage>
    order_by_event?: IOrderByEvent[]
}

interface IOrderByEvent {
    id: number
    order_id: number
    order_stage_from: number
    order_stage_to: number
    event_owner?: number
    event_description?: string
    created_at: string
    event_type?: number
}

export interface IOrderDetails {
    id: number,
    order_id: string,
    model_id: number,
    element_size: number,
    element_gender: number,
    element_quantity: number,
    element_description: string,
}
export interface IOrderDetailsDTO {
    id: number,
    order_id: string,
    model_id: Partial<IModels>,
    element_size: Partial<ILiteral>,
    element_gender: Partial<ILiteral>,
    element_quantity: number,
    element_description: string,
}

export interface initialStateOrder {
    order_client: string,
    order_stages: string,
    order_description: string,
    order_elements: IOrderDetails[]
}