"use client";

import { useState, useEffect } from "react";
import ProcessForm from "../components/ProcessForm";
import ProcessTable from "../components/ProcessTable";
import ResultsDisplay from "../components/ResultsDisplay";
import SimulationControls from "../components/SimulationControls";
import ProcessMonitor from "../components/ProcessMonitor";
import { Process } from "./api/utils/types";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

export default function Home() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [results, setResults] = useState<Process[] | null>(null);
  const [simulationStates, setSimulationStates] = useState<Process[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [simulationTimer, setSimulationTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  // Generate intermediate states for visualization
  const generateIntermediateStates = (
    finalResults: Process[],
    totalTime: number
  ) => {
    // Create a snapshot for each time unit
    const snapshots: Record<number, Process[]> = {};

    // Initialize with all processes in waiting state at time 0
    snapshots[0] = finalResults.map((proc) => ({
      ...proc,
      state: proc.arrival_time === 0 ? "ready" : "waiting",
      queue: proc.arrival_time === 0 ? 0 : undefined,
      remaining_cpu: proc.burst_time,
      remaining_io: proc.io_burst,
    }));

    // Create intermediate states (simplified simulation)
    for (let t = 1; t <= totalTime; t++) {
      // Copy previous state
      snapshots[t] = snapshots[t - 1].map((proc) => ({ ...proc }));

      // Update process states based on simulation rules
      const currentProcs = snapshots[t];

      // Process arrivals
      currentProcs.forEach((proc) => {
        if (proc.arrival_time === t) {
          proc.state = "ready";
          proc.queue = 0;
        }
      });

      // Find running process
      const runningProc = currentProcs.find((p) => p.state === "running");

      // If no process is running, select one from ready queue
      if (!runningProc) {
        const readyProcs = currentProcs
          .filter((p) => p.state === "ready")
          .sort((a, b) => (a.queue || 0) - (b.queue || 0));

        if (readyProcs.length > 0) {
          readyProcs[0].state = "running";
        }
      } else {
        // Running process completes CPU burst
        if ((runningProc.remaining_cpu || 0) <= 1) {
          if ((runningProc.remaining_io || 0) > 0) {
            runningProc.state = "io";
            runningProc.remaining_cpu = runningProc.burst_time;
          } else {
            runningProc.state = "finished";
            runningProc.finish = t;
          }
        } else {
          runningProc.remaining_cpu = (runningProc.remaining_cpu || 0) - 1;
        }
      }

      // Process I/O completions
      currentProcs.forEach((proc) => {
        if (proc.state === "io") {
          if ((proc.remaining_io || 0) <= 1) {
            proc.state = "ready";
            proc.queue = Math.min((proc.queue || 0) + 1, 3); // Move to lower priority queue
            proc.remaining_io = proc.io_burst;
          } else {
            proc.remaining_io = (proc.remaining_io || 0) - 1;
          }
        }
      });
    }

    // Convert snapshots to array
    return Object.entries(snapshots).map(([time, processes]) => ({
      time: parseInt(time),
      processes: [...processes],
    }));
  };

  // Effect to simulate execution steps
  useEffect(() => {
    if (isRunning && results) {
      // Clear any existing timer
      if (simulationTimer) clearInterval(simulationTimer);

      // Reset current time
      setCurrentTime(0);

      // Generate intermediate simulation states
      const states = generateIntermediateStates(results, totalTime);
      setSimulationStates(states[0]?.processes || []);

      // Set up timer to show intermediate states
      const timer = setInterval(() => {
        setCurrentTime((prevTime) => {
          const nextTime = prevTime + 1;
          // Stop the timer when we reach the total time
          if (nextTime >= totalTime) {
            clearInterval(timer);
            setIsRunning(false);
            return totalTime;
          }

          // Update simulation state to match current time
          const stateForTime = states.find((s) => s.time === nextTime);
          if (stateForTime) {
            setSimulationStates(stateForTime.processes);
          }

          return nextTime;
        });
      }, 300); // Adjust speed as needed

      setSimulationTimer(timer);

      return () => {
        if (timer) clearInterval(timer);
      };
    }
  }, [isRunning, results, totalTime]);

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
      setIsRunning(false);
    } finally {
      setLoading(false);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    if (simulationTimer) {
      clearInterval(simulationTimer);
      setSimulationTimer(null);
    }
    toast.info("Simulation Stopped", {
      description: "The simulation has been stopped.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-950">
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Multi-Level Feedback Queue
          </h1>
          <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
            Simulation & Visualization
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Experience real-time MLFQ scheduling with interactive process management, 
            detailed analytics, and beautiful visualizations
          </p>
        </div>

        <div className="grid gap-8">
          <ProcessForm onSubmit={handleAddProcess} />

          <SimulationControls
            onStart={handleStart}
            onStop={handleStop}
            isRunning={isRunning}
          />

          {loading && (
            <div className="flex justify-center items-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-blue-200 dark:border-blue-800">
              <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin mb-4 text-blue-600 mx-auto" />
                <p className="text-lg font-medium text-blue-700 dark:text-blue-300">
                  Running simulation...
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Processing your tasks through MLFQ scheduler
                </p>
              </div>
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle className="text-red-800 dark:text-red-200">
                Simulation Error
              </AlertTitle>
              <AlertDescription className="text-red-700 dark:text-red-300">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Process Monitor with visualization states */}
          {isRunning && simulationStates.length > 0 && (
            <ProcessMonitor
              processes={simulationStates}
              currentTime={currentTime}
              totalTime={totalTime}
              isRunning={isRunning}
            />
          )}

          <ProcessTable processes={processes} />

          {results && <ResultsDisplay results={results} totalTime={totalTime} />}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Built with Next.js, React, and Tailwind CSS • 
            <span className="text-blue-600 dark:text-blue-400 ml-1">MLFQ Scheduler Visualization</span>
          </p>
        </div>

        <Toaster richColors position="top-center" />
      </div>
    </div>
  );
}