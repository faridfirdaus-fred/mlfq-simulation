import { API_URL } from "@/lib/constants";
import { Process, SimulationResult } from "../utils/types";

export const apiClient = async (
  endpoint: string,
  method: string = "GET",
  body?: Process[]
): Promise<any> => {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const fetchSimulationResults = async (
  processes: Process[]
): Promise<SimulationResult> => {
  return apiClient("simulate", "POST", processes);
};
