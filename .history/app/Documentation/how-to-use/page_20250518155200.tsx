"use client";

import { motion } from "framer-motion";
import Documentation from "@/components/Documentation";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaRedo,
  FaPlus,
  FaCog,
  FaChartBar,
} from "react-icons/fa";

export default function HowToUsePage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <Documentation>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="prose prose-gray dark:prose-invert max-w-none"
      >
        <motion.h1
          variants={item}
          className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          How to Use MLFQ Simulation
        </motion.h1>

        <motion.div variants={item} className="mb-12">
          <div className="border-l-4 border-blue-500 pl-4 mb-6">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              <FaPlus className="mr-2" /> Creating Processes
            </h2>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <p className="mb-3">To create a new process in the simulation:</p>
            <ol className="space-y-3 list-decimal list-inside">
              <li className="pl-2">
                Click the{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  &quot;Add Process&quot;
                </span>{" "}
                button in the control panel
              </li>
              <li className="pl-2">
                Set the process parameters:
                <ul className="pl-6 mt-2 space-y-2 list-disc">
                  <li>
                    Process ID{" "}
                    <span className="text-gray-500 dark:text-gray-400">
                      (automatically assigned)
                    </span>
                  </li>
                  <li>Arrival Time</li>
                  <li>Burst Time</li>
                  <li>
                    Priority{" "}
                    <span className="text-gray-500 dark:text-gray-400">
                      (optional)
                    </span>
                  </li>
                </ul>
              </li>
              <li className="pl-2">
                Click{" "}
                <span className="font-semibold text-green-600 dark:text-green-400">
                  &quot;Create&quot;
                </span>{" "}
                to add the process to the simulation
              </li>
            </ol>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-12">
          <div className="border-l-4 border-purple-500 pl-4 mb-6">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
              <FaCog className="mr-2" /> Configuring MLFQ Parameters
            </h2>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <p className="mb-3">
              You can customize the MLFQ algorithm parameters:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <li className="flex items-center bg-white dark:bg-gray-700 p-3 rounded-md shadow-sm">
                <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                <span>
                  Number of queues{" "}
                  <span className="text-gray-500 dark:text-gray-400">
                    (default: 3)
                  </span>
                </span>
              </li>
              <li className="flex items-center bg-white dark:bg-gray-700 p-3 rounded-md shadow-sm">
                <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                <span>Time quantum for each queue</span>
              </li>
              <li className="flex items-center bg-white dark:bg-gray-700 p-3 rounded-md shadow-sm">
                <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                <span>Aging threshold</span>
              </li>
              <li className="flex items-center bg-white dark:bg-gray-700 p-3 rounded-md shadow-sm">
                <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                <span>Priority boost interval</span>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-12">
          <div className="border-l-4 border-green-500 pl-4 mb-6">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">
              <FaPlay className="mr-2" /> Running the Simulation
            </h2>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <p className="mb-3">To start the simulation:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full mr-3">
                  <FaPlay className="text-green-600 dark:text-green-400" />
                </div>
                <span>
                  Click the <span className="font-semibold">Start</span> button
                  to begin
                </span>
              </div>
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3">
                  <FaStepForward className="text-blue-600 dark:text-blue-400" />
                </div>
                <span>
                  Use <span className="font-semibold">Step</span> to advance one
                  time unit
                </span>
              </div>
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full mr-3">
                  <FaPause className="text-amber-600 dark:text-amber-400" />
                </div>
                <span>
                  Use <span className="font-semibold">Pause</span> to stop
                  temporarily
                </span>
              </div>
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-red-100 dark:bg-red-900 p-2 rounded-full mr-3">
                  <FaRedo className="text-red-600 dark:text-red-400" />
                </div>
                <span>
                  Use <span className="font-semibold">Reset</span> to start over
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-12">
          <div className="border-l-4 border-amber-500 pl-4 mb-6">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-amber-600 dark:text-amber-400">
              <FaChartBar className="mr-2" /> Viewing Results
            </h2>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <p className="mb-4">
              The simulation provides several ways to view the results:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="inline-block bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400 p-1 rounded mr-2">
                  ✓
                </span>
                <span>Real-time visualization of process execution</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400 p-1 rounded mr-2">
                  ✓
                </span>
                <span>Queue status and process movement between queues</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400 p-1 rounded mr-2">
                  ✓
                </span>
                <div>
                  <p>Performance metrics:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 pl-4">
                    <div className="flex items-center bg-white dark:bg-gray-700 p-2 rounded-md shadow-sm">
                      <div className="h-1 w-1 rounded-full bg-amber-500 mr-2"></div>
                      <span>Average Turnaround Time</span>
                    </div>
                    <div className="flex items-center bg-white dark:bg-gray-700 p-2 rounded-md shadow-sm">
                      <div className="h-1 w-1 rounded-full bg-amber-500 mr-2"></div>
                      <span>Average Waiting Time</span>
                    </div>
                    <div className="flex items-center bg-white dark:bg-gray-700 p-2 rounded-md shadow-sm">
                      <div className="h-1 w-1 rounded-full bg-amber-500 mr-2"></div>
                      <span>CPU Utilization</span>
                    </div>
                    <div className="flex items-center bg-white dark:bg-gray-700 p-2 rounded-md shadow-sm">
                      <div className="h-1 w-1 rounded-full bg-amber-500 mr-2"></div>
                      <span>Process completion order</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </Documentation>
  );
}
