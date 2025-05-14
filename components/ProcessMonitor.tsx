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
  Zap,
} from "lucide-react";

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
    <Card className="mt-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20"></div>
      <CardHeader className="relative">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl text-blue-700 dark:text-blue-300">
              <Layers className="h-6 w-6" />
              MLFQ Process Monitor
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Real-time visualization of the scheduling simulation
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="font-mono text-xl font-bold text-blue-700 dark:text-blue-300">
                Time: {currentTime}
              </span>
            </div>
            <Badge 
              variant={isRunning ? "default" : "outline"}
              className={isRunning 
                ? "bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200 animate-pulse-gentle" 
                : "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-900 dark:text-gray-200"
              }
            >
              {isRunning ? (
                <>
                  <Zap className="h-3 w-3 mr-1" />
                  Running
                </>
              ) : (
                "Paused"
              )}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 relative">
        {/* Progress Bar with gradient */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>Progress</span>
            <span>{progress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden dark:bg-gray-700">
            <div
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <Badge variant="outline" className="flex items-center gap-1 bg-blue-50 dark:bg-blue-950/50">
            <Timer className="h-3 w-3 text-blue-600" />
            Elapsed: {currentTime} units
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1 bg-purple-50 dark:bg-purple-950/50">
            <CheckSquare className="h-3 w-3 text-purple-600" />
            Completed: {finishedProcesses.length}/{processes.length}
          </Badge>
        </div>

        {/* Main Monitor Grid */}
        <div className="grid md:grid-cols-5 gap-4">
          {/* CPU Section */}
          <Card className="col-span-2 border-green-200 dark:border-green-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30"></div>
            <CardHeader className="bg-green-100/50 dark:bg-green-900/30 py-3 relative">
              <CardTitle className="text-lg flex items-center gap-2 text-green-700 dark:text-green-300">
                <Cpu className="h-5 w-5" />
                CPU Core
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 relative">
              {runningProcess ? (
                <div className="bg-green-100 dark:bg-green-900/50 p-4 rounded-lg border-2 border-green-300 dark:border-green-600 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-lg text-green-800 dark:text-green-200">
                        {runningProcess.pid}
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-400 space-y-1">
                        <div>Queue: {runningProcess.queue}</div>
                        <div>Burst: {runningProcess.burst_time}</div>
                        <div>Remaining: {runningProcess.remaining_cpu || '?'}</div>
                      </div>
                    </div>
                    <Badge className="bg-green-200 text-green-800 border-green-400 dark:bg-green-800 dark:text-green-200 px-3 py-1">
                      <Zap className="h-3 w-3 mr-1" />
                      Running
                    </Badge>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400 italic">
                  <Cpu className="h-12 w-12 mx-auto mb-2 opacity-30" />
                  CPU Idle
                </div>
              )}
            </CardContent>
          </Card>

          {/* I/O Section */}
          <Card className="col-span-3 border-orange-200 dark:border-orange-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30"></div>
            <CardHeader className="bg-orange-100/50 dark:bg-orange-900/30 py-3 relative">
              <CardTitle className="text-lg flex items-center gap-2 text-orange-700 dark:text-orange-300">
                <HardDrive className="h-5 w-5" />
                I/O Operations ({ioProcesses.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 relative">
              {ioProcesses.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {ioProcesses.map((proc) => (
                    <div
                      key={proc.pid}
                      className="bg-orange-100 dark:bg-orange-900/50 p-3 rounded-lg border border-orange-300 dark:border-orange-600 shadow-md"
                    >
                      <div className="font-bold text-orange-800 dark:text-orange-200">
                        {proc.pid}
                      </div>
                      <div className="text-xs text-orange-600 dark:text-orange-400 space-y-1">
                        <div>I/O Left: {proc.remaining_io || "?"}</div>
                        <div>Queue: {proc.queue}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400 italic">
                  <HardDrive className="h-12 w-12 mx-auto mb-2 opacity-30" />
                  No I/O operations
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* MLFQ Queues */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
            <ArrowDownUp className="h-5 w-5" />
            MLFQ Queue Levels
          </h3>

          {queueProcesses.map((queueProcs, index) => {
            const queueColors = [
              "border-indigo-200 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-950/30",
              "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30", 
              "border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/30",
              "border-pink-200 bg-pink-50 dark:border-pink-800 dark:bg-pink-950/30"
            ];
            
            const textColors = [
              "text-indigo-700 dark:text-indigo-300",
              "text-blue-700 dark:text-blue-300",
              "text-purple-700 dark:text-purple-300", 
              "text-pink-700 dark:text-pink-300"
            ];

            return (
              <Card
                key={index}
                className={`${queueColors[index]} relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/5"></div>
                <CardHeader className="py-3 relative">
                  <CardTitle className={`text-lg flex items-center justify-between ${textColors[index]}`}>
                    <span className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${
                        index === 0 ? 'from-indigo-500 to-blue-500' :
                        index === 1 ? 'from-blue-500 to-purple-500' :
                        index === 2 ? 'from-purple-500 to-pink-500' :
                        'from-pink-500 to-rose-500'
                      }`}></span>
                      Queue {index} {index === 0 ? "(Highest Priority)" : `(Priority ${index})`}
                    </span>
                    <Badge 
                      variant="outline" 
                      className={`${
                        index === 0 ? 'border-indigo-300 text-indigo-700 dark:border-indigo-600 dark:text-indigo-300' :
                        index === 1 ? 'border-blue-300 text-blue-700 dark:border-blue-600 dark:text-blue-300' :
                        index === 2 ? 'border-purple-300 text-purple-700 dark:border-purple-600 dark:text-purple-300' :
                        'border-pink-300 text-pink-700 dark:border-pink-600 dark:text-pink-300'
                      }`}
                    >
                      {queueProcs.length} processes
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 relative">
                  {queueProcs.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {queueProcs.map((proc) => (
                        <Badge
                          key={proc.pid}
                          variant="secondary"
                          className={`py-2 px-4 text-sm font-medium ${
                            index === 0 ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' :
                            index === 1 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                            index === 2 ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                            'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
                          }`}
                        >
                          {proc.pid}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm italic">
                      Queue is empty
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Legend */}
        <Card className="bg-gray-50 dark:bg-gray-900/50 border-dashed">
          <CardContent className="p-4">
            <h4 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">Legend</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-sm"></div>
                <span className="text-gray-600 dark:text-gray-400">Queue 0 (Highest Priority)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-sm"></div>
                <span className="text-gray-600 dark:text-gray-400">Running Process</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-sm"></div>
                <span className="text-gray-600 dark:text-gray-400">I/O Operations</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-sm"></div>
                <span className="text-gray-600 dark:text-gray-400">Finished Processes</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default ProcessMonitor;