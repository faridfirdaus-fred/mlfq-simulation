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
          How MLFQ Simulation Works
        </motion.h1>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              <FaLayerGroup className="mr-2 text-gray-500 dark:text-gray-400" />{" "}
              MLFQ Algorithm Overview
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="mb-3 text-gray-600 dark:text-gray-400">
              The Multi-Level Feedback Queue (MLFQ) algorithm is a CPU
              scheduling algorithm that attempts to optimize for both
              interactive and batch processes. It uses multiple queues with
              different priority levels and implements feedback to adjust
              process priorities based on their behavior.
            </p>
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Key benefit: MLFQ achieves the benefits of both SJF (shortest
                job first) and priority scheduling without requiring prior
                knowledge of process execution times.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              <FaLayerGroup className="mr-2 text-gray-500 dark:text-gray-400" />{" "}
              Key Components
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="flex items-center text-xl font-semibold mb-3 text-gray-700 dark:text-gray-300">
                <FaLayerGroup className="mr-2 text-gray-500 dark:text-gray-400" />{" "}
                1. Multiple Priority Queues
              </h3>
              <p className="mb-3 text-gray-600 dark:text-gray-400">
                The algorithm maintains several queues, each with a different
                priority level:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-400">
                    Highest priority queue (Q0) - For interactive processes
                  </span>
                </div>
                <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-400">
                    Middle priority queues (Q1, Q2) - For mixed workloads
                  </span>
                </div>
                <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-400">
                    Lowest priority queue (Q3) - For batch processes
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="flex items-center text-xl font-semibold mb-3 text-gray-700 dark:text-gray-300">
                <FaClock className="mr-2 text-gray-500 dark:text-gray-400" /> 2.
                Time Quantum
              </h3>
              <p className="mb-3 text-gray-600 dark:text-gray-400">
                Each queue has its own time quantum:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-1 rounded mr-2 border border-gray-200 dark:border-gray-600">
                    ✓
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Higher priority queues have shorter time quanta
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-1 rounded mr-2 border border-gray-200 dark:border-gray-600">
                    ✓
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Lower priority queues have longer time quanta
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-1 rounded mr-2 border border-gray-200 dark:border-gray-600">
                    ✓
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    This helps interactive processes get quick response times
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="flex items-center text-xl font-semibold mb-3 text-gray-700 dark:text-gray-300">
                <FaExchangeAlt className="mr-2 text-gray-500 dark:text-gray-400" />{" "}
                3. Priority Adjustment
              </h3>
              <p className="mb-3 text-gray-600 dark:text-gray-400">
                Processes move between queues based on their behavior:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-1 rounded mr-2 border border-gray-200 dark:border-gray-600">
                    1
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    New processes start in the highest priority queue
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-1 rounded mr-2 border border-gray-200 dark:border-gray-600">
                    2
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    If a process uses its entire time quantum, it moves to a
                    lower priority queue
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-1 rounded mr-2 border border-gray-200 dark:border-gray-600">
                    3
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    If a process gives up the CPU before its time quantum
                    expires, it stays in the same queue
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="flex items-center text-xl font-semibold mb-3 text-gray-700 dark:text-gray-300">
                <FaUserClock className="mr-2 text-gray-500 dark:text-gray-400" />{" "}
                4. Aging
              </h3>
              <p className="mb-3 text-gray-600 dark:text-gray-400">
                To prevent starvation, the algorithm implements aging:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-400">
                    Processes that wait too long in lower priority queues get
                    boosted to higher priority
                  </span>
                </div>
                <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-400">
                    This ensures that no process waits indefinitely
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              <FaCode className="mr-2 text-gray-500 dark:text-gray-400" />{" "}
              Simulation Implementation
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="mb-3 text-gray-600 dark:text-gray-400">
              Our implementation includes:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                  <FaLayerGroup className="text-gray-500 dark:text-gray-400" />
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  Real-time visualization of process movement between queues
                </span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                  <FaExchangeAlt className="text-gray-500 dark:text-gray-400" />
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  Interactive process creation and management
                </span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                  <FaCog className="text-gray-500 dark:text-gray-400" />
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  Customizable MLFQ parameters
                </span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                  <FaChartLine className="text-gray-500 dark:text-gray-400" />
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  Performance metrics calculation
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              <FaChartLine className="mr-2 text-gray-500 dark:text-gray-400" />{" "}
              Performance Metrics
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              The simulation tracks several important metrics:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-2 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Turnaround Time
                  </span>{" "}
                  - Total time from submission to completion
                </span>
              </div>
              <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-2 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Waiting Time
                  </span>{" "}
                  - Time spent waiting in queues
                </span>
              </div>
              <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-2 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Response Time
                  </span>{" "}
                  - Time until first CPU allocation
                </span>
              </div>
              <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-2 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    CPU Utilization
                  </span>{" "}
                  - Percentage of time CPU is busy
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Documentation>
  );
}
