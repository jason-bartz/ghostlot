/**
 * Mock Reservation Data for GhostLot
 * 
 * This file provides mock reservation data for the application,
 * matching the structure shown in the UI screenshots.
 */

const mockReservations = [
  {
    id: "res-1",
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
    reservation_date: {
      date: "5/19/2025",
      notes: "Customer wants to finance"
    },
    amount: "$500",
    status: "Pending",
    actions: ["Confirm", "Cancel", "Contact"]
  },
  {
    id: "res-2",
    customer: {
      name: "Michael Brown",
      email: "michael@example.com",
      phone: "555-456-7890"
    },
    vehicle: {
      year: 2022,
      make: "Honda",
      model: "Accord",
      trim: "Touring"
    },
    reservation_date: {
      date: "5/17/2025",
      notes: "Trade-in vehicle: 2018 Toyota Camry"
    },
    amount: "$500",
    status: "Confirmed",
    actions: ["Mark Completed", "Cancel", "Contact"]
  },
  {
    id: "res-3",
    customer: {
      name: "Rachel Green",
      email: "rachel@example.com",
      phone: "555-234-5678"
    },
    vehicle: {
      year: 2021,
      make: "Ford",
      model: "F-150",
      trim: "Lariat"
    },
    reservation_date: {
      date: "5/24/2025",
      notes: "Cash purchase"
    },
    amount: "$500",
    status: "Completed",
    actions: ["Contact"]
  },
  {
    id: "res-4",
    customer: {
      name: "David Miller",
      email: "david@example.com",
      phone: "555-111-2222"
    },
    vehicle: {
      year: 2022,
      make: "Chevrolet",
      model: "Silverado",
      trim: "LTZ"
    },
    reservation_date: {
      date: "5/21/2025",
      notes: "Waiting for financing approval"
    },
    amount: "$500",
    status: "Pending",
    actions: ["Confirm", "Cancel", "Contact"]
  },
  {
    id: "res-5",
    customer: {
      name: "Jennifer Adams",
      email: "jennifer@example.com",
      phone: "555-333-4444"
    },
    vehicle: {
      year: 2023,
      make: "BMW",
      model: "X5",
      trim: "xDrive40i"
    },
    reservation_date: {
      date: "5/22/2025",
      notes: "Looking for extended warranty options"
    },
    amount: "$500",
    status: "Confirmed",
    actions: ["Mark Completed", "Cancel", "Contact"]
  },
  {
    id: "res-6",
    customer: {
      name: "Thomas Wilson",
      email: "thomas@example.com",
      phone: "555-555-6666"
    },
    vehicle: {
      year: 2023,
      make: "Audi",
      model: "Q7",
      trim: "Premium Plus"
    },
    reservation_date: {
      date: "5/20/2025",
      notes: "Trade-in vehicle: 2019 Volvo XC60"
    },
    amount: "$500",
    status: "Cancelled",
    actions: ["Contact"]
  },
  {
    id: "res-7",
    customer: {
      name: "Emily Johnson",
      email: "emily@example.com",
      phone: "555-777-8888"
    },
    vehicle: {
      year: 2022,
      make: "Lexus",
      model: "RX 350",
      trim: "F Sport"
    },
    reservation_date: {
      date: "5/23/2025",
      notes: "Pre-approved financing through outside lender"
    },
    amount: "$500",
    status: "Pending",
    actions: ["Confirm", "Cancel", "Contact"]
  }
];

const mockReservationsCustom = mockReservations;
export default mockReservationsCustom;