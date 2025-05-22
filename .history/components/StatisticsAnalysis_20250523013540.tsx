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
    const cpuUtilization = totalTime > 0 ? (totalCpuTime / totalTime) * 100 : 0;

    // Throughput (processes per unit time)
    const throughput =
      totalTime > 0
        ? processes.filter((p) => p.state === "finished").length / totalTime
        : 0;

    // Calculate response times
    // Log for debugging
    console.log("Calculating response times for processes:", processes);

    // Manual implementation based on arrival time and start time
    let totalResponseTime = 0;
    const processesWithTimes: {
      pid: string;
      arrival: number | undefined;
      first_exec: number | null | undefined;
      start: number | null | undefined;
      responseTime: number;
    }[] = [];

    processes.forEach((proc) => {
      let responseTime = 0;

      // Always use execution_log if available as it's most accurate
      if (
        proc.execution_log &&
        Array.isArray(proc.execution_log) &&
        proc.execution_log.length > 0
      ) {
        // Sort execution_log by start time to ensure we get the first execution
        const sortedLog = [...proc.execution_log].sort(
          (a, b) => a.start_time - b.start_time
        );
        responseTime = sortedLog[0].start_time - (proc.arrival_time || 0);

        // Log for debugging
        console.log(
          `Process ${proc.pid}: Using execution_log - First execution at ${sortedLog[0].start_time}, arrival at ${proc.arrival_time}`
        );
      } else if (proc.first_execution_time != null) {
        responseTime = proc.first_execution_time - (proc.arrival_time || 0);
        console.log(
          `Process ${proc.pid}: Using first_execution_time - ${proc.first_execution_time}, arrival at ${proc.arrival_time}`
        );
      } else if (proc.start_time != null) {
        responseTime = proc.start_time - (proc.arrival_time || 0);
        console.log(
          `Process ${proc.pid}: Using start_time - ${proc.start_time}, arrival at ${proc.arrival_time}`
        );
      } else {
        console.warn(
          `Process ${proc.pid}: No execution timing information available!`
        );
      }

      // Ensure responseTime is not negative
      responseTime = Math.max(0, responseTime);

      // Add additional debugging to help troubleshooting
      console.log(`Process ${proc.pid} final response time: ${responseTime}`);

      processesWithTimes.push({
        pid: proc.pid,
        arrival: proc.arrival_time,
        first_exec: proc.first_execution_time,
        start: proc.start_time,
        responseTime,
      });

      totalResponseTime += responseTime;
    });

    // Log calculation results for debugging
    console.log("Process response times:", processesWithTimes);
    console.log("Total response time:", totalResponseTime);
    console.log(
      "Average response time:",
      processes.length > 0 ? totalResponseTime / processes.length : 0
    );

    const avgResponseTime =
      processes.length > 0 ? totalResponseTime / processes.length : 0;

    return {
      cpuUtilization,
      throughput,
      avgResponseTime,
      queueDistribution,
      totalCpuTime,
      totalIoTime,
      totalWaitingTime,
    };
    // Only depend on totalTime, not processes (will recalculate when processes change anyway)
  }, [totalTime, processes]);

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
