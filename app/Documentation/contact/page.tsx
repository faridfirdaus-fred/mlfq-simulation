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
  FaServer,
  FaDesktop,
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
          Contact & Support
        </motion.h1>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              <FaQuestionCircle className="mr-2 text-gray-500 dark:text-gray-400" />{" "}
              Getting Help
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="mb-3 text-gray-600 dark:text-gray-400">
              If you need help with the MLFQ Simulation, there are several ways
              to get support:
            </p>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Documentation
              </h3>
              <p className="mb-2 text-gray-600 dark:text-gray-400">
                First, check our documentation pages:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                  <a
                    href="/Documentation/how-to-use"
                    className="text-gray-700 dark:text-gray-300 hover:underline"
                  >
                    How to Use
                  </a>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    - Usage instructions
                  </span>
                </li>
                <li className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                  <a
                    href="/Documentation/how-it-works"
                    className="text-gray-700 dark:text-gray-300 hover:underline"
                  >
                    How It Works
                  </a>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    - MLFQ algorithm details
                  </span>
                </li>
                <li className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                  <a
                    href="/Documentation/tools"
                    className="text-gray-700 dark:text-gray-300 hover:underline"
                  >
                    Tools & Technologies
                  </a>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    - Tech stack info
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              <FaGithub className="mr-2 text-gray-500 dark:text-gray-400" />{" "}
              GitHub Repositories
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Our codebase is split into two repositories:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-center mb-3">
                  <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                    <FaDesktop className="text-gray-500 dark:text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    Frontend Repository
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Next.js application with the user interface and visualization
                  components.
                </p>
                <a
                  href="https://github.com/faridfirdaus-fred/mlfq-simulation-frontend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gray-200 dark:bg-gray-600 px-3 py-1 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  <FaGithub className="mr-1" /> View Frontend Code
                </a>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-center mb-3">
                  <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                    <FaServer className="text-gray-500 dark:text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    Backend Repository
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Python FastAPI service that handles the MLFQ algorithm
                  implementation.
                </p>
                <a
                  href="https://github.com/faridfirdaus-fred/mlfq-simulation-backend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gray-200 dark:bg-gray-600 px-3 py-1 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  <FaGithub className="mr-1" /> View Backend Code
                </a>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                Reporting Issues
              </h3>
              <ol className="space-y-2 list-decimal list-inside text-gray-600 dark:text-gray-400">
                <li className="pl-2">
                  Check existing issues to see if your problem has already been
                  reported
                </li>
                <li className="pl-2">
                  Create a new issue with a clear description of the problem
                </li>
                <li className="pl-2">
                  Include which repository the issue is related to (frontend or
                  backend)
                </li>
                <li className="pl-2">
                  Provide steps to reproduce the issue if applicable
                </li>
              </ol>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              <FaEnvelope className="mr-2 text-gray-500 dark:text-gray-400" />{" "}
              Email Support
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="mb-3 text-gray-600 dark:text-gray-400">
              For direct support, you can reach us at:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                  <FaEnvelope className="text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-700 dark:text-gray-300">
                    Technical Support
                  </div>
                  <a
                    href="mailto:support@mlfq-simulation.com"
                    className="text-gray-600 dark:text-gray-400 hover:underline"
                  >
                    support@mlfq-simulation.com
                  </a>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                  <FaEnvelope className="text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-700 dark:text-gray-300">
                    Feature Requests
                  </div>
                  <a
                    href="mailto:features@mlfq-simulation.com"
                    className="text-gray-600 dark:text-gray-400 hover:underline"
                  >
                    features@mlfq-simulation.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              <FaCode className="mr-2 text-gray-500 dark:text-gray-400" />{" "}
              Contributing
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="mb-3 text-gray-600 dark:text-gray-400">
              We welcome contributions to either the frontend or backend
              repositories:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-1 rounded mr-2 border border-gray-200 dark:border-gray-600">
                  1
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  Fork the appropriate repository (frontend or backend)
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-1 rounded mr-2 border border-gray-200 dark:border-gray-600">
                  2
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  Create a feature branch
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-1 rounded mr-2 border border-gray-200 dark:border-gray-600">
                  3
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  Make your changes
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-1 rounded mr-2 border border-gray-200 dark:border-gray-600">
                  4
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  Submit a pull request
                </span>
              </li>
            </ul>

            <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">Contribution Guidelines:</span>{" "}
                Please ensure your code follows our coding standards and
                includes appropriate tests. For major changes, please open an
                issue first to discuss what you would like to change.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              <FaUsers className="mr-2 text-gray-500 dark:text-gray-400" />{" "}
              Community
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Join our community to stay updated and connect with other users:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                  <FaDiscord className="text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-700 dark:text-gray-300">
                    Discord Server
                  </div>
                  <a
                    href="https://discord.gg/mlfq-simulation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:underline"
                  >
                    Join our Discord
                  </a>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                  <FaTwitter className="text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-700 dark:text-gray-300">
                    Twitter
                  </div>
                  <a
                    href="https://twitter.com/mlfq_simulation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:underline"
                  >
                    @mlfq_simulation
                  </a>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                  <FaComments className="text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-700 dark:text-gray-300">
                    GitHub Discussions
                  </div>
                  <a
                    href="https://github.com/faridfirdaus-fred/mlfq-simulation-frontend/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:underline"
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
