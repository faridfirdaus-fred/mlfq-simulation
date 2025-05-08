"use client";

import { useState } from "react";
import ProcessForm from "./components/ProcessForm";
import ProcessTable from "./components/ProcessTable";
import ResultsDisplay from "./components/ResultsDisplay";
import SimulationControls from "./components/SimulationControls";
import { Process } from "./api/utils/types";

export default function Home() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [results, setResults] = useState<Process[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  const handleAddProcess = (newProcess: Process) => {
    setProcesses((prev) => [...prev, newProcess]);
  };

  const handleStart = async () => {
    setLoading(true);
    setError(null);
    setIsRunning(true);
    try {
      // Use the API endpoint
      const response = await fetch("/api/mlfq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(processes),
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();
      setResults(Array.isArray(data) ? data : data.processes);
    } catch (err) {
      setError("Failed to run simulation. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
      setIsRunning(false);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    // Additional logic for stopping simulation if needed
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">MLFQ Simulation</h1>
      <ProcessForm onSubmit={handleAddProcess} />
      <div className="my-4"></div>
      <SimulationControls
        onStart={handleStart}
        onStop={handleStop}
        isRunning={isRunning}
      />
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {processes.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Processes</h2>
          <ProcessTable processes={processes} />
        </div>
      )}
      {results && (
        <div className="mt-6">
          <ResultsDisplay results={results} />
        </div>
      )}
    </div>
  );
}
