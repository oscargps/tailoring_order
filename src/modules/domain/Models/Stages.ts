export interface IStage {
    id: number
    stage_name: string
    stage_owner: string
    created_at: string
}

export interface IOrderByStage {
    id: number
    order_id: number
    stage_id: number
    stage_owner: number
}