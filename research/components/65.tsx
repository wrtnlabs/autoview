import React from "react";
export namespace AutoViewInputSubTypes { }
export type AutoViewInput = boolean;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isActive = value;
  const statusText = isActive ? "Active" : "Inactive";
  const statusIcon = isActive ? "✔" : "✖";
  const statusColorClasses = isActive
    ? "bg-green-100 text-green-800"
    : "bg-red-100 text-red-800";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div
      role="status"
      className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${statusColorClasses}`}
    >
      <span aria-hidden="true" className="mr-2">
        {statusIcon}
      </span>
      <span className="truncate">{statusText}</span>
    </div>
  );
}
