import { IOrderDetails, IOrderDetailsDTO } from "../domain/Models/Order";
import { OrderDetailService } from "../infrastructure/services/order-detail.service";

export class OrderDetailUseCase {
  private elements: IOrderDetailsDTO[] | null;

  constructor() {
    this.elements = [];
  }

  async getOrders(RequestService: OrderDetailService, orderId: string) {

    this.elements = await RequestService.getElements(orderId);
    const mappedOrders = this.mapElements(this.elements)
    return mappedOrders;
  }

  private mapElements(elements: IOrderDetailsDTO[] | null): IOrderDetails[] {

    return elements ? elements.map(element => (
      {
        ...element,
        element_size: element.element_size.id || '',
        element_gender: element.element_gender.id || '',
        model_id: element.model_id.id || ''
      }
    )) : []
  }

}

