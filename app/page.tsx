"use client";

import React, { useState } from "react";
import ProcessForm from "@/components/ProcessForm";
import ConfigForm from "@/components/ConfigForm";
import ProcessTable from "@/components/ProcessTable";
import SimulationControls from "@/components/SimulationControls";
import ResultsDisplay from "@/components/ResultsDisplay";
import { Process, SimulationConfig } from "./api/utils/types";
import { fetchSimulationResults } from "./api/utils/apiClient";
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { DEFAULT_CONFIG } from "@/lib/constants";

export default function SimulationPage() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [config, setConfig] = useState<SimulationConfig>(DEFAULT_CONFIG);
  const [results, setResults] = useState<Process[] | null>(null);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSimulated, setIsSimulated] = useState<boolean>(false);

  const handleAddProcess = (process: Process) => {
    // Check if PID is already used
    if (processes.some((p) => p.pid === process.pid)) {
      toast.error("Process ID already in use", {
        description: `Process ID "${process.pid}" is already in use. Please choose a different ID.`,
      });
      return;
    }

    setProcesses([...processes, process]);
    toast.success("Process added", {
      description: `Process ${process.pid} has been added to the simulation.`,
    });
    setError(null);
    setIsSimulated(false);
  };

  const handleUpdateConfig = (newConfig: SimulationConfig) => {
    setConfig(newConfig);
    setError(null);
    setIsSimulated(false);
    console.log("Configuration updated:", newConfig); // Debug
  };

  const handleRemoveProcess = (pid: string) => {
    setProcesses(processes.filter((p) => p.pid !== pid));
    toast.info(`Process ${pid} removed`);
    setIsSimulated(false);
  };

  const handleStartSimulation = async () => {
    if (processes.length === 0) {
      toast.error("No processes to simulate", {
        description:
          "Please add at least one process before running simulation.",
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    const toastId = toast.loading("Running simulation...", {
      id: "simulation",
    });

    try {
      console.log("Running simulation with:", { processes, config }); // Debug
      const result = await fetchSimulationResults(processes, config);
      setResults(result.processes);
      setTotalTime(result.total_time);
      setIsSimulated(true);
      toast.success("Simulation completed", {
        id: toastId,
        description: `Total simulation time: ${result.total_time} units`,
      });
    } catch (err) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "An error occurred during simulation";
      setError(errorMsg);
      toast.error("Simulation failed", {
        id: toastId,
        description: errorMsg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearAll = () => {
    setProcesses([]);
    setResults(null);
    setError(null);
    setIsSimulated(false);
    toast.info("All data cleared");
  };

  return (
    <main className="container mx-auto py-8 max-w-7xl">
      <Toaster />
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
        Multi-Level Feedback Queue Scheduler Simulation
      </h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Configuration Form */}
        <ConfigForm
          onSubmit={handleUpdateConfig}
          defaultValues={DEFAULT_CONFIG}
          isSimulationRunning={isLoading}
        />

        {/* Process Form */}
        <ProcessForm onSubmit={handleAddProcess} />
      </div>

      {/* Process Table */}
      {processes.length > 0 && (
        <div className="mb-8">
          <ProcessTable processes={processes} onRemove={handleRemoveProcess} />
        </div>
      )}

      {/* Simulation Controls */}
      <div className="mb-8">
        <SimulationControls
          onStart={handleStartSimulation}
          onClear={handleClearAll}
          isRunning={isLoading}
          disableStart={processes.length === 0}
          disableClear={processes.length === 0}
        />
      </div>

      {/* Results Display */}
      {isSimulated && results && (
        <ResultsDisplay results={results} totalTime={totalTime} />
      )}
    </main>
  );
}
