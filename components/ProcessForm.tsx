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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Plus, Cpu, Timer, HardDrive, Zap } from "lucide-react";

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
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20"></div>
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-2 text-2xl text-blue-700 dark:text-blue-300">
          <Plus className="h-6 w-6" />
          Define Process
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="pid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                      <Zap className="h-4 w-4" />
                      Process ID
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="P1" 
                        {...field} 
                        className="border-purple-200 focus:border-purple-400 dark:border-purple-700"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="arrival_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-green-700 dark:text-green-300">
                      <Timer className="h-4 w-4" />
                      Arrival Time
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        className="border-green-200 focus:border-green-400 dark:border-green-700"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="burst_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                      <Cpu className="h-4 w-4" />
                      CPU Burst
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        className="border-blue-200 focus:border-blue-400 dark:border-blue-700"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="io_burst"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                      <HardDrive className="h-4 w-4" />
                      IO Burst
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        className="border-orange-200 focus:border-orange-400 dark:border-orange-700"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="total_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                      <Timer className="h-4 w-4" />
                      Total Time (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        className="border-indigo-200 focus:border-indigo-400 dark:border-indigo-700"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-6">
              <FormField
                control={form.control}
                name="cpu_variance"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel className="text-blue-700 dark:text-blue-300 text-lg font-semibold">
                      CPU Variance: <span className="font-mono text-lg bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">{value}</span>
                    </FormLabel>
                    <FormControl>
                      <div className="py-4 px-2">
                        <Slider
                          min={0}
                          max={1}
                          step={0.1}
                          value={[value]}
                          onValueChange={(vals) => onChange(vals[0])}
                          className="w-full"
                          colorScheme="blue"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="io_variance"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel className="text-orange-700 dark:text-orange-300 text-lg font-semibold">
                      IO Variance: <span className="font-mono text-lg bg-orange-100 dark:bg-orange-900 px-2 py-1 rounded">{value}</span>
                    </FormLabel>
                    <FormControl>
                      <div className="py-4 px-2">
                        <Slider
                          min={0}
                          max={1}
                          step={0.1}
                          value={[value]}
                          onValueChange={(vals) => onChange(vals[0])}
                          className="w-full"
                          colorScheme="orange"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Process
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProcessForm;