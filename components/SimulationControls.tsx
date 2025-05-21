import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Trash, Loader2 } from "lucide-react";

interface SimulationControlsProps {
  onStart: () => void;
  onClear: () => void;
  isRunning: boolean;
  disableStart?: boolean;
  disableClear?: boolean;
}

const SimulationControls: React.FC<SimulationControlsProps> = ({
  onStart,
  onClear,
  isRunning,
  disableStart = false,
  disableClear = false,
}) => {
  return (
    <Card>
      <CardContent className="flex justify-between items-center p-4">
        <Button
          onClick={onStart}
          disabled={isRunning || disableStart}
          className="gap-2"
          size="lg"
        >
          {isRunning ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Play size={18} />
          )}
          {isRunning ? "Running..." : "Start Simulation"}
        </Button>

        <Button
          onClick={onClear}
          disabled={isRunning || disableClear}
          variant="outline"
          className="gap-2"
          size="lg"
        >
          <Trash size={18} />
          Clear All
        </Button>
      </CardContent>
    </Card>
  );
};

export default SimulationControls;
