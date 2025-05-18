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
    hidden: { opacity: 0, y: 5 },
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
          className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100"
        >
          How to Use MLFQ Simulation
        </motion.h1>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              <FaPlus className="mr-2 text-gray-500 dark:text-gray-400" />{" "}
              Creating Processes
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="mb-3 text-gray-600 dark:text-gray-400">
              To create a new process in the simulation:
            </p>
            <ol className="space-y-3 list-decimal list-inside text-gray-600 dark:text-gray-400">
              <li className="pl-2">
                Click the{" "}
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  "Add Process"
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
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  "Create"
                </span>{" "}
                to add the process to the simulation
              </li>
            </ol>
          </div>
        </motion.div>

        {/* Process Parameters Explained section */}
        <motion.div variants={item} className="mb-8">
          <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              <FaInfo className="mr-2 text-gray-500 dark:text-gray-400" />{" "}
              Process Parameters Explained
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Understanding each parameter when defining a process:
            </p>

            <div className="space-y-6">
              <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Process ID
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  A unique identifier for the process (e.g., P1, P2, etc.)
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 rounded mt-2 p-2 text-sm border border-gray-200 dark:border-gray-600">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    Example:
                  </span>{" "}
                  P1, Process_A, Job3
                </div>
              </div>

              <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Arrival Time
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  When the process enters the ready queue (time units)
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 rounded mt-2 p-2 text-sm border border-gray-200 dark:border-gray-600">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    Example:
                  </span>{" "}
                  0 means the process is available at the beginning of
                  simulation, 5 means it arrives after 5 time units
                </div>
              </div>

              <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  CPU Burst
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Time required for CPU execution (time units)
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 rounded mt-2 p-2 text-sm border border-gray-200 dark:border-gray-600">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    Example:
                  </span>{" "}
                  8 means the process needs 8 time units of CPU time to complete
                  its execution
                </div>
              </div>

              <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  IO Burst
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Time spent in I/O operations (time units)
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 rounded mt-2 p-2 text-sm border border-gray-200 dark:border-gray-600">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    Example:
                  </span>{" "}
                  3 means the process will perform I/O operations for 3 time
                  units after using the CPU
                </div>
              </div>

              <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Total Time (Optional)
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Total execution time if known (time units)
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 rounded mt-2 p-2 text-sm border border-gray-200 dark:border-gray-600">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    Example:
                  </span>{" "}
                  0 means undefined, 10 means the process will complete after 10
                  time units
                </div>
              </div>

              <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  CPU Variance
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Variability in CPU execution times (0-1, 0=constant, 1=highly
                  variable)
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 rounded mt-2 p-2 text-sm border border-gray-200 dark:border-gray-600">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    Example:
                  </span>{" "}
                  0.0 means CPU bursts will be exactly as specified, 0.5 means
                  moderate variability, 1.0 means high unpredictability in
                  execution times
                </div>
              </div>

              <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  IO Variance
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Variability in I/O operation times (0-1, 0=constant, 1=highly
                  variable)
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 rounded mt-2 p-2 text-sm border border-gray-200 dark:border-gray-600">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    Example:
                  </span>{" "}
                  0.0 means I/O times will be exactly as specified, 0.5 means
                  moderate variability, 1.0 means high unpredictability in I/O
                  times
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md">
              <p className="flex items-start">
                <FaTerminal className="text-gray-500 dark:text-gray-400 mr-2 mt-1" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Pro tip:</strong> For realistic simulations, consider
                  using some variance (0.1-0.3) to model real-world processes
                  where execution times can fluctuate slightly.
                </span>
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              <FaCog className="mr-2 text-gray-500 dark:text-gray-400" />{" "}
              Configuring MLFQ Parameters
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="mb-3 text-gray-600 dark:text-gray-400">
              You can customize the MLFQ algorithm parameters:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <li className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Number of queues{" "}
                  <span className="text-gray-500 dark:text-gray-400">
                    (default: 3)
                  </span>
                </span>
              </li>
              <li className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Time quantum for each queue
                </span>
              </li>
              <li className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Aging threshold
                </span>
              </li>
              <li className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Priority boost interval
                </span>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              <FaPlay className="mr-2 text-gray-500 dark:text-gray-400" />{" "}
              Running the Simulation
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="mb-3 text-gray-600 dark:text-gray-400">
              To start the simulation:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                  <FaPlay className="text-gray-500 dark:text-gray-400" />
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  Click the{" "}
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    Start
                  </span>{" "}
                  button to begin
                </span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                  <FaStepForward className="text-gray-500 dark:text-gray-400" />
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  Use{" "}
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    Step
                  </span>{" "}
                  to advance one time unit
                </span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                  <FaPause className="text-gray-500 dark:text-gray-400" />
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  Use{" "}
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    Pause
                  </span>{" "}
                  to stop temporarily
                </span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                  <FaRedo className="text-gray-500 dark:text-gray-400" />
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  Use{" "}
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    Reset
                  </span>{" "}
                  to start over
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              <FaChartBar className="mr-2 text-gray-500 dark:text-gray-400" />{" "}
              Viewing Results
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              The simulation provides several ways to view the results:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-1 rounded mr-2 border border-gray-200 dark:border-gray-600">
                  ✓
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  Real-time visualization of process execution
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-1 rounded mr-2 border border-gray-200 dark:border-gray-600">
                  ✓
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  Queue status and process movement between queues
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-1 rounded mr-2 border border-gray-200 dark:border-gray-600">
                  ✓
                </span>
                <div className="text-gray-600 dark:text-gray-400">
                  <p>Performance metrics:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 pl-4">
                    <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-2 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                      <div className="h-1 w-1 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                      <span>Average Turnaround Time</span>
                    </div>
                    <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-2 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                      <div className="h-1 w-1 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                      <span>Average Waiting Time</span>
                    </div>
                    <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-2 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                      <div className="h-1 w-1 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                      <span>CPU Utilization</span>
                    </div>
                    <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-2 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                      <div className="h-1 w-1 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
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
