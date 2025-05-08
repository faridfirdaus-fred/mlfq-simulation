"use client";

import { useState } from "react";
import ProcessForm from "../components/ProcessForm";
import ProcessTable from "../components/ProcessTable";
import ResultsDisplay from "../components/ResultsDisplay";
import SimulationControls from "../components/SimulationControls";
import { Process } from "./api/utils/types";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

export default function Home() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [results, setResults] = useState<Process[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [totalTime, setTotalTime] = useState(0);

  const handleAddProcess = (newProcess: Process) => {
    setProcesses((prev) => [...prev, newProcess]);
    toast.success("Process Added", {
      description: `Process ${newProcess.pid} has been added to the simulation.`,
    });
  };

  const handleStart = async () => {
    if (processes.length === 0) {
      toast.error("No processes", {
        description:
          "Please add at least one process before starting the simulation.",
      });
      return;
    }

    setLoading(true);
    setError(null);
    setIsRunning(true);

    try {
      const response = await fetch("/api/mlfq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(processes),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Server error");
      }

      const data = await response.json();
      setResults(data.processes);
      setTotalTime(data.total_time);

      toast.success("Simulation Complete", {
        description: `Completed in ${data.total_time} time units.`,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to run simulation";
      setError(errorMessage);
      toast.error("Simulation failed", {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
      setIsRunning(false);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    toast.info("Simulation Stopped", {
      description: "The simulation has been stopped.",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Multi-Level Feedback Queue Scheduler
      </h1>

      <div className="grid gap-8">
        <ProcessForm onSubmit={handleAddProcess} />

        <SimulationControls
          onStart={handleStart}
          onStop={handleStop}
          isRunning={isRunning}
        />

        {loading && (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin mr-2" />
            <p className="text-lg">Running simulation...</p>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <ProcessTable processes={processes} />

        {results && <ResultsDisplay results={results} totalTime={totalTime} />}
      </div>

      <Toaster richColors position="top-center" />
    </div>
  );
}
