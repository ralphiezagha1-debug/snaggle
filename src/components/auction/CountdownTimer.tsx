import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CountdownTimerProps {
  endTime: Date;
  onTimeUp?: () => void;
  className?: string;
}

export const CountdownTimer = ({ endTime, onTimeUp, className }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const total = Date.parse(endTime.toString()) - Date.parse(new Date().toString());
      
      if (total <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, total: 0 });
        onTimeUp?.();
        return;
      }

      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const hours = Math.floor(total / (1000 * 60 * 60));

      setTimeLeft({ hours, minutes, seconds, total });
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, onTimeUp]);

  const isUrgent = timeLeft.total <= 10000; // Less than 10 seconds
  const isWarning = timeLeft.total <= 30000; // Less than 30 seconds

  return (
    <div className={cn(
      "flex items-center justify-center p-4 rounded-lg font-mono text-2xl font-bold transition-smooth",
      {
        "bg-auction-danger text-auction-gold-foreground animate-pulse": isUrgent,
        "bg-auction-warning text-auction-gold-foreground": isWarning && !isUrgent,
        "bg-card text-card-foreground": !isWarning && !isUrgent,
      },
      className
    )}>
      <div className="flex gap-2">
        {timeLeft.hours > 0 && (
          <>
            <span className="tabular-nums">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span>:</span>
          </>
        )}
        <span className="tabular-nums">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span>:</span>
        <span className="tabular-nums">{String(timeLeft.seconds).padStart(2, '0')}</span>
      </div>
    </div>
  );
};