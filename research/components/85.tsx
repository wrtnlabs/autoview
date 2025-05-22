import LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {}
export type AutoViewInput = boolean;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derive display values
  const isEnabled = value;
  const icon = isEnabled ? (
    <LucideReact.CheckCircle
      className="text-green-500"
      size={16}
      aria-label="Enabled"
    />
  ) : (
    <LucideReact.XCircle
      className="text-red-500"
      size={16}
      aria-label="Disabled"
    />
  );
  const label = isEnabled ? "Enabled" : "Disabled";
  const badgeClasses = isEnabled
    ? "inline-flex items-center px-2 py-1 bg-green-50 text-green-700 rounded"
    : "inline-flex items-center px-2 py-1 bg-red-50 text-red-700 rounded";

  // 2. Compose the visual structure
  return (
    <div className={badgeClasses}>
      {icon}
      <span className="ml-1 text-sm font-medium">{label}</span>
    </div>
  );
}
