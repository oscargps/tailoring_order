import { FormatDate } from "../../core/utils/DateTimeHelpers";
import { StorageHelper } from "../../core/utils/storageHelper";
import { IOrder, IOrderDto } from "../domain/Models/Order";
import { OrderService } from "../infrastructure/services/orders.service";

export class OrderUseCase {
  private orders: IOrderDto[] | null;

  constructor() {
    this.orders = [];
  }

  async getOrders(RequestService: OrderService) {
    const savedOrders = StorageHelper.get('Orders')
    if (savedOrders) {
      return this.mapOrders(savedOrders) as IOrder[]
    } else {
      this.orders = await RequestService.getOrders();
      const mappedOrders = this.mapOrders(this.orders)
      StorageHelper.save('Orders', mappedOrders);
      return mappedOrders;
    }
  }

  private mapOrders(orders: IOrderDto[] | null): IOrder[] {

    return orders ? orders.map(order => (
      {
        ...order,
        order_client: order.clients.client_name || '',
        order_client_id: order.clients.id || '',
        order_stage_id: order.clients.id || '',
        order_stage: order.stages.stage_name || '',
        created_at: FormatDate(order.created_at),
        order_by_event:order.order_by_event?.map((orderEvent)=>({
          ...orderEvent,
          created_at: FormatDate(orderEvent.created_at)
        }))
      }
    )) : []
  }

}

