import React from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

export const LampContainer = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden w-full z-0",
        className
      )}
    >
      {/* Lamp glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px]">
          <motion.div
            initial={{ opacity: 0, width: "10rem" }}
            whileInView={{ opacity: 1, width: "35rem" }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
            className="absolute left-1/2 -translate-x-1/2 h-32 w-[35rem] rounded-full bg-brand-yellow/10 blur-[80px]"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-[20rem] bg-gradient-to-r from-transparent via-brand-yellow/40 to-transparent"
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full">
        {children}
      </div>
    </div>
  );
};
