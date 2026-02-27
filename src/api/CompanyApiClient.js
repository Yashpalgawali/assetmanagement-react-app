import { apiClient } from "./apiClient";

export const getAllCompaniesList = ()=> apiClient.get(`company/`)