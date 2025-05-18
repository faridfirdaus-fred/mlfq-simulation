"use client";

import { motion } from "framer-motion";
import Documentation from "@/components/Documentation";

export default function ContactPage() {
  return (
    <Documentation>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="prose prose-gray dark:prose-invert max-w-none"
      >
        <h1>Contact & Support</h1>

        <h2>Getting Help</h2>
        <p>
          If you need help with the MLFQ Simulation, there are several ways to
          get support:
        </p>

        <h3>Documentation</h3>
        <p>First, check our documentation pages:</p>
        <ul>
          <li>
            <a href="/Documentation/how-to-use">How to Use</a> - Detailed usage
            instructions
          </li>
          <li>
            <a href="/Documentation/how-it-works">How It Works</a> - Technical
            details about the MLFQ algorithm
          </li>
          <li>
            <a href="/Documentation/tools">Tools & Technologies</a> -
            Information about the technologies used
          </li>
        </ul>

        <h3>GitHub Issues</h3>
        <p>If you find a bug or have a feature request:</p>
        <ul>
          <li>
            Visit our{" "}
            <a
              href="https://github.com/yourusername/mlfq_simulation"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub repository
            </a>
          </li>
          <li>
            Check existing issues to see if your problem has already been
            reported
          </li>
          <li>Create a new issue with a clear description of the problem</li>
          <li>Include steps to reproduce the issue if applicable</li>
        </ul>

        <h3>Email Support</h3>
        <p>For direct support, you can reach us at:</p>
        <ul>
          <li>
            Technical Support:{" "}
            <a href="mailto:support@mlfq-simulation.com">
              support@mlfq-simulation.com
            </a>
          </li>
          <li>
            Feature Requests:{" "}
            <a href="mailto:features@mlfq-simulation.com">
              features@mlfq-simulation.com
            </a>
          </li>
        </ul>

        <h2>Contributing</h2>
        <p>We welcome contributions to the MLFQ Simulation project:</p>
        <ul>
          <li>Fork the repository</li>
          <li>Create a feature branch</li>
          <li>Make your changes</li>
          <li>Submit a pull request</li>
        </ul>

        <h2>Community</h2>
        <p>Join our community to stay updated and connect with other users:</p>
        <ul>
          <li>
            Discord Server:{" "}
            <a
              href="https://discord.gg/mlfq-simulation"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join our Discord
            </a>
          </li>
          <li>
            Twitter:{" "}
            <a
              href="https://twitter.com/mlfq_simulation"
              target="_blank"
              rel="noopener noreferrer"
            >
              @mlfq_simulation
            </a>
          </li>
          <li>
            GitHub Discussions:{" "}
            <a
              href="https://github.com/yourusername/mlfq_simulation/discussions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join the discussion
            </a>
          </li>
        </ul>
      </motion.div>
    </Documentation>
  );
}
