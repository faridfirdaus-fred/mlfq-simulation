"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Process } from "../app/api/utils/types";
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
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

const formSchema = z.object({
  pid: z.string().min(1, { message: "Process ID is required" }),
  arrival_time: z.coerce.number().min(0, { message: "Must be non-negative" }),
  burst_time: z.coerce.number().min(1, { message: "Must be at least 1" }),
  io_burst: z.coerce.number().min(0, { message: "Must be non-negative" }),
  total_time: z.coerce.number().optional(),
  io_variance: z.coerce.number().min(0).max(1),
  cpu_variance: z.coerce.number().min(0).max(1),
});

interface ProcessFormProps {
  onSubmit: (process: Process) => void;
}

const ProcessForm: React.FC<ProcessFormProps> = ({ onSubmit }) => {
  const form = useForm<Process>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pid: "",
      arrival_time: 0,
      burst_time: 1,
      io_burst: 0,
      total_time: 0,
      io_variance: 0,
      cpu_variance: 0,
    },
  });

  const handleSubmit = (values: Process) => {
    onSubmit(values);
    form.reset({
      pid: "",
      arrival_time: 0,
      burst_time: 1,
      io_burst: 0,
      io_variance: 0,
      cpu_variance: 0,
    });
  };

  return (
    <Card className="border-gray-100 dark:border-gray-700">
      <CardHeader className="border-b border-gray-100 dark:border-gray-700">
        <motion.div
          className="flex items-center gap-2"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Cpu className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <CardTitle className="text-gray-700 dark:text-gray-300">
            Define Process
          </CardTitle>
        </motion.div>
      </CardHeader>
      <CardContent className="pt-4">
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
                      <FormLabel className="text-gray-700 dark:text-gray-300">
                        Process ID
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                        A unique identifier for the process (e.g., P1, P2, etc.)
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder="P1"
                          {...field}
                          className="border-gray-200 dark:border-gray-600"
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
                      <FormLabel className="text-gray-700 dark:text-gray-300">
                        Arrival Time
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                        When the process enters the ready queue (time units)
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="border-gray-200 dark:border-gray-600"
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
                      <FormLabel className="text-gray-700 dark:text-gray-300">
                        CPU Burst
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                        Time required for CPU execution (time units)
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="border-gray-200 dark:border-gray-600"
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
                  name="io_burst"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">
                        IO Burst
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                        Time spent in I/O operations (time units)
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="border-gray-200 dark:border-gray-600"
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
                  name="total_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">
                        Total Time (Optional)
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                        Total execution time if known (time units)
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="border-gray-200 dark:border-gray-600"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            </div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <FormField
                  control={form.control}
                  name="cpu_variance"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">
                        CPU Variance: {value}
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                        Variability in CPU execution times (0-1, 0=constant,
                        1=highly variable)
                      </FormDescription>
                      <FormControl>
                        <Slider
                          min={0}
                          max={1}
                          step={0.1}
                          value={[value]}
                          onValueChange={(vals) => onChange(vals[0])}
                          {...field}
                          className="[&_[role=slider]]:bg-gray-500 [&_[role=slider]]:border-gray-300 [&_[role=slider]]:dark:bg-gray-400"
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
                transition={{ delay: 0.4 }}
              >
                <FormField
                  control={form.control}
                  name="io_variance"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">
                        IO Variance: {value}
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                        Variability in I/O operation times (0-1, 0=constant,
                        1=highly variable)
                      </FormDescription>
                      <FormControl>
                        <Slider
                          min={0}
                          max={1}
                          step={0.1}
                          value={[value]}
                          onValueChange={(vals) => onChange(vals[0])}
                          {...field}
                          className="[&_[role=slider]]:bg-gray-500 [&_[role=slider]]:border-gray-300 [&_[role=slider]]:dark:bg-gray-400"
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
                className="w-full bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 text-white"
              >
                Add Process
              </Button>
            </motion.div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProcessForm;
