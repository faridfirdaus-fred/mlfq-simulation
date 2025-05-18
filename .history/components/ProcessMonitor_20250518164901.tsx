import React from "react";
import { Process } from "../app/api/utils/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Cpu,
  HardDrive,
  Timer,
  Clock,
  CheckSquare,
  Layers,
  ArrowDownUp,
} from "lucide-react";
import { motion } from "framer-motion";

interface ProcessMonitorProps {
  processes: Process[];
  currentTime: number;
  totalTime: number;
  isRunning: boolean;
}

const ProcessMonitor: React.FC<ProcessMonitorProps> = ({
  processes,
  currentTime,
  totalTime,
  isRunning,
}) => {
  if (!processes.length) return null;

  // Group processes by their current state and queue
  const runningProcess = processes.find((p) => p.state === "running");
  const ioProcesses = processes.filter((p) => p.state === "io");
  const finishedProcesses = processes.filter((p) => p.state === "finished");

  // Group by queue levels
  const queueProcesses = [
    processes.filter((p) => p.state === "ready" && p.queue === 0),
    processes.filter((p) => p.state === "ready" && p.queue === 1),
    processes.filter((p) => p.state === "ready" && p.queue === 2),
    processes.filter((p) => p.state === "ready" && p.queue === 3),
  ];

  // Calculate progress
  const progress = (currentTime / totalTime) * 100;

  return (
    <Card className="border-gray-100 dark:border-gray-700">
      <CardHeader className="border-b border-gray-100 dark:border-gray-700">
        <motion.div
          className="flex justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <CardTitle className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Layers className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              MLFQ Process Monitor
            </CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400">
              Real-time visualization of the scheduling simulation
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="font-mono text-gray-600 dark:text-gray-400">
                Time: {currentTime}
              </span>
            </div>
            <Badge
              variant="outline"
              className="border-gray-200 text-gray-600 dark:border-gray-600 dark:text-gray-300"
            >
              {isRunning ? "Running" : "Paused"}
            </Badge>
          </div>
        </motion.div>
      </CardHeader>

      <CardContent className="space-y-6 pt-4">
        {/* Progress Bar */}
        <motion.div
          className="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div
            className="bg-gray-400 dark:bg-gray-500 h-full"
            style={{ width: `${progress}%` }}
          ></div>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-3 text-sm"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Badge
            variant="outline"
            className="flex items-center gap-1 border-gray-200 text-gray-600 dark:border-gray-600 dark:text-gray-300"
          >
            <Timer className="h-3 w-3" />
            Elapsed: {currentTime} units
          </Badge>
          <Badge
            variant="outline"
            className="flex items-center gap-1 border-gray-200 text-gray-600 dark:border-gray-600 dark:text-gray-300"
          >
            <CheckSquare className="h-3 w-3" />
            Completed: {finishedProcesses.length}/{processes.length}
          </Badge>
        </motion.div>

        {/* Main Monitor Grid */}
        <motion.div
          className="grid md:grid-cols-5 gap-4"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* CPU Section */}
          <Card className="col-span-2 border-gray-100 dark:border-gray-700">
            <CardHeader className="bg-gray-50 dark:bg-gray-800 py-2 border-b border-gray-100 dark:border-gray-700">
              <CardTitle className="text-base flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Cpu className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                CPU
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {runningProcess ? (
                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded-md border border-gray-200 dark:border-gray-700">
                  <div>
                    <div className="font-medium text-gray-700 dark:text-gray-300">
                      {runningProcess.pid}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Queue: {runningProcess.queue} | Burst:{" "}
                      {runningProcess.burst_time}
                    </div>
                  </div>
                  <Badge className="bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                    Running
                  </Badge>
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500 dark:text-gray-400 italic">
                  No process currently running
                </div>
              )}
            </CardContent>
          </Card>

          {/* I/O Section */}
          <Card className="col-span-3 border-gray-100 dark:border-gray-700">
            <CardHeader className="bg-gray-50 dark:bg-gray-800 py-2 border-b border-gray-100 dark:border-gray-700">
              <CardTitle className="text-base flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <HardDrive className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                I/O Waiting ({ioProcesses.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {ioProcesses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {ioProcesses.map((proc) => (
                    <div
                      key={proc.pid}
                      className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded-md border border-gray-200 dark:border-gray-700"
                    >
                      <div>
                        <div className="font-medium text-gray-700 dark:text-gray-300">
                          {proc.pid}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          I/O time left: {proc.remaining_io || "?"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500 dark:text-gray-400 italic">
                  No processes in I/O
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* MLFQ Queues */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <ArrowDownUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            MLFQ Queues
          </h3>

          {queueProcesses.map((queueProcs, index) => (
            <Card
              key={index}
              className={`border-gray-100 dark:border-gray-700 ${
                index === 0 ? "bg-gray-50 dark:bg-gray-800" : ""
              }`}
            >
              <CardHeader className="py-2 border-b border-gray-100 dark:border-gray-700">
                <CardTitle className="text-sm flex items-center justify-between text-gray-700 dark:text-gray-300">
                  <span>
                    Queue {index} {index === 0 ? "(Highest Priority)" : ""}
                  </span>
                  <Badge
                    variant="outline"
                    className="border-gray-200 text-gray-600 dark:border-gray-600 dark:text-gray-300"
                  >
                    {queueProcs.length} processes
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                {queueProcs.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {queueProcs.map((proc) => (
                      <Badge
                        key={proc.pid}
                        variant="outline"
                        className="py-1 px-3 bg-gray-100 border-gray-200 text-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                      >
                        {proc.pid}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-2 text-gray-500 dark:text-gray-400 text-sm italic">
                    Queue empty
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Legend */}
        <motion.div
          className="text-xs text-gray-500 dark:text-gray-400 pt-2 flex flex-wrap gap-x-4 gap-y-2 border-t border-gray-100 dark:border-gray-700"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-200 dark:bg-gray-600 rounded-sm"></div>
            <span>Highest Priority Queue</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-300 dark:bg-gray-500 rounded-sm"></div>
            <span>Running Process</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-100 dark:bg-gray-700 rounded-sm border border-gray-200 dark:border-gray-600"></div>
            <span>I/O Process</span>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ProcessMonitor;
