"use client";

import { Bar } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { Chart, registerables } from "chart.js";
import Loader from "./Loader";
import ReloadButton from "./reload";

Chart.register(...registerables);

const fetchNewsCount = async () => {
  const response = await fetch("/api/news/count"); // استبدلها بالمسار المناسب لواجهة API الخاصة بك
  if (!response.ok) {
    throw new Error("Error fetching news data");
  }
  return response.json();
};

const Dashboard = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["newsCount"],
    queryFn: fetchNewsCount,
  });

  const chartData = {
    labels: data ? data.map((item: { date: any; }) => item.date) : [], // تأكد من أن هذا هو التنسيق الصحيح
    datasets: [
      {
        label: "عدد الأخبار",
        data: data ? data.map((item: { count: any; }) => item.count) : [], // تأكد من أن هذا هو التنسيق الصحيح
        backgroundColor: "#d4aa4890",
        borderColor: "#d4aa48",
        borderWidth: 1,
      },
    ],
  };

  if (isLoading) return <Loader />;
  if (error) return <ReloadButton />;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">لوحة التحكم</h1>
      <Bar data={chartData} />
    </div>
  );
};

export default Dashboard;
