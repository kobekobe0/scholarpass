import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import useLogTrendsStore from '../../store/logTrend.store';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StudentLogChart = () => {
  const { logTrends, loading, error, fetchLogTrends } = useLogTrendsStore();

  useEffect(() => {
    fetchLogTrends();
  }, [fetchLogTrends]);

  // If still loading, display a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's an error, display the error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  // If logTrends is empty, handle that case
  if (logTrends.length === 0) {
    return <div>No data available</div>;
  }

  // Prepare data for the chart
  const labels = logTrends.map((data) => `${data.hour}:${data.minute === 0 ? '00' : data.minute}`);
  const dataCounts = logTrends.map((data) => data.count);

  const data = {
    labels,
    datasets: [
      {
        label: 'Student Log Counts',
        data: dataCounts,
        borderColor: 'rgb(0,145,77)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.2, // Smooth line
      },
    ],
  };

  return (
    <div className='shadow-md bg-white rounded flex-1 min-h-24 p-8 w-full'>
      <h2 className='text-lg font-semibold mb-4'>Student Entry Heat Map</h2>
      <div style={{ height: '300px', width: '100%' }}>
        <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default StudentLogChart;
