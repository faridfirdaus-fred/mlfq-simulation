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
    <Card className="border-gray-100 dark:border-gray-700 shadow-lg">
      <CardHeader className="border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 dark:from-green-900/20 dark:via-blue-900/20 dark:to-purple-900/20">
        <motion.div
          className="flex items-center gap-2"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ListFilter className="h-5 w-5 text-green-600 dark:text-green-400" />
          <CardTitle className="text-gray-700 dark:text-gray-300">
            Daftar Proses
            <span className="ml-2 px-2 py-1 text-xs bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 text-green-700 dark:text-green-300 rounded-full border border-green-200 dark:border-green-700">
              {processes.length} proses
            </span>
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
              Daftar semua proses untuk simulasi
            </TableCaption>
            <TableHeader>
              <TableRow className="border-gray-200 dark:border-gray-700">
                <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">
                  ID Proses
                </TableHead>
                <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">
                  Waktu Kedatangan
                </TableHead>
                <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">
                  CPU Burst
                </TableHead>
                <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">
                  Waktu I/O
                </TableHead>
                <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">
                  Prioritas
                </TableHead>
                {onRemove && (
                  <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">
                    Aksi
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
                  className="border-gray-100 dark:border-gray-800 hover:bg-gradient-to-r hover:from-blue-50 hover:via-purple-50 hover:to-green-50 dark:hover:from-blue-900/20 dark:hover:via-purple-900/20 dark:hover:to-green-900/20 transition-all duration-200"
                >
                  <TableCell className="font-medium">
                    <span className="px-2 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded border border-blue-200 dark:border-blue-700">
                      {process.pid}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium">{process.arrival_time}</span> unit
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium">{process.burst_time}</span> unit
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium">{process.io_time}</span> unit
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      process.priority === 0 
                        ? "bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700"
                        : process.priority <= 2
                        ? "bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
                        : "bg-gradient-to-r from-purple-100 to-gray-100 dark:from-purple-900/30 dark:to-gray-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700"
                    }`}>
                      {process.priority}
                    </span>
                  </TableCell>
                  {onRemove && (
                    <TableCell>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemove(process.pid)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Hapus</span>
                        </Button>
                      </motion.div>
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