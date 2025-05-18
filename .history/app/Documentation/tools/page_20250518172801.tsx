"use client";

import { motion } from "framer-motion";
import Documentation from "@/components/Documentation";
import {
  FaReact,
  FaPython,
  FaTools,
  FaCode,
  FaLayerGroup,
  FaServer,
  FaCogs,
  FaPalette,
  FaChartBar,
  FaRocket,
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
          Tools & Technologies
        </motion.h1>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              <FaTools className="mr-2 text-gray-500 dark:text-gray-400" />{" "}
              Technology Stack
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              The MLFQ Simulation is built using modern web technologies to
              provide a responsive, interactive experience:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                  <FaReact className="text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-700 dark:text-gray-300">
                    Next.js
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    React framework for frontend development
                  </span>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                  <FaPython className="text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-700 dark:text-gray-300">
                    Python
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Backend programming language
                  </span>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                  <FaRocket className="text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-700 dark:text-gray-300">
                    FastAPI
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Modern web framework for APIs
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
              Frontend Technologies
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="space-y-6">
              <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Core Libraries
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Key libraries used in the frontend development:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        TypeScript
                      </span>{" "}
                      - Type-safe JavaScript
                    </span>
                  </div>

                  <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        TailwindCSS
                      </span>{" "}
                      - Utility-first CSS framework
                    </span>
                  </div>

                  <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        React Hook Form
                      </span>{" "}
                      - Form state management
                    </span>
                  </div>

                  <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Zod
                      </span>{" "}
                      - Schema validation
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  UI Components
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our UI is built with these component libraries:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Shadcn UI
                      </span>{" "}
                      - Accessible component system
                    </span>
                  </div>

                  <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Framer Motion
                      </span>{" "}
                      - Animation library
                    </span>
                  </div>

                  <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Lucide Icons
                      </span>{" "}
                      - Icon library
                    </span>
                  </div>

                  <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        React Icons
                      </span>{" "}
                      - Extensive icon collection
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              <FaServer className="mr-2 text-gray-500 dark:text-gray-400" />{" "}
              Backend Technologies
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Our Python-based backend powers the simulation calculations and
              API endpoints:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                  <FaRocket className="text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-700 dark:text-gray-300">
                    FastAPI
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    High-performance API framework
                  </span>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                  <FaServer className="text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-700 dark:text-gray-300">
                    Uvicorn
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ASGI web server implementation
                  </span>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                  <FaLayerGroup className="text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-700 dark:text-gray-300">
                    Pydantic
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Data validation using Python type annotations
                  </span>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                  <FaCogs className="text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-700 dark:text-gray-300">
                    MLFQ Algorithm
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Custom implementation of scheduling logic
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                Python Dependencies
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md border border-gray-200 dark:border-gray-600 overflow-auto">
                <pre className="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap font-mono">
                  annotated-types==0.7.0 anyio==4.9.0 certifi==2025.1.31
                  click==8.1.8 colorama==0.4.6 fastapi==0.115.12 h11==0.14.0
                  httpcore==1.0.8 httpx==0.28.1 idna==3.10 iniconfig==2.1.0
                  packaging==25.0 pluggy==1.5.0 pydantic==2.11.3
                  pydantic_core==2.33.1 pytest==8.3.5 sniffio==1.3.1
                  starlette==0.46.2 typing-inspection==0.4.0
                  typing_extensions==4.13.2 uvicorn==0.34.1
                </pre>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              <FaPalette className="mr-2 text-gray-500 dark:text-gray-400" />{" "}
              Design & Styling
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="mb-3 text-gray-600 dark:text-gray-400">
              Our application's visual design focuses on clarity and usability:
            </p>

            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-1 rounded mr-2 border border-gray-200 dark:border-gray-600">
                  ✓
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Responsive Design
                  </span>{" "}
                  - Mobile-first approach ensuring compatibility across all
                  device sizes
                </span>
              </li>

              <li className="flex items-start">
                <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-1 rounded mr-2 border border-gray-200 dark:border-gray-600">
                  ✓
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Dark Mode Support
                  </span>{" "}
                  - Automatic theme switching based on system preferences
                </span>
              </li>

              <li className="flex items-start">
                <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-1 rounded mr-2 border border-gray-200 dark:border-gray-600">
                  ✓
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Tailwind CSS
                  </span>{" "}
                  - Utility-first CSS for consistent styling and rapid
                  development
                </span>
              </li>

              <li className="flex items-start">
                <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-1 rounded mr-2 border border-gray-200 dark:border-gray-600">
                  ✓
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Minimalist Interface
                  </span>{" "}
                  - Clean layout focusing on content and functionality with
                  reduced visual noise
                </span>
              </li>
            </ul>

            <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Our design system prioritizes accessibility features, ensuring
                the application is usable by everyone, including users with
                various disabilities or those using assistive technologies.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              <FaCode className="mr-2 text-gray-500 dark:text-gray-400" />{" "}
              Development Tools
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="mb-3 text-gray-600 dark:text-gray-400">
              Tools and practices used during development:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Git & GitHub for version control
                </span>
              </div>

              <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  ESLint for code quality
                </span>
              </div>

              <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Prettier for code formatting
                </span>
              </div>

              <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Pytest for Python testing
                </span>
              </div>

              <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Httpx for API testing
                </span>
              </div>

              <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Visual Studio Code as IDE
                </span>
              </div>
            </div>

            <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md">
              <p className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <FaCode className="text-gray-500 dark:text-gray-400 mr-2" />
                <span>
                  Our serverless approach eliminates the need for database
                  management, simplifying deployment while maintaining high
                  performance.
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Documentation>
  );
}
