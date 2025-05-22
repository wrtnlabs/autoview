import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes { }
export type AutoViewInput = (string & tags.Format<"date">)[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    We parse, validate, sort dates, then produce formatted and relative strings.
  const dateObjects = value
    .map((ds) => new Date(ds))
    .filter((d) => !isNaN(d.getTime()))
    .sort((a, b) => a.getTime() - b.getTime());

  const count = dateObjects.length;

  // Utility to format relative time
  function getRelativeTime(date: Date): string {
    const msDiff = date.getTime() - Date.now();
    const secDiff = Math.floor(msDiff / 1000);
    const absSec = Math.abs(secDiff);

    let unit: string;
    let value: number;

    if (absSec < 60) {
      unit = "second";
      value = absSec;
    } else if (absSec < 3600) {
      unit = "minute";
      value = Math.floor(absSec / 60);
    } else if (absSec < 86400) {
      unit = "hour";
      value = Math.floor(absSec / 3600);
    } else {
      unit = "day";
      value = Math.floor(absSec / 86400);
    }

    const plural = value !== 1 ? "s" : "";
    const timeString = `${value} ${unit}${plural}`;
    return secDiff > 0 ? `in ${timeString}` : `${timeString} ago`;
  }

  // Prepare display entries
  const entries = dateObjects.map((date) => {
    const formatted = date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const relative = getRelativeTime(date);
    return { formatted, relative };
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        {count} Date{count !== 1 ? "s" : ""}
      </h2>
      <ul className="divide-y divide-gray-200">
        {entries.map(({ formatted, relative }, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center py-2"
          >
            <span className="text-gray-700 truncate">{formatted}</span>
            <span className="text-sm text-gray-500 whitespace-nowrap">
              {relative}
            </span>
          </li>
        ))}
        {count === 0 && (
          <li className="py-2 text-center text-gray-500">
            No valid dates to display.
          </li>
        )}
      </ul>
    </div>
  );
}
