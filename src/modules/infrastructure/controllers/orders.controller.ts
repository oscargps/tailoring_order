import { OrderUseCase } from "../../bussines/order.usecase";
import { OrderService } from "../services/orders.service";

export class OrderController {

    private static orderService: OrderService;

    private static orderUseCase: OrderUseCase;

    getAllOrders() {
        OrderController.orderService = new OrderService();
        OrderController.orderUseCase = new OrderUseCase();
        return OrderController.orderUseCase.getOrders(OrderController.orderService);
    }

}
