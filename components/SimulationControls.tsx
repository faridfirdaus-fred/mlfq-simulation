import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Trash, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

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
    <Card className="border-gray-100 dark:border-gray-700 shadow-lg">
      <CardContent className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-green-900/20">
        <motion.div
          whileHover={{ scale: disableStart ? 1 : 1.05 }}
          whileTap={{ scale: disableStart ? 1 : 0.95 }}
        >
          <Button
            onClick={onStart}
            disabled={isRunning || disableStart}
            className={`gap-2 px-6 py-3 font-medium transition-all duration-300 ${
              isRunning || disableStart
                ? "bg-gray-400 dark:bg-gray-600"
                : "bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-600 hover:via-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl"
            } text-white`}
            size="lg"
          >
            {isRunning ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Menjalankan Simulasi...
              </>
            ) : (
              <>
                <Play size={20} />
                Mulai Simulasi
              </>
            )}
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: disableClear ? 1 : 1.05 }}
          whileTap={{ scale: disableClear ? 1 : 0.95 }}
        >
          <Button
            onClick={onClear}
            disabled={isRunning || disableClear}
            variant="outline"
            className={`gap-2 px-6 py-3 font-medium transition-all duration-300 ${
              isRunning || disableClear
                ? "border-gray-300 text-gray-400 dark:border-gray-600 dark:text-gray-500"
                : "border-purple-300 text-purple-700 hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 dark:border-purple-600 dark:text-purple-400 dark:hover:from-purple-900/30 dark:hover:to-blue-900/30 shadow-md hover:shadow-lg"
            }`}
            size="lg"
          >
            <Trash size={20} />
            Bersihkan Semua
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default SimulationControls;