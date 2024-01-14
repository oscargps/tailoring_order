import { useQuery } from '@tanstack/react-query';
import { OrderDetailController } from '../../modules/infrastructure/controllers/order-detail.controller';

const orderDetailController = new OrderDetailController();

export const useFetchOrderDetail = (orderId: string) => {
  const getData = () => orderDetailController.getOrderDetail(orderId);

  return useQuery(['OrderDetail'], () => getData(),
    {
      staleTime: 10000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    });
}
export const useFetchelementsByStage = (orderId: string) => {
  const getData = () => orderDetailController.getElementsByStage(orderId);

  return useQuery(['ElementsBystage'], () => getData(),
    {
      staleTime: 10000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    });
}
