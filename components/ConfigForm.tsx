"use client";

import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { SimulationConfig } from "../app/api/utils/types";
import {
  DEFAULT_CONFIG,
  CONFIG_TOOLTIPS,
  QUEUE_COLORS,
} from "../lib/constants";
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
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Check, RefreshCw, Info } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FormSchemaType {
  num_queues: number;
  time_slice: number;
  boost_interval: number;
  aging_threshold: number;
}

const formSchema = zod.object({
  num_queues: zod.coerce.number().min(1).max(10),
  time_slice: zod.coerce.number().min(1),
  boost_interval: zod.coerce.number().min(1),
  aging_threshold: zod.coerce.number().min(1),
});

interface ConfigFormProps {
  onSubmit: (config: SimulationConfig) => void;
  defaultValues?: Partial<FormSchemaType>;
  isSimulationRunning?: boolean;
}

const ConfigForm: React.FC<ConfigFormProps> = ({
  onSubmit,
  defaultValues = DEFAULT_CONFIG,
  isSimulationRunning = false,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [activeConfig, setActiveConfig] = useState<SimulationConfig | null>(
    null
  );
  const [isResetting, setIsResetting] = useState(false);
  const [configInfo, setConfigInfo] = useState<{
    lastApplied: Date | null;
    appliedTo: number;
  }>({
    lastApplied: null,
    appliedTo: 0,
  });

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      num_queues: defaultValues.num_queues || DEFAULT_CONFIG.num_queues,
      time_slice: defaultValues.time_slice || DEFAULT_CONFIG.time_slice,
      boost_interval:
        defaultValues.boost_interval || DEFAULT_CONFIG.boost_interval,
      aging_threshold:
        defaultValues.aging_threshold || DEFAULT_CONFIG.aging_threshold,
    },
  });

  // Set initial active config
  useEffect(() => {
    console.log("Default values received:", defaultValues);

    // Pastikan selalu menggunakan nilai dari DEFAULT_CONFIG jika properti tertentu tidak ada
    setActiveConfig({
      // Gunakan nilai dari DEFAULT_CONFIG sebagai fallback yang kuat
      num_queues:
        defaultValues.num_queues !== undefined
          ? defaultValues.num_queues
          : DEFAULT_CONFIG.num_queues,
      time_slice: defaultValues.time_slice || DEFAULT_CONFIG.time_slice,
      boost_interval:
        defaultValues.boost_interval || DEFAULT_CONFIG.boost_interval,
      aging_threshold:
        defaultValues.aging_threshold || DEFAULT_CONFIG.aging_threshold,
    });
  }, [defaultValues]);

  const handleSubmit = (values: FormSchemaType) => {
    const configData: SimulationConfig = {
      num_queues: values.num_queues,
      time_slice: values.time_slice,
      boost_interval: values.boost_interval,
      aging_threshold: values.aging_threshold,
    };

    // Set this as active configuration
    setActiveConfig(configData);

    // Update config info
    setConfigInfo({
      lastApplied: new Date(),
      appliedTo: configInfo.appliedTo + 1,
    });

    // Call the parent component's onSubmit
    onSubmit(configData);

    // Show success feedback with more context
    setSubmitted(true);
    toast.success("Configuration Applied", {
      description: `Simulation will use ${configData.num_queues} queues with ${configData.time_slice}ms time slice`,
    });

    // Reset the feedback after a short delay
    setTimeout(() => setSubmitted(false), 2000);
  };

  const resetToDefaults = () => {
    setIsResetting(true);

    const defaultConfig = DEFAULT_CONFIG;

    form.reset(defaultConfig);
    setActiveConfig(defaultConfig);
    onSubmit(defaultConfig);

    toast.info("Configuration Reset", {
      description: "Settings have been reset to defaults",
    });

    setTimeout(() => setIsResetting(false), 1000);
  };

  const isChanged = () => {
    if (!activeConfig) return false;

    const currentValues = form.getValues();
    return (
      currentValues.num_queues !== activeConfig.num_queues ||
      currentValues.time_slice !== activeConfig.time_slice ||
      currentValues.boost_interval !== activeConfig.boost_interval ||
      currentValues.aging_threshold !== activeConfig.aging_threshold
    );
  };

  const timeQuantumDetails = () => {
    const baseSlice =
      form.getValues().time_slice || activeConfig?.time_slice || 2;
    const numQueues =
      form.getValues().num_queues || activeConfig?.num_queues || 4;

    return Array.from({ length: numQueues }, (_, i) => ({
      queue: i,
      quantum: baseSlice * (i + 1),
      color: QUEUE_COLORS[i % QUEUE_COLORS.length],
    }));
  };

  return (
    <Card className="border-gray-100 dark:border-gray-700 relative overflow-hidden">
      {activeConfig && (
        <div className="absolute top-0 left-0 w-full h-1.5">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full" />
        </div>
      )}

      <CardHeader className="border-b border-gray-100 dark:border-gray-700 flex flex-row justify-between items-center">
        <motion.div
          className="flex items-center gap-2"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Settings className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <CardTitle className="text-gray-700 dark:text-gray-300">
            Simulation Configuration
            {activeConfig && (
              <Badge
                variant="outline"
                className="ml-2 bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
              >
                Active
              </Badge>
            )}
          </CardTitle>
        </motion.div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-gray-500"
                onClick={resetToDefaults}
                disabled={isSimulationRunning || isResetting}
              >
                <AnimatePresence mode="wait">
                  {isResetting ? (
                    <motion.div
                      key="spinning"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1, ease: "linear" }}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="static"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reset to defaults</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>

      <CardContent className="pt-4">
        {activeConfig && (
          <>
            <div className="mb-4 grid grid-cols-2 gap-4 px-3 py-2 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50">
              <div className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Queues:
                </span>
                <span className="ml-2 font-medium text-gray-800 dark:text-gray-200">
                  {activeConfig.num_queues}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Time Slice:
                </span>
                <span className="ml-2 font-medium text-gray-800 dark:text-gray-200">
                  {activeConfig.time_slice}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">Boost:</span>
                <span className="ml-2 font-medium text-gray-800 dark:text-gray-200">
                  {activeConfig.boost_interval}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">Aging:</span>
                <span className="ml-2 font-medium text-gray-800 dark:text-gray-200">
                  {activeConfig.aging_threshold}
                </span>
              </div>
            </div>

            <div className="mb-4 px-3 py-2 rounded-md bg-gray-50 dark:bg-gray-900/20 border border-gray-100 dark:border-gray-800/50">
              <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Time Quantum per Queue
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {timeQuantumDetails().map((item) => (
                  <motion.div
                    key={item.queue}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: item.queue * 0.1 }}
                  >
                    <span className="text-xs w-14 text-gray-600 dark:text-gray-400">
                      Queue {item.queue}:
                    </span>
                    <div
                      className="h-4 rounded-sm transition-all duration-300"
                      style={{
                        width: `${item.quantum * 8}px`,
                        backgroundColor: item.color,
                      }}
                    ></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {item.quantum} units
                    </span>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">
                Lower queue numbers have higher priority but smaller time
                quantum.
              </p>
            </div>

            {configInfo.lastApplied && (
              <div className="mb-4 text-xs text-gray-500 dark:text-gray-400 italic text-center">
                Last applied {configInfo.lastApplied.toLocaleTimeString()}
                {configInfo.appliedTo > 0 &&
                  ` (affects ${configInfo.appliedTo} process sets)`}
              </div>
            )}
          </>
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
                className={
                  activeConfig &&
                  form.getValues().num_queues !== activeConfig.num_queues
                    ? "ring-2 ring-blue-200 dark:ring-blue-800 rounded-lg p-3"
                    : "p-3"
                }
              >
                <FormField
                  control={form.control}
                  name="num_queues"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 flex items-center justify-between">
                        <div className="flex items-center">
                          <span>Number of Queues</span>
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
                                <p>{CONFIG_TOOLTIPS.num_queues}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        {activeConfig &&
                          field.value !== activeConfig.num_queues && (
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300">
                              Changed
                            </Badge>
                          )}
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                        Number of priority levels in MLFQ (1-10)
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="4" // Tambahkan placeholder yang sesuai dengan default
                          {...field}
                          className="border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500"
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
                className={
                  activeConfig &&
                  form.getValues().time_slice !== activeConfig.time_slice
                    ? "ring-2 ring-blue-200 dark:ring-blue-800 rounded-lg p-3"
                    : "p-3"
                }
              >
                <FormField
                  control={form.control}
                  name="time_slice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 flex items-center justify-between">
                        <span>Time Slice</span>
                        {activeConfig &&
                          field.value !== activeConfig.time_slice && (
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300">
                              Changed
                            </Badge>
                          )}
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                        Base time quantum for highest priority queue
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500"
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
                className={
                  activeConfig &&
                  form.getValues().boost_interval !==
                    activeConfig.boost_interval
                    ? "ring-2 ring-blue-200 dark:ring-blue-800 rounded-lg p-3"
                    : "p-3"
                }
              >
                <FormField
                  control={form.control}
                  name="boost_interval"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 flex items-center justify-between">
                        <span>Boost Interval</span>
                        {activeConfig &&
                          field.value !== activeConfig.boost_interval && (
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300">
                              Changed
                            </Badge>
                          )}
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                        Time interval for priority boost (time units)
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500"
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
                className={
                  activeConfig &&
                  form.getValues().aging_threshold !==
                    activeConfig.aging_threshold
                    ? "ring-2 ring-blue-200 dark:ring-blue-800 rounded-lg p-3"
                    : "p-3"
                }
              >
                <FormField
                  control={form.control}
                  name="aging_threshold"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 flex items-center justify-between">
                        <span>Aging Threshold</span>
                        {activeConfig &&
                          field.value !== activeConfig.aging_threshold && (
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300">
                              Changed
                            </Badge>
                          )}
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                        Time before process aging occurs (time units)
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500"
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
              whileHover={{ scale: isChanged() ? 1.01 : 1 }}
              whileTap={{ scale: isChanged() ? 0.99 : 1 }}
            >
              <Button
                type="submit"
                className={`w-full flex gap-2 items-center justify-center transition-all duration-300 ${
                  submitted
                    ? "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                    : isChanged()
                    ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 shadow-md"
                    : "bg-gray-400 dark:bg-gray-600"
                } text-white`}
                disabled={isSimulationRunning || (!isChanged() && !submitted)}
              >
                {submitted ? (
                  <>
                    <Check className="h-4 w-4" />
                    Configuration Applied
                  </>
                ) : isChanged() ? (
                  "Apply Configuration"
                ) : (
                  "No Changes to Apply"
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
