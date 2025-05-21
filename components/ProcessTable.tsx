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
import { Button } from "@/components/ui/button";
import { Process } from "../app/api/utils/types";
import { motion } from "framer-motion";
import { ListFilter, Trash2 } from "lucide-react";

interface ProcessTableProps {
  processes: Process[];
  onRemove?: (pid: string) => void;
}

const ProcessTable: React.FC<ProcessTableProps> = ({ processes, onRemove }) => {
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
                  I/O Time
                </TableHead>
                <TableHead className="text-gray-700 dark:text-gray-300">
                  Priority
                </TableHead>
                {onRemove && (
                  <TableHead className="text-gray-700 dark:text-gray-300">
                    Actions
                  </TableHead>
                )}
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
                    {process.io_time}
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">
                    {process.priority}
                  </TableCell>
                  {onRemove && (
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemove(process.pid)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </TableCell>
                  )}
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
