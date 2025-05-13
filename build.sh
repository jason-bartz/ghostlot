#!/bin/bash

# Fix WebSocket optional dependencies in next.config.js
cat > next.config.js << 'EOL'
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    });
    return config;
  },
}

module.exports = nextConfig
EOL

# Add React FormEvent type at the top of the file, after the imports
sed -i '/import React, { useState, useEffect } from/a import { FormEvent, ChangeEvent } from "react";' src/app/consumer-view/page.tsx

# Fix TypeScript error in consumer-view page - Add proper types to all state variables
sed -i 's/const \[selectedDate, setSelectedDate\] = useState(null);/const [selectedDate, setSelectedDate] = useState<Date | null>(null);/g' src/app/consumer-view/page.tsx
sed -i 's/const \[selectedTime, setSelectedTime\] = useState(null);/const [selectedTime, setSelectedTime] = useState<string | null>(null);/g' src/app/consumer-view/page.tsx
sed -i 's/const \[activeSection, setActiveSection\] = useState(null);/const [activeSection, setActiveSection] = useState<string | null>(null);/g' src/app/consumer-view/page.tsx

# Replace the scheduleTestDrive function
sed -i '/const scheduleTestDrive = () => {/,/};/c\
  const scheduleTestDrive = () => {\
    if (selectedDate && selectedTime) {\
      const formattedDate = selectedDate instanceof Date ? selectedDate.toLocaleDateString("en-US") : "";\
      alert(`Test drive scheduled for ${formattedDate} at ${selectedTime}`);\
      setShowCalendar(false);\
      setSelectedDate(null);\
      setSelectedTime(null);\
    } else {\
      alert("Please select both a date and time for your test drive.");\
    }\
  };' src/app/consumer-view/page.tsx

# Fix all function parameter TypeScript errors
sed -i 's/const toggleSection = (section) => {/const toggleSection = (section: string) => {/g' src/app/consumer-view/page.tsx
sed -i 's/const handleTradeInChange = (e) => {/const handleTradeInChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {/g' src/app/consumer-view/page.tsx
sed -i 's/const handleCreateProfile = () => {/const handleCreateProfile = (): void => {/g' src/app/consumer-view/page.tsx
sed -i 's/const getTradeInValue = () => {/const getTradeInValue = (): void => {/g' src/app/consumer-view/page.tsx
sed -i 's/const calculatePayment = () => {/const calculatePayment = (): void => {/g' src/app/consumer-view/page.tsx
sed -i 's/const handleSaveVehicle = () => {/const handleSaveVehicle = (): void => {/g' src/app/consumer-view/page.tsx
sed -i 's/const getButtonStyle = () => {/const getButtonStyle = (): React.CSSProperties => {/g' src/app/consumer-view/page.tsx
sed -i 's/const getDateRange = () => {/const getDateRange = (): Date[] => {/g' src/app/consumer-view/page.tsx

# Update any other event handlers that might need typing
sed -i 's/onChange={\(e\) =>/onChange={(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>/g' src/app/consumer-view/page.tsx
sed -i 's/onClick={\(e\) =>/onClick={(e: React.MouseEvent) =>/g' src/app/consumer-view/page.tsx

echo "Build script completed"