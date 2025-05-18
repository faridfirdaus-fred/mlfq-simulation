"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProcessForm from "../components/ProcessForm";
import ProcessTable from "../components/ProcessTable";
import ResultsDisplay from "../components/ResultsDisplay";
import SimulationControls from "../components/SimulationControls";
import ProcessMonitor from "../components/ProcessMonitor";
import { Process } from "./api/utils/types";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2, Cpu } from "lucide-react";

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.02, 1],
      transition: { repeat: Infinity, duration: 2 }
    },
  };

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
    <div className="container mx-auto py-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <motion.div 
          className="flex justify-center items-center gap-3"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 10 
          }}
        >
          <Cpu className="h-8 w-8 text-blue-500" />
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Multi-Level Feedback Queue Scheduler
          </h1>
        </motion.div>
        
        <motion.p 
          className="text-center text-gray-600 dark:text-gray-300 mt-2 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          An interactive visualization of the MLFQ CPU scheduling algorithm for process management
        </motion.p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-8"
      >
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "tween" }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-1" />
          <div className="p-6">
            <ProcessForm onSubmit={handleAddProcess} />
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
        >
          <div className="bg-gradient-to-r from-green-500 to-teal-500 p-1" />
          <div className="p-6">
            <SimulationControls
              onStart={handleStart}
              onStop={handleStop}
              isRunning={isRunning}
            />
          </div>
        </motion.div>

        <AnimatePresence>
          {loading && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 flex justify-center items-center"
            >
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "linear",
                }}
              >
                <Loader2 className="h-12 w-12 text-blue-500 mr-4" />
              </motion.div>
              <p className="text-lg font-medium">Running simulation...</p>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Alert variant="destructive" className="border-l-4 border-red-500">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Process Monitor with visualization states */}
        <AnimatePresence>
          {isRunning && simulationStates.length > 0 && (
            <motion.div
              key="process-monitor"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, scale: [1, 1.02, 1] }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                type: "spring", 
                damping: 15,
                scale: { repeat: Infinity, duration: 2 }
              }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-1" />
              <div className="p-4">
                <ProcessMonitor
                  processes={simulationStates}
                  currentTime={currentTime}
                  totalTime={totalTime}
                  isRunning={isRunning}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {processes.length > 0 && (
          <motion.div 
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-1" />
            <div className="p-6">
              <ProcessTable processes={processes} />
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {results && (
            <motion.div
              key="results-display"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-1" />
              <div className="p-6">
                <ResultsDisplay results={results} totalTime={totalTime} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <Toaster richColors position="top-center" />
    </div>
  );
}