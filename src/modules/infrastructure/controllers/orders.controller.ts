import { OrderUseCase } from "../../bussines/order.usecase";
import { IOrderData, initialStateOrder } from "../../domain/Models/Order";
import { OrderService } from "../services/orders.service";
export class OrderController {

    private static orderService: OrderService;

    private static orderUseCase: OrderUseCase;

    getAllOrders() {
        OrderController.orderService = new OrderService();
        OrderController.orderUseCase = new OrderUseCase();
        return OrderController.orderUseCase.getOrders(OrderController.orderService);
    }

    async createOrder(order: initialStateOrder) {
        return new Promise(async (resolve, reject) => {
            try {
                OrderController.orderService = new OrderService();
                OrderController.orderUseCase = new OrderUseCase();
                const result = await OrderController.orderUseCase.createOrder(OrderController.orderService, order);
                resolve(result);
            }
            catch (err) {
                reject(err)
            }
        })
    }
    async updateOrder(orderData: IOrderData) {
        return new Promise(async (resolve, reject) => {
            try {
                OrderController.orderService = new OrderService();
                OrderController.orderUseCase = new OrderUseCase();
                const result = await OrderController.orderUseCase.updateOrder(OrderController.orderService, orderData);
                resolve(result);
            }
            catch (err) {
                reject(err)
            }
        })
    }

}
