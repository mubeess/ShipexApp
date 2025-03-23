import axiosInstance from '../axiosInstance';
import {LoginRequest, LoginResponse} from '../types';

export const loginFetcher = async (
  data: LoginRequest,
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>('/login', data);
  return response.data;
};
