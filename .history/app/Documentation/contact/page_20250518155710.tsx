"use client";

import { motion } from "framer-motion";
import Documentation from "@/components/Documentation";
import {
  FaQuestionCircle,
  FaGithub,
  FaEnvelope,
  FaCode,
  FaUsers,
  FaDiscord,
  FaTwitter,
  FaComments,
} from "react-icons/fa";

export default function ContactPage() {
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
          Contact & Support
        </motion.h1>

        <motion.div variants={item} className="mb-12">
          <div className="border-l-4 border-blue-500 pl-4 mb-6">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              <FaQuestionCircle className="mr-2" /> Getting Help
            </h2>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <p className="mb-3">
              If you need help with the MLFQ Simulation, there are several ways
              to get support:
            </p>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                Documentation
              </h3>
              <p className="mb-2">First, check our documentation pages:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-center bg-white dark:bg-gray-700 p-3 rounded-md shadow-sm">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                  <a
                    href="/Documentation/how-to-use"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    How to Use
                  </a>
                  <span className="ml-2 text-sm text-gray-500">
                    - Usage instructions
                  </span>
                </li>
                <li className="flex items-center bg-white dark:bg-gray-700 p-3 rounded-md shadow-sm">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                  <a
                    href="/Documentation/how-it-works"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    How It Works
                  </a>
                  <span className="ml-2 text-sm text-gray-500">
                    - MLFQ algorithm details
                  </span>
                </li>
                <li className="flex items-center bg-white dark:bg-gray-700 p-3 rounded-md shadow-sm">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                  <a
                    href="/Documentation/tools"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Tools & Technologies
                  </a>
                  <span className="ml-2 text-sm text-gray-500">
                    - Tech stack info
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-12">
          <div className="border-l-4 border-purple-500 pl-4 mb-6">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
              <FaGithub className="mr-2" /> GitHub Issues
            </h2>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <p className="mb-3">If you find a bug or have a feature request:</p>
            <ol className="space-y-3 list-decimal list-inside">
              <li className="pl-2">
                Visit our{" "}
                <a
                  href="https://github.com/yourusername/mlfq_simulation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-purple-600 dark:text-purple-400 hover:underline"
                >
                  GitHub repository
                </a>
              </li>
              <li className="pl-2">
                Check existing issues to see if your problem has already been
                reported
              </li>
              <li className="pl-2">
                Create a new issue with a clear description of the problem
              </li>
              <li className="pl-2">
                Include steps to reproduce the issue if applicable
              </li>
            </ol>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-12">
          <div className="border-l-4 border-green-500 pl-4 mb-6">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">
              <FaEnvelope className="mr-2" /> Email Support
            </h2>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <p className="mb-3">For direct support, you can reach us at:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full mr-3">
                  <FaEnvelope className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-medium">Technical Support</div>
                  <a
                    href="mailto:support@mlfq-simulation.com"
                    className="text-green-600 dark:text-green-400 hover:underline"
                  >
                    support@mlfq-simulation.com
                  </a>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full mr-3">
                  <FaEnvelope className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-medium">Feature Requests</div>
                  <a
                    href="mailto:features@mlfq-simulation.com"
                    className="text-green-600 dark:text-green-400 hover:underline"
                  >
                    features@mlfq-simulation.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-12">
          <div className="border-l-4 border-indigo-500 pl-4 mb-6">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">
              <FaCode className="mr-2" /> Contributing
            </h2>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <p className="mb-3">
              We welcome contributions to the MLFQ Simulation project:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="inline-block bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 p-1 rounded mr-2">
                  1
                </span>
                <span>Fork the repository</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 p-1 rounded mr-2">
                  2
                </span>
                <span>Create a feature branch</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 p-1 rounded mr-2">
                  3
                </span>
                <span>Make your changes</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 p-1 rounded mr-2">
                  4
                </span>
                <span>Submit a pull request</span>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-12">
          <div className="border-l-4 border-amber-500 pl-4 mb-6">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-amber-600 dark:text-amber-400">
              <FaUsers className="mr-2" /> Community
            </h2>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <p className="mb-4">
              Join our community to stay updated and connect with other users:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full mr-3">
                  <FaDiscord className="text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <div className="font-medium">Discord Server</div>
                  <a
                    href="https://discord.gg/mlfq-simulation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    Join our Discord
                  </a>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full mr-3">
                  <FaTwitter className="text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <div className="font-medium">Twitter</div>
                  <a
                    href="https://twitter.com/mlfq_simulation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    @mlfq_simulation
                  </a>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full mr-3">
                  <FaComments className="text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <div className="font-medium">GitHub Discussions</div>
                  <a
                    href="https://github.com/yourusername/mlfq_simulation/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    Join discussions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Documentation>
  );
}
