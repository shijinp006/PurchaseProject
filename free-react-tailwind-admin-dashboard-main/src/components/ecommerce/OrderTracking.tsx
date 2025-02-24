import React, { useState } from 'react';

interface TrackingStage {
  name: string;
  time: string;
  completed: boolean;
  active: boolean;
  details: {
    date: string;
    address: string;
    estimatedTime: string;
    attachments?: {
      name: string;
      url: string;
    }[];
  };
}

interface OrderTrackingProps {
  orderNumber: string;
  fromCity: string;
  toCity: string;
  stages: TrackingStage[];
  progress: number;
  dispatchTime: string;
  arrivalTime: string;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({
  orderNumber,
  fromCity,
  toCity,
  stages,
  progress,
  dispatchTime,
  arrivalTime,
}) => {
  const [expandedStage, setExpandedStage] = useState<number | null>(null);

  const toggleStage = (index: number) => {
    setExpandedStage(expandedStage === index ? null : index);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-black dark:text-white">
            Order Info
          </h3>
          <button className="hover:text-blue-400">
            View more &gt;
          </button>
        </div>

        {/* Route Card */}
        <div className="bg-[#E8E5FF] rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <span className="text-xl font-bold">{fromCity}</span>
              <span className="text-xl font-bold">{toCity}</span>
            </div>
            <span className="text-lg font-semibold">#{orderNumber}</span>
          </div>

          <div className="relative">
            {/* Truck Icon and Progress Line */}
            <div className="h-2 bg-white/50 rounded-full mb-2">
              <div
                className="h-full bg-blue-400 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm">
              <span>{dispatchTime}</span>
              <span>{arrivalTime}</span>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-semibold">{progress}% Completed</span>
            <span className="text-sm text-gray-500">Deliveries</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-400 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {stages.map((stage, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div 
                className="flex items-start cursor-pointer group"
                onClick={() => toggleStage(index)}
              >
                <div className="relative flex flex-col items-center mr-4">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      stage.completed || stage.active
                        ? 'bg-blue-400'
                        : 'bg-gray-200'
                    }`}
                  ></div>
                  {index !== stages.length - 1 && (
                    <div
                      className={`w-0.5 h-full absolute top-3 ${
                        stage.completed ? 'bg-blue-400' : 'bg-gray-200'
                      }`}
                    ></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span
                        className={`font-medium ${
                          stage.active ? 'text-blue-400' : 'text-gray-500'
                        }`}
                      >
                        {stage.name}
                      </span>
                      <svg
                        className={`w-4 h-4 ml-2 text-gray-400 transform transition-transform duration-200 ${
                          expandedStage === index ? 'rotate-180' : ''
                        }`}
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                      <span className="text-sm text-gray-500 ml-2">{stage.time}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Expanded Details */}
              {expandedStage === index && (
                <div className="ml-7 mt-3 pl-4 border-l border-gray-200">
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-start">
                      <span className="text-gray-500 w-32">Date & Time:</span>
                      <span className="text-gray-700">{stage.details.date}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-gray-500 w-32">Address:</span>
                      <span className="text-gray-700">{stage.details.address}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-gray-500 w-32">Estimated Time:</span>
                      <span className="text-gray-700">{stage.details.estimatedTime}</span>
                    </div>
                    {stage.details.attachments && stage.details.attachments.length > 0 && (
                      <div className="flex items-start">
                        <span className="text-gray-500 w-32">Attachments:</span>
                        <div className="flex flex-wrap gap-2">
                          {stage.details.attachments.map((attachment, idx) => (
                            <a
                              key={idx}
                              href={attachment.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm hover:bg-blue-100 transition-colors"
                            >
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                />
                              </svg>
                              {attachment.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
