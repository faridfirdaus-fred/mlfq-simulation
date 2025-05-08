import { useEffect, useState } from "react";
import ProcessForm from "./components/ProcessForm";
import ProcessTable from "./components/ProcessTable";
import ResultsDisplay from "./components/ResultsDisplay";
import SimulationControls from "./components/SimulationControls";
import { fetchSimulationResults } from "./api/utils/apiClient";

export default function Home() {
  const [processes, setProcesses] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddProcess = (newProcess) => {
    setProcesses((prev) => [...prev, newProcess]);
  };

  const handleRunSimulation = async () => {
    setLoading(true);
    setError(null);
    try {
      const simulationResults = await fetchSimulationResults(processes);
      setResults(simulationResults);
    } catch (err) {
      setError("Failed to run simulation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">MLFQ Simulation</h1>
      <ProcessForm onAddProcess={handleAddProcess} />
      <SimulationControls
        onRunSimulation={handleRunSimulation}
        loading={loading}
      />
      {error && <div className="text-red-500">{error}</div>}
      <ProcessTable processes={processes} />
      {results && <ResultsDisplay results={results} />}
    </div>
  );
}
