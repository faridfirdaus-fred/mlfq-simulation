"use client";

import { motion } from "framer-motion";
import Documentation from "@/components/Documentation";

export default function HowItWorksPage() {
  return (
    <Documentation>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="prose prose-gray dark:prose-invert max-w-none"
      >
        <h1>How MLFQ Simulation Works</h1>

        <h2>MLFQ Algorithm Overview</h2>
        <p>
          The Multi-Level Feedback Queue (MLFQ) algorithm is a CPU scheduling
          algorithm that attempts to optimize for both interactive and batch
          processes. It uses multiple queues with different priority levels and
          implements feedback to adjust process priorities based on their
          behavior.
        </p>

        <h2>Key Components</h2>
        <h3>1. Multiple Priority Queues</h3>
        <p>
          The algorithm maintains several queues, each with a different priority
          level:
        </p>
        <ul>
          <li>Highest priority queue (Q0) - For interactive processes</li>
          <li>Middle priority queues (Q1, Q2) - For mixed workloads</li>
          <li>Lowest priority queue (Q3) - For batch processes</li>
        </ul>

        <h3>2. Time Quantum</h3>
        <p>Each queue has its own time quantum:</p>
        <ul>
          <li>Higher priority queues have shorter time quanta</li>
          <li>Lower priority queues have longer time quanta</li>
          <li>This helps interactive processes get quick response times</li>
        </ul>

        <h3>3. Priority Adjustment</h3>
        <p>Processes move between queues based on their behavior:</p>
        <ul>
          <li>New processes start in the highest priority queue</li>
          <li>
            If a process uses its entire time quantum, it moves to a lower
            priority queue
          </li>
          <li>
            If a process gives up the CPU before its time quantum expires, it
            stays in the same queue
          </li>
        </ul>

        <h3>4. Aging</h3>
        <p>To prevent starvation, the algorithm implements aging:</p>
        <ul>
          <li>
            Processes that wait too long in lower priority queues get boosted to
            higher priority
          </li>
          <li>This ensures that no process waits indefinitely</li>
        </ul>

        <h2>Simulation Implementation</h2>
        <p>Our implementation includes:</p>
        <ul>
          <li>Real-time visualization of process movement between queues</li>
          <li>Interactive process creation and management</li>
          <li>Customizable MLFQ parameters</li>
          <li>Performance metrics calculation</li>
          <li>Step-by-step execution mode for learning</li>
        </ul>

        <h2>Performance Metrics</h2>
        <p>The simulation tracks several important metrics:</p>
        <ul>
          <li>Turnaround Time - Total time from submission to completion</li>
          <li>Waiting Time - Time spent waiting in queues</li>
          <li>Response Time - Time until first CPU allocation</li>
          <li>CPU Utilization - Percentage of time CPU is busy</li>
        </ul>
      </motion.div>
    </Documentation>
  );
}
