"use client"
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from "framer-motion";

export const DemoVariant1 = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Red-White Gradient Background */}
      <AnimatedGradientBackground 
        theme="red-white" 
        Breathing={true}
        startingGap={140}
        breathingRange={15}
        animationSpeed={0.04}
      />

      <div className="relative z-10 flex flex-col items-center justify-start h-full px-4 pt-32 text-center">
        <div>
          <DotLottieReact
            src="https://lottie.host/8cf4ba71-e5fb-44f3-8134-178c4d389417/0CCsdcgNIP.json"
            loop
            autoplay
          />
        </div>
        <p className="mt-4 text-lg text-gray-700 md:text-xl max-w-lg font-medium">
          A dynamic white-red animated radial gradient background with a subtle
          breathing effect that matches the E-Z Loan theme.
        </p>
      </div>
    </div>
  );
};

export const DemoVariant2 = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Animated gradient background with default theme */}
      <AnimatedGradientBackground 
        Breathing={true}
        startingGap={125}
        breathingRange={5}
      />

      <div className="relative z-10 flex flex-col items-center justify-start h-full px-4 pt-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">Default Gradient Theme</h1>
          <p className="text-lg text-gray-300 md:text-xl max-w-lg">
            A customizable animated radial gradient background with a vibrant color palette.
          </p>
        </motion.div>
      </div>
    </div>
  );
};