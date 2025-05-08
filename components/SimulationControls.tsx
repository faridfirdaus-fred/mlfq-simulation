import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Square } from "lucide-react";

interface SimulationControlsProps {
  onStart: () => void;
  onStop: () => void;
  isRunning: boolean;
}

const SimulationControls: React.FC<SimulationControlsProps> = ({
  onStart,
  onStop,
  isRunning,
}) => {
  return (
    <Card>
      <CardContent className="flex justify-between items-center p-4">
        <Button
          onClick={onStart}
          disabled={isRunning}
          className="gap-2"
          size="lg"
        >
          <Play size={18} />
          Start Simulation
        </Button>
        <Button
          onClick={onStop}
          disabled={!isRunning}
          variant="destructive"
          className="gap-2"
          size="lg"
        >
          <Square size={18} />
          Stop Simulation
        </Button>
      </CardContent>
    </Card>
  );
};

export default SimulationControls;
