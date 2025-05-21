"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SimulationConfig } from "../app/api/utils/types";
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
import { Settings, Check } from "lucide-react";
import { toast } from "sonner";

interface FormSchemaType {
  num_queues: number;
  time_slice: number;
  boost_interval: number;
  aging_threshold: number;
}

const formSchema = z.object({
  num_queues: z.coerce.number().min(1).max(10),
  time_slice: z.coerce.number().min(1),
  boost_interval: z.coerce.number().min(1),
  aging_threshold: z.coerce.number().min(1),
});

interface ConfigFormProps {
  onSubmit: (config: SimulationConfig) => void;
  defaultValues?: Partial<FormSchemaType>;
}

const ConfigForm: React.FC<ConfigFormProps> = ({
  onSubmit,
  defaultValues = {
    num_queues: 3,
    time_slice: 2,
    boost_interval: 100,
    aging_threshold: 5,
  },
}) => {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = (values: FormSchemaType) => {
    const configData: SimulationConfig = {
      num_queues: values.num_queues,
      time_slice: values.time_slice,
      boost_interval: values.boost_interval,
      aging_threshold: values.aging_threshold,
    };

    // Call the parent component's onSubmit
    onSubmit(configData);

    // Show success feedback
    setSubmitted(true);
    toast.success("Configuration Applied", {
      description: "Simulation parameters have been updated",
    });

    // Reset the feedback after a short delay
    setTimeout(() => setSubmitted(false), 2000);
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
          <Settings className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <CardTitle className="text-gray-700 dark:text-gray-300">
            Simulation Configuration
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
                  name="num_queues"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">
                        Number of Queues
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                        Number of priority levels in MLFQ (1-10)
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
                transition={{ delay: 0.15 }}
              >
                <FormField
                  control={form.control}
                  name="time_slice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">
                        Time Slice
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                        Base time quantum for highest priority queue
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
                  name="boost_interval"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">
                        Boost Interval
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                        Time interval for priority boost (time units)
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
                  name="aging_threshold"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">
                        Aging Threshold
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                        Time before process aging occurs (time units)
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

            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Button
                type="submit"
                className={`w-full flex gap-2 items-center justify-center ${
                  submitted
                    ? "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                    : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                } text-white`}
              >
                {submitted ? (
                  <>
                    <Check className="h-4 w-4" />
                    Configuration Applied
                  </>
                ) : (
                  "Apply Configuration"
                )}
              </Button>
            </motion.div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ConfigForm;
