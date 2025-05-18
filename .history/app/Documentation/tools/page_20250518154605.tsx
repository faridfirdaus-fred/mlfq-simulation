"use client";

import { motion } from "framer-motion";
import Documentation from "@/components/Documentation";

export default function ToolsPage() {
  return (
    <Documentation>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="prose prose-gray dark:prose-invert max-w-none"
      >
        <h1>Tools & Technologies</h1>

        <h2>Frontend Technologies</h2>
        <ul>
          <li>
            <strong>Next.js</strong> - React framework for building the user
            interface
          </li>
          <li>
            <strong>TypeScript</strong> - For type-safe code and better
            development experience
          </li>
          <li>
            <strong>Tailwind CSS</strong> - For styling and responsive design
          </li>
          <li>
            <strong>shadcn/ui</strong> - For beautiful and accessible UI
            components
          </li>
          <li>
            <strong>Framer Motion</strong> - For smooth animations and
            transitions
          </li>
        </ul>

        <h2>Backend Technologies</h2>
        <ul>
          <li>
            <strong>FastAPI</strong> - Python web framework for building the API
          </li>
          <li>
            <strong>Python</strong> - Core programming language for the MLFQ
            algorithm
          </li>
          <li>
            <strong>Pydantic</strong> - For data validation and settings
            management
          </li>
        </ul>

        <h2>Development Tools</h2>
        <ul>
          <li>
            <strong>Git</strong> - Version control system
          </li>
          <li>
            <strong>ESLint</strong> - For code linting and maintaining code
            quality
          </li>
          <li>
            <strong>Prettier</strong> - For code formatting
          </li>
          <li>
            <strong>TypeScript</strong> - For static type checking
          </li>
        </ul>

        <h2>Testing Tools</h2>
        <ul>
          <li>
            <strong>Jest</strong> - For frontend unit testing
          </li>
          <li>
            <strong>Pytest</strong> - For backend unit testing
          </li>
          <li>
            <strong>React Testing Library</strong> - For component testing
          </li>
        </ul>

        <h2>Deployment</h2>
        <ul>
          <li>
            <strong>Vercel</strong> - For frontend deployment
          </li>
          <li>
            <strong>Docker</strong> - For containerization
          </li>
          <li>
            <strong>GitHub Actions</strong> - For CI/CD pipeline
          </li>
        </ul>
      </motion.div>
    </Documentation>
  );
}
