import React from "react";
import { Chart } from "react-google-charts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface GanttEntry {
  pid: string;
  start: number; // simulation time unit
  end: number;   // simulation time unit
}

interface GanttChartProps {
  log: GanttEntry[];
}

const GanttChart: React.FC<GanttChartProps> = ({ log }) => {
  // Prepare data for Google Timeline
  const data = React.useMemo(() => {
    const header = [
      { type: 'string', id: 'Task ID' },
      { type: 'string', id: 'Task Name' },
      { type: 'datetime', id: 'Start' },
      { type: 'datetime', id: 'End' },
    ];

    const base = new Date(0);
    const rows = log.map(({ pid, start, end }) => {
      const startDate = new Date(base.getTime() + start * 1000);
      const endDate = new Date(base.getTime() + end * 1000);
      return [pid, pid, startDate, endDate];
    });

    return [header, ...rows];
  }, [log]);

  const options = {
    timeline: {
      showRowLabels: true,
      showBarLabels: true,
    },
    avoidOverlappingGridLines: false,
    hAxis: {
      title: 'Time (simulation units)',
      gridlines: { count: Math.min(log.length * 2, 10) },
    },
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>MLFQ Gantt Chart</CardTitle>
        <CardDescription>
          This chart visualizes each process (PID) execution window over the simulated time units.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Column labels */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm font-medium">
          <div>PID</div>
          <div>Time</div>
        </div>
        {/* Timeline chart */}
        <div className="w-full" style={{ height: '300px' }}>
          <Chart
            chartType="Timeline"
            data={data}
            options={options}
            width="100%"
            height="100%"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default GanttChart;
