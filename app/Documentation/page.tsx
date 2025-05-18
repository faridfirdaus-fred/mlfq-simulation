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
    hidden: { opacity: 0, y: 5 }, // Changed from y: 20 to y: 5 for more subtle animation
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
          Welcome to MLFQ Simulation
        </motion.h1>

        <motion.div variants={item} className="mb-8">
          {" "}
          {/* Changed from mb-12 to mb-8 */}
          <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 mb-4">
            {" "}
            {/* Changed from border-l-4 border-blue-500 */}
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              {" "}
              {/* Changed from text-blue-600 */}
              <FaBook className="mr-2 text-gray-500 dark:text-gray-400" />{" "}
              Introduction
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            {" "}
            {/* Changed from bg-gray-50 and added border */}
            <p className="mb-3 text-gray-600 dark:text-gray-400">
              Welcome to the MLFQ (Multi-Level Feedback Queue) Simulation
              documentation. This application provides an interactive
              visualization of the MLFQ scheduling algorithm, helping you
              understand how it works in real-time.
            </p>
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              {" "}
              {/* Changed from blue colors */}
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {" "}
                {/* Changed from blue text colors */}
                This simulation is designed to be both educational and
                practical, allowing you to experiment with different scheduling
                scenarios.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          {" "}
          {/* Changed from mb-12 to mb-8 */}
          <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 mb-4">
            {" "}
            {/* Changed from border-purple-500 */}
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              {" "}
              {/* Changed from text-purple-600 */}
              <FaInfoCircle className="mr-2 text-gray-500 dark:text-gray-400" />{" "}
              What is MLFQ?
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            {" "}
            {/* Changed bg-gray-50 and added border */}
            <p className="mb-3 text-gray-600 dark:text-gray-400">
              Multi-Level Feedback Queue (MLFQ) is a CPU scheduling algorithm
              that attempts to optimize for both interactive and batch
              processes. It uses multiple queues with different priority levels
              and implements feedback to adjust process priorities based on
              their behavior.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                {" "}
                {/* Changed from bg-white and added border */}
                <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                  {" "}
                  {/* Changed from bg-purple-100 */}
                  <FaLayerGroup className="text-gray-500 dark:text-gray-400" />{" "}
                  {/* Changed from text-purple-600 */}
                </div>
                <div>
                  <div className="font-medium text-gray-700 dark:text-gray-300">
                    Multiple Priority Queues
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Processes are organized in queues of different priorities
                  </span>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                {" "}
                {/* Changed from bg-white and added border */}
                <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                  {" "}
                  {/* Changed from bg-purple-100 */}
                  <FaExchangeAlt className="text-gray-500 dark:text-gray-400" />{" "}
                  {/* Changed from text-purple-600 */}
                </div>
                <div>
                  <div className="font-medium text-gray-700 dark:text-gray-300">
                    Dynamic Priority Adjustment
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Process priorities change based on their behavior
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          {" "}
          {/* Changed from mb-12 to mb-8 */}
          <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 mb-4">
            {" "}
            {/* Changed from border-green-500 */}
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              {" "}
              {/* Changed from text-green-600 */}
              <FaRocket className="mr-2 text-gray-500 dark:text-gray-400" />{" "}
              Getting Started
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            {" "}
            {/* Changed bg-gray-50 and added border */}
            <p className="mb-3 text-gray-600 dark:text-gray-400">
              To start using the MLFQ Simulation:
            </p>
            <ol className="space-y-3 list-decimal list-inside text-gray-600 dark:text-gray-400">
              <li className="pl-2">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {" "}
                  {/* Changed from text-green-600 */}
                  Navigate to the home page
                </span>
              </li>
              <li className="pl-2">
                Create new processes with different characteristics
                <ul className="pl-6 mt-2 space-y-2 list-disc text-gray-600 dark:text-gray-400">
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
                className="px-6 py-2 bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 text-white rounded-md transition-colors flex items-center shadow-sm"
                /* Changed from bg-green-600 hover:bg-green-700 and shadow-md to shadow-sm */
              >
                <FaRocket className="mr-2" /> Get Started Now
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          {" "}
          {/* Changed from mb-12 to mb-8 */}
          <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 mb-4">
            {" "}
            {/* Changed from border-amber-500 */}
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              {" "}
              {/* Changed from text-amber-600 */}
              <FaList className="mr-2 text-gray-500 dark:text-gray-400" />{" "}
              Documentation Sections
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            {" "}
            {/* Changed bg-gray-50 and added border */}
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Our documentation is organized into several sections:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/Documentation/how-to-use"
                className="block no-underline"
              >
                <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  {/* Changed from bg-white, added border, and changed hover */}
                  <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                    {" "}
                    {/* Changed from bg-amber-100 */}
                    <FaLaptopCode className="text-gray-500 dark:text-gray-400" />{" "}
                    {/* Changed from text-amber-600 */}
                  </div>
                  <div>
                    <div className="font-medium text-gray-700 dark:text-gray-300">
                      {" "}
                      {/* Changed from text-amber-600 */}
                      How to Use
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Detailed instructions on using the simulation
                    </span>
                  </div>
                </div>
              </Link>
              <Link href="/Documentation/tools" className="block no-underline">
                <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  {/* Changed from bg-white, added border, and changed hover */}
                  <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                    {" "}
                    {/* Changed from bg-amber-100 */}
                    <FaTools className="text-gray-500 dark:text-gray-400" />{" "}
                    {/* Changed from text-amber-600 */}
                  </div>
                  <div>
                    <div className="font-medium text-gray-700 dark:text-gray-300">
                      {" "}
                      {/* Changed from text-amber-600 */}
                      Tools & Technologies
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Information about the technologies used
                    </span>
                  </div>
                </div>
              </Link>
              <Link
                href="/Documentation/how-it-works"
                className="block no-underline"
              >
                <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  {/* Changed from bg-white, added border, and changed hover */}
                  <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                    {" "}
                    {/* Changed from bg-amber-100 */}
                    <FaCode className="text-gray-500 dark:text-gray-400" />{" "}
                    {/* Changed from text-amber-600 */}
                  </div>
                  <div>
                    <div className="font-medium text-gray-700 dark:text-gray-300">
                      {" "}
                      {/* Changed from text-amber-600 */}
                      How It Works
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Technical details about the MLFQ algorithm
                    </span>
                  </div>
                </div>
              </Link>
              <Link
                href="/Documentation/contact"
                className="block no-underline"
              >
                <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  {/* Changed from bg-white, added border, and changed hover */}
                  <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                    {" "}
                    {/* Changed from bg-amber-100 */}
                    <FaQuestionCircle className="text-gray-500 dark:text-gray-400" />{" "}
                    {/* Changed from text-amber-600 */}
                  </div>
                  <div>
                    <div className="font-medium text-gray-700 dark:text-gray-300">
                      {" "}
                      {/* Changed from text-amber-600 */}
                      Contact & Support
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
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
