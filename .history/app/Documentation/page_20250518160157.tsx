"use client";

import { motion } from "framer-motion";
import Documentation from "@/components/Documentation";

export default function DocumentationPage() {
  return (
    <Documentation>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="prose prose-gray dark:prose-invert max-w-"
      >
        <h1>Welcome to MLFQ Simulation</h1>
        <p>
          Welcome to the MLFQ (Multi-Level Feedback Queue) Simulation
          documentation. This application provides an interactive visualization
          of the MLFQ scheduling algorithm, helping you understand how it works
          in real-time.
        </p>

        <h2>What is MLFQ?</h2>
        <p>
          Multi-Level Feedback Queue (MLFQ) is a CPU scheduling algorithm that
          attempts to optimize for both interactive and batch processes. It uses
          multiple queues with different priority levels and implements feedback
          to adjust process priorities based on their behavior.
        </p>

        <h2>Getting Started</h2>
        <p>To start using the MLFQ Simulation:</p>
        <ol>
          <li>Navigate to the home page</li>
          <li>Create new processes with different characteristics</li>
          <li>Configure the MLFQ parameters as needed</li>
          <li>Start the simulation and observe the scheduling behavior</li>
          <li>Analyze the results and statistics</li>
        </ol>

        <h2>Documentation Sections</h2>
        <p>Our documentation is organized into several sections:</p>
        <ul>
          <li>
            <strong>How to Use</strong> - Detailed instructions on using the
            simulation
          </li>
          <li>
            <strong>Tools & Technologies</strong> - Information about the
            technologies used
          </li>
          <li>
            <strong>How It Works</strong> - Technical details about the MLFQ
            algorithm
          </li>
          <li>
            <strong>Contact & Support</strong> - Get help and support
          </li>
        </ul>

        <p>
          Use the navigation menu on the left to explore these sections and
          learn more about the MLFQ Simulation.
        </p>
      </motion.div>
    </Documentation>
  );
}
