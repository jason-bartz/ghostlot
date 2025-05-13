/**
 * Mock Test Drive Data for GhostLot
 * 
 * This file provides mock test drive data for the application,
 * matching the structure shown in the UI screenshots.
 */

const mockTestDrives = [
  {
    id: "td-1",
    customer: {
      name: "John Smith", 
      email: "john@example.com",
      phone: "555-123-4567"
    },
    vehicle: {
      year: 2022,
      make: "Honda",
      model: "Accord",
      trim: "Touring"
    },
    date_time: {
      date: "5/14/2025",
      time: "10:00 AM"
    },
    status: "Pending",
    actions: ["Confirm", "Cancel", "Contact"]
  },
  {
    id: "td-2",
    customer: {
      name: "Sarah Johnson", 
      email: "sarah@example.com",
      phone: "555-987-6543"
    },
    vehicle: {
      year: 2023,
      make: "Toyota",
      model: "Camry",
      trim: "XSE"
    },
    date_time: {
      date: "5/15/2025",
      time: "2:00 PM"
    },
    status: "Confirmed",
    actions: ["Mark Completed", "Cancel", "Contact"]
  },
  {
    id: "td-3",
    customer: {
      name: "Mike Davis", 
      email: "mike@example.com",
      phone: "555-456-7890"
    },
    vehicle: {
      year: 2021,
      make: "Ford",
      model: "F-150",
      trim: "Lariat"
    },
    date_time: {
      date: "5/13/2025",
      time: "11:00 AM"
    },
    status: "Completed",
    actions: ["Contact"]
  },
  {
    id: "td-4",
    customer: {
      name: "Emma Wilson", 
      email: "emma@example.com",
      phone: "555-789-0123"
    },
    vehicle: {
      year: 2023,
      make: "Tesla",
      model: "Model 3",
      trim: ""
    },
    date_time: {
      date: "5/16/2025",
      time: "4:00 PM"
    },
    status: "Pending",
    actions: ["Confirm", "Cancel", "Contact"]
  },
  {
    id: "td-5",
    customer: {
      name: "Daniel Brown", 
      email: "daniel@example.com",
      phone: "555-321-6547"
    },
    vehicle: {
      year: 2022,
      make: "Chevrolet",
      model: "Silverado",
      trim: "LTZ"
    },
    date_time: {
      date: "5/18/2025",
      time: "1:00 PM"
    },
    status: "Pending",
    actions: ["Confirm", "Cancel", "Contact"]
  },
  {
    id: "td-6",
    customer: {
      name: "Jessica Lee", 
      email: "jessica@example.com",
      phone: "555-246-8135"
    },
    vehicle: {
      year: 2022,
      make: "BMW",
      model: "X5",
      trim: "xDrive40i"
    },
    date_time: {
      date: "5/17/2025",
      time: "3:30 PM"
    },
    status: "Confirmed",
    actions: ["Mark Completed", "Cancel", "Contact"]
  },
  {
    id: "td-7",
    customer: {
      name: "Robert Taylor", 
      email: "robert@example.com",
      phone: "555-753-9514"
    },
    vehicle: {
      year: 2021,
      make: "Audi",
      model: "Q5",
      trim: "Premium Plus"
    },
    date_time: {
      date: "5/13/2025",
      time: "9:30 AM"
    },
    status: "Cancelled",
    actions: ["Contact"]
  }
];

const mockTestDrivesCustom = mockTestDrives;
export default mockTestDrivesCustom;