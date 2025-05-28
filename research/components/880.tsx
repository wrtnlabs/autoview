import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Commit Activity
     *
     * @title Commit Activity
    */
    export interface commit_activity {
        days: (number & tags.Type<"int32">)[];
        total: number & tags.Type<"int32">;
        week: number & tags.Type<"int32">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.commit_activity[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation and aggregation
  const activities: AutoViewInput = Array.isArray(value) ? value : [];
  // Determine the maximum commits in a single day across all weeks for scaling
  const allDayCounts = activities.flatMap((week) => week.days);
  const maxDayCount = allDayCounts.length > 0 ? Math.max(...allDayCounts) : 1;
  // Total commits across all weeks
  const totalCommits = activities.reduce((sum, week) => sum + week.total, 0);
  // Format the week timestamp (assumed to be UNIX seconds) into a readable date
  const formatWeek = (weekTimestamp: number): string => {
    const date = new Date(weekTimestamp * 1000);
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  };

  // 2. Compose the visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header with icon and summary */}
      <div className="flex items-center mb-4 text-gray-700">
        <LucideReact.BarChart size={20} className="text-gray-600" />
        <h2 className="ml-2 text-lg font-semibold">Commit Activity</h2>
        <span className="ml-auto text-sm text-gray-500">
          {totalCommits.toLocaleString()} commits
        </span>
      </div>

      {/* If there's data, render the weekly bar chart; otherwise show placeholder */}
      {activities.length > 0 ? (
        <div className="overflow-x-auto">
          <div className="flex items-end h-28 space-x-4 pb-2">
            {activities.map((weekData, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="flex items-end space-x-1 h-24">
                  {weekData.days.map((count, dayIdx) => {
                    const heightPercent = (count / maxDayCount) * 100;
                    return (
                      <div
                        key={dayIdx}
                        className="w-2 bg-blue-500 rounded-t"
                        style={{ height: `${heightPercent}%` }}
                        title={`${count} commit${count === 1 ? "" : "s"}`}
                      />
                    );
                  })}
                </div>
                <span className="mt-1 text-xs text-gray-500">
                  {formatWeek(weekData.week)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={40} />
          <span className="mt-2 text-sm">No commit data available</span>
        </div>
      )}
    </div>
  );
}
