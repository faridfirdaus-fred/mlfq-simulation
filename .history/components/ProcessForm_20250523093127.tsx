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
  pid: z.string().min(1, { message: "ID Proses harus diisi" }),
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
      io_time: values.io_time,
      priority: values.priority, // Add this line to include priority
      execution_log: [],
      first_execution_time: null,
      state: "ready", // or the appropriate default state
      queue: 0, // or the appropriate default queue
    };

    onSubmit(processData);
    setLastAdded(processData);

    // Show success feedback
    setSubmitted(true);
    toast.success("Proses Berhasil Ditambahkan", {
      description: `Proses ${processData.pid} ditambahkan ke simulasi`,
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

    toast.info("Template Dimuat", {
      description: `Template ${templateName} berhasil dimuat`,
    });
  };

  const getProcessType = () => {
    const burstTime = form.getValues().burst_time;
    const ioTime = form.getValues().io_time;

    if (ioTime === 0) return "CPU-bound";
    if (ioTime > burstTime) return "I/O-bound";
    return "Campuran";
  };

  const processTypeColor = () => {
    const type = getProcessType();

    switch (type) {
      case "CPU-bound":
        return "bg-blue-50 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300";
      case "I/O-bound":
        return "bg-green-50 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300";
      case "Campuran":
        return "bg-purple-50 text-purple-800 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300";
      default:
        return "bg-gray-50 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="border-gray-100 dark:border-gray-700 relative overflow-hidden shadow-lg">
      {lastAdded && (
        <div className="absolute top-0 left-0 w-full h-2">
          <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 h-full animate-pulse" />
        </div>
      )}

      <CardHeader className="border-b border-gray-100 dark:border-gray-700 flex flex-row justify-between items-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <motion.div
          className="flex items-center gap-2"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Cpu className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <CardTitle className="text-gray-700 dark:text-gray-300">
            Definisi Proses
            <Badge
              variant="outline"
              className={`ml-2 ${processTypeColor()}`}
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
                    className="h-8 w-8 p-0 text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20"
                  >
                    <Database className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Muat template</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => loadTemplate("basic")}>
              <Layers className="mr-2 h-4 w-4 text-gray-500" />
              <span>Proses Dasar</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => loadTemplate("cpuBound")}>
              <Cpu className="mr-2 h-4 w-4 text-blue-500" />
              <span>Proses CPU-bound</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => loadTemplate("ioBound")}>
              <Database className="mr-2 h-4 w-4 text-green-500" />
              <span>Proses I/O-bound</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => loadTemplate("mixed")}>
              <Layers className="mr-2 h-4 w-4 text-purple-500" />
              <span>Proses Campuran</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="pt-4">
        {lastAdded && (
          <div className="mb-4 px-3 py-3 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800/50">
            <h4 className="text-sm font-medium mb-2 text-green-700 dark:text-green-300">
              Proses Terakhir Ditambahkan: {lastAdded.pid}
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <div>
                <span className="text-gray-500 dark:text-gray-400">
                  Waktu CPU:
                </span>
                <span className="ml-2 text-gray-800 dark:text-gray-200 font-medium">
                  {lastAdded.burst_time}
                </span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">
                  Waktu I/O:
                </span>
                <span className="ml-2 text-gray-800 dark:text-gray-200 font-medium">
                  {lastAdded.io_time}
                </span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">
                  Kedatangan:
                </span>
                <span className="ml-2 text-gray-800 dark:text-gray-200 font-medium">
                  {lastAdded.arrival_time}
                </span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">
                  Prioritas:
                </span>
                <span className="ml-2 text-gray-800 dark:text-gray-200 font-medium">
                  {lastAdded.priority}
                </span>
              </div>
            </div>
            <p className="text-xs mt-2 text-gray-500 dark:text-gray-400 italic">
              Jenis proses:{" "}
              {lastAdded.io_time === 0
                ? "CPU-bound"
                : (lastAdded.io_time ?? 0) > (lastAdded.burst_time ?? 0)
                ? "I/O-bound"
                : "Campuran"}
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
                        <span>ID Proses</span>
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
                                Pengenal unik untuk proses (contoh: P1, P2)
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                        Harus unik di antara semua proses
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder={`P${processCount + 1}`}
                          {...field}
                          className="border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500/20"
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
                        <span>Waktu Kedatangan</span>
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
                                Kapan proses masuk ke sistem (dalam unit waktu)
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                        Kapan proses masuk ke antrian siap
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500/20"
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
                        <span>Waktu CPU Burst</span>
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
                                Total waktu yang diperlukan untuk eksekusi CPU (dalam unit waktu)
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                        Waktu yang dibutuhkan untuk eksekusi CPU
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500/20"
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
                        <span>Waktu I/O</span>
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
                                Waktu yang dihabiskan untuk operasi I/O setelah CPU burst selesai
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                        Waktu yang dihabiskan untuk operasi I/O
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500/20"
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
                        <span>Prioritas</span>
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
                                Prioritas awal proses (berpengaruh pada level antrian awal)
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                        Prioritas awal proses (lebih rendah = prioritas lebih tinggi)
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500/20"
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
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                className={`w-full flex gap-2 items-center justify-center transition-all duration-300 ${
                  submitted
                    ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 dark:from-green-600 dark:to-green-700 shadow-lg"
                    : "bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 hover:from-blue-600 hover:via-purple-600 hover:to-green-600 shadow-lg"
                } text-white font-medium`}
              >
                {submitted ? (
                  <>
                    <Check className="h-4 w-4" />
                    Proses Berhasil Ditambahkan
                  </>
                ) : (
                  <>
                    <PlusCircle className="h-4 w-4" />
                    Tambah Proses
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