import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Commit Activity
     *
     * @title Commit Activity
    */
    export type commit_activity = {
        days: (number & tags.Type<"int32">)[];
        total: number & tags.Type<"int32">;
        week: number & tags.Type<"int32">;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.commit_activity[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Sort weeks ascending by timestamp
  const weeks = [...value].sort((a, b) => a.week - b.week);

  //    Flatten all daily counts to find the global maximum for color scaling
  const allDays = weeks.flatMap(w => w.days);
  const maxDaily = allDays.length > 0 ? Math.max(...allDays) : 0;

  //    Compute total and average commits per week
  const totalCommits = weeks.reduce((sum, w) => sum + w.total, 0);
  const averageCommits = weeks.length > 0 ? totalCommits / weeks.length : 0;

  // Color scale mapping (0 through 4)
  const colorScale = [
    "bg-gray-100",
    "bg-green-100",
    "bg-green-300",
    "bg-green-500",
    "bg-green-700",
  ];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Commit Activity
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        {weeks.length} weeks · Total:{" "}
        <span className="font-medium">{totalCommits.toLocaleString()}</span>{" "}
        commits · Avg:{" "}
        <span className="font-medium">
          {Math.round(averageCommits).toLocaleString()}
        </span>{" "}
        / week
      </p>

      {/* Heatmap */}
      <div className="overflow-x-auto">
        <div className="w-max space-y-2">
          {weeks.map(weekData => {
            // Format week start date
            const dateLabel = new Date(weekData.week * 1000).toLocaleDateString(
              "en-US",
              { month: "short", day: "numeric" }
            );

            return (
              <div
                key={weekData.week}
                className="flex items-center space-x-2"
              >
                {/* Week label */}
                <span className="text-xs text-gray-600 w-12">
                  {dateLabel}
                </span>
                {/* 7-day row */}
                <div className="grid grid-cols-7 gap-1">
                  {weekData.days.map((count, idx) => {
                    // Determine intensity level 0–4
                    const level =
                      maxDaily > 0
                        ? Math.min(
                            4,
                            Math.floor((count / maxDaily) * (colorScale.length - 1))
                          )
                        : 0;
                    const bg = colorScale[level];
                    return (
                      <div
                        key={idx}
                        className={`${bg} w-4 h-4 rounded-sm`}
                        title={`Day ${idx + 1}: ${count} commits`}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
