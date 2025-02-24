// Mock API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API Types
export interface MonthlyTargetData {
  target: number;
  achieved: number;
  percentage: number;
  trend: string;
}

export interface RecentOrder {
  id: string;
  product: string;
  customer: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Cancelled';
}

export interface EcommerceMetric {
  title: string;
  value: number;
  trend: number;
  icon: string;
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  location: string;
  avatar: string;
}

export interface ChartData {
  labels: string[];
  data: number[];
}

// API Functions
export const api = {
  async getMonthlyTarget(): Promise<MonthlyTargetData> {
    await delay(500);
    return {
      target: 1000000,
      achieved: 780000,
      percentage: 78,
      trend: '+10%'
    };
  },

  async getRecentOrders(): Promise<RecentOrder[]> {
    await delay(500);
    return [
      {
        id: '1',
        product: 'Apple MacBook Pro 17"',
        customer: 'John Doe',
        date: '2024-02-23',
        amount: 2499,
        status: 'Paid'
      },
      {
        id: '2',
        product: 'Samsung Galaxy S24 Ultra',
        customer: 'Jane Smith',
        date: '2024-02-22',
        amount: 1299,
        status: 'Pending'
      },
      // Add more mock data as needed
    ];
  },

  async getEcommerceMetrics(): Promise<EcommerceMetric[]> {
    await delay(500);
    return [
      {
        title: 'Purchases',
        value: 3782,
        trend: 11.01,
        icon: 'users'
      },
      {
        title: 'Design Codes',
        value: 5359,
        trend: -9.05,
        icon: 'box'
      }
    ];
  },

  async getUserProfile(): Promise<UserProfile> {
    await delay(500);
    return {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      location: 'New York, USA',
      avatar: '/path/to/avatar.jpg'
    };
  },

  async getSalesChartData(): Promise<ChartData> {
    await delay(500);
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [30, 40, 45, 50, 49, 60]
    };
  },

  async getDemographicData(): Promise<ChartData> {
    await delay(500);
    return {
      labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
      data: [15, 30, 25, 18, 12]
    };
  }
};
