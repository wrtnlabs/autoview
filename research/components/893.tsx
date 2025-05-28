import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A topic aggregates entities that are related to a subject.
     *
     * @title Topic
    */
    export interface topic {
        names: string[];
    }
}
export type AutoViewInput = AutoViewInputSubTypes.topic;



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Deduplicate and sort the list of entity names for consistent display.
  const sortedUniqueNames = [...new Set(value.names)].sort((a, b) => a.localeCompare(b));

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-3">
        <LucideReact.Tag size={20} className="text-gray-500 mr-2" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-gray-700">
          Entities ({sortedUniqueNames.length})
        </h2>
      </div>

      {sortedUniqueNames.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {sortedUniqueNames.map((name, index) => (
            <span
              key={index}
              className="inline-flex items-center bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm"
            >
              <LucideReact.Hash size={14} className="text-gray-500 mr-1" aria-hidden="true" />
              {name}
            </span>
          ))}
        </div>
      ) : (
        <div className="flex items-center text-gray-500">
          <LucideReact.AlertCircle size={24} className="text-gray-400 mr-2" aria-hidden="true" />
          <span className="text-sm">No entities available</span>
        </div>
      )}
    </div>
  );
}
