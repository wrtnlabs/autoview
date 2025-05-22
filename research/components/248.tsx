import { tags } from "typia";
import React from "react";
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
  const { channel, managers } = value;
  const managerEntries: [string, number][] = managers
    ? Object.entries(managers)
    : [];

  const totalTime = managerEntries.reduce((sum, [, t]) => sum + t, 0);
  const averageTime =
    managerEntries.length > 0 ? totalTime / managerEntries.length : 0;

  // Formats a duration (assumed in seconds) into "Xm Ys" or "Ys"
  function formatDuration(secondsInput: number): string {
    const totalSeconds = Math.round(secondsInput);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    if (mins > 0) {
      return `${mins}m ${secs}s`;
    }
    return `${secs}s`;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Wrap-Up Time Summary
      </h2>

      {channel !== undefined && (
        <p className="text-sm text-gray-600 mb-4">
          Channel:{" "}
          <span className="font-medium text-gray-800">{channel}</span>
        </p>
      )}

      {managerEntries.length > 0 ? (
        <>
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Managers ({managerEntries.length})
            </h3>
            <ol className="list-decimal list-inside space-y-1">
              {managerEntries.map(([name, time]) => (
                <li
                  key={name}
                  className="flex justify-between text-gray-800"
                >
                  <span className="truncate">{name}</span>
                  <span className="text-gray-600">
                    {formatDuration(time)}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <p className="text-sm text-gray-700">
            Average Time:{" "}
            <span className="font-medium">
              {formatDuration(averageTime)}
            </span>
          </p>
        </>
      ) : (
        <p className="text-sm text-gray-600">
          No manager wrap-up data available.
        </p>
      )}
    </div>
  );
}
