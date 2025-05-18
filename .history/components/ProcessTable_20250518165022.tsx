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
import { motion } from "framer-motion";
import { ListFilter } from "lucide-react";

interface ProcessTableProps {
  processes: Process[];
}

const ProcessTable: React.FC<ProcessTableProps> = ({ processes }) => {
  if (!processes.length) return null;

  return (
    <Card className="border-gray-100 dark:border-gray-700">
      <CardHeader className="border-b border-gray-100 dark:border-gray-700">
        <motion.div
          className="flex items-center gap-2"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ListFilter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <CardTitle className="text-gray-700 dark:text-gray-300">
            Processes
          </CardTitle>
        </motion.div>
      </CardHeader>
      <CardContent className="pt-4">
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Table>
            <TableCaption className="text-gray-500 dark:text-gray-400">
              List of all processes for simulation
            </TableCaption>
            <TableHeader>
              <TableRow className="border-gray-200 dark:border-gray-700">
                <TableHead className="text-gray-700 dark:text-gray-300">
                  PID
                </TableHead>
                <TableHead className="text-gray-700 dark:text-gray-300">
                  Arrival Time
                </TableHead>
                <TableHead className="text-gray-700 dark:text-gray-300">
                  CPU Burst
                </TableHead>
                <TableHead className="text-gray-700 dark:text-gray-300">
                  IO Burst
                </TableHead>
                <TableHead className="text-gray-700 dark:text-gray-300">
                  CPU Variance
                </TableHead>
                <TableHead className="text-gray-700 dark:text-gray-300">
                  IO Variance
                </TableHead>
                <TableHead className="text-gray-700 dark:text-gray-300">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processes.map((process, index) => (
                <motion.tr
                  key={process.pid}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="border-gray-100 dark:border-gray-800"
                >
                  <TableCell className="font-medium text-gray-700 dark:text-gray-300">
                    {process.pid}
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">
                    {process.arrival_time}
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">
                    {process.burst_time}
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">
                    {process.io_burst}
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">
                    {(process.cpu_variance * 100).toFixed(0)}%
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">
                    {(process.io_variance * 100).toFixed(0)}%
                  </TableCell>
                  <TableCell>
                    {process.state ? (
                      <Badge
                        variant="outline"
                        className={
                          process.state === "finished"
                            ? "border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300"
                            : process.state === "running"
                            ? "border-gray-300 bg-gray-100 text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                            : "border-gray-200 bg-gray-50 text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                        }
                      >
                        {process.state}
                      </Badge>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">
                        Waiting
                      </span>
                    )}
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ProcessTable;
