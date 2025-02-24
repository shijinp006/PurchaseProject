import { useEcommerceMetrics } from '../../hooks/queries';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'users':
      return (
        <svg
          className="h-8 w-8 text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      );
    case 'box':
      return (
        <svg
          className="h-8 w-8 text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      );
    default:
      return null;
  }
};

export default function EcommerceMetrics() {
  const { data: metrics, isLoading } = useEcommerceMetrics();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-lg bg-white p-4 h-[180px] border border-gray-200">
            <div className="h-full animate-pulse bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {metrics?.map((metric, index) => (
          <div 
            key={index}
            className="rounded-lg bg-white p-4 h-[180px] border border-gray-200"
          >
            <div className="flex flex-col h-full justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-gray-100 rounded-lg">
                  {getIcon(metric.icon)}
                </div>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-500 block mb-1">
                  {metric.title}
                </span>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-3xl font-semibold text-gray-900">
                    {metric.value.toLocaleString()}
                  </h3>
                  <span 
                    className={`text-sm font-medium ${
                      metric.trend > 0 
                        ? 'text-green-500' 
                        : 'text-red-500'
                    }`}
                  >
                    {metric.trend > 0 ? '↑' : '↓'} {Math.abs(metric.trend).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
