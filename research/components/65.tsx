import LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {}
export type AutoViewInput = boolean;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isActive = Boolean(value);
  const label = isActive ? "Enabled" : "Disabled";
  const StatusIcon = isActive ? LucideReact.CheckCircle : LucideReact.XCircle;
  const iconColor = isActive ? "text-green-500" : "text-red-500";
  const bgColor = isActive ? "bg-green-50" : "bg-red-50";
  const textColor = isActive ? "text-green-700" : "text-red-700";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div
      className={`inline-flex items-center px-2 py-1 ${bgColor} rounded-full`}
      role="status"
      aria-label={`Status: ${label}`}
    >
      <StatusIcon
        className={`mr-1 ${iconColor}`}
        size={16}
        strokeWidth={2}
        aria-hidden="true"
      />
      <span className={`text-xs font-medium ${textColor}`}>{label}</span>
    </div>
  );
}
