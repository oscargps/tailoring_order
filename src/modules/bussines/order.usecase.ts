import { StorageHelper } from "../../core/utils/storageHelper";
import { IOrder } from "../domain/Models/Order";
import { OrderService } from "../infrastructure/services/orders.service";

export class OrderUseCase {
  private orders: IOrder[] | null;

  constructor() {
    this.orders = [];
  }

  async getOrders(RequestService: OrderService) {
    const savedOrders = StorageHelper.get('Orders')
    if (savedOrders) {
      return savedOrders
    } else {
      this.orders = await RequestService.getOrders();
      const mappedOrders = this.mapOrders(this.orders)
      StorageHelper.save('Orders', mappedOrders);
      return mappedOrders;
    }
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

