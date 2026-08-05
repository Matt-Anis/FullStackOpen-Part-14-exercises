"use client";

import { useNotification } from "./NotificationContext";

export default function Notification() {
  const { message, type } = useNotification();

  if (!message) return null;

  const bgColor = {
    success: "bg-green-600",
    error: "bg-red-600",
  };

  return (
    <div data-testid="notification" className={`py-2.5 px-4 mb-2.5 rounded text-white ${bgColor[type]}`}>
      {message}
    </div>
  );
}
