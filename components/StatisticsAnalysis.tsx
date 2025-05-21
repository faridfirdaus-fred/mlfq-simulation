import React, { useMemo } from "react";
import { Process } from "../app/api/utils/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

interface StatisticsAnalysisProps {
  processes: Process[];
  totalTime: number;
}

const StatisticsAnalysis: React.FC<StatisticsAnalysisProps> = ({
  processes,
  totalTime,
}) => {
  // Calculate utilization metrics
  const metrics = useMemo(() => {
    if (!processes || processes.length === 0) return null;

    // Total process metrics
    const totalCpuTime = processes.reduce(
      (acc, proc) => acc + (proc.burst_time || 0),
      0
    );
    const totalIoTime = processes.reduce(
      (acc, proc) => acc + (proc.io_time || 0),
      0
    );
    const totalWaitingTime = processes.reduce(
      (acc, proc) => acc + (proc.waiting_time || 0),
      0
    );

    // Queue distribution
    const queueDistribution = [0, 0, 0, 0];
    processes.forEach((proc) => {
      if (proc.queue !== undefined && proc.queue >= 0 && proc.queue < 4) {
        queueDistribution[proc.queue]++;
      }
    });

    // CPU utilization
    const cpuUtilization = (totalCpuTime / totalTime) * 100;

    // Throughput (processes per unit time)
    const throughput =
      processes.filter((p) => p.state === "finished").length / totalTime;

    // Average response time (time from arrival to first CPU burst)
    const avgResponseTime =
      processes.reduce((acc, proc) => {
        const responseTime =
          proc.start_time != null && proc.arrival_time !== undefined
            ? proc.start_time - proc.arrival_time
            : 0;
        return acc + responseTime;
      }, 0) / processes.length;

    return {
      cpuUtilization,
      throughput,
      avgResponseTime,
      queueDistribution,
      totalCpuTime,
      totalIoTime,
      totalWaitingTime,
    };
  }, [processes, totalTime]);

  // If no metrics are available, don't render anything
  if (!metrics) return null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Performance Metrics</CardTitle>
          <CardDescription>
            Key performance indicators for the MLFQ scheduler
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">CPU Utilization</h3>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[metrics.cpuUtilization]}
                    max={100}
                    step={1}
                    disabled
                    className="flex-1"
                  />
                  <span className="w-16 text-right">
                    {metrics.cpuUtilization.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Throughput</h3>
                <p className="text-2xl font-semibold">
                  {metrics.throughput.toFixed(4)} processes/unit time
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Average Response Time</h3>
                <p className="text-2xl font-semibold">
                  {metrics.avgResponseTime.toFixed(2)} time units
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4">Queue Distribution</h3>
              <div className="space-y-3">
                {metrics.queueDistribution.map((count, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span>Queue {index}</span>
                      <span>{count} processes</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{
                          width: `${(count / processes.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Time Distribution Analysis</CardTitle>
          <CardDescription>
            How time was allocated during the simulation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="text-lg font-medium">CPU Time</h3>
              <p className="text-3xl font-bold">{metrics.totalCpuTime} units</p>
              <p className="text-sm text-muted-foreground">
                {((metrics.totalCpuTime / totalTime) * 100).toFixed(1)}% of
                total time
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="text-lg font-medium">I/O Time</h3>
              <p className="text-3xl font-bold">{metrics.totalIoTime} units</p>
              <p className="text-sm text-muted-foreground">
                {((metrics.totalIoTime / totalTime) * 100).toFixed(1)}% of total
                time
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="text-lg font-medium">Waiting Time</h3>
              <p className="text-3xl font-bold">
                {metrics.totalWaitingTime} units
              </p>
              <p className="text-sm text-muted-foreground">
                {((metrics.totalWaitingTime / totalTime) * 100).toFixed(1)}% of
                total time
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium mb-2">Time Distribution Chart</h3>
            <div className="w-full h-8 flex rounded-md overflow-hidden">
              <div
                className="bg-primary h-full"
                style={{
                  width: `${(metrics.totalCpuTime / totalTime) * 100}%`,
                }}
                title={`CPU Time: ${metrics.totalCpuTime} units`}
              ></div>
              <div
                className="bg-secondary h-full"
                style={{ width: `${(metrics.totalIoTime / totalTime) * 100}%` }}
                title={`I/O Time: ${metrics.totalIoTime} units`}
              ></div>
              <div
                className="bg-muted h-full"
                style={{
                  width: `${(metrics.totalWaitingTime / totalTime) * 100}%`,
                }}
                title={`Waiting Time: ${metrics.totalWaitingTime} units`}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-primary rounded-sm"></div>
                <span>CPU Time</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-secondary rounded-sm"></div>
                <span>I/O Time</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-muted rounded-sm"></div>
                <span>Waiting Time</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Process Efficiency Analysis</CardTitle>
          <CardDescription>
            Comparative efficiency of each process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Process</th>
                  <th className="text-left py-2">CPU Efficiency</th>
                  <th className="text-left py-2">I/O Efficiency</th>
                  <th className="text-left py-2">Waiting Ratio</th>
                </tr>
              </thead>
              <tbody>
                {processes.map((proc) => {
                  const totalProcessTime =
                    (proc.finish_time || 0) - (proc.arrival_time || 0);
                  const cpuEfficiency =
                    ((proc.burst_time || 0) / totalProcessTime) * 100;
                  const ioEfficiency =
                    ((proc.io_time || 0) / totalProcessTime) * 100;
                  const waitingRatio =
                    ((proc.waiting_time || 0) / totalProcessTime) * 100;

                  return (
                    <tr key={proc.pid} className="border-b">
                      <td className="py-2 font-medium">{proc.pid}</td>
                      <td className="py-2">
                        <div className="flex items-center gap-2">
                          <div className="w-full max-w-24 bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${cpuEfficiency}%` }}
                            ></div>
                          </div>
                          <span>{cpuEfficiency.toFixed(1)}%</span>
                        </div>
                      </td>
                      <td className="py-2">
                        <div className="flex items-center gap-2">
                          <div className="w-full max-w-24 bg-muted rounded-full h-2">
                            <div
                              className="bg-secondary h-2 rounded-full"
                              style={{ width: `${ioEfficiency}%` }}
                            ></div>
                          </div>
                          <span>{ioEfficiency.toFixed(1)}%</span>
                        </div>
                      </td>
                      <td className="py-2">
                        <div className="flex items-center gap-2">
                          <div className="w-full max-w-24 bg-muted rounded-full h-2">
                            <div
                              className="bg-destructive/50 h-2 rounded-full"
                              style={{ width: `${waitingRatio}%` }}
                            ></div>
                          </div>
                          <span>{waitingRatio.toFixed(1)}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsAnalysis;
