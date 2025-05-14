import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";

interface AnimatedGradientBackgroundProps {
   /** 
    * Initial size of the radial gradient, defining the starting width. 
    * @default 110
    */
   startingGap?: number;

   /**
    * Enables or disables the breathing animation effect.
    * @default false
    */
   Breathing?: boolean;

   /**
    * Array of colors to use in the radial gradient.
    * Each color corresponds to a stop percentage in `gradientStops`.
    * @default ["#e01818", "#ed3232", "#f04c4c", "#f57575", "#ffffff"]
    */
   gradientColors?: string[];

   /**
    * Array of percentage stops corresponding to each color in `gradientColors`.
    * The values should range between 0 and 100.
    * @default [30, 45, 60, 80, 100]
    */
   gradientStops?: number[];

   /**
    * Speed of the breathing animation. 
    * Lower values result in slower animation.
    * @default 0.02
    */
   animationSpeed?: number;

   /**
    * Maximum range for the breathing animation in percentage points.
    * Determines how much the gradient "breathes" by expanding and contracting.
    * @default 5
    */
   breathingRange?: number;

   /**
    * Additional inline styles for the gradient container.
    * @default {}
    */
   containerStyle?: React.CSSProperties;

   /**
    * Additional class names for the gradient container.
    * @default ""
    */
   containerClassName?: string;


   /**
    * Additional top offset for the gradient container form the top to have a more flexible control over the gradient.
    * @default 0
    */
   topOffset?: number;

   /**
    * Theme for the gradient background.
    * @default "default"
    */
   theme?: "default" | "red-white";
}

/**
 * AnimatedGradientBackground
 *
 * This component renders a customizable animated radial gradient background with a subtle breathing effect.
 * It uses `framer-motion` for an entrance animation and raw CSS gradients for the dynamic background.
 * 
 * Features:
 * - Single radial gradient with customizable colors and stops
 * - "Breathing" animation that expands and contracts the gradient
 * - Predefined themes (default and red-white)
 * - Smooth entrance animation with fade-in and scale effects
 * - Highly customizable with multiple parameters
 * 
 * This component differs from BackgroundGradientAnimation by:
 * - Using a single radial gradient instead of multiple layers
 * - Having a simpler "breathing" animation rather than complex path animations
 * - Including predefined themes for quick styling
 * - Being more performance-efficient for simpler gradient needs
 * - Supporting precise customization of gradient stops and colors
 *
 * @param {AnimatedGradientBackgroundProps} props - Props for configuring the gradient animation.
 * @returns JSX.Element
 */
const AnimatedGradientBackground: React.FC<AnimatedGradientBackgroundProps> = ({
   startingGap = 125,
   Breathing = true,
   gradientColors,
   gradientStops,
   animationSpeed = 0.02,
   breathingRange = 5,
   containerStyle = {},
   topOffset = 0,
   containerClassName = "",
   theme = "default"
}) => {
   // Pre-defined themes
   const themes = {
      default: {
         colors: ["#0A0A0A", "#2979FF", "#FF80AB", "#FF6D00", "#FFD600", "#00E676", "#3D5AFE"],
         stops: [35, 50, 60, 70, 80, 90, 100]
      },
      "red-white": {
         colors: ["#ffffff", "#ffeeee", "#ffdddd", "#ffbbbb", "#ff9999"],
         stops: [15, 40, 65, 85, 100]
      }
   };

   // Use theme colors/stops if no custom ones provided
   const colors = gradientColors || themes[theme].colors;
   const stops = gradientStops || themes[theme].stops;

   // Validation: Ensure gradientStops and gradientColors lengths match
   if (colors.length !== stops.length) {
      throw new Error(
         `GradientColors and GradientStops must have the same length.
     Received gradientColors length: ${colors.length},
     gradientStops length: ${stops.length}`
      );
   }

   const containerRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      let animationFrame: number;
      let width = startingGap;
      let directionWidth = 1;

      const animateGradient = () => {
         if (width >= startingGap + breathingRange) directionWidth = -1;
         if (width <= startingGap - breathingRange) directionWidth = 1;

         if (!Breathing) directionWidth = 0;
         width += directionWidth * animationSpeed;

         const gradientStopsString = stops
            .map((stop, index) => `${colors[index]} ${stop}%`)
            .join(", ");

         const gradient = `radial-gradient(${width}% ${width+topOffset}% at 50% 30%, ${gradientStopsString})`;

         if (containerRef.current) {
            containerRef.current.style.background = gradient;
         }

         animationFrame = requestAnimationFrame(animateGradient);
      };

      animationFrame = requestAnimationFrame(animateGradient);

      return () => cancelAnimationFrame(animationFrame); // Cleanup animation
   }, [startingGap, Breathing, colors, stops, animationSpeed, breathingRange, topOffset]);

   return (
      <motion.div
         key="animated-gradient-background"
         initial={{
            opacity: 0,
            scale: 1.5,
         }}
         animate={{
            opacity: 1,
            scale: 1,
            transition: {
               duration: 2,
               ease: [0.25, 0.1, 0.25, 1], // Cubic bezier easing
             },
         }}
         className={`absolute inset-0 overflow-hidden ${containerClassName}`}
      >
         <div
            ref={containerRef}
            style={containerStyle}
            className="absolute inset-0 transition-transform"
         />
      </motion.div>
   );
};

export default AnimatedGradientBackground;