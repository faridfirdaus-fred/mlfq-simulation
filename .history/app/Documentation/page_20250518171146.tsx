"use client";

import { motion } from "framer-motion";
import Documentation from "@/components/Documentation";
import {
  FaBook,
  FaInfoCircle,
  FaRocket,
  FaList,
  FaLaptopCode,
  FaTools,
  FaCode,
  FaQuestionCircle,
  FaLayerGroup,
  FaExchangeAlt,
} from "react-icons/fa";
import Link from "next/link";

export default function DocumentationPage() {
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
          Welcome to MLFQ Simulation
        </motion.h1>

        <motion.div variants={item} className="mb-12">
          <div className="border-l-4 border-blue-500 pl-4 mb-6">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              <FaBook className="mr-2" /> Introduction
            </h2>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <p className="mb-3">
              Welcome to the MLFQ (Multi-Level Feedback Queue) Simulation
              documentation. This application provides an interactive
              visualization of the MLFQ scheduling algorithm, helping you
              understand how it works in real-time.
            </p>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
              <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                This simulation is designed to be both educational and
                practical, allowing you to experiment with different scheduling
                scenarios.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-12">
          <div className="border-l-4 border-purple-500 pl-4 mb-6">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
              <FaInfoCircle className="mr-2" /> What is MLFQ?
            </h2>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <p className="mb-3">
              Multi-Level Feedback Queue (MLFQ) is a CPU scheduling algorithm
              that attempts to optimize for both interactive and batch
              processes. It uses multiple queues with different priority levels
              and implements feedback to adjust process priorities based on
              their behavior.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full mr-3">
                  <FaLayerGroup className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-medium">Multiple Priority Queues</div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Processes are organized in queues of different priorities
                  </span>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full mr-3">
                  <FaExchangeAlt className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-medium">Dynamic Priority Adjustment</div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Process priorities change based on their behavior
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-12">
          <div className="border-l-4 border-green-500 pl-4 mb-6">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">
              <FaRocket className="mr-2" /> Getting Started
            </h2>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <p className="mb-3">To start using the MLFQ Simulation:</p>
            <ol className="space-y-3 list-decimal list-inside">
              <li className="pl-2">
                <span className="font-semibold text-green-600 dark:text-green-400">
                  Navigate to the home page
                </span>
              </li>
              <li className="pl-2">
                Create new processes with different characteristics
                <ul className="pl-6 mt-2 space-y-2 list-disc">
                  <li>Arrival Time</li>
                  <li>Burst Time</li>
                  <li>Priority (optional)</li>
                </ul>
              </li>
              <li className="pl-2">Configure the MLFQ parameters as needed</li>
              <li className="pl-2">
                Start the simulation and observe the scheduling behavior
              </li>
              <li className="pl-2">Analyze the results and statistics</li>
            </ol>
            <div className="mt-6 flex justify-center">
              <Link
                href="/Documentation/how-to-use"
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors flex items-center shadow-md"
              >
                <FaRocket className="mr-2" /> Get Started Now
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-12">
          <div className="border-l-4 border-amber-500 pl-4 mb-6">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-amber-600 dark:text-amber-400">
              <FaList className="mr-2" /> Documentation Sections
            </h2>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <p className="mb-4">
              Our documentation is organized into several sections:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/Documentation/how-to-use"
                className="block no-underline"
              >
                <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full mr-3">
                    <FaLaptopCode className="text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <div className="font-medium text-amber-600 dark:text-amber-400">
                      How to Use
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Detailed instructions on using the simulation
                    </span>
                  </div>
                </div>
              </Link>
              <Link href="/Documentation/tools" className="block no-underline">
                <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full mr-3">
                    <FaTools className="text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <div className="font-medium text-amber-600 dark:text-amber-400">
                      Tools & Technologies
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Information about the technologies used
                    </span>
                  </div>
                </div>
              </Link>
              <Link
                href="/Documentation/how-it-works"
                className="block no-underline"
              >
                <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full mr-3">
                    <FaCode className="text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <div className="font-medium text-amber-600 dark:text-amber-400">
                      How It Works
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Technical details about the MLFQ algorithm
                    </span>
                  </div>
                </div>
              </Link>
              <Link
                href="/Documentation/contact"
                className="block no-underline"
              >
                <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full mr-3">
                    <FaQuestionCircle className="text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <div className="font-medium text-amber-600 dark:text-amber-400">
                      Contact & Support
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Get help and support
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
              Use the navigation menu on the left to explore these sections and
              learn more about the MLFQ Simulation.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </Documentation>
  );
}
