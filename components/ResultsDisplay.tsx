import React from "react";
import { Process } from "../app/api/utils/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatisticsAnalysis from "./StatisticsAnalysis";

import GanttChart from "./GanttChart";
interface ResultsDisplayProps {
  results: Process[] | null;
  totalTime: number;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  results,
  totalTime,
}) => {
  if (!results || results.length === 0) {
    return null;
  }

  const avgTurnaround =
    results.reduce((acc, proc) => acc + (proc.turnaround_time || 0), 0) /
    results.length;
  const avgWaiting =
    results.reduce((acc, proc) => acc + (proc.waiting_time || 0), 0) /
    results.length;
  const avgIoTime =
    results.reduce((acc, proc) => acc + (proc.io_time || 0), 0) /
    results.length;

  return (
    <>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Simulation Results</CardTitle>
          <CardDescription>
            Total simulation time: {totalTime} units
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="table">
            <TabsList>
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="stats">Basic Statistics</TabsTrigger>
            </TabsList>
            <TabsContent value="table">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>PID</TableHead>
                    <TableHead>Queue Level</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>Finish Time</TableHead>
                    <TableHead>Turnaround Time</TableHead>
                    <TableHead>Waiting Time</TableHead>
                    <TableHead>I/O Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result) => (
                    <TableRow key={result.pid}>
                      <TableCell className="font-medium">{result.pid}</TableCell>
                      <TableCell>
                        {result.queue !== undefined ? result.queue : "-"}
                      </TableCell>
                      <TableCell>
                        {result.start !== undefined ? result.start : "-"}
                      </TableCell>
                      <TableCell>
                        {result.finish !== undefined ? result.finish : "-"}
                      </TableCell>
                      <TableCell>
                        {result.turnaround_time !== undefined
                          ? result.turnaround_time
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {result.waiting_time !== undefined
                          ? result.waiting_time
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {result.io_time !== undefined ? result.io_time : "-"}
                      </TableCell>
                      <TableCell>
                        {result.state ? (
                          <Badge
                            variant={
                              result.state === "finished"
                                ? "default"
                                : result.state === "running"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {result.state}
                          </Badge>
                        ) : (
                          "Unknown"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="stats">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="text-lg font-medium">Avg Turnaround Time</h3>
                  <p className="text-3xl font-bold">{avgTurnaround.toFixed(2)}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="text-lg font-medium">Avg Waiting Time</h3>
                  <p className="text-3xl font-bold">{avgWaiting.toFixed(2)}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="text-lg font-medium">Avg I/O Time</h3>
                  <p className="text-3xl font-bold">{avgIoTime.toFixed(2)}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Advanced Statistics & Analysis</h2>
        <StatisticsAnalysis processes={results} totalTime={totalTime} />
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Gantt Chart</h2>
        <GanttChart
          log={results.map((proc) => ({
            pid: proc.pid,
            start: proc.start ?? 0,
            end: proc.finish ?? proc.start ?? 0,
          }))}
        />
      </div>
    </>
  );
};

export default ResultsDisplay;
