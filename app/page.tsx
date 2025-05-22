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
      toast.error("ID Proses sudah digunakan", {
        description: `ID Proses "${process.pid}" sudah digunakan. Silakan pilih ID yang berbeda.`,
      });
      return;
    }

    setProcesses([...processes, process]);
    toast.success("Proses berhasil ditambahkan", {
      description: `Proses ${process.pid} telah ditambahkan ke simulasi.`,
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
    toast.info(`Proses ${pid} dihapus`);
    setIsSimulated(false);
  };

  const handleStartSimulation = async () => {
    if (processes.length === 0) {
      toast.error("Tidak ada proses untuk disimulasikan", {
        description:
          "Silakan tambahkan setidaknya satu proses sebelum menjalankan simulasi.",
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    const toastId = toast.loading("Menjalankan simulasi...", {
      id: "simulation",
    });

    try {
      console.log("Running simulation with:", { processes, config }); // Debug
      const result = await fetchSimulationResults(processes, config);
      setResults(result.processes);
      setTotalTime(result.total_time);
      setIsSimulated(true);
      toast.success("Simulasi berhasil diselesaikan", {
        id: toastId,
        description: `Total waktu simulasi: ${result.total_time} unit`,
      });
    } catch (err) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat menjalankan simulasi";
      setError(errorMsg);
      toast.error("Simulasi gagal", {
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
    toast.info("Semua data dibersihkan");
  };

  return (
    <main className="container mx-auto py-8 max-w-7xl">
      <Toaster />
      {/* Header dengan gradient */}
      <div className="text-center mb-8 p-6 rounded-xl bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-green-900/20 border border-blue-100 dark:border-blue-800">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent mb-3">
          Simulasi Penjadwalan Multi-Level Feedback Queue
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Visualisasi interaktif algoritma penjadwalan MLFQ untuk sistem operasi
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6 border-red-200 bg-red-50 dark:bg-red-900/20">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Kesalahan</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Configuration Form */}
        <div className="transform hover:scale-[1.02] transition-transform duration-200">
          <ConfigForm
            onSubmit={handleUpdateConfig}
            defaultValues={DEFAULT_CONFIG}
            isSimulationRunning={isLoading}
          />
        </div>

        {/* Process Form */}
        <div className="transform hover:scale-[1.02] transition-transform duration-200">
          <ProcessForm onSubmit={handleAddProcess} />
        </div>
      </div>

      {/* Process Table */}
      {processes.length > 0 && (
        <div className="mb-8 transform hover:scale-[1.01] transition-transform duration-200">
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
        <div className="transform hover:scale-[1.005] transition-transform duration-300">
          <ResultsDisplay results={results} totalTime={totalTime} />
        </div>
      )}
    </main>
  );
}