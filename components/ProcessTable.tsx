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

interface ProcessTableProps {
  processes: Process[];
}

const ProcessTable: React.FC<ProcessTableProps> = ({ processes }) => {
  if (!processes.length) return null;

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Processes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Input Processes</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>PID</TableHead>
              <TableHead>Arrival Time</TableHead>
              <TableHead>CPU Burst</TableHead>
              <TableHead>IO Burst</TableHead>
              <TableHead>CPU Variance</TableHead>
              <TableHead>IO Variance</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {processes.map((process) => (
              <TableRow key={process.pid}>
                <TableCell className="font-medium">{process.pid}</TableCell>
                <TableCell>{process.arrival_time}</TableCell>
                <TableCell>{process.burst_time}</TableCell>
                <TableCell>{process.io_burst}</TableCell>
                <TableCell>
                  {(process.cpu_variance * 100).toFixed(0)}%
                </TableCell>
                <TableCell>{(process.io_variance * 100).toFixed(0)}%</TableCell>
                <TableCell>
                  {process.state ? (
                    <Badge
                      variant={
                        process.state === "finished"
                          ? "outline"
                          : process.state === "running"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {process.state}
                    </Badge>
                  ) : (
                    "Waiting"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ProcessTable;
