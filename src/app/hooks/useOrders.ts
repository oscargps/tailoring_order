import { useQuery } from '@tanstack/react-query';
import { OrderController } from '../../modules/infrastructure/controllers/orders.controller';

const AccountController = new OrderController();

export const useFetchOrders = () => useQuery(['Orders'], AccountController.getAllOrders,
  {
    staleTime: 10000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
