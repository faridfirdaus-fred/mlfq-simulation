// utils/apiClient.ts
import { API_URL } from "@/lib/constants";
import {
  Process,
  SimulationConfig, // Import SimulationConfig
  SimulationRequest,
  BackendResponse,
  FrontendResult,
  ErrorResponse,
} from "../utils/types";

export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public details?: string
  ) {
    super(message);
    this.name = "APIError";
  }
}

// Fix the generic parameter B to use a more specific type instead of any
export const apiClient = async <T, B extends object = Record<string, unknown>>(
  endpoint: string,
  method: string = "GET",
  body?: B
): Promise<T> => {
  try {
    if (!API_URL) {
      throw new APIError("API URL is not configured");
    }

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
      throw new APIError(
        errorData.detail || `Error: ${response.status} ${response.statusText}`,
        response.status,
        errorData.detail
      );
    }

    return data as T;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    console.error("API request failed:", error);
    throw new APIError(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
};

// fetchSimulationResults sekarang menerima config
export const fetchSimulationResults = async (
  processes: Process[],
  config: SimulationConfig // Tambahkan argumen config
): Promise<FrontendResult> => {
  if (!Array.isArray(processes) || processes.length === 0) {
    throw new APIError("Processes must be a non-empty array");
  }

  // Buat request yang terstruktur untuk backend
  const request: SimulationRequest = {
    processes: processes,
    config: config, // Gunakan config yang diterima
  };

  const data: BackendResponse = await apiClient<
    BackendResponse,
    SimulationRequest
  >("simulate", "POST", request);

  // Transformasi response backend agar sesuai ekspektasi frontend
  return {
    processes: data.results?.processes || [],
    total_time: data.total_time || data.results?.metrics?.total_time || 0,
    metrics: data.results?.metrics || {
      avg_turnaround_time: 0,
      avg_waiting_time: 0,
      avg_response_time: 0,
      cpu_utilization: 0,
      total_time: 0, // Pastikan ada total_time di metrics default
    },
  };
};
