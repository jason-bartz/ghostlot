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

# Fix TypeScript error in consumer-view page
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

# Fix toggleSection TypeScript error
sed -i 's/const toggleSection = (section) => {/const toggleSection = (section: string) => {/g' src/app/consumer-view/page.tsx

echo "Build script completed"