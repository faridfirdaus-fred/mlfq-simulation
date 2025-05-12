import { API_URL } from "@/lib/constants";
import { Process, SimulationResult, ErrorResponse } from "../utils/types";

export const apiClient = async <T, B = Record<string, unknown> | Process[]>(
  endpoint: string,
  method: string = "GET",
  body?: B
): Promise<T> => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
      const errorData = data as ErrorResponse;
      throw new Error(
        errorData.detail || `Error: ${response.status} ${response.statusText}`
      );
    }

    return data as T;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

export const fetchSimulationResults = async (
  processes: Process[]
): Promise<SimulationResult> => {
  return apiClient<SimulationResult>("simulate", "POST", processes);
};
