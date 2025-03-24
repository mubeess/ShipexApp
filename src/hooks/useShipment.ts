import {
  shipmentListFetcher,
  shipmentStatusFetcher,
} from '@shipex/api/shipment/shipmentApi';
import {handleError} from '@shipex/utils/Index';

import {useEffect} from 'react';
import useSWR from 'swr';

export const useShipmentList = (searchTerm: string) => {
  const url = `/frappe.client.get_list?doctype=AWB&fields=["*"]&filters={"name":["like","%${searchTerm}%"]}`;
  const {data, error, isLoading, mutate, isValidating} = useSWR(
    url,
    shipmentListFetcher,
  );
  const refresh = () => {
    mutate();
  };
  useEffect(() => {
    if (error) handleError(error);
  }, [error]);
  return {
    shipmentList: data?.message,
    isLoading,
    isError: error,
    refresh,
    refetching: isValidating,
  };
};

export const useShipmentStatus = () => {
  const url = `/frappe.client.get_list?doctype=AWB Status&fields=["*"]`;
  const {data, error, isLoading, isValidating} = useSWR(
    url,
    shipmentStatusFetcher,
  );

  useEffect(() => {
    if (error) handleError(error);
  }, [error]);

  return {
    shpmentStatus: data?.message,
    isLoading,
    isError: error,
    refetching: isValidating,
  };
};
