import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface MeetWrapUpTimeView {
        channel?: number & tags.Type<"int32">;
        managers?: {
            [key: string]: number & tags.Type<"int32">;
        };
    }
}
export type AutoViewInput = AutoViewInputSubTypes.MeetWrapUpTimeView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const managerEntries: Array<[string, number]> = value.managers
    ? Object.entries(value.managers).sort(([a], [b]) => a.localeCompare(b))
    : [];
  const averageWrapUp: number = managerEntries.length
    ? managerEntries.reduce((sum, [, time]) => sum + time, 0) / managerEntries.length
    : 0;
  const averageRounded = Math.round(averageWrapUp);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  if (value.channel == null && managerEntries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={24} className="mb-2" />
        <span>No wrap-up times available.</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.Clock size={20} className="text-blue-500 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">Wrap-up Times</h2>
      </div>

      <div className="space-y-4">
        {value.channel != null && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Default</span>
            <div className="flex items-center text-gray-800">
              <LucideReact.Clock size={16} className="text-gray-500 mr-1" />
              <span>{value.channel} min</span>
            </div>
          </div>
        )}

        {managerEntries.length > 0 && (
          <div className="space-y-2">
            <div className="text-gray-600 font-medium">Managers</div>
            <ul className="divide-y divide-gray-100">
              {managerEntries.map(([name, time]) => (
                <li key={name} className="py-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2 overflow-hidden">
                    <LucideReact.User size={16} className="text-gray-500 shrink-0" />
                    <span className="text-gray-700 truncate">{name}</span>
                  </div>
                  <div className="flex items-center text-gray-800">
                    <LucideReact.Clock size={16} className="text-gray-500 mr-1" />
                    <span>{time} min</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between pt-2">
              <span className="text-gray-600">Average</span>
              <div className="flex items-center text-gray-800">
                <LucideReact.Clock size={16} className="text-gray-500 mr-1" />
                <span>{averageRounded} min</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
