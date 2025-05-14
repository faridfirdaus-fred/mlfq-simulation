import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Square, Loader2 } from "lucide-react";

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
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-50 via-white to-red-50 dark:from-green-950/20 dark:via-transparent dark:to-red-950/20"></div>
      <CardContent className="flex justify-between items-center p-6 relative">
        <Button
          onClick={onStart}
          disabled={isRunning}
          className="flex-1 mr-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:hover:scale-100"
          size="lg"
        >
          {isRunning ? (
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
          ) : (
            <Play className="h-5 w-5 mr-2" />
          )}
          {isRunning ? "Running..." : "Start Simulation"}
        </Button>
        <Button
          onClick={onStop}
          disabled={!isRunning}
          variant="destructive"
          className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:hover:scale-100"
          size="lg"
        >
          <Square className="h-5 w-5 mr-2" />
          Stop Simulation
        </Button>
      </CardContent>
    </Card>
  );
};

export default SimulationControls;