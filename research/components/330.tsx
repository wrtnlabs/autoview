import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiEmojis {
        export interface GetResponse {
            [key: string]: string;
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiEmojis.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const entries = Object.entries(value);
  const formatName = (key: string) =>
    key
      .replace(/[_-]/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());

  // Handle empty state
  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-2">No emojis available</p>
      </div>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Emojis</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {entries.map(([key, emoji]) => (
          <div key={key} className="flex flex-col items-center">
            <div className="text-4xl">{emoji}</div>
            <div className="mt-1 text-sm text-gray-600 truncate">
              {formatName(key)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
