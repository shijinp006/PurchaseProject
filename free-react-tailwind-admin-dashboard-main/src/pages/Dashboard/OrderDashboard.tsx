import React from 'react';
import OrderTracking from '../../components/ecommerce/OrderTracking';

const OrderDashboard: React.FC = () => {
  const orderTrackingData = {
    orderNumber: 'PTRG4523',
    fromCity: 'NYC',
    toCity: 'PHI',
    stages: [
      {
        name: 'Receipt',
        time: '10:07AM',
        completed: true,
        active: false,
      },
      {
        name: 'Preparation',
        time: '13:18PM',
        completed: true,
        active: false,
      },
      {
        name: 'Dispatch',
        time: '14:33PM',
        completed: false,
        active: true,
      },
      {
        name: 'Receiving',
        time: '16:13PM',
        completed: false,
        active: false,
      },
    ],
    progress: 60,
    dispatchTime: '14:33PM',
    arrivalTime: '16:13PM',
  };

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {/* Other dashboard components can go here */}
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-8">
          <OrderTracking {...orderTrackingData} />
        </div>
        {/* Other dashboard components can go here */}
      </div>
    </div>
  );
};

export default OrderDashboard;
