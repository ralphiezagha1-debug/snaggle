import { useState, useEffect } from 'react';

let serverOffsetMs = 0;

export async function initializeServerTime() {
  try {
    const response = await fetch(window.location.href, { method: 'HEAD' });
    const serverDate = new Date(response.headers.get('date') || new Date().toUTCString());
    serverOffsetMs = serverDate.getTime() - new Date().getTime();
  } catch (error) {
    console.error("Could not fetch server time, using local time.", error);
    serverOffsetMs = 0;
  }
}

export function getServerNow() {
  return new Date(new Date().getTime() + serverOffsetMs);
}

export function useTicker(interval = 1000) {
  const [now, setNow] = useState(getServerNow());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(getServerNow());
    }, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return now;
}
