import { handleAxiosError } from "@/common/exceptions/api-error";
import axiosInstance from "..";

export interface ISignIn {
  email: string;
  password: string;
}

export interface ICreateUser {
  name: string;
  email: string;
  senha: string;
}

export const signIn = async (data: ISignIn) => {
  try {
    const response = await axiosInstance.post("/sign-in", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getCurrentUser = async (uuid: string) => {
  try {
    const response = await axiosInstance.get(`/usuarios/${uuid}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const signUp = async (data: ICreateUser) => {
  try {
    const response = await axiosInstance.post("/sign-up", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
