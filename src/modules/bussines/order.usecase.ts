import { FormatDate } from "../../core/utils/DateTimeHelpers";
import { StorageHelper } from "../../core/utils/storageHelper";
import { ILiteral } from "../domain/Models/Literals";
import {
  IOrder,
  IOrderData,
  IOrderDto,
  initialStateOrder,
} from "../domain/Models/Order";
import { IStage } from "../domain/Models/Stages";
import { CommonDataController } from "../infrastructure/controllers/common-data.controller";
import { OrderService } from "../infrastructure/services/orders.service";

export class OrderUseCase {
  private orders: IOrderDto[] | null;

  constructor() {
    this.orders = [];
  }

  async createOrder(RequestService: OrderService, order: initialStateOrder) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await RequestService.createOrder(order);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }
  async updateOrder(RequestService: OrderService, orderData: IOrderData) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await RequestService.updateOrder(orderData);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  async getOrders(RequestService: OrderService) {
    const savedOrders = StorageHelper.get("Orders");
    if (savedOrders) {
      const data = (await this.mapOrders(savedOrders)) as IOrder[];
      return data;
    } else {
      this.orders = await RequestService.getOrders();
      StorageHelper.save("Orders", this.orders);
      const mappedOrders = await this.mapOrders(this.orders);
      return mappedOrders;
    }
  }

  private async mapOrders(orders: IOrderDto[] | null): Promise<IOrder[]> {
    const stages = (await CommonDataController.getStages()) as IStage[];
    const Literals = (await CommonDataController.getLiterals()) as ILiteral[];
    return orders
      ? orders.map((order) => ({
          ...order,
          order_client: order.clients.client_name || "",
          order_client_id: order.clients.id || "",
          order_stage_id: order.clients.id || "",
          order_stage: order.stages.stage_name || "",
          created_at: FormatDate(order.created_at),
          order_by_event: order.order_by_event?.map((orderEvent) => ({
            ...orderEvent,
            event_type: Literals.find(
              (literal) => literal.id === orderEvent.event_type
            )?.literal_name,
            order_stage_to: stages.find(
              (stage) =>
                stage.id ===
                order.order_by_stages?.find(
                  (order_by_stage) =>
                    order_by_stage.id == orderEvent.order_stage_to
                )?.stage_id
            )?.stage_name,
            order_stage_from: orderEvent.order_stage_from
              ? stages.find(
                  (stage) =>
                    stage.id ===
                    order.order_by_stages?.find(
                      (order_by_stage) =>
                        order_by_stage.id == orderEvent.order_stage_from
                    )?.stage_id
                )?.stage_name
              : "",
            quantity: order.elements_by_event
              ?.filter((ebe) => ebe.event_id == orderEvent.id)
              .reduce(
                (accumulator, currentValue) =>
                  accumulator + (currentValue.element_quantity || 0),
                0
              ),
            created_at: FormatDate(orderEvent.created_at),
          })),
        }))
      : [];
  }
}
