"use client";

import { motion } from "framer-motion";
import Documentation from "@/components/Documentation";
import {
  FaLayerGroup,
  FaClock,
  FaExchangeAlt,
  FaUserClock,
  FaCode,
  FaChartLine,
  FaCog,
} from "react-icons/fa";

export default function HowItWorksPage() {
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
          How MLFQ Simulation Works
        </motion.h1>

        <motion.div variants={item} className="mb-12">
          <div className="border-l-4 border-blue-500 pl-4 mb-6">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              <FaLayerGroup className="mr-2" /> MLFQ Algorithm Overview
            </h2>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <p className="mb-3">
              The Multi-Level Feedback Queue (MLFQ) algorithm is a CPU
              scheduling algorithm that attempts to optimize for both
              interactive and batch processes. It uses multiple queues with
              different priority levels and implements feedback to adjust
              process priorities based on their behavior.
            </p>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
              <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Key benefit: MLFQ achieves the benefits of both SJF (shortest
                job first) and priority scheduling without requiring prior
                knowledge of process execution times.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-12">
          <div className="border-l-4 border-purple-500 pl-4 mb-6">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
              Key Components
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="flex items-center text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400">
                <FaLayerGroup className="mr-2" /> 1. Multiple Priority Queues
              </h3>
              <p className="mb-3">
                The algorithm maintains several queues, each with a different
                priority level:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex items-center bg-white dark:bg-gray-700 p-3 rounded-md shadow-sm">
                  <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                  <span>
                    Highest priority queue (Q0) - For interactive processes
                  </span>
                </div>
                <div className="flex items-center bg-white dark:bg-gray-700 p-3 rounded-md shadow-sm">
                  <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                  <span>
                    Middle priority queues (Q1, Q2) - For mixed workloads
                  </span>
                </div>
                <div className="flex items-center bg-white dark:bg-gray-700 p-3 rounded-md shadow-sm">
                  <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                  <span>Lowest priority queue (Q3) - For batch processes</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="flex items-center text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400">
                <FaClock className="mr-2" /> 2. Time Quantum
              </h3>
              <p className="mb-3">Each queue has its own time quantum:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 p-1 rounded mr-2">
                    ✓
                  </span>
                  <span>Higher priority queues have shorter time quanta</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 p-1 rounded mr-2">
                    ✓
                  </span>
                  <span>Lower priority queues have longer time quanta</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 p-1 rounded mr-2">
                    ✓
                  </span>
                  <span>
                    This helps interactive processes get quick response times
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="flex items-center text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400">
                <FaExchangeAlt className="mr-2" /> 3. Priority Adjustment
              </h3>
              <p className="mb-3">
                Processes move between queues based on their behavior:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 p-1 rounded mr-2">
                    1
                  </span>
                  <span>New processes start in the highest priority queue</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 p-1 rounded mr-2">
                    2
                  </span>
                  <span>
                    If a process uses its entire time quantum, it moves to a
                    lower priority queue
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 p-1 rounded mr-2">
                    3
                  </span>
                  <span>
                    If a process gives up the CPU before its time quantum
                    expires, it stays in the same queue
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="flex items-center text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400">
                <FaUserClock className="mr-2" /> 4. Aging
              </h3>
              <p className="mb-3">
                To prevent starvation, the algorithm implements aging:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center bg-white dark:bg-gray-700 p-3 rounded-md shadow-sm">
                  <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                  <span>
                    Processes that wait too long in lower priority queues get
                    boosted to higher priority
                  </span>
                </div>
                <div className="flex items-center bg-white dark:bg-gray-700 p-3 rounded-md shadow-sm">
                  <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                  <span>This ensures that no process waits indefinitely</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-12">
          <div className="border-l-4 border-green-500 pl-4 mb-6">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">
              <FaCode className="mr-2" /> Simulation Implementation
            </h2>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <p className="mb-3">Our implementation includes:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full mr-3">
                  <FaLayerGroup className="text-green-600 dark:text-green-400" />
                </div>
                <span>
                  Real-time visualization of process movement between queues
                </span>
              </div>
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full mr-3">
                  <FaExchangeAlt className="text-green-600 dark:text-green-400" />
                </div>
                <span>Interactive process creation and management</span>
              </div>
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full mr-3">
                  <FaCog className="text-green-600 dark:text-green-400" />
                </div>
                <span>Customizable MLFQ parameters</span>
              </div>
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full mr-3">
                  <FaChartLine className="text-green-600 dark:text-green-400" />
                </div>
                <span>Performance metrics calculation</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-12">
          <div className="border-l-4 border-amber-500 pl-4 mb-6">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-amber-600 dark:text-amber-400">
              <FaChartLine className="mr-2" /> Performance Metrics
            </h2>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <p className="mb-4">
              The simulation tracks several important metrics:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              <div className="flex items-center bg-white dark:bg-gray-700 p-2 rounded-md shadow-sm">
                <div className="h-1 w-1 rounded-full bg-amber-500 mr-2"></div>
                <span>
                  <span className="font-medium">Turnaround Time</span> - Total
                  time from submission to completion
                </span>
              </div>
              <div className="flex items-center bg-white dark:bg-gray-700 p-2 rounded-md shadow-sm">
                <div className="h-1 w-1 rounded-full bg-amber-500 mr-2"></div>
                <span>
                  <span className="font-medium">Waiting Time</span> - Time spent
                  waiting in queues
                </span>
              </div>
              <div className="flex items-center bg-white dark:bg-gray-700 p-2 rounded-md shadow-sm">
                <div className="h-1 w-1 rounded-full bg-amber-500 mr-2"></div>
                <span>
                  <span className="font-medium">Response Time</span> - Time
                  until first CPU allocation
                </span>
              </div>
              <div className="flex items-center bg-white dark:bg-gray-700 p-2 rounded-md shadow-sm">
                <div className="h-1 w-1 rounded-full bg-amber-500 mr-2"></div>
                <span>
                  <span className="font-medium">CPU Utilization</span> -
                  Percentage of time CPU is busy
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Documentation>
  );
}
