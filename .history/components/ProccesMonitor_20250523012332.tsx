"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
// Sesuaikan path import untuk types dan constants Anda
import {
  Process as ProcessDetailProps,
  SimulationConfig,
} from "../app/api/utils/types";
// Define missing constants
const QUEUE_COLORS = [
  {
    border: "border-blue-300",
    bgLight: "bg-blue-50",
    bgDark: "bg-blue-900/30",
    textLight: "text-blue-700",
    textDark: "text-blue-300",
    badgeBg: "bg-blue-500",
    badgeText: "text-white",
    badgeBgDark: "bg-blue-700",
    badgeTextDark: "text-blue-100",
  },
  {
    border: "border-green-300",
    bgLight: "bg-green-50",
    bgDark: "bg-green-900/30",
    textLight: "text-green-700",
    textDark: "text-green-300",
    badgeBg: "bg-green-500",
    badgeText: "text-white",
    badgeBgDark: "bg-green-700",
    badgeTextDark: "text-green-100",
  },
  {
    border: "border-purple-300",
    bgLight: "bg-purple-50",
    bgDark: "bg-purple-900/30",
    textLight: "text-purple-700",
    textDark: "text-purple-300",
    badgeBg: "bg-purple-500",
    badgeText: "text-white",
    badgeBgDark: "bg-purple-700",
    badgeTextDark: "text-purple-100",
  },
  {
    border: "border-orange-300",
    bgLight: "bg-orange-50",
    bgDark: "bg-orange-900/30",
    textLight: "text-orange-700",
    textDark: "text-orange-300",
    badgeBg: "bg-orange-500",
    badgeText: "text-white",
    badgeBgDark: "bg-orange-700",
    badgeTextDark: "text-orange-100",
  },
];

const DEFAULT_CONFIG = {
  num_queues: 4,
  time_slice: [1, 2, 4, 8],
  boost_time: 20,
};

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Cpu,
  HardDrive,
  Timer,
  Clock,
  Layers,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Info,
  ListChecks,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

// Tipe data ProcessDetail yang diterima dari backend (hasil akhir)
// Pastikan ini sesuai dengan output `to_dict()` di process.py Anda
interface ProcessReplayDetail
  extends Omit<ProcessDetailProps, "execution_log"> {
  original_io_time: number;
  execution_log?: Array<{ start_time: number; end_time: number }>;
  remaining_time?: number; // Add this property to match usage
}

interface ProcessMonitorProps {
  processes: ProcessReplayDetail[] | null; // Hasil akhir proses dari backend
  totalSimulationTime: number | null; // Total waktu simulasi dari backend
  activeConfig?: SimulationConfig | null; // Konfigurasi yang digunakan
}

const ProcessMonitor: React.FC<ProcessMonitorProps> = ({
  processes: finalProcesses, // Ubah nama prop agar lebih jelas
  totalSimulationTime,
  activeConfig,
}) => {
  const [replayTime, setReplayTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed] = useState(750); // ms per step replay

  // Event points adalah titik-titik waktu penting (arrival, start_run, end_run, finish)
  const eventPoints = useMemo(() => {
    if (
      !finalProcesses ||
      finalProcesses.length === 0 ||
      totalSimulationTime === null
    )
      return [0];
    const points = new Set<number>([0]); // Mulai dari waktu 0
    finalProcesses.forEach((p) => {
      if (typeof p.arrival_time === "number") {
        points.add(p.arrival_time);
      }
      if (p.execution_log && Array.isArray(p.execution_log)) {
        p.execution_log.forEach((log) => {
          points.add(log.start_time);
          points.add(log.end_time);
        });
      }
      if (p.finish_time !== undefined && p.finish_time !== null) {
        points.add(p.finish_time);
      }
    });
    points.add(totalSimulationTime); // Akhir simulasi
    return Array.from(points)
      .sort((a, b) => a - b)
      .filter((t) => t <= totalSimulationTime);
  }, [finalProcesses, totalSimulationTime]);

  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  // Update replayTime berdasarkan currentEventIndex
  useEffect(() => {
    if (eventPoints.length > 0 && currentEventIndex < eventPoints.length) {
      setReplayTime(eventPoints[currentEventIndex]);
    }
  }, [currentEventIndex, eventPoints]);

  // Reset saat data proses berubah
  useEffect(() => {
    setCurrentEventIndex(0);
    setReplayTime(0);
    setIsPlaying(false);
  }, [finalProcesses]);

  // Efek untuk auto-playback
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (
      isPlaying &&
      eventPoints.length > 0 &&
      currentEventIndex < eventPoints.length - 1
    ) {
      intervalId = setInterval(() => {
        setCurrentEventIndex((prevIndex) => {
          if (prevIndex < eventPoints.length - 1) {
            return prevIndex + 1;
          }
          setIsPlaying(false); // Stop di akhir
          return prevIndex;
        });
      }, playbackSpeed);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, currentEventIndex, eventPoints, playbackSpeed]);

  const numQueuesFromConfig =
    activeConfig?.num_queues || DEFAULT_CONFIG.num_queues;

  // Fungsi untuk menentukan status proses pada replayTime saat ini
  const getProcessStatusAtReplayTime = useCallback(
    (
      process: ProcessReplayDetail,
      currentTime: number
    ): {
      state: "running" | "ready" | "blocked" | "finished" | "new" | "unknown";
      currentQueue?: number;
      ioRemaining?: number;
      cpuRemaining?: number;
    } => {
      if (currentTime < process.arrival_time) return { state: "new" };

      // Cek apakah sedang berjalan di CPU
      if (process.execution_log && Array.isArray(process.execution_log)) {
        for (const log of process.execution_log) {
          if (currentTime >= log.start_time && currentTime < log.end_time) {
            // Hitung sisa CPU burst pada titik ini (estimasi)
            let executedBeforeThisSlice = 0;
            process.execution_log.forEach((prevLog) => {
              if (prevLog.end_time <= log.start_time) {
                executedBeforeThisSlice +=
                  prevLog.end_time - prevLog.start_time;
              }
            });
            const executedInCurrentSlice = currentTime - log.start_time;
            const totalExecuted =
              executedBeforeThisSlice + executedInCurrentSlice;

            return {
              state: "running",
              currentQueue: process.queue,
              cpuRemaining: Math.max(0, process.burst_time - totalExecuted),
            };
          }
        }
      }

      // Cek apakah sudah selesai
      if (
        process.finish_time !== undefined &&
        process.finish_time !== null &&
        currentTime >= process.finish_time
      ) {
        return { state: "finished", currentQueue: process.queue };
      }

      // Cek apakah sedang I/O (ini adalah inferensi dan mungkin tidak akurat tanpa data I/O trace)
      // Kita asumsikan I/O terjadi setelah semua CPU burst jika original_io_time > 0
      // dan sebelum finish_time. Ini sangat disederhanakan.
      if (
        process.original_io_time > 0 &&
        process.state === "blocked" &&
        process.finish_time !== undefined &&
        process.finish_time !== null &&
        currentTime < process.finish_time
      ) {
        // Untuk replay, kita tidak tahu pasti kapan I/O dimulai/selesai tanpa trace.
        // Kita bisa cek apakah ada gap di execution_log setelah semua CPU burst (jika model I/O nya begitu)
        // Untuk saat ini, kita tandai sebagai 'blocked' jika status akhirnya 'blocked' dan belum 'finished'
        // Atau jika original_io_time > 0 dan proses tidak running & belum finished
        if (
          process.burst_time === (process.cpu_bursts_completed || 0) &&
          process.io_bursts_completed === 0
        ) {
          // Estimasi sisa I/O jika I/O dimulai setelah semua CPU
          let lastCpuEndTime = 0;
          if (
            process.execution_log &&
            Array.isArray(process.execution_log) &&
            process.execution_log.length > 0
          ) {
            lastCpuEndTime =
              process.execution_log[process.execution_log.length - 1].end_time;
          }
          if (currentTime > lastCpuEndTime) {
            const ioTimeElapsed = currentTime - lastCpuEndTime;
            return {
              state: "blocked",
              ioRemaining: Math.max(
                0,
                process.original_io_time - ioTimeElapsed
              ),
              currentQueue: process.queue,
            };
          }
        }
      }

      // Jika tidak running, tidak finished, tidak new, maka ready
      return {
        state: "ready",
        currentQueue: process.queue,
        cpuRemaining: process.remaining_time,
      };
    },
    []
  );

  // Memoized data untuk tampilan pada replayTime saat ini
  const displayData = useMemo(() => {
    if (!finalProcesses) return null;

    let runningPID: string | null = null;
    const readyProcessesByQueue: { [key: number]: ProcessReplayDetail[] } = {};
    for (let i = 0; i < numQueuesFromConfig; i++) readyProcessesByQueue[i] = [];
    const ioQueueProcesses: ProcessReplayDetail[] = [];
    const finishedPIDs: string[] = [];
    const newPIDs: string[] = [];

    finalProcesses.forEach((p) => {
      const statusInfo = getProcessStatusAtReplayTime(p, replayTime);
      p.state = statusInfo.state; // Update state sementara untuk tampilan
      p.queue =
        statusInfo.currentQueue !== undefined
          ? statusInfo.currentQueue
          : p.queue; // Update queue sementara
      p.remaining_time =
        statusInfo.cpuRemaining !== undefined
          ? statusInfo.cpuRemaining
          : p.remaining_time;
      p.remaining_io_time =
        statusInfo.ioRemaining !== undefined
          ? statusInfo.ioRemaining
          : p.remaining_io_time;

      if (statusInfo.state === "running") {
        runningPID = p.pid;
      } else if (statusInfo.state === "ready") {
        if (
          p.queue !== undefined &&
          p.queue >= 0 &&
          p.queue < numQueuesFromConfig
        ) {
          readyProcessesByQueue[p.queue].push(p);
        } else {
          // Jika queue tidak valid, masukkan ke Q0 sebagai fallback
          readyProcessesByQueue[0].push(p);
        }
      } else if (statusInfo.state === "blocked") {
        ioQueueProcesses.push(p);
      } else if (statusInfo.state === "finished") {
        finishedPIDs.push(p.pid);
      } else if (statusInfo.state === "new") {
        newPIDs.push(p.pid);
      }
    });

    return {
      currentTime: replayTime,
      runningProcess: finalProcesses.find((p) => p.pid === runningPID),
      readyQueues: readyProcessesByQueue,
      ioProcesses: ioQueueProcesses,
      finishedCount: finishedPIDs.length,
      totalProcesses: finalProcesses.length,
      eventLog: `Menampilkan status pada waktu ${replayTime}. Proses ${
        runningPID || "CPU Idle"
      } berjalan.`, // Event log sederhana
    };
  }, [
    finalProcesses,
    replayTime,
    getProcessStatusAtReplayTime,
    numQueuesFromConfig,
  ]);

  if (
    !finalProcesses ||
    finalProcesses.length === 0 ||
    totalSimulationTime === null
  ) {
    return (
      <Card className="border-gray-200 dark:border-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Layers className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            MLFQ Process Monitor
          </CardTitle>
        </CardHeader>
        <CardContent className="py-12 text-center text-gray-500 dark:text-gray-400">
          <Info className="mx-auto h-10 w-10 mb-2 text-gray-400" />
          No simulation data available to display.
          <br />
          Please run a simulation to activate the monitor.
        </CardContent>
      </Card>
    );
  }

  if (!displayData) {
    return (
      <Card>
        <CardContent>Loading display data...</CardContent>
      </Card>
    );
  }

  const {
    currentTime: currentDisplayTime, // Ganti nama agar tidak konflik dengan prop
    runningProcess,
    readyQueues,
    ioProcesses,
    eventLog,
  } = displayData;

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (
        currentEventIndex >= eventPoints.length - 1 &&
        eventPoints.length > 0
      ) {
        setCurrentEventIndex(0); // Mulai ulang jika di akhir
      }
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    setIsPlaying(false);
    if (currentEventIndex < eventPoints.length - 1) {
      setCurrentEventIndex(currentEventIndex + 1);
    }
  };

  const handlePrev = () => {
    setIsPlaying(false);
    if (currentEventIndex > 0) {
      setCurrentEventIndex(currentEventIndex - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentEventIndex(0);
  };

  const handleSliderChange = (value: number[]) => {
    setIsPlaying(false);
    // value[0] adalah indeks event point, bukan waktu langsung
    setCurrentEventIndex(value[0]);
  };

  const getProcessBadgeColor = (processState: string | undefined) => {
    switch (processState) {
      case "running":
        return "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200";
      case "ready":
        return "bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-200";
      case "blocked":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200";
      case "finished":
        return "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300";
      default:
        return "bg-purple-100 text-purple-800 dark:bg-purple-700 dark:text-purple-200"; // Untuk NEW atau lainnya
    }
  };

  return (
    <Card className="border-gray-200 dark:border-gray-700 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 to-indigo-500"></div>
      <CardHeader className="border-b border-gray-200 dark:border-gray-700 pb-3 pt-4">
        <motion.div
          className="flex flex-col sm:flex-row justify-between sm:items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div>
            <CardTitle className="flex items-center gap-2 text-lg text-gray-800 dark:text-gray-200">
              <Timer className="h-5 w-5 text-sky-600 dark:text-sky-400" />
              MLFQ Process Monitor (Replay)
            </CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              Visualisasi replay berdasarkan hasil akhir simulasi.
            </CardDescription>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1.5 p-1.5 px-2 bg-gray-100 dark:bg-gray-700/50 rounded-md">
              <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="font-mono text-gray-700 dark:text-gray-300">
                Replay Time:{" "}
                <span className="font-bold">{currentDisplayTime}</span> /{" "}
                {totalSimulationTime}
              </span>
            </div>
            <Badge
              variant={isPlaying ? "default" : "secondary"}
              className={`transition-colors ${
                isPlaying ? "bg-green-500 text-white" : "dark:bg-gray-600"
              }`}
            >
              {isPlaying
                ? "Playing"
                : currentEventIndex === eventPoints.length - 1 &&
                  eventPoints.length > 0
                ? "Finished"
                : "Paused"}
            </Badge>
          </div>
        </motion.div>
      </CardHeader>

      <CardContent className="space-y-4 pt-4">
        {/* Playback Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={handleReset}
              title="Reset ke Awal"
              disabled={currentEventIndex === 0 && !isPlaying}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              title="Event Sebelumnya"
              disabled={currentEventIndex === 0}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              variant={isPlaying ? "destructive" : "default"}
              size="icon"
              onClick={handlePlayPause}
              title={isPlaying ? "Jeda" : "Putar"}
              className="w-10 h-10"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              title="Event Berikutnya"
              disabled={currentEventIndex === eventPoints.length - 1}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-grow w-full sm:w-auto mx-2">
            <Slider
              min={0}
              max={eventPoints.length > 0 ? eventPoints.length - 1 : 0} // Slider berdasarkan indeks event
              step={1}
              value={[currentEventIndex]}
              onValueChange={handleSliderChange}
              className="w-full"
              title={`Event ke-${
                currentEventIndex + 1
              } pada waktu ${currentDisplayTime}`}
            />
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 w-24 text-center whitespace-nowrap">
            Event {currentEventIndex + 1} / {eventPoints.length}
          </div>
        </div>

        {/* Event Log Display Sederhana */}
        <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/30 rounded-md border border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 text-xs min-h-[40px] flex items-center">
          <ListChecks className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="font-medium">
            Status pada t={currentDisplayTime}:
          </span>
          &nbsp;{eventLog}
        </div>

        {/* Main Monitor Grid: CPU and I/O */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader className="bg-gray-100 dark:bg-gray-800 py-2 px-3 border-b border-gray-200 dark:border-gray-700">
              <CardTitle className="text-sm flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                <Cpu className="h-4 w-4 text-green-600 dark:text-green-400" />
                CPU
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 min-h-[70px] flex items-center justify-center">
              {runningProcess ? (
                <motion.div
                  key={`cpu-${runningProcess.pid}-${currentDisplayTime}`}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-full flex flex-col items-center gap-1 bg-green-50 dark:bg-green-900/40 p-2 rounded-md border border-green-200 dark:border-green-600"
                >
                  <Badge className="bg-green-600 text-white dark:bg-green-500 dark:text-gray-900 text-base px-3 py-1">
                    {runningProcess.pid}
                  </Badge>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Di Q{runningProcess.queue} | CPU Sisa:{" "}
                    {runningProcess.remaining_time}
                  </div>
                </motion.div>
              ) : (
                <div className="text-center text-xs text-gray-500 dark:text-gray-400 italic">
                  CPU Idle
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader className="bg-gray-100 dark:bg-gray-800 py-2 px-3 border-b border-gray-200 dark:border-gray-700">
              <CardTitle className="text-sm flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                <HardDrive className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                Proses I/O ({ioProcesses.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 min-h-[70px]">
              {ioProcesses.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <AnimatePresence>
                    {ioProcesses.map((proc) => (
                      <motion.div
                        key={`io-${proc.pid}`}
                        layout
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="flex flex-col items-center bg-yellow-50 dark:bg-yellow-900/40 p-1.5 rounded-md border border-yellow-200 dark:border-yellow-600"
                      >
                        <Badge
                          variant="outline"
                          className="border-yellow-600 text-yellow-700 dark:border-yellow-500 dark:text-yellow-300 text-sm"
                        >
                          {proc.pid}
                        </Badge>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          I/O Sisa: {proc.remaining_io_time}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="text-center text-xs py-3 text-gray-500 dark:text-gray-400 italic">
                  Tidak ada proses dalam I/O
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* MLFQ Ready Queues (Menampilkan proses yang 'ready' di queue finalnya) */}
        <div>
          <h3 className="text-md font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
            <Layers className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            Antrian Siap MLFQ (Status pada t={currentDisplayTime})
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {Array.from({ length: numQueuesFromConfig }).map(
              (_, queueIndex) => {
                const processesInThisQueue = readyQueues[queueIndex] || [];
                return (
                  <div
                    key={`queue-card-${queueIndex}`}
                    className={`p-2 rounded-md border ${
                      QUEUE_COLORS[queueIndex % QUEUE_COLORS.length].border
                    } ${
                      QUEUE_COLORS[queueIndex % QUEUE_COLORS.length].bgLight
                    } dark:${
                      QUEUE_COLORS[queueIndex % QUEUE_COLORS.length].bgDark
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <h4
                        className={`text-xs font-semibold ${
                          QUEUE_COLORS[queueIndex % QUEUE_COLORS.length]
                            .textLight
                        } dark:${
                          QUEUE_COLORS[queueIndex % QUEUE_COLORS.length]
                            .textDark
                        }`}
                      >
                        Antrian Siap {queueIndex}
                        {queueIndex === 0 && (
                          <span className="text-xs italic ml-1">
                            (Prioritas Tertinggi)
                          </span>
                        )}
                      </h4>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          QUEUE_COLORS[queueIndex % QUEUE_COLORS.length].border
                        } ${
                          QUEUE_COLORS[queueIndex % QUEUE_COLORS.length]
                            .textLight
                        } dark:${
                          QUEUE_COLORS[queueIndex % QUEUE_COLORS.length]
                            .textDark
                        } bg-white/50 dark:bg-black/20`}
                      >
                        {processesInThisQueue.length} proses
                      </Badge>
                    </div>
                    <div
                      className={`min-h-[30px] p-1.5 rounded bg-white/30 dark:bg-black/10 flex flex-wrap gap-1.5 ${
                        processesInThisQueue.length === 0
                          ? "items-center justify-center"
                          : ""
                      }`}
                    >
                      {processesInThisQueue.length > 0 ? (
                        <AnimatePresence>
                          {processesInThisQueue.map((proc) => (
                            <motion.div
                              key={`q-${queueIndex}-pid-${proc.pid}-${currentDisplayTime}`}
                              layout
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 25,
                              }}
                            >
                              <Badge
                                className={`py-0.5 px-1.5 text-xs shadow-sm ${
                                  QUEUE_COLORS[queueIndex % QUEUE_COLORS.length]
                                    .badgeBg
                                } ${
                                  QUEUE_COLORS[queueIndex % QUEUE_COLORS.length]
                                    .badgeText
                                } dark:${
                                  QUEUE_COLORS[queueIndex % QUEUE_COLORS.length]
                                    .badgeBgDark
                                } dark:${
                                  QUEUE_COLORS[queueIndex % QUEUE_COLORS.length]
                                    .badgeTextDark
                                }`}
                              >
                                {proc.pid}
                              </Badge>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      ) : (
                        <span className="text-xs italic text-gray-500 dark:text-gray-400">
                          Kosong
                        </span>
                      )}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
        {/* Daftar Semua Proses dan Statusnya pada replayTime */}
        <details className="mt-4">
          <summary className="text-sm font-medium text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-800 dark:hover:text-gray-200">
            Lihat Detail Semua Proses (pada t={currentDisplayTime})
          </summary>
          <ScrollArea className="h-[200px] mt-2 p-2 border rounded-md bg-gray-50 dark:bg-gray-800/50">
            <div className="space-y-1">
              {finalProcesses.map((p) => {
                // Dapatkan status yang dihitung untuk replayTime saat ini
                const currentStatusInfo = getProcessStatusAtReplayTime(
                  p,
                  currentDisplayTime
                );
                return (
                  <div
                    key={`detail-${p.pid}-${currentDisplayTime}`}
                    className={`text-xs p-1.5 rounded ${getProcessBadgeColor(
                      currentStatusInfo.state
                    )}`}
                  >
                    <strong>{p.pid}</strong>: Status=
                    <span className="font-semibold">
                      {currentStatusInfo.state}
                    </span>
                    , Q=
                    {currentStatusInfo.currentQueue !== undefined
                      ? currentStatusInfo.currentQueue
                      : p.queue}
                    , CPU Rem=
                    {currentStatusInfo.cpuRemaining !== undefined
                      ? currentStatusInfo.cpuRemaining
                      : p.remaining_time}
                    , I/O Rem=
                    {currentStatusInfo.ioRemaining !== undefined
                      ? currentStatusInfo.ioRemaining
                      : p.remaining_io_time}
                    (AT: {p.arrival_time}, Final FT: {p.finish_time ?? "-"})
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </details>
      </CardContent>
    </Card>
  );
};

export default ProcessMonitor;
