// mlfq/route.ts
import { NextResponse } from "next/server";
import {
  Process,
  ErrorResponse,
  SimulationRequest as FrontendSimulationRequest, // Menggunakan alias untuk menghindari konflik
  SimulationMetrics,
} from "../../api/utils/types";
import { API_URL } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    // Terima seluruh body request sebagai FrontendSimulationRequest
    const body: FrontendSimulationRequest = await request.json();
    const processes: Process[] = body.processes;
    const config = body.config; // Ambil config dari request body

    // Validate input
    if (!Array.isArray(processes) || processes.length === 0) {
      return NextResponse.json(
        { error: "Invalid input: processes must be a non-empty array" },
        { status: 400 }
      );
    }

    for (const process of processes) {
      if (
        !process.pid ||
        typeof process.arrival_time !== "number" ||
        typeof process.burst_time !== "number"
      ) {
        return NextResponse.json(
          { error: `Invalid process data: ${process.pid || "unknown"}` },
          { status: 400 }
        );
      }
    }

    // Pastikan config juga valid (opsional, karena Pydantic di backend akan validasi)
    if (
      !config ||
      typeof config.num_queues !== "number" ||
      typeof config.time_slice !== "number" ||
      typeof config.boost_interval !== "number" ||
      typeof config.aging_threshold !== "number"
    ) {
      return NextResponse.json(
        { error: "Invalid input: simulation config is missing or malformed" },
        { status: 400 }
      );
    }

    // Buat request body dalam format yang diharapkan oleh backend FastAPI
    const requestBody = {
      processes: processes,
      config: config, // Gunakan config yang diterima dari UI
    };

    const response = await fetch(`${API_URL}/simulate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody), // Kirim request body yang terstruktur
    });

    const data = await response.json();

    if (!response.ok) {
      const errorData = data as ErrorResponse;
      return NextResponse.json(
        {
          error:
            errorData.detail ||
            `Error: ${response.status} ${response.statusText}`,
        },
        { status: response.status }
      );
    }

    // Transformasi response backend untuk frontend
    // Pastikan tipe data metrics benar saat diakses
    const result: SimulationMetrics = data.results?.metrics || {
      avg_turnaround_time: 0,
      avg_waiting_time: 0,
      avg_response_time: 0,
      cpu_utilization: 0,
      total_time: 0, // Tambahkan total_time ke metrics default
    };

    return NextResponse.json({
      processes: data.results?.processes || [],
      total_time: data.total_time || data.results?.metrics?.total_time || 0,
      metrics: result, // Gunakan objek metrics yang sudah pasti
    });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
