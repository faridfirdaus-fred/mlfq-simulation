import { NextResponse } from "next/server";
import {
  Process,
  SimulationResult,
  ErrorResponse,
} from "../../api/utils/types";

export async function POST(request: Request) {
  try {
    const processes: Process[] = await request.json();

    // Get API URL from environment variable
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      throw new Error("API URL is not defined");
    }

    const response = await fetch(`${apiUrl}/simulate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(processes),
    });

    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(
        errorData.detail || `Error: ${response.status} ${response.statusText}`
      );
    }

    const result: SimulationResult = await response.json();
    return NextResponse.json(result);
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
