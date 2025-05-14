"use client"
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from "framer-motion";

/**
 * Demo Gradient Components
 * 
 * This file contains pre-configured demo components that showcase different 
 * implementations of the AnimatedGradientBackground component with various themes and settings.
 * These components are intended for demonstration purposes and can be used directly in 
 * marketing pages, landing pages, or as examples for customizing gradients.
 * 
 * The file includes:
 * - DemoVariant1: A red-white themed gradient with E-Z Loan branding and Lottie animation
 * - DemoVariant2: A default multi-color gradient with animated text elements
 * 
 * This file differs from the other gradient components by:
 * - Being a collection of ready-to-use demo implementations rather than base components
 * - Including complete page layouts with content elements (text, animations)
 * - Providing practical examples of how to use AnimatedGradientBackground in real UIs
 * - Being specifically styled for certain brand themes (E-Z Loan in DemoVariant1)
 */

/**
 * DemoVariant1
 * 
 * A complete demo page with a red-white themed gradient background
 * designed specifically for E-Z Loan branding with a Lottie animation.
 */
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

/**
 * DemoVariant2
 * 
 * A complete demo page with the default multi-color gradient theme
 * and animated text content using framer-motion for entrance effects.
 */
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