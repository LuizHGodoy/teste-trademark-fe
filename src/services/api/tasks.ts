import { handleAxiosError } from "@/common/exceptions/api-error";
import axiosInstance from "..";

export interface CreateTaskPayload {
  uuid?: string;
  title: string;
  description: string;
  completed?: boolean;
  priority: string;
}

export const createTask = async (data: CreateTaskPayload) => {
  try {
    const response = await axiosInstance.post("/tarefas/criar-tarefa", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getAllTasks = async () => {
  try {
    const response = await axiosInstance.get("/tarefas");
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getTaskByUuid = async (uuid: number) => {
  try {
    const response = await axiosInstance.get(`/tarefas/${uuid}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const updateTask = async (
  uuid: string,
  data: Partial<CreateTaskPayload>,
) => {
  try {
    const response = await axiosInstance.patch(`/tarefas/${uuid}`, data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const deleteTask = async (uuid: string) => {
  try {
    const response = await axiosInstance.delete(`/tarefas/${uuid}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
