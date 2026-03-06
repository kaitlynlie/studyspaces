import { motion } from "motion/react";

interface CircularTimerProps {
  timeRemaining: number;
  totalTime: number;
  isRunning: boolean;
}

export function CircularTimer({ timeRemaining, totalTime, isRunning }: CircularTimerProps) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  
  const progress = totalTime > 0 ? (timeRemaining / totalTime) : 1;
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="relative flex items-center justify-center">
      <svg className="transform -rotate-90" width="280" height="280">
        {/* Background circle */}
        <circle
          cx="140"
          cy="140"
          r="120"
          stroke="rgba(180, 83, 9, 0.15)"
          strokeWidth="12"
          fill="none"
        />
        {/* Progress circle */}
        <motion.circle
          cx="140"
          cy="140"
          r="120"
          stroke="rgba(217, 119, 6, 0.9)"
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </svg>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="text-center"
          animate={{ scale: isRunning ? [1, 1.02, 1] : 1 }}
          transition={{ duration: 1, repeat: isRunning ? Infinity : 0 }}
        >
          <div className="text-7xl font-light text-amber-900 tracking-wider">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div className="text-sm text-amber-700/70 mt-2 uppercase tracking-widest">
            {isRunning ? 'Focus Time' : 'Ready'}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
