import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface CountdownProps {
  endTime: Date;
  onComplete?: () => void;
  variant?: 'default' | 'compact' | 'large';
  showLabels?: boolean;
  className?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export const Countdown = ({ 
  endTime, 
  onComplete, 
  variant = 'default',
  showLabels = true,
  className 
}: CountdownProps) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    const calculateTimeRemaining = (): TimeRemaining => {
      const now = new Date().getTime();
      const end = endTime.getTime();
      const difference = end - now;

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        isExpired: false
      };
    };

    const updateTimer = () => {
      const newTime = calculateTimeRemaining();
      setTimeRemaining(newTime);

      if (newTime.isExpired && onComplete) {
        onComplete();
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [endTime, onComplete]);

  if (timeRemaining.isExpired) {
    return (
      <div className={cn("flex items-center gap-2 text-destructive", className)}>
        <Clock className="h-4 w-4" />
        <span className="font-medium">Auction Ended</span>
      </div>
    );
  }

  const formatTime = (value: number) => value.toString().padStart(2, '0');

  if (variant === 'compact') {
    const totalHours = timeRemaining.days * 24 + timeRemaining.hours;
    return (
      <div className={cn("flex items-center gap-1 text-sm", className)}>
        <Clock className="h-4 w-4" />
        <span>
          {totalHours > 0 && `${totalHours}h `}
          {formatTime(timeRemaining.minutes)}m
        </span>
      </div>
    );
  }

  if (variant === 'large') {
    return (
      <div className={cn("text-center space-y-2", className)}>
        <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Time Remaining</span>
        </div>
        <div className="flex items-center justify-center gap-4">
          {timeRemaining.days > 0 && (
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{timeRemaining.days}</div>
              {showLabels && <div className="text-xs text-muted-foreground">DAYS</div>}
            </div>
          )}
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{formatTime(timeRemaining.hours)}</div>
            {showLabels && <div className="text-xs text-muted-foreground">HOURS</div>}
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{formatTime(timeRemaining.minutes)}</div>
            {showLabels && <div className="text-xs text-muted-foreground">MINUTES</div>}
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{formatTime(timeRemaining.seconds)}</div>
            {showLabels && <div className="text-xs text-muted-foreground">SECONDS</div>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Clock className="h-4 w-4" />
      <div className="flex items-center gap-1 font-mono">
        {timeRemaining.days > 0 && (
          <>
            <span className="font-bold">{timeRemaining.days}</span>
            {showLabels && <span className="text-xs">d</span>}
            <span className="mx-1">:</span>
          </>
        )}
        <span className="font-bold">{formatTime(timeRemaining.hours)}</span>
        {showLabels && <span className="text-xs">h</span>}
        <span className="mx-1">:</span>
        <span className="font-bold">{formatTime(timeRemaining.minutes)}</span>
        {showLabels && <span className="text-xs">m</span>}
        <span className="mx-1">:</span>
        <span className="font-bold">{formatTime(timeRemaining.seconds)}</span>
        {showLabels && <span className="text-xs">s</span>}
      </div>
    </div>
  );
};