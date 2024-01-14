import { OrderDetailUseCase } from '../../bussines/order-detail.usecase';
import { OrderDetailService } from "../services/order-detail.service";
export class OrderDetailController {

    private static orderDetailService: OrderDetailService;

    private static orderDetailUseCase: OrderDetailUseCase;

    getOrderDetail(orderId: string) {
        OrderDetailController.orderDetailService = new OrderDetailService();
        OrderDetailController.orderDetailUseCase = new OrderDetailUseCase();
        return OrderDetailController.orderDetailUseCase.getOrders(OrderDetailController.orderDetailService, orderId);
    }
    getElementsByStage(orderId: string) {
        OrderDetailController.orderDetailService = new OrderDetailService();
        OrderDetailController.orderDetailUseCase = new OrderDetailUseCase();
        return OrderDetailController.orderDetailUseCase.getElementsByStage(OrderDetailController.orderDetailService, orderId);
    }

}
