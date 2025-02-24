import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import OrderTracking from "../../components/ecommerce/OrderTracking";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  const orderTrackingData = {
    orderNumber: 'PTRG4523',
    fromCity: 'Factory',
    toCity: 'Delivery',
    stages: [
      {
        name: 'Fabric Purchase',
        time: '10:07AM',
        completed: true,
        active: false,
        details: {
          date: '22 Feb 2025, 10:07 AM',
          address: 'Textile Market, 123 Fabric Street',
          estimatedTime: 'Completed',
          attachments: [
            {
              name: 'Fabric_Invoice.pdf',
              url: '#'
            },
            {
              name: 'Material_Specs.pdf',
              url: '#'
            }
          ]
        }
      },
      {
        name: 'Dying',
        time: '13:18PM',
        completed: true,
        active: false,
        details: {
          date: '22 Feb 2025, 13:18 PM',
          address: 'Dyeing Unit, 456 Industrial Area',
          estimatedTime: 'Completed',
          attachments: [
            {
              name: 'Color_Samples.jpg',
              url: '#'
            },
            {
              name: 'Dye_Report.pdf',
              url: '#'
            }
          ]
        }
      },
      {
        name: 'Quality Check',
        time: '14:33PM',
        completed: false,
        active: true,
        details: {
          date: '22 Feb 2025, 14:33 PM',
          address: 'QC Department, Main Factory',
          estimatedTime: '2 hours remaining',
          attachments: [
            {
              name: 'Quality_Standards.pdf',
              url: '#'
            },
            {
              name: 'Inspection_Form.pdf',
              url: '#'
            }
          ]
        }
      },
      {
        name: 'Packing and Shipping',
        time: '16:13PM',
        completed: false,
        active: false,
        details: {
          date: '22 Feb 2025, 16:13 PM (Expected)',
          address: 'Packaging Unit, Main Factory',
          estimatedTime: '4 hours (Scheduled)',
          attachments: [
            {
              name: 'Packing_List.pdf',
              url: '#'
            }
          ]
        }
      },
      {
        name: 'Completed',
        time: '18:30PM',
        completed: false,
        active: false,
        details: {
          date: '22 Feb 2025, 18:30 PM (Expected)',
          address: 'Delivery Address, Customer Location',
          estimatedTime: '6 hours (Scheduled)',
          attachments: [
            {
              name: 'Delivery_Receipt.pdf',
              url: '#'
            }
          ]
        }
      }
    ],
    progress: 40,
    dispatchTime: '10:07AM',
    arrivalTime: '18:30PM',
  };

  return (
    <>
      <PageMeta
        title="Fawri Dashboard | Order Tracking and Management"
        description="Fawri Dashboard - Order tracking and management system"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-7 xl:col-span-7">
          <EcommerceMetrics />
          <MonthlySalesChart />
        </div>
        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>
        <div className="col-span-12">
          <OrderTracking {...orderTrackingData} />
        </div>
      </div>
    </>
  );
}
