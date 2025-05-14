"use client"

import { useState } from 'react'
import { DemoVariant1, DemoVariant2 } from '@/components/ui/demo-gradient'

export default function DemoGradientPage() {
  const [currentDemo, setCurrentDemo] = useState<'variant1' | 'variant2'>('variant1')

  return (
    <div className="min-h-screen">
      <div className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4">
        <h2 className="text-lg font-bold mb-2">Gradient Background Demos</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentDemo('variant1')}
            className={`px-4 py-2 rounded ${
              currentDemo === 'variant1'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Red/White Theme
          </button>
          <button
            onClick={() => setCurrentDemo('variant2')}
            className={`px-4 py-2 rounded ${
              currentDemo === 'variant2'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Default Theme
          </button>
        </div>
      </div>

      {currentDemo === 'variant1' ? <DemoVariant1 /> : <DemoVariant2 />}
    </div>
  )
}