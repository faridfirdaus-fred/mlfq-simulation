// filepath: /home/faridfred/Development/mlfq/mlfq-simulation/app/api/utils/types.ts

export interface Process {
  pid: string;
  arrival_time: number;
  burst_time: number;
  remaining_time?: number;
  start?: number | null;
  finish?: number;
  turnaround_time?: number;
  waiting_time?: number;
  queue?: number;
}

export interface SimulationResult {
  processes: Process[];
  total_time: number;
}

export interface ErrorResponse {
  detail: string;
}
