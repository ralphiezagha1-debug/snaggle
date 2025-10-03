interface TimerProps {
  seconds: number;
}

export function Timer({ seconds }: TimerProps) {
  const urgent = seconds < 60;
  
  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    return date.toISOString().substr(14, 5);
  };
  
  return (
    <span className={urgent ? 'text-snag-gold animate-pulse' : 'text-white'}>
      {formatTime(seconds)}
    </span>
  );
}