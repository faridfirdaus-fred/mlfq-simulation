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
    <Card className="mt-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              MLFQ Process Monitor
            </CardTitle>
            <CardDescription>
              Real-time visualization of the scheduling simulation
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-mono">Time: {currentTime}</span>
            </div>
            <Badge variant={isRunning ? "default" : "outline"}>
              {isRunning ? "Running" : "Paused"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <Badge variant="outline" className="flex items-center gap-1">
            <Timer className="h-3 w-3" />
            Elapsed: {currentTime} units
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <CheckSquare className="h-3 w-3" />
            Completed: {finishedProcesses.length}/{processes.length}
          </Badge>
        </div>

        {/* Main Monitor Grid */}
        <div className="grid md:grid-cols-5 gap-4">
          {/* CPU Section */}
          <Card className="col-span-2 border-primary/20">
            <CardHeader className="bg-primary/5 py-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Cpu className="h-4 w-4" />
                CPU
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {runningProcess ? (
                <div className="flex items-center justify-between bg-secondary/10 p-3 rounded-md border border-secondary/20">
                  <div>
                    <div className="font-medium">{runningProcess.pid}</div>
                    <div className="text-xs text-muted-foreground">
                      Queue: {runningProcess.queue} | Burst:{" "}
                      {runningProcess.burst_time}
                    </div>
                  </div>
                  <Badge className="bg-secondary text-secondary-foreground">
                    Running
                  </Badge>
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground italic">
                  No process currently running
                </div>
              )}
            </CardContent>
          </Card>

          {/* I/O Section */}
          <Card className="col-span-3 border-secondary/20">
            <CardHeader className="bg-secondary/5 py-2">
              <CardTitle className="text-base flex items-center gap-2">
                <HardDrive className="h-4 w-4" />
                I/O Waiting ({ioProcesses.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {ioProcesses.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {ioProcesses.map((proc) => (
                    <div
                      key={proc.pid}
                      className="flex items-center justify-between bg-secondary/10 p-2 rounded-md border border-secondary/20"
                    >
                      <div>
                        <div className="font-medium">{proc.pid}</div>
                        <div className="text-xs text-muted-foreground">
                          I/O time left: {proc.remaining_io || "?"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground italic">
                  No processes in I/O
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* MLFQ Queues */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <ArrowDownUp className="h-4 w-4" />
            MLFQ Queues
          </h3>

          {queueProcesses.map((queueProcs, index) => (
            <Card
              key={index}
              className={`border-primary/10 ${
                index === 0 ? "bg-primary/5" : ""
              }`}
            >
              <CardHeader className="py-2">
                <CardTitle className="text-sm flex items-center justify-between">
                  <span>
                    Queue {index} {index === 0 ? "(Highest Priority)" : ""}
                  </span>
                  <Badge variant="outline">{queueProcs.length} processes</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                {queueProcs.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {queueProcs.map((proc) => (
                      <Badge
                        key={proc.pid}
                        variant="secondary"
                        className="py-1 px-3"
                      >
                        {proc.pid}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-2 text-muted-foreground text-sm italic">
                    Queue empty
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Legend */}
        <div className="text-xs text-muted-foreground pt-2 flex flex-wrap gap-x-4 gap-y-2 border-t">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-primary rounded-sm"></div>
            <span>Highest Priority Queue</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-secondary rounded-sm"></div>
            <span>Running Process</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-secondary/10 rounded-sm border border-secondary/20"></div>
            <span>I/O Process</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessMonitor;
