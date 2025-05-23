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
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mt-6 shadow-lg border-gray-100 dark:border-gray-700">
        <CardHeader className="bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-green-900/20 border-b border-gray-100 dark:border-gray-700">
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
            Hasil Simulasi
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Total waktu simulasi: <span className="font-semibold text-blue-600 dark:text-blue-400">{totalTime}</span> unit
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <Tabs defaultValue="table">
            <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
              <TabsTrigger value="table" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
                Tampilan Tabel
              </TabsTrigger>
              <TabsTrigger value="stats" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-green-500 data-[state=active]:text-white">
                Statistik Dasar
              </TabsTrigger>
            </TabsList>
            <TabsContent value="table">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableHead className="font-semibold text-gray-700 dark:text-gray-300">ID Proses</TableHead>
                      <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Level Antrian</TableHead>
                      <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Waktu Mulai</TableHead>
                      <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Waktu Selesai</TableHead>
                      <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Turnaround Time</TableHead>
                      <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Waiting Time</TableHead>
                      <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Waktu I/O</TableHead>
                      <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((result, index) => (
                      <motion.tr
                        key={result.pid}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gradient-to-r hover:from-blue-50 hover:via-purple-50 hover:to-green-50 dark:hover:from-blue-900/20 dark:hover:via-purple-900/20 dark:hover:to-green-900/20 transition-all duration-200"
                      >
                        <TableCell className="font-medium">
                          <span className="px-2 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded border border-blue-200 dark:border-blue-700">
                            {result.pid}
                          </span>
                        </TableCell>
                        <TableCell>
                          {result.queue !== undefined ? (
                            <span className={`px-2 py-1 rounded text-sm font-medium ${
                              result.queue === 0 
                                ? "bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700"
                                : result.queue <= 2
                                ? "bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
                                : "bg-gradient-to-r from-purple-100 to-gray-100 dark:from-purple-900/30 dark:to-gray-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700"
                            }`}>
                              Antrian {result.queue}
                            </span>
                          ) : "-"}
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">
                          {result.start_time !== undefined
                            ? `${result.start_time} unit`
                            : "-"}
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">
                          {result.finish_time !== undefined
                            ? `${result.finish_time} unit`
                            : "-"}
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">
                          {result.turnaround_time !== undefined
                            ? `${result.turnaround_time} unit`
                            : "-"}
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">
                          {result.waiting_time !== undefined
                            ? `${result.waiting_time} unit`
                            : "-"}
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">
                          {result.io_time !== undefined ? `${result.io_time} unit` : "-"}
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
                              className={
                                result.state === "finished"
                                  ? "bg-gradient-to-r from-green-500 to-blue-500 text-white"
                                  : result.state === "running"
                                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                                  : "border-purple-300 text-purple-700 dark:border-purple-600 dark:text-purple-300"
                              }
                            >
                              {result.state === "finished" ? "Selesai" :
                               result.state === "running" ? "Berjalan" :
                               result.state === "ready" ? "Siap" :
                               result.state === "blocked" ? "Terblokir" :
                               result.state}
                            </Badge>
                          ) : (
                            "Tidak Diketahui"
                          )}
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="stats">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-lg border border-blue-200 dark:border-blue-700"
                >
                  <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300">Rata-rata Turnaround Time</h3>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {avgTurnaround.toFixed(2)} <span className="text-sm">unit</span>
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-r from-purple-100 to-green-100 dark:from-purple-900/30 dark:to-green-900/30 p-6 rounded-lg border border-purple-200 dark:border-purple-700"
                >
                  <h3 className="text-lg font-medium text-purple-700 dark:text-purple-300">Rata-rata Waiting Time</h3>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {avgWaiting.toFixed(2)} <span className="text-sm">unit</span>
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 p-6 rounded-lg border border-green-200 dark:border-green-700"
                >
                  <h3 className="text-lg font-medium text-green-700 dark:text-green-300">Rata-rata Waktu I/O</h3>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {avgIoTime.toFixed(2)} <span className="text-sm">unit</span>
                  </p>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
          Statistik & Analisis Lanjutan
        </h2>
        <StatisticsAnalysis processes={results} totalTime={totalTime} />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
          Gantt Chart
        </h2>
        <GanttChart
          log={results.map((proc) => ({
            pid: proc.pid,
            start: proc.start_time ?? 0,
            end: proc.finish_time ?? proc.start_time ?? 0,
          }))}
        />
      </motion.div>
    </motion.div>
  );
};

export default ResultsDisplay;