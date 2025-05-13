/**
 * Mock Analytics Data for GhostLot
 * 
 * This file provides mock analytics data for the dashboard,
 * matching the structure shown in the UI screenshots.
 */

const mockAnalytics = {
  // Dashboard summary metrics
  summary: {
    totalScans: {
      value: 876,
      change: "+12% from last month"
    },
    testDrives: {
      value: 42,
      change: "+8% from last month"
    },
    savedVehicles: {
      value: 128,
      change: "+15% from last month"
    },
    userProfiles: {
      value: 89,
      change: "+9% from last month"
    }
  },
  
  // Direct link performance metrics
  directLinkPerformance: {
    totalLinksShared: {
      value: 342,
      change: "+24% from last month"
    },
    linkClickThrough: {
      value: "68%",
      change: "+5% from last month"
    },
    conversions: {
      value: 29,
      change: "+16% from last month"
    },
    conversionRate: {
      value: "8.5%",
      change: "+2% from last month"
    }
  },
  
  // Vehicle link performance table data
  vehicleLinkPerformance: [
    {
      vehicle: "2023 Toyota Camry XSE",
      linksShared: 58,
      views: "42 (72%)",
      conversion: "5 (12%)",
      source: "SMS (62%)"
    },
    {
      vehicle: "2022 Honda Accord Touring",
      linksShared: 47,
      views: "39 (83%)",
      conversion: "4 (10%)",
      source: "WhatsApp (41%)"
    },
    {
      vehicle: "2021 Ford F-150 Lariat",
      linksShared: 36,
      views: "31 (86%)",
      conversion: "3 (10%)",
      source: "Email (38%)"
    },
    {
      vehicle: "2023 Tesla Model 3",
      linksShared: 64,
      views: "51 (80%)",
      conversion: "7 (14%)",
      source: "SMS (47%)"
    },
    {
      vehicle: "2022 Chevrolet Silverado LTZ",
      linksShared: 41,
      views: "30 (73%)",
      conversion: "3 (10%)",
      source: "Facebook (52%)"
    }
  ],
  
  // Top performing vehicles table data
  topPerformingVehicles: [
    {
      vehicle: "2023 Toyota Camry XSE",
      qrScans: 78,
      testDrives: 12,
      saved: 23,
      conversionRate: "15.4%"
    },
    {
      vehicle: "2022 Honda Accord Touring",
      qrScans: 65,
      testDrives: 9,
      saved: 18,
      conversionRate: "13.8%"
    },
    {
      vehicle: "2021 Ford F-150 Lariat",
      qrScans: 52,
      testDrives: 7,
      saved: 14,
      conversionRate: "13.5%"
    },
    {
      vehicle: "2023 Tesla Model 3",
      qrScans: 89,
      testDrives: 15,
      saved: 27,
      conversionRate: "16.9%"
    },
    {
      vehicle: "2022 Chevrolet Silverado LTZ",
      qrScans: 61,
      testDrives: 8,
      saved: 16,
      conversionRate: "13.1%"
    }
  ],
  
  // Chart data
  charts: {
    // Event distribution data for pie chart
    eventDistribution: [
      { name: "QR Scans", value: 876 },
      { name: "Vehicle Detail Views", value: 624 },
      { name: "Test Drive Requests", value: 42 },
      { name: "Reservations", value: 29 }
    ],
    
    // Daily activity data for line/bar chart
    dailyActivity: Array.from({ length: 30 }, (_, i) => {
      // Generate a date string for the last 30 days
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      const dateStr = date.toISOString().split('T')[0];
      
      // Generate realistic but random data
      const baseValue = 20 + Math.floor(Math.random() * 15);
      
      // Create weekend dips and weekday patterns
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const multiplier = isWeekend ? 0.7 : 1 + (Math.random() * 0.3);
      
      return {
        date: dateStr,
        value: Math.floor(baseValue * multiplier)
      };
    })
  }
};

export default mockAnalytics;