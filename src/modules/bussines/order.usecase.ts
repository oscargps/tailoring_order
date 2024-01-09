import { IOrder } from "../domain/Models/Order";
import { OrderService } from "../infrastructure/services/orders.service";

export class OrderUseCase {
  private static orders: IOrder[] | null;

  async getOrders(RequestService: OrderService) {
    OrderUseCase.orders = await RequestService.getOrders();
    return this.mapOrders(OrderUseCase.orders)
  }

  private mapOrders(orders: IOrder[] | null): IOrder[] {

    return orders ? orders.map(order => (
      {
        ...order,
        order_client: order.clients.client_name || '',
        order_stage: order.stages.stage_name || ''
      }
    )) : []
  }

}

