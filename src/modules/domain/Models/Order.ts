import { IClient } from "./Clients";
import { IElement } from "./Elements";
import { IEvent } from "./Events";
import { ILiteral } from "./Literals";
import { IModels } from "./Models";
import { IOrderByStage, IStage } from "./Stages";

export interface IOrder {
    id: string,
    order_client_id: string,
    order_client: string,
    order_stage_id: string,
    order_stage: string,
    order_owner: number,
    order_release: string | null,
    order_description: string,
    created_at: string,
    order_by_event?: IOrderByEvent[]
    order_by_stages: IOrderByStage[]

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
    order_by_stages?: Partial<IOrderByStage>[]
    elements_by_event?: Partial<IElementByEvent>[]
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
    quantity?: number
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

export interface IElementByStage {
    order_id: number;
    element_quantity: number;
    element_id: Partial<IElement>;
    order_stage_id: Partial<IOrderByStage>;
    last_event_id: Partial<IEvent>;
    order_by_stages: Partial<IOrderByStage>;
}
export interface IElementByEvent {
    created_at: string
    element_id: number
    element_quantity: number
    event_id: number
    id: number
    order_id: number
    order_stage_id: number
}

export interface IOrderData {
    order_id: number,
    stage_from: number,
    stage_to: number,
    elements: {
        element_id: number,
        element_new_quantity: number
    }[]
    event_description?: string,
    event_type: number

}