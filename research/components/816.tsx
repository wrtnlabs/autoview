import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Page Build Status
     *
     * @title Page Build Status
    */
    export type page_build_status = {
        url: string & tags.Format<"uri">;
        status: string;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.page_build_status;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { url, status } = value;
  // Strip protocol for a cleaner display
  const displayUrl = url.replace(/^https?:\/\//, '');
  // Normalize status for mapping
  const key = status.trim().toLowerCase();
  const statusMap: Record<string, { label: string; color: string }> = {
    success:    { label: 'Success',     color: 'green'  },
    passed:     { label: 'Success',     color: 'green'  },
    failed:     { label: 'Failed',      color: 'red'    },
    error:      { label: 'Failed',      color: 'red'    },
    building:   { label: 'Building',    color: 'yellow' },
    'in_progress': { label: 'In Progress', color: 'yellow' },
    queued:     { label: 'Queued',      color: 'blue'   },
    canceled:   { label: 'Canceled',    color: 'gray'   },
  };
  const { label: statusLabel, color: statusColor } = statusMap[key] 
    ?? { label: status[0].toUpperCase() + status.slice(1), color: 'gray' };

  // Tailwind classes for status badges
  const badgeClasses: Record<string, string> = {
    green:  'bg-green-100 text-green-800',
    red:    'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    blue:   'bg-blue-100 text-blue-800',
    gray:   'bg-gray-100 text-gray-800',
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h3
          className="text-sm font-medium text-gray-700 truncate"
          title={displayUrl}
        >
          {displayUrl}
        </h3>
        <span
          className={
            `px-2 py-1 text-xs font-semibold rounded-full ` +
            badgeClasses[statusColor]
          }
        >
          {statusLabel}
        </span>
      </div>
    </div>
  );
}
