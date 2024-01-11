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
        element_size: element.element_size.literal_name || '',
        element_gender: element.element_gender.literal_name || '',
        model_id: element.model_id.model_name || ''
      }
    )) : []
  }

}

