import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {}
export type AutoViewInput = (string & tags.Format<"date">)[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const parsedDates: Date[] = value
    .map((dateStr) => new Date(dateStr))
    .filter((date) => !isNaN(date.getTime()));
  const sortedDates = [...parsedDates].sort(
    (a, b) => a.getTime() - b.getTime(),
  );
  const formattedDates = sortedDates.map((date) =>
    date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  );

  const totalCount = formattedDates.length;
  const firstDate = formattedDates[0] ?? "—";
  const lastDate = formattedDates[formattedDates.length - 1] ?? "—";

  // Show up to 5 dates, collapse the rest into a "+N more" item
  const MAX_DISPLAY = 5;
  const displayDates = formattedDates.slice(0, MAX_DISPLAY);
  const remainingCount = totalCount - displayDates.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center text-gray-700">
        <LucideReact.Calendar
          size={20}
          className="text-gray-500 mr-2"
          aria-label="Total Dates"
        />
        <span className="font-medium">Total Dates: {totalCount}</span>
      </div>

      <div className="flex flex-wrap items-center text-gray-600 text-sm mt-1">
        <div className="flex items-center mr-4">
          <LucideReact.Clock
            size={16}
            className="text-gray-400 mr-1"
            aria-label="First Date"
          />
          <span title="First date">First: {firstDate}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Flag
            size={16}
            className="text-gray-400 mr-1"
            aria-label="Last Date"
          />
          <span title="Last date">Last: {lastDate}</span>
        </div>
      </div>

      <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-800">
        {displayDates.map((date, idx) => (
          <li key={idx} className="flex items-center text-sm truncate">
            <LucideReact.Calendar
              size={16}
              className="text-blue-500 mr-2 flex-shrink-0"
              aria-hidden="true"
            />
            <span>{date}</span>
          </li>
        ))}

        {remainingCount > 0 && (
          <li className="flex items-center text-sm text-gray-500">
            <LucideReact.MoreHorizontal
              size={16}
              className="mr-2"
              aria-hidden="true"
            />
            <span>+{remainingCount} more</span>
          </li>
        )}
      </ul>
    </div>
  );
}
