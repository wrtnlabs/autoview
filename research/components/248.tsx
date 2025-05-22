import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export type MeetWrapUpTimeView = {
    channel?: number & tags.Type<"int32">;
    managers?: {
      [key: string]: number & tags.Type<"int32">;
    };
  };
}
export type AutoViewInput = AutoViewInputSubTypes.MeetWrapUpTimeView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Format seconds (int32) into mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const hasChannel = typeof value.channel === "number";
  const managersMap = value.managers ?? {};
  const managerEntries = Object.entries(managersMap);
  const hasManagers = managerEntries.length > 0;

  // 3. Return early if no data
  if (!hasChannel && !hasManagers) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-sm">No wrap-up time data available.</span>
      </div>
    );
  }

  // Sort managers by descending wrap-up time
  const sortedManagers = managerEntries.sort((a, b) => b[1] - a[1]);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-sm">
      <h2 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
        <LucideReact.Clock size={20} className="mr-2 text-gray-500" />
        Wrap-up Times
      </h2>

      {hasChannel && (
        <div className="flex items-center text-gray-700 mb-4">
          <LucideReact.Layers size={16} className="mr-2 text-gray-500" />
          <span className="font-medium">Channel:</span>
          <span className="ml-1">{formatTime(value.channel!)}</span>
        </div>
      )}

      {hasManagers && (
        <div>
          <h3 className="text-sm font-medium text-gray-800 mb-2">By Manager</h3>
          <ul className="border border-gray-100 divide-y divide-gray-100 rounded-md overflow-hidden">
            {sortedManagers.map(([name, time]) => (
              <li
                key={name}
                className="flex justify-between items-center px-3 py-2 bg-white hover:bg-gray-50"
              >
                <span className="text-gray-800 truncate">{name}</span>
                <div className="flex items-center text-gray-700">
                  <LucideReact.User size={16} className="mr-1 text-gray-500" />
                  <span>{formatTime(time)}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
