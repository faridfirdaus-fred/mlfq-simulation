import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Process } from "../app/api/utils/types";
import { Badge } from "@/components/ui/badge";
import { Monitor, Timer, HardDrive, Zap, TrendingUp } from "lucide-react";

interface ProcessTableProps {
  processes: Process[];
}

const ProcessTable: React.FC<ProcessTableProps> = ({ processes }) => {
  if (!processes.length) return null;

  const getStateBadge = (state?: string) => {
    switch (state) {
      case "running":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200">
            <Monitor className="h-3 w-3 mr-1" />
            Running
          </Badge>
        );
      case "io":
        return (
          <Badge className="bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900 dark:text-orange-200">
            <HardDrive className="h-3 w-3 mr-1" />
            I/O
          </Badge>
        );
      case "ready":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-200">
            <Timer className="h-3 w-3 mr-1" />
            Ready
          </Badge>
        );
      case "finished":
        return (
          <Badge className="bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900 dark:text-purple-200">
            <TrendingUp className="h-3 w-3 mr-1" />
            Finished
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
            Waiting
          </Badge>
        );
    }
  };

  return (
    <Card className="mt-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-emerald-950/20 dark:via-transparent dark:to-blue-950/20"></div>
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-2 text-2xl text-emerald-700 dark:text-emerald-300">
          <Monitor className="h-6 w-6" />
          Process Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <div className="overflow-x-auto">
          <Table>
            <TableCaption className="text-gray-600 dark:text-gray-400">
              Input processes for MLFQ simulation
            </TableCaption>
            <TableHeader>
              <TableRow className="border-b-2 border-emerald-200 dark:border-emerald-800">
                <TableHead className="font-bold text-emerald-700 dark:text-emerald-300">
                  <span className="flex items-center gap-1">
                    <Zap className="h-4 w-4" />
                    PID
                  </span>
                </TableHead>
                <TableHead className="font-bold text-blue-700 dark:text-blue-300">
                  <span className="flex items-center gap-1">
                    <Timer className="h-4 w-4" />
                    Arrival Time
                  </span>
                </TableHead>
                <TableHead className="font-bold text-purple-700 dark:text-purple-300">
                  <span className="flex items-center gap-1">
                    <Monitor className="h-4 w-4" />
                    CPU Burst
                  </span>
                </TableHead>
                <TableHead className="font-bold text-orange-700 dark:text-orange-300">
                  <span className="flex items-center gap-1">
                    <HardDrive className="h-4 w-4" />
                    IO Burst
                  </span>
                </TableHead>
                <TableHead className="font-bold text-indigo-700 dark:text-indigo-300">
                  CPU Variance
                </TableHead>
                <TableHead className="font-bold text-pink-700 dark:text-pink-300">
                  IO Variance
                </TableHead>
                <TableHead className="font-bold text-gray-700 dark:text-gray-300">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processes.map((process, index) => (
                <TableRow 
                  key={process.pid}
                  className={`hover:bg-gradient-to-r transition-all duration-200 ${
                    index % 2 === 0 
                      ? 'from-emerald-50 to-blue-50 dark:from-emerald-950/30 dark:to-blue-950/30' 
                      : 'from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30'
                  } hover:shadow-md`}
                >
                  <TableCell className="font-bold text-emerald-800 dark:text-emerald-200">
                    <span className="bg-emerald-100 dark:bg-emerald-900 px-2 py-1 rounded-md">
                      {process.pid}
                    </span>
                  </TableCell>
                  <TableCell className="text-blue-700 dark:text-blue-300 font-medium">
                    {process.arrival_time}
                  </TableCell>
                  <TableCell className="text-purple-700 dark:text-purple-300 font-medium">
                    {process.burst_time}
                  </TableCell>
                  <TableCell className="text-orange-700 dark:text-orange-300 font-medium">
                    {process.io_burst}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-2 bg-indigo-200 dark:bg-indigo-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                          style={{ width: `${process.cpu_variance * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                        {(process.cpu_variance * 100).toFixed(0)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-2 bg-pink-200 dark:bg-pink-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"
                          style={{ width: `${process.io_variance * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-pink-700 dark:text-pink-300">
                        {(process.io_variance * 100).toFixed(0)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStateBadge(process.state)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessTable;