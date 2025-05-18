"use client";

import { motion } from "framer-motion";
import Documentation from "@/components/Documentation";
import {
  FaReact,
  FaNode,
  FaDatabase,
  FaTools,
  FaCode,
  FaLayerGroup,
  FaServer,
  FaCogs,
  FaPalette,
  FaChartBar,
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
              <FaTools className="mr-2 text-gray-500 dark:text-gray-400" /> Technology Stack
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              The MLFQ Simulation is built using modern web technologies to provide a responsive,
              interactive experience:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                  <FaReact className="text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-700 dark:text-gray-300">Next.js</div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    React framework for frontend development
                  </span>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                  <FaNode className="text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-700 dark:text-gray-300">Node.js</div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    JavaScript runtime for server-side logic
                  </span>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                  <FaDatabase className="text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-700 dark:text-gray-300">PostgreSQL</div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Database for storing simulation data
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              <FaCode className="mr-2 text-gray-500 dark:text-gray-400" /> Frontend Technologies
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
                      <span className="font-medium text-gray-700 dark:text-gray-300">TypeScript</span> - 
                      Type-safe JavaScript
                    </span>
                  </div>
                  
                  <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-700 dark:text-gray-300">TailwindCSS</span> - 
                      Utility-first CSS framework
                    </span>
                  </div>
                  
                  <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-700 dark:text-gray-300">React Hook Form</span> - 
                      Form state management
                    </span>
                  </div>
                  
                  <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Zod</span> - 
                      Schema validation
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
                      <span className="font-medium text-gray-700 dark:text-gray-300">Shadcn UI</span> - 
                      Accessible component system
                    </span>
                  </div>
                  
                  <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Framer Motion</span> - 
                      Animation library
                    </span>
                  </div>
                  
                  <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Lucide Icons</span> - 
                      Icon library
                    </span>
                  </div>
                  
                  <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-700 dark:text-gray-300">React Icons</span> - 
                      Extensive icon collection
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
              <FaServer className="mr-2 text-gray-500 dark:text-gray-400" /> Backend Technologies
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Our backend infrastructure powers the simulation calculations and data management:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                  <FaLayerGroup className="text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-700 dark:text-gray-300">Next.js API Routes</div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Server-side API endpoints
                  </span>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                  <FaCogs className="text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-700 dark:text-gray-300">MLFQ Algorithm</div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Custom implementation of scheduling logic
                  </span>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                  <FaDatabase className="text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-700 dark:text-gray-300">Prisma ORM</div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Type-safe database access
                  </span>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-full mr-3">
                  <FaChartBar className="text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-700 dark:text-gray-300">Analytics Engine</div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Performance metrics calculation
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              <FaPalette className="mr-2 text-gray-500 dark:text-gray-400" /> Design & Styling
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
                  <span className="font-medium text-gray-700 dark:text-gray-300">Responsive Design</span> - 
                  Mobile-first approach ensuring compatibility across all device sizes
                </span>
              </li>
              
              <li className="flex items-start">
                <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-1 rounded mr-2 border border-gray-200 dark:border-gray-600">
                  ✓
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Dark Mode Support</span> - 
                  Automatic theme switching based on system preferences
                </span>
              </li>
              
              <li className="flex items-start">
                <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-1 rounded mr-2 border border-gray-200 dark:border-gray-600">
                  ✓
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Tailwind CSS</span> - 
                  Utility-first CSS for consistent styling and rapid development
                </span>
              </li>
              
              <li className="flex items-start">
                <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-1 rounded mr-2 border border-gray-200 dark:border-gray-600">
                  ✓
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Minimalist Interface</span> - 
                  Clean layout focusing on content and functionality with reduced visual noise
                </span>
              </li>
            </ul>
            
            <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Our design system prioritizes accessibility features, ensuring the application is usable by everyone, 
                including users with various disabilities or those using assistive technologies.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              <FaCode className="mr-2 text-gray-500 dark:text-gray-400" /> Development Tools
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
                  Jest for unit testing
                </span>
              </div>
              
              <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Cypress for end-to-end testing
                </span>
              </div>
              
              <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Visual Studio Code as IDE
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Documentation>
  );
}