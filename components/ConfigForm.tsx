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
    toast.success("Konfigurasi Berhasil Diterapkan", {
      description: `Simulasi akan menggunakan ${configData.num_queues} antrian dengan ${configData.time_slice} unit waktu slice`,
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

    toast.info("Konfigurasi Direset", {
      description: "Pengaturan telah dikembalikan ke nilai default",
    });

    setTimeout(() => setIsResetting(false), 1000);
  };

  const isChanged = () => {
    if (!activeConfig) return true; // Allow initial submission

    const currentValues = form.getValues();
    return (
      Number(currentValues.num_queues) !== Number(activeConfig.num_queues) ||
      Number(currentValues.time_slice) !== Number(activeConfig.time_slice) ||
      Number(currentValues.boost_interval) !== Number(activeConfig.boost_interval) ||
      Number(currentValues.aging_threshold) !== Number(activeConfig.aging_threshold)
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
    <Card className="border-gray-100 dark:border-gray-700 relative overflow-hidden shadow-lg">
      {activeConfig && (
        <div className="absolute top-0 left-0 w-full h-2">
          <div className="bg-gradient-to-r from-purple-400 via-blue-500 to-green-500 h-full animate-pulse" />
        </div>
      )}

      <CardHeader className="border-b border-gray-100 dark:border-gray-700 flex flex-row justify-between items-center bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <motion.div
          className="flex items-center gap-2"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Settings className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <CardTitle className="text-gray-700 dark:text-gray-300">
            Konfigurasi Simulasi
            {activeConfig && (
              <Badge
                variant="outline"
                className="ml-2 bg-purple-50 text-purple-700 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700"
              >
                Aktif
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
                className="h-8 w-8 p-0 text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20"
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
              <p>Reset ke default</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>

      <CardContent className="pt-4">
        {activeConfig && (
          <>
            <div className="mb-4 grid grid-cols-2 gap-4 px-3 py-3 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800/50">
              <div className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Antrian:
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

            <div className="mb-4 px-3 py-3 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800/50">
              <h4 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                Kuantum Waktu per Antrian
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {timeQuantumDetails().map((item) => (
                  <motion.div
                    key={item.queue}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: item.queue * 0.1 }}
                  >
                    <span className="text-xs w-16 text-gray-600 dark:text-gray-400 font-medium">
                      Antrian {item.queue}:
                    </span>
                    <div
                      className="h-4 rounded-full transition-all duration-300 shadow-sm"
                      style={{
                        width: `${Math.max(item.quantum * 8, 24)}px`,
                        backgroundColor: item.color,
                      }}
                    ></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                      {item.quantum} unit
                    </span>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs mt-3 text-gray-500 dark:text-gray-400 italic">
                Nomor antrian yang lebih kecil memiliki prioritas lebih tinggi namun kuantum waktu lebih kecil.
              </p>
            </div>

            {configInfo.lastApplied && (
              <div className="mb-4 text-xs text-gray-500 dark:text-gray-400 italic text-center">
                Terakhir diterapkan {configInfo.lastApplied.toLocaleTimeString()}
                {configInfo.appliedTo > 0 &&
                  ` (mempengaruhi ${configInfo.appliedTo} set proses)`}
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
                    ? "ring-2 ring-purple-200 dark:ring-purple-800 rounded-lg p-3"
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
                          <span>Jumlah Antrian</span>
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
                            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300">
                              Berubah
                            </Badge>
                          )}
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                        Jumlah level prioritas dalam MLFQ (1-10)
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="4"
                          {...field}
                          className="border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-500 focus:ring-purple-500/20"
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
                        <div className="flex items-center">
                          <span>Time Slice</span>
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
                                <p>{CONFIG_TOOLTIPS.time_slice}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        {activeConfig &&
                          field.value !== activeConfig.time_slice && (
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300">
                              Berubah
                            </Badge>
                          )}
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                        Kuantum waktu dasar untuk antrian prioritas tertinggi
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
                className={
                  activeConfig &&
                  form.getValues().boost_interval !==
                    activeConfig.boost_interval
                    ? "ring-2 ring-green-200 dark:ring-green-800 rounded-lg p-3"
                    : "p-3"
                }
              >
                <FormField
                  control={form.control}
                  name="boost_interval"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 flex items-center justify-between">
                        <div className="flex items-center">
                          <span>Interval Boost</span>
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
                                <p>{CONFIG_TOOLTIPS.boost_interval}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        {activeConfig &&
                          field.value !== activeConfig.boost_interval && (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300">
                              Berubah
                            </Badge>
                          )}
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                        Interval waktu untuk boost prioritas (unit waktu)
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="border-gray-200 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-500 focus:ring-green-500/20"
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
                    ? "ring-2 ring-purple-200 dark:ring-purple-800 rounded-lg p-3"
                    : "p-3"
                }
              >
                <FormField
                  control={form.control}
                  name="aging_threshold"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 flex items-center justify-between">
                        <div className="flex items-center">
                          <span>Ambang Batas Aging</span>
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
                                <p>{CONFIG_TOOLTIPS.aging_threshold}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        {activeConfig &&
                          field.value !== activeConfig.aging_threshold && (
                            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300">
                              Berubah
                            </Badge>
                          )}
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                        Waktu sebelum proses aging terjadi (unit waktu)
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-500 focus:ring-purple-500/20"
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
              whileHover={{ scale: isChanged() ? 1.02 : 1 }}
              whileTap={{ scale: isChanged() ? 0.98 : 1 }}
            >
              <Button
                type="submit"
                className={`w-full flex gap-2 items-center justify-center transition-all duration-300 font-medium ${
                  submitted
                    ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 dark:from-green-600 dark:to-green-700 shadow-lg"
                    : isChanged()
                    ? "bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 hover:from-purple-600 hover:via-blue-600 hover:to-green-600 shadow-lg"
                    : "bg-gray-400 dark:bg-gray-600"
                } text-white`}
                disabled={isSimulationRunning}
              >
                {submitted ? (
                  <>
                    <Check className="h-4 w-4" />
                    Konfigurasi Berhasil Diterapkan
                  </>
                ) : isChanged() ? (
                  "Terapkan Konfigurasi"
                ) : (
                  "Tidak Ada Perubahan untuk Diterapkan"
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