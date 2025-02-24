import { useQuery } from '@tanstack/react-query';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useState } from "react";

// Mock API function - replace with real API call
const fetchMonthlyTarget = async () => {
  // Simulate API call
  return {
    target: 1000000,
    achieved: 780000,
    percentage: 78,
    trend: '+10%'
  };
};

export default function MonthlyTarget() {
  const { data, isLoading } = useQuery({
    queryKey: ['monthlyTarget'],
    queryFn: fetchMonthlyTarget,
  });

  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-8 dark:border-gray-800 dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Monthly Target</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Target you've set for each month</p>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
            <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Progress Circle */}
      <div className="relative mx-auto my-8 flex justify-center">
        <div className="relative h-[180px] w-[280px]">
          <CircularProgressbar
            value={data?.percentage || 0}
            strokeWidth={4}
            circleRatio={0.5}
            styles={buildStyles({
              rotation: 0.75,
              strokeLinecap: 'round',
              pathTransitionDuration: 0.5,
              pathColor: '#4096ff',
              trailColor: '#f5f5f5',
            })}
          />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[-15%]">
            <span className="text-[56px] font-bold text-[#4096ff]">{data?.percentage}%</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="mb-8 text-center text-base text-[#64748b]">
        You earned more today, it's higher than last month.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-sm text-[#64748b]">Target</p>
          <div className="mt-2 flex items-center justify-center text-1xl font-semibold text-[#1e293b]">
            ${data?.target.toLocaleString()}
            <span className="ml-1 text-red-500">↓</span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm text-[#64748b]">Revenue</p>
          <div className="mt-2 flex items-center justify-center text-1xl font-semibold text-[#1e293b]">
            ${data?.achieved.toLocaleString()}
            <span className="ml-1 text-[#4096ff]">↑</span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm text-[#64748b]">Today</p>
          <div className="mt-2 flex items-center justify-center text-1xl font-semibold text-[#1e293b]">
            ${data?.achieved.toLocaleString()}
            <span className="ml-1 text-[#4096ff]">↑</span>
          </div>
        </div>
      </div>
    </div>
  );
}
