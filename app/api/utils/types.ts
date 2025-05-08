export interface Process {
  pid: string;
  arrival_time: number;
  burst_time: number;
  io_burst: number;
  total_time?: number;
  io_variance: number;
  cpu_variance: number;

  // Result fields
  remaining_cpu?: number;
  remaining_io?: number;
  io_bursts_completed?: number;
  cpu_bursts_completed?: number;
  start?: number | null;
  finish?: number;
  queue?: number;
  waiting_time?: number;
  io_time?: number;
  turnaround_time?: number;
  state?: "waiting" | "ready" | "running" | "io" | "finished";
}

export interface SimulationResult {
  processes: Process[];
  total_time: number;
}

export interface ErrorResponse {
  detail: string;
}
