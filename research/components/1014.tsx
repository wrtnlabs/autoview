import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes { }
export type AutoViewInput = (string & tags.Format<"date">)[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Parse ISO strings into Date objects and filter out invalid dates
  const parsedDates = value
    .map((str) => new Date(str))
    .filter((date) => !isNaN(date.getTime()));

  // If there are no valid dates, show a placeholder
  if (parsedDates.length === 0) {
    return (
      <div className="p-6 flex flex-col items-center justify-center text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <span>No dates available</span>
      </div>
    );
  }

  const now = new Date();
  // Split into upcoming (>= now) and past (< now), and sort them
  const upcoming = parsedDates
    .filter((d) => d.getTime() >= now.getTime())
    .sort((a, b) => a.getTime() - b.getTime());
  const past = parsedDates
    .filter((d) => d.getTime() < now.getTime())
    .sort((a, b) => b.getTime() - a.getTime());

  // Format a Date into a human‐readable string
  function formatDate(date: Date): string {
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }

  // Compute a relative time string like "in 3 days" or "2 hours ago"
  function formatRelative(date: Date): string {
    const diffMs = date.getTime() - now.getTime();
    const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
    const minutes = Math.round(diffMs / 60000);
    if (Math.abs(minutes) < 60) return rtf.format(minutes, "minute");
    const hours = Math.round(diffMs / 3600000);
    if (Math.abs(hours) < 24) return rtf.format(hours, "hour");
    const days = Math.round(diffMs / 86400000);
    return rtf.format(days, "day");
  }

  // Compose the visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6">
      {upcoming.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold flex items-center text-gray-800">
            <LucideReact.Clock size={20} className="mr-2 text-green-500" />
            Upcoming Dates
          </h3>
          <ul className="mt-2 space-y-2">
            {upcoming.map((date, idx) => (
              <li
                key={`upcoming-${idx}`}
                className="flex justify-between items-center text-gray-700"
              >
                <span className="truncate">{formatDate(date)}</span>
                <span className="text-sm text-green-600">
                  {formatRelative(date)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {past.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold flex items-center text-gray-800">
            <LucideReact.CheckCircle size={20} className="mr-2 text-gray-400" />
            Past Dates
          </h3>
          <ul className="mt-2 space-y-2">
            {past.map((date, idx) => (
              <li
                key={`past-${idx}`}
                className="flex justify-between items-center text-gray-700"
              >
                <span className="truncate">{formatDate(date)}</span>
                <span className="text-sm text-gray-500">
                  {formatRelative(date)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
