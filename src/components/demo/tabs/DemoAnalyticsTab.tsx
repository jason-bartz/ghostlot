"use client";

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowUp, Eye, Car, DollarSign, Users } from 'lucide-react';
import mockAnalytics from '@/utils/mockAnalytics';

// Chart colors
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function DemoAnalyticsTab() {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<any>(null);
  const [dateRange, setDateRange] = useState<'7days' | '30days' | '90days'>('30days');

  useEffect(() => {
    // Simulate API call with a short delay
    setTimeout(() => {
      setAnalytics(mockAnalytics);
      setLoading(false);
    }, 500);
  }, [dateRange]);

  // Format chart data
  const pieData = analytics?.charts.eventDistribution || [];
  const barData = analytics?.charts.dailyActivity || [];

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        
        <div className="mt-4 sm:mt-0">
          <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">
            Time Period
          </label>
          <select
            id="dateRange"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-500 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading analytics data...</p>
        </div>
      ) : analytics ? (
        <div>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Scans</p>
                  <h2 className="text-3xl font-bold text-indigo-600">{analytics.summary.totalScans.value}</h2>
                  <p className="text-green-500 text-xs mt-1 flex items-center">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    {analytics.summary.totalScans.change}
                  </p>
                </div>
                <div className="bg-indigo-100 p-3 rounded-full">
                  <Eye className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Test Drives</p>
                  <h2 className="text-3xl font-bold text-blue-600">{analytics.summary.testDrives.value}</h2>
                  <p className="text-green-500 text-xs mt-1 flex items-center">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    {analytics.summary.testDrives.change}
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Car className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Saved Vehicles</p>
                  <h2 className="text-3xl font-bold text-purple-600">{analytics.summary.savedVehicles.value}</h2>
                  <p className="text-green-500 text-xs mt-1 flex items-center">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    {analytics.summary.savedVehicles.change}
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">User Profiles</p>
                  <h2 className="text-3xl font-bold text-teal-600">{analytics.summary.userProfiles.value}</h2>
                  <p className="text-green-500 text-xs mt-1 flex items-center">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    {analytics.summary.userProfiles.change}
                  </p>
                </div>
                <div className="bg-teal-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-teal-600" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Direct Link Performance Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Direct Link Performance</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-lg shadow">
                <p className="text-gray-500 text-sm">Total Links Shared</p>
                <h3 className="text-2xl font-bold text-gray-900">{analytics.directLinkPerformance.totalLinksShared.value}</h3>
                <p className="text-green-500 text-xs mt-1 flex items-center">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  {analytics.directLinkPerformance.totalLinksShared.change}
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow">
                <p className="text-gray-500 text-sm">Link Click-Through</p>
                <h3 className="text-2xl font-bold text-gray-900">{analytics.directLinkPerformance.linkClickThrough.value}</h3>
                <p className="text-green-500 text-xs mt-1 flex items-center">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  {analytics.directLinkPerformance.linkClickThrough.change}
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow">
                <p className="text-gray-500 text-sm">Conversions</p>
                <h3 className="text-2xl font-bold text-gray-900">{analytics.directLinkPerformance.conversions.value}</h3>
                <p className="text-green-500 text-xs mt-1 flex items-center">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  {analytics.directLinkPerformance.conversions.change}
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow">
                <p className="text-gray-500 text-sm">Conversion Rate</p>
                <h3 className="text-2xl font-bold text-gray-900">{analytics.directLinkPerformance.conversionRate.value}</h3>
                <p className="text-green-500 text-xs mt-1 flex items-center">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  {analytics.directLinkPerformance.conversionRate.change}
                </p>
              </div>
            </div>
            
            {/* Link Performance Table */}
            <div className="mt-6 bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vehicle
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Links Shared
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Views
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Conversion
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {analytics.vehicleLinkPerformance.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.vehicle}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.linksShared}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.views}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.conversion}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.source}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Top Performing Vehicles Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Top Performing Vehicles</h2>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vehicle
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      QR Scans
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Test Drives
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Saved
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Conversion Rate
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {analytics.topPerformingVehicles.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.vehicle}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.qrScans}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.testDrives}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.saved}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.conversionRate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Event Distribution</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((_: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Activity Over Time</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={barData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" name="Event Count" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No analytics data available</p>
        </div>
      )}
    </div>
  );
}