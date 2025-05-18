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
  FaInfo,
  FaTerminal,
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

        {/* New section explaining process parameters */}
        <motion.div variants={item} className="mb-12">
          <div className="border-l-4 border-indigo-500 pl-4 mb-6">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">
              <FaInfo className="mr-2" /> Process Parameters Explained
            </h2>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <p className="mb-4">
              Understanding each parameter when defining a process:
            </p>

            <div className="space-y-6">
              <div className="border-l-2 border-indigo-300 dark:border-indigo-700 pl-4">
                <h3 className="text-lg font-medium text-indigo-600 dark:text-indigo-400">
                  Process ID
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  A unique identifier for the process (e.g., P1, P2, etc.)
                </p>
                <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded mt-2 p-2 text-sm">
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                    Example:
                  </span>{" "}
                  P1, Process_A, Job3
                </div>
              </div>

              <div className="border-l-2 border-indigo-300 dark:border-indigo-700 pl-4">
                <h3 className="text-lg font-medium text-indigo-600 dark:text-indigo-400">
                  Arrival Time
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  When the process enters the ready queue (time units)
                </p>
                <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded mt-2 p-2 text-sm">
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                    Example:
                  </span>{" "}
                  0 means the process is available at the beginning of
                  simulation, 5 means it arrives after 5 time units
                </div>
              </div>

              <div className="border-l-2 border-indigo-300 dark:border-indigo-700 pl-4">
                <h3 className="text-lg font-medium text-indigo-600 dark:text-indigo-400">
                  CPU Burst
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Time required for CPU execution (time units)
                </p>
                <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded mt-2 p-2 text-sm">
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                    Example:
                  </span>{" "}
                  8 means the process needs 8 time units of CPU time to complete
                  its execution
                </div>
              </div>

              <div className="border-l-2 border-indigo-300 dark:border-indigo-700 pl-4">
                <h3 className="text-lg font-medium text-indigo-600 dark:text-indigo-400">
                  IO Burst
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Time spent in I/O operations (time units)
                </p>
                <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded mt-2 p-2 text-sm">
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                    Example:
                  </span>{" "}
                  3 means the process will perform I/O operations for 3 time
                  units after using the CPU
                </div>
              </div>

              <div className="border-l-2 border-indigo-300 dark:border-indigo-700 pl-4">
                <h3 className="text-lg font-medium text-indigo-600 dark:text-indigo-400">
                  Total Time (Optional)
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Total execution time if known (time units)
                </p>
                <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded mt-2 p-2 text-sm">
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                    Example:
                  </span>{" "}
                  0 means undefined, 10 means the process will complete after 10
                  time units
                </div>
              </div>

              <div className="border-l-2 border-indigo-300 dark:border-indigo-700 pl-4">
                <h3 className="text-lg font-medium text-indigo-600 dark:text-indigo-400">
                  CPU Variance
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Variability in CPU execution times (0-1, 0=constant, 1=highly
                  variable)
                </p>
                <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded mt-2 p-2 text-sm">
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                    Example:
                  </span>{" "}
                  0.0 means CPU bursts will be exactly as specified, 0.5 means
                  moderate variability, 1.0 means high unpredictability in
                  execution times
                </div>
              </div>

              <div className="border-l-2 border-indigo-300 dark:border-indigo-700 pl-4">
                <h3 className="text-lg font-medium text-indigo-600 dark:text-indigo-400">
                  IO Variance
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Variability in I/O operation times (0-1, 0=constant, 1=highly
                  variable)
                </p>
                <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded mt-2 p-2 text-sm">
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                    Example:
                  </span>{" "}
                  0.0 means I/O times will be exactly as specified, 0.5 means
                  moderate variability, 1.0 means high unpredictability in I/O
                  times
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md">
              <p className="flex items-start">
                <FaTerminal className="text-amber-500 mr-2 mt-1" />
                <span className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Pro tip:</strong> For realistic simulations, consider
                  using some variance (0.1-0.3) to model real-world processes
                  where execution times can fluctuate slightly.
                </span>
              </p>
            </div>
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
