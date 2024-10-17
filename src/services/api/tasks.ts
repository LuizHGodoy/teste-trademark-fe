import { handleAxiosError } from "@/common/exceptions/api-error";
import axiosInstance from "..";

export interface CreateTaskPayload {}

export const getAllTasks = async () => {
  try {
    const response = await axiosInstance.get("/tasks");
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getTaskByUuid = async (uuid: number) => {
  try {
    const response = await axiosInstance.get(`/task/${uuid}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createTask = async (data: any) => {
  try {
    const response = await axiosInstance.post("/task", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const updateTask = async (uuid: number, data: any) => {
  try {
    const response = await axiosInstance.put(`/task/${uuid}`, data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const deleteTask = async (uuid: number) => {
  try {
    const response = await axiosInstance.delete(`/task/${uuid}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
