import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes { }
export type AutoViewInput = boolean;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derive display values
  const isActive = value;
  const statusText = isActive ? "Active" : "Inactive";
  const StatusIcon = isActive ? LucideReact.CheckCircle : LucideReact.XCircle;
  const iconColor = isActive ? "text-green-500" : "text-red-500";
  const badgeColor = isActive
    ? "bg-green-100 text-green-800"
    : "bg-red-100 text-red-800";

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="inline-flex items-center space-x-2">
      <span role="img" aria-label={statusText}>
        <StatusIcon size={16} className={iconColor} />
      </span>
      <span
        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${badgeColor}`}
      >
        {statusText}
      </span>
    </div>
  );
}
