import { useQuery } from '@tanstack/react-query';
import { OrderController } from '../../modules/infrastructure/controllers/orders.controller';
import { initialStateOrder } from '../../modules/domain/Models/Order';

const orderController = new OrderController();

export const useFetchOrders = () => useQuery(['Orders'], orderController.getAllOrders,
  {
    staleTime: 10000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });


  export const useCreateOrder = (order:initialStateOrder) => {
    const getData = () => orderController.createOrder(order);
    return useQuery(['CreateOrder'], () => getData(),
      {
        staleTime: 0,
        cacheTime: 0,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
        enabled: false,
      },
      );
  };