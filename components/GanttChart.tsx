import React from "react";
import { Chart } from "react-google-charts";

interface GanttEntry {
  pid: string;
  start: number;
  end: number;
}

interface GanttChartProps {
  log: GanttEntry[];
}

const GanttChart: React.FC<GanttChartProps> = ({ log }) => {
  const data = React.useMemo(() => {
    const header = [
      { type: 'string', id: 'Task ID' },
      { type: 'string', id: 'Task Name' },
      { type: 'datetime', id: 'Start' },
      { type: 'datetime', id: 'End' },
    ];

    const rows = log.map(({ pid, start, end }) => {
      const base = new Date(0);
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
    },
  };

  return (
    <div style={{ height: '300px' }}>
      <Chart
        chartType="Timeline"
        data={data}
        options={options}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default GanttChart;