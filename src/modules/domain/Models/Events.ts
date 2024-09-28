export interface IEvent {
    id:                number;
    order_id:          number;
    created_at:        Date;
    event_type:        number;
    event_owner:       number;
    order_stage_to:    number;
    order_stage_from:  null;
    event_description: string;
}