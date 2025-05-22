// API URL configuration
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://mlfq-simulation-backend.onrender.com");

// Default simulator configuration
export const DEFAULT_CONFIG = {
  num_queues: 4,
  time_slice: 2,
  boost_interval: 100,
  aging_threshold: 5,
};

// Configuration constraints and validation rules
export const CONFIG_CONSTRAINTS = {
  num_queues: {
    min: 1,
    max: 10,
    description: "Jumlah level prioritas dalam MLFQ",
  },
  time_slice: {
    min: 1,
    max: 20,
    description: "Kuantum waktu dasar untuk antrian prioritas tertinggi",
  },
  boost_interval: {
    min: 1,
    max: 1000,
    description: "Interval waktu untuk boost prioritas",
  },
  aging_threshold: {
    min: 1,
    max: 100,
    description: "Waktu sebelum proses aging terjadi",
  },
};

// Queue visualization settings
export const QUEUE_COLORS = [
  "#4CAF50", // Queue 0 - Green (highest priority)
  "#2196F3", // Queue 1 - Blue
  "#FF9800", // Queue 2 - Orange
  "#F44336", // Queue 3 - Red
  "#9C27B0", // Queue 4 - Purple
  "#607D8B", // Queue 5 - Blue-gray
  "#795548", // Queue 6 - Brown
  "#009688", // Queue 7 - Teal
  "#FFEB3B", // Queue 8 - Yellow
  "#00BCD4", // Queue 9 - Cyan (lowest priority)
];

// Informative tooltips for configuration parameters (Indonesian)
export const CONFIG_TOOLTIPS = {
  num_queues:
    "Jumlah level prioritas yang berbeda dalam penjadwal MLFQ. Antrian 0 memiliki prioritas tertinggi.",
  time_slice:
    "Kuantum waktu yang diberikan kepada proses di antrian prioritas tertinggi (Antrian 0). Setiap antrian yang lebih rendah mendapat (level+1) × time_slice.",
  boost_interval:
    "Setelah sekian unit waktu ini, semua proses dipindahkan kembali ke antrian prioritas tertinggi untuk mencegah starvation.",
  aging_threshold:
    "Setelah menunggu sekian unit waktu ini di dalam antrian, proses akan dipromosikan ke antrian prioritas yang lebih tinggi.",
};

// Common explanatory texts (Indonesian)
export const MLFQ_CONCEPTS = {
  queueLevels:
    "Dalam MLFQ, proses berpindah antar antrian prioritas yang berbeda berdasarkan perilakunya. Proses I/O bound biasanya tetap di antrian prioritas tinggi.",
  timeQuantum:
    "Setiap antrian memiliki kuantum waktu yang berbeda. Antrian yang lebih rendah (prioritas lebih rendah) mendapat slice waktu yang lebih besar untuk mengurangi overhead context switching pada proses CPU-bound.",
  priorityBoost:
    "Priority boost secara berkala memindahkan semua proses ke antrian prioritas tertinggi untuk mencegah starvation.",
  aging:
    "Aging mempromosikan proses yang telah menunggu terlalu lama di antrian prioritas rendah, memberikan keadilan.",
};

// Sample process templates for quick setup
export const SAMPLE_PROCESSES = {
  basic: [
    { pid: "P1", arrival_time: 0, burst_time: 5, priority: 0, io_time: 2 },
    { pid: "P2", arrival_time: 1, burst_time: 3, priority: 0, io_time: 0 },
    { pid: "P3", arrival_time: 2, burst_time: 8, priority: 0, io_time: 3 },
  ],
  cpuBound: [
    { pid: "CPU1", arrival_time: 0, burst_time: 20, priority: 0, io_time: 0 },
    { pid: "CPU2", arrival_time: 0, burst_time: 15, priority: 0, io_time: 0 },
  ],
  ioBound: [
    { pid: "IO1", arrival_time: 0, burst_time: 4, priority: 0, io_time: 8 },
    { pid: "IO2", arrival_time: 0, burst_time: 3, priority: 0, io_time: 10 },
  ],
  mixed: [
    { pid: "CPU", arrival_time: 0, burst_time: 12, priority: 0, io_time: 0 },
    { pid: "MIX", arrival_time: 0, burst_time: 6, priority: 0, io_time: 4 },
    { pid: "IO", arrival_time: 0, burst_time: 3, priority: 0, io_time: 9 },
  ],
};