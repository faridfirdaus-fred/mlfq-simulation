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
import { BarChart, Timer, CheckSquare, TrendingUp, Cpu } from "lucide-react";

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

  const getStateBadge = (state?: string) => {
    switch (state) {
      case "finished":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200">
            <CheckSquare className="h-3 w-3 mr-1" />
            Finished
          </Badge>
        );
      case "running":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-200">
            <Cpu className="h-3 w-3 mr-1" />
            Running
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
            Unknown
          </Badge>
        );
    }
  };

  return (
    <>
      <Card className="mt-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-violet-50 dark:from-cyan-950/20 dark:via-transparent dark:to-violet-950/20"></div>
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-2 text-2xl text-cyan-700 dark:text-cyan-300">
            <BarChart className="h-6 w-6" />
            Simulation Results
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Timer className="h-4 w-4" />
              Total simulation time: <span className="font-bold text-cyan-600 dark:text-cyan-400">{totalTime}</span> units
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <Tabs defaultValue="table" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger 
                value="table" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
              >
                <Table className="h-4 w-4 mr-2" />
                Table View
              </TabsTrigger>
              <TabsTrigger 
                value="stats"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
              >
                <BarChart className="h-4 w-4 mr-2" />
                Statistics
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="table" className="space-y-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-2 border-cyan-200 dark:border-cyan-800">
                      <TableHead className="font-bold text-cyan-700 dark:text-cyan-300">PID</TableHead>
                      <TableHead className="font-bold text-indigo-700 dark:text-indigo-300">Queue Level</TableHead>
                      <TableHead className="font-bold text-green-700 dark:text-green-300">Start Time</TableHead>
                      <TableHead className="font-bold text-purple-700 dark:text-purple-300">Finish Time</TableHead>
                      <TableHead className="font-bold text-orange-700 dark:text-orange-300">Turnaround Time</TableHead>
                      <TableHead className="font-bold text-pink-700 dark:text-pink-300">Waiting Time</TableHead>
                      <TableHead className="font-bold text-blue-700 dark:text-blue-300">I/O Time</TableHead>
                      <TableHead className="font-bold text-gray-700 dark:text-gray-300">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((result, index) => (
                      <TableRow 
                        key={result.pid}
                        className={`hover:bg-gradient-to-r transition-all duration-200 ${
                          index % 2 === 0 
                            ? 'from-cyan-50 to-violet-50 dark:from-cyan-950/30 dark:to-violet-950/30' 
                            : 'from-violet-50 to-pink-50 dark:from-violet-950/30 dark:to-pink-950/30'
                        } hover:shadow-md`}
                      >
                        <TableCell className="font-bold text-cyan-800 dark:text-cyan-200">
                          <span className="bg-cyan-100 dark:bg-cyan-900 px-2 py-1 rounded-md">
                            {result.pid}
                          </span>
                        </TableCell>
                        <TableCell className="text-indigo-700 dark:text-indigo-300 font-medium">
                          {result.queue !== undefined ? (
                            <Badge 
                              variant="outline" 
                              className={`${
                                result.queue === 0 ? 'border-indigo-400 text-indigo-800 bg-indigo-50 dark:bg-indigo-950' :
                                result.queue === 1 ? 'border-blue-400 text-blue-800 bg-blue-50 dark:bg-blue-950' :
                                result.queue === 2 ? 'border-purple-400 text-purple-800 bg-purple-50 dark:bg-purple-950' :
                                'border-pink-400 text-pink-800 bg-pink-50 dark:bg-pink-950'
                              }`}
                            >
                              Q{result.queue}
                            </Badge>
                          ) : "-"}
                        </TableCell>
                        <TableCell className="text-green-700 dark:text-green-300 font-medium">
                          {result.start !== undefined ? result.start : "-"}
                        </TableCell>
                        <TableCell className="text-purple-700 dark:text-purple-300 font-medium">
                          {result.finish !== undefined ? result.finish : "-"}
                        </TableCell>
                        <TableCell className="text-orange-700 dark:text-orange-300 font-medium">
                          {result.turnaround_time !== undefined ? result.turnaround_time : "-"}
                        </TableCell>
                        <TableCell className="text-pink-700 dark:text-pink-300 font-medium">
                          {result.waiting_time !== undefined ? result.waiting_time : "-"}
                        </TableCell>
                        <TableCell className="text-blue-700 dark:text-blue-300 font-medium">
                          {result.io_time !== undefined ? result.io_time : "-"}
                        </TableCell>
                        <TableCell>
                          {getStateBadge(result.state)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="stats">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="relative overflow-hidden border-orange-200 dark:border-orange-800">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30"></div>
                  <CardContent className="p-6 relative">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-300">
                        Avg Turnaround Time
                      </h3>
                      <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <p className="text-3xl font-bold text-orange-800 dark:text-orange-200">
                      {avgTurnaround.toFixed(2)}
                    </p>
                    <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">time units</p>
                  </CardContent>
                </Card>

                <Card className="relative overflow-hidden border-pink-200 dark:border-pink-800">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30"></div>
                  <CardContent className="p-6 relative">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-pink-700 dark:text-pink-300">
                        Avg Waiting Time
                      </h3>
                      <Timer className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                    </div>
                    <p className="text-3xl font-bold text-pink-800 dark:text-pink-200">
                      {avgWaiting.toFixed(2)}
                    </p>
                    <p className="text-sm text-pink-600 dark:text-pink-400 mt-1">time units</p>
                  </CardContent>
                </Card>

                <Card className="relative overflow-hidden border-blue-200 dark:border-blue-800">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30"></div>
                  <CardContent className="p-6 relative">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                        Avg I/O Time
                      </h3>
                      <Cpu className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-3xl font-bold text-blue-800 dark:text-blue-200">
                      {avgIoTime.toFixed(2)}
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">time units</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gradient bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Advanced Statistics & Analysis
        </h2>
        <StatisticsAnalysis processes={results} totalTime={totalTime} />
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gradient bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
          Gantt Chart Visualization
        </h2>
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