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



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const names = value.names ?? [];
  const total = names.length;
  const maxDisplay = 10;
  const displayNames = names.slice(0, maxDisplay);
  const remaining = total - maxDisplay;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {total === 0 ? (
        // Empty state when no topics are available
        <div className="flex flex-col items-center text-gray-400">
          <LucideReact.AlertCircle
            size={48}
            className="mb-2"
            aria-hidden="true"
          />
          <p className="text-sm">No topics available.</p>
        </div>
      ) : (
        <>
          {/* Header with icon and total count */}
          <div className="flex items-center mb-3">
            <LucideReact.Tag
              size={20}
              className="text-gray-500 mr-2"
              aria-hidden="true"
            />
            <h2 className="text-lg font-semibold text-gray-800">
              Topics ({total})
            </h2>
          </div>
          {/* List of topic names as badges */}
          <ul className="flex flex-wrap gap-2">
            {displayNames.map((name) => (
              <li
                key={name}
                className="bg-blue-50 text-blue-700 text-sm px-2 py-1 rounded-md"
              >
                {name}
              </li>
            ))}
            {remaining > 0 && (
              <li className="bg-gray-100 text-gray-500 text-sm px-2 py-1 rounded-md">
                +{remaining} more
              </li>
            )}
          </ul>
        </>
      )}
    </div>
  );
}
