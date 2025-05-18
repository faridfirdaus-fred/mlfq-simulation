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
      pid: "", // Use empty strings instead of undefined
      arrival_time: 0,
      burst_time: 1,
      io_burst: 0,
      total_time: 0, // Initialize with 0 instead of undefined
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
    <Card>
      <CardHeader>
        <CardTitle>Define Tasks</CardTitle>
      </CardHeader>
      <CardContent>
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
                    <FormLabel>Process ID</FormLabel>
                    <FormControl>
                      <Input placeholder="P1" {...field} />
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
                    <FormLabel>Arrival Time</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
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
                    <FormLabel>CPU Burst</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
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
                    <FormLabel>IO Burst</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
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
                    <FormLabel>Total Time (Optional)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="cpu_variance"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>CPU Variance: {value}</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={1}
                        step={0.1}
                        value={[value]}
                        onValueChange={(vals) => onChange(vals[0])}
                        {...field}
                      />
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
                    <FormLabel>IO Variance: {value}</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={1}
                        step={0.1}
                        value={[value]}
                        onValueChange={(vals) => onChange(vals[0])}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit">Add Process</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProcessForm;
