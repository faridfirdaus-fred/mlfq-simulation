export interface Process {
  pid: string;
  state: "ready" | "running" | "blocked" | "finished";
  queue: number;
  arrival_time?: number;
  burst_time?: number;
  io_time?: number;
  priority?: number; // Added this missing field
  waiting_time?: number;
  turnaround_time?: number;
  remaining_io_time?: number;
  start_time?: number;
  finish_time?: number;
  first_execution_time?: number | null;
  execution_log?: {
    start_time: number;
    end_time: number;
    queue: number;
  }[];
}

export interface SimulationConfig {
  num_queues: number;
  time_slice: number;
  boost_interval: number;
  aging_threshold: number;
}

export interface SimulationRequest {
  processes: Process[];
  config: SimulationConfig;
}

export interface SimulationMetrics {
  avg_turnaround_time: number;
  avg_waiting_time: number;
  avg_response_time: number;
  cpu_utilization: number;
  total_time: number;
}

export interface SimulationResult {
  processes: Process[];
  metrics: SimulationMetrics;
}

export interface BackendResponse {
  results: SimulationResult;
  total_time?: number;
}

export interface FrontendResult {
  processes: Process[];
  total_time: number;
  metrics: SimulationMetrics;
}

export interface ErrorResponse {
  detail: string;
}
