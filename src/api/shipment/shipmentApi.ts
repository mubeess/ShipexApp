import axiosInstance from '../axiosInstance';
import {ShipmentResponse, ShipmentStatusResponse} from '../types';

export const shipmentListFetcher = async (
  url: string,
): Promise<ShipmentResponse> => {
  const response = await axiosInstance.get<ShipmentResponse>(url);
  return response.data;
};

export const shipmentStatusFetcher = async (
  url: string,
): Promise<ShipmentStatusResponse> => {
  const response = await axiosInstance.get<ShipmentStatusResponse>(url);
  return response.data;
};
