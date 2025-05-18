"use client";

import { motion } from "framer-motion";
import Documentation from "@/components/Documentation";
import {
  FaReact,
  FaCode,
  FaServer,
  FaTools,
  FaVial,
  FaCloudUploadAlt,
  FaJs,
  FaNodeJs,
  FaPython,
  FaGit,
  FaDocker,
} from "react-icons/fa";

export default function ToolsPage() {
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
          Tools & Technologies
        </motion.h1>

        <motion.div variants={item} className="mb-12">
          <div className="border-l-4 border-blue-500 pl-4 mb-6">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              <FaReact className="mr-2" /> Frontend Technologies
            </h2>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3">
                  <FaReact className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-medium">Next.js</div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    React framework for building the user interface
                  </span>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3">
                  <FaJs className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-medium">TypeScript</div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    For type-safe code and better development experience
                  </span>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3">
                  <FaCode className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-medium">Tailwind CSS</div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    For styling and responsive design
                  </span>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3">
                  <FaReact className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-medium">shadcn/ui</div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    For beautiful and accessible UI components
                  </span>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3">
                  <FaReact className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-medium">Framer Motion</div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    For smooth animations and transitions
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-12">
          <div className="border-l-4 border-purple-500 pl-4 mb-6">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
              <FaServer className="mr-2" /> Backend Technologies
            </h2>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full mr-3">
                  <FaPython className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-medium">FastAPI</div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Python web framework for building the API
                  </span>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full mr-3">
                  <FaPython className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-medium">Python</div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Core programming language for the MLFQ algorithm
                  </span>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full mr-3">
                  <FaPython className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-medium">Pydantic</div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    For data validation and settings management
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-12">
          <div className="border-l-4 border-green-500 pl-4 mb-6">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">
              <FaTools className="mr-2" /> Development Tools
            </h2>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full mr-3">
                  <FaGit className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-medium">Git</div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Version control system
                  </span>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full mr-3">
                  <FaCode className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-medium">ESLint</div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    For code linting and maintaining code quality
                  </span>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full mr-3">
                  <FaCode className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-medium">Prettier</div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    For code formatting
                  </span>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full mr-3">
                  <FaJs className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-medium">TypeScript</div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    For static type checking
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-12">
          <div className="border-l-4 border-amber-500 pl-4 mb-6">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-amber-600 dark:text-amber-400">
              <FaVial className="mr-2" /> Testing Tools
            </h2>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full mr-3">
                  <FaJs className="text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <div className="font-medium">Jest</div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    For frontend unit testing
                  </span>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full mr-3">
                  <FaPython className="text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <div className="font-medium">Pytest</div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    For backend unit testing
                  </span>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full mr-3">
                  <FaReact className="text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <div className="font-medium">React Testing Library</div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    For component testing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-12">
          <div className="border-l-4 border-indigo-500 pl-4 mb-6">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">
              <FaCloudUploadAlt className="mr-2" /> Deployment
            </h2>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full mr-3">
                  <FaNodeJs className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <div className="font-medium">Vercel</div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    For frontend deployment
                  </span>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full mr-3">
                  <FaDocker className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <div className="font-medium">Docker</div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    For containerization
                  </span>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full mr-3">
                  <FaCode className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <div className="font-medium">GitHub Actions</div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    For CI/CD pipeline
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Documentation>
  );
}
