"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<null | any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testBackendConnection = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/simulate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([{ pid: "P1", arrival_time: 0, burst_time: 5 }]),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      console.log("Response from backend:", data);
      setResult(data);
    } catch (err) {
      console.error("Connection error:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        {/* Backend connection test */}
        <div className="w-full max-w-md p-4 bg-white shadow-md rounded-lg dark:bg-gray-800">
          <h2 className="text-xl font-bold mb-4">Backend Connection Test</h2>
          <button
            onClick={testBackendConnection}
            disabled={loading}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full mb-4"
          >
            {loading ? "Testing..." : "Test Backend Connection"}
          </button>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 dark:bg-red-900 dark:text-red-100">
              {error}
            </div>
          )}

          {result && (
            <div className="mt-4">
              <h3 className="font-bold text-lg mb-2">Response:</h3>
              <pre className="bg-gray-100 p-2 rounded overflow-x-auto dark:bg-gray-700 text-xs">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Rest of your existing content */}
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          {/* existing content */}
        </ol>

        {/* existing content */}
      </main>
      {/* existing footer */}
    </div>
  );
}
