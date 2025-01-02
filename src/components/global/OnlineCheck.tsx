'use client';

import { useState, useEffect } from "react";

export default function OnlineCheck() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div>
      {isOnline ? (
        <span className="text-green-600">
          Conexión a Internet establecida
        </span>
      ) : (
        <span className="text-red-600">
          Se ha perdido la conexión a Internet
        </span>
      )}
    </div>
  );
}