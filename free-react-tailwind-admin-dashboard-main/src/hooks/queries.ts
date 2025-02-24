import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export const useMonthlyTarget = () => {
  return useQuery({
    queryKey: ['monthlyTarget'],
    queryFn: api.getMonthlyTarget
  });
};

export const useRecentOrders = () => {
  return useQuery({
    queryKey: ['recentOrders'],
    queryFn: api.getRecentOrders
  });
};

export const useEcommerceMetrics = () => {
  return useQuery({
    queryKey: ['ecommerceMetrics'],
    queryFn: api.getEcommerceMetrics
  });
};

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: api.getUserProfile
  });
};

export const useSalesChartData = () => {
  return useQuery({
    queryKey: ['salesChart'],
    queryFn: api.getSalesChartData
  });
};

export const useDemographicData = () => {
  return useQuery({
    queryKey: ['demographicData'],
    queryFn: api.getDemographicData
  });
};
