export interface Process {
  cpu_bursts(cpu_bursts: any): unknown;
  execution_log: boolean;
  first_execution_time: null;
  pid: string;
  arrival_time: number;
  burst_time: number;
  priority: number;
  io_time: number;

  // Result fields that come back from the backend
  state?: string;
  queue?: number;
  start_time?: number | null;
  finish_time?: number | null;
  waiting_time?: number;
  turnaround_time?: number;
  remaining_time?: number;
  remaining_io_time?: number; // Add this property for I/O remaining time
  context_switches?: number;
  execution_history?: [number, number][];
  queue_history?: [number, number][];
  io_bursts_completed?: number;
  cpu_bursts_completed?: number;
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
