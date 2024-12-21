"use client";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface TicketChartProps {
  data: number[];
}

const TicketChart: React.FC<TicketChartProps> = ({ data }) => {
  const chartData = {
    labels: [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ],
    datasets: [
      {
        label: "Tickets Created",
        data: data,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Monthly Ticket Counts",
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default TicketChart;
