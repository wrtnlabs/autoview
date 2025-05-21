import React from "react";
export namespace AutoViewInputSubTypes { }
export type AutoViewInput = boolean;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const displayText = value ? 'Yes' : 'No';
  const colorClasses = value
    ? 'bg-green-100 text-green-800'
    : 'bg-red-100 text-red-800';
  const icon = value ? '✓' : '✕';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  const badge = (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${colorClasses}`}
    >
      <span className="mr-1">{icon}</span>
      <span className="whitespace-nowrap">{displayText}</span>
    </span>
  );

  // 3. Return the React element.
  return badge;
}
