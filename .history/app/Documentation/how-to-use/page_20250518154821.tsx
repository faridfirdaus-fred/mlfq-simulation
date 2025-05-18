"use client";

import { motion } from "framer-motion";
import Documentation from "@/components/Documentation";

export default function HowToUsePage() {
  return (
    <Documentation>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="prose prose-gray dark:prose-invert max-w-none"
      >
        <h1>How to Use MLFQ Simulation</h1>

        <h2>Creating Processes</h2>
        <p>To create a new process in the simulation:</p>
        <ol>
          <li>Click the "Add Process" button in the control panel</li>
          <li>
            Set the process parameters:
            <ul>
              <li>Process ID (automatically assigned)</li>
              <li>Arrival Time</li>
              <li>Burst Time</li>
              <li>Priority (optional)</li>
            </ul>
          </li>
          <li>Click "Create" to add the process to the simulation</li>
        </ol>

        <h2>Configuring MLFQ Parameters</h2>
        <p>You can customize the MLFQ algorithm parameters:</p>
        <ul>
          <li>Number of queues (default: 3)</li>
          <li>Time quantum for each queue</li>
          <li>Aging threshold</li>
          <li>Priority boost interval</li>
        </ul>

        <h2>Running the Simulation</h2>
        <p>To start the simulation:</p>
        <ol>
          <li>Click the "Start" button to begin the simulation</li>
          <li>
            Use the "Step" button to advance the simulation one time unit at a
            time
          </li>
          <li>Use the &quot;Pause&quot; button to temporarily stop the simulation</li>
          <li>Use the "Reset" button to start over</li>
        </ol>

        <h2>Viewing Results</h2>
        <p>The simulation provides several ways to view the results:</p>
        <ul>
          <li>Real-time visualization of process execution</li>
          <li>Queue status and process movement between queues</li>
          <li>
            Performance metrics:
            <ul>
              <li>Average Turnaround Time</li>
              <li>Average Waiting Time</li>
              <li>CPU Utilization</li>
              <li>Process completion order</li>
            </ul>
          </li>
        </ul>
      </motion.div>
    </Documentation>
  );
}
