import { useQuery } from '@tanstack/react-query';
import { CommonDataController } from '../../modules/infrastructure/controllers/common-data.controller';


export const useFetchLiterals = () => useQuery(['Literals'], CommonDataController.getLiterals,
  {
    staleTime: 10000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
export const useFetchClients = () => useQuery(['Clients'], CommonDataController.getClients,
  {
    staleTime: 10000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
export const useFetchModels = () => useQuery(['Models'], CommonDataController.getModels,
  {
    staleTime: 10000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
export const useFetchStages = () => useQuery(['Stages'], CommonDataController.getStages,
  {
    staleTime: 10000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
