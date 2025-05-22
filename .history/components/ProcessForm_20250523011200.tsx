"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Process } from "../app/api/utils/types";
import { SAMPLE_PROCESSES } from "../lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  Cpu,
  Check,
  Info,
  PlusCircle,
  Database,
  Layers,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Update the form schema to match backend expectations
interface FormSchemaType {
  pid: string;
  arrival_time: number;
  burst_time: number;
  priority: number;
  io_time: number;
}

const formSchema = z.object({
  pid: z.string().min(1, { message: "Process ID is required" }),
  arrival_time: z.coerce.number().min(0),
  burst_time: z.coerce.number().min(1),
  priority: z.coerce.number().min(0),
  io_time: z.coerce.number().min(0),
});

interface ProcessFormProps {
  onSubmit: (process: Process) => void;
  processCount?: number;
}


const ProcessForm: React.FC<ProcessFormProps> = ({
  onSubmit,
  processCount = 0,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [lastAdded, setLastAdded] = useState<Process | null>(null);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pid: processCount > 0 ? `P${processCount + 1}` : "P1",
      arrival_time: 0,
      burst_time: 1,
      priority: 0,
      io_time: 0,
    },
  });

  const handleSubmit = (values: FormSchemaType) => {
    // Convert the form values to match the Process interface
    const processData: Process = {
      pid: values.pid,
      arrival_time: values.arrival_time,
      burst_time: values.burst_time,
      priority: values.priority,
      io_time: values.io_time,
      cpu_bursts: [],
      execution_log: false,
      first_execution_time: null,
    };

    onSubmit(processData);
    setLastAdded(processData);

    // Show success feedback
    setSubmitted(true);
    toast.success("Process Added", {
      description: `Process ${processData.pid} added to simulation`,
    });

    // Reset the success state after a short delay
    setTimeout(() => setSubmitted(false), 2000);

    // Reset form with incrementing PID
    form.reset({
      pid: `P${processCount + 2}`, // Increment PID suggestion
      arrival_time: 0,
      burst_time: 1,
      priority: 0,
      io_time: 0,
    });
  };

  const loadTemplate = (templateName: string) => {
    const template =
      SAMPLE_PROCESSES[templateName as keyof typeof SAMPLE_PROCESSES]?.[0];

    if (!template) return;

    form.setValue("pid", processCount > 0 ? `P${processCount + 1}` : "P1");
    form.setValue("arrival_time", template.arrival_time);
    form.setValue("burst_time", template.burst_time);
    form.setValue("priority", template.priority);
    form.setValue("io_time", template.io_time);

    toast.info("Template Loaded", {
      description: `${templateName} template values loaded`,
    });
  };

  const getProcessType = () => {
    const burstTime = form.getValues().burst_time;
    const ioTime = form.getValues().io_time;

    if (ioTime === 0) return "CPU-bound";
    if (ioTime > burstTime) return "I/O-bound";
    return "Mixed";
  };

  const processTypeColor = () => {
    const type = getProcessType();

    switch (type) {
      case "CPU-bound":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "I/O-bound":
        return "bg-green-50 text-green-800 border-green-200";
      case "Mixed":
        return "bg-purple-50 text-purple-800 border-purple-200";
      default:
        return "bg-gray-50 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="border-gray-100 dark:border-gray-700 relative overflow-hidden">
      {lastAdded && (
        <div className="absolute top-0 left-0 w-full h-1.5">
          <div className="bg-gradient-to-r from-emerald-500 to-blue-500 h-full" />
        </div>
      )}

      <CardHeader className="border-b border-gray-100 dark:border-gray-700 flex flex-row justify-between items-center">
        <motion.div
          className="flex items-center gap-2"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Cpu className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <CardTitle className="text-gray-700 dark:text-gray-300">
            Define Process
            <Badge
              variant="outline"
              className={`ml-2 ${processTypeColor()} dark:bg-opacity-20 dark:border-opacity-40`}
            >
              {getProcessType()}
            </Badge>
          </CardTitle>
        </motion.div>

        <DropdownMenu>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-gray-500"
                  >
                    <Database className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Load template</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => loadTemplate("basic")}>
              <Layers className="mr-2 h-4 w-4 text-gray-500" />
              <span>Basic Process</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => loadTemplate("cpuBound")}>
              <Cpu className="mr-2 h-4 w-4 text-blue-500" />
              <span>CPU-bound Process</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => loadTemplate("ioBound")}>
              <Database className="mr-2 h-4 w-4 text-green-500" />
              <span>I/O-bound Process</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => loadTemplate("mixed")}>
              <Layers className="mr-2 h-4 w-4 text-purple-500" />
              <span>Mixed Process</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="pt-4">
        {lastAdded && (
          <div className="mb-4 px-3 py-2 rounded-md bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50">
            <h4 className="text-sm font-medium mb-1 text-emerald-700 dark:text-emerald-300">
              Last Added Process: {lastAdded.pid}
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <div>
                <span className="text-gray-500 dark:text-gray-400">
                  Burst time:
                </span>
                <span className="ml-2 text-gray-800 dark:text-gray-200">
                  {lastAdded.burst_time}
                </span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">
                  I/O time:
                </span>
                <span className="ml-2 text-gray-800 dark:text-gray-200">
                  {lastAdded.io_time}
                </span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">
                  Arrival:
                </span>
                <span className="ml-2 text-gray-800 dark:text-gray-200">
                  {lastAdded.arrival_time}
                </span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">
                  Priority:
                </span>
                <span className="ml-2 text-gray-800 dark:text-gray-200">
                  {lastAdded.priority}
                </span>
              </div>
            </div>
            <p className="text-xs mt-1 text-gray-500 dark:text-gray-400 italic">
              Process type:{" "}
              {lastAdded.io_time === 0
                ? "CPU-bound"
                : lastAdded.io_time > lastAdded.burst_time
                ? "I/O-bound"
                : "Mixed"}
            </p>
          </div>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <FormField
                  control={form.control}
                  name="pid"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 flex items-center">
                        <span>Process ID</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-4 w-4 p-0 ml-1"
                              >
                                <Info className="h-3 w-3 text-gray-400" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent
                              side="top"
                              className="max-w-xs text-xs"
                            >
                              <p>
                                A unique identifier for the process (e.g., P1,
                                P2)
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                        Must be unique among all processes
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder={`P${processCount + 1}`}
                          {...field}
                          className="border-gray-200 dark:border-gray-600 focus:border-emerald-500 dark:focus:border-emerald-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <FormField
                  control={form.control}
                  name="arrival_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 flex items-center">
                        <span>Arrival Time</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-4 w-4 p-0 ml-1"
                              >
                                <Info className="h-3 w-3 text-gray-400" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent
                              side="top"
                              className="max-w-xs text-xs"
                            >
                              <p>
                                When the process enters the system (in time
                                units)
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                        When the process enters the ready queue
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="border-gray-200 dark:border-gray-600 focus:border-emerald-500 dark:focus:border-emerald-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <FormField
                  control={form.control}
                  name="burst_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 flex items-center">
                        <span>CPU Burst Time</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-4 w-4 p-0 ml-1"
                              >
                                <Info className="h-3 w-3 text-gray-400" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent
                              side="top"
                              className="max-w-xs text-xs"
                            >
                              <p>
                                Total time required for CPU execution (in time
                                units)
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                        Time required for CPU execution
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="border-gray-200 dark:border-gray-600 focus:border-emerald-500 dark:focus:border-emerald-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <FormField
                  control={form.control}
                  name="io_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 flex items-center">
                        <span>I/O Time</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-4 w-4 p-0 ml-1"
                              >
                                <Info className="h-3 w-3 text-gray-400" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent
                              side="top"
                              className="max-w-xs text-xs"
                            >
                              <p>
                                Time spent in I/O operations after CPU burst
                                completes
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                        Time spent in I/O operations
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="border-gray-200 dark:border-gray-600 focus:border-emerald-500 dark:focus:border-emerald-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 flex items-center">
                        <span>Priority</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-4 w-4 p-0 ml-1"
                              >
                                <Info className="h-3 w-3 text-gray-400" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent
                              side="top"
                              className="max-w-xs text-xs"
                            >
                              <p>
                                Initial process priority (maps to starting queue
                                level)
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                        Initial process priority (lower = higher priority)
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="border-gray-200 dark:border-gray-600 focus:border-emerald-500 dark:focus:border-emerald-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Button
                type="submit"
                className={`w-full flex gap-2 items-center justify-center transition-all duration-300 ${
                  submitted
                    ? "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                    : "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 shadow-md"
                } text-white`}
              >
                {submitted ? (
                  <>
                    <Check className="h-4 w-4" />
                    Process Added
                  </>
                ) : (
                  <>
                    <PlusCircle className="h-4 w-4" />
                    Add Process
                  </>
                )}
              </Button>
            </motion.div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProcessForm;
