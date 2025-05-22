import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsActionsHostedRunnersPlatforms {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            platforms: string[];
        };
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsHostedRunnersPlatforms.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedCount = new Intl.NumberFormat().format(value.total_count);
  const formatPlatformName = (platform: string): string =>
    platform
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  const formattedPlatforms = value.platforms.map(formatPlatformName);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        Hosted Runners Platforms
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Total Platforms: <span className="font-medium text-gray-800">{formattedCount}</span>
      </p>
      {formattedPlatforms.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {formattedPlatforms.map((name, idx) => (
            <li
              key={idx}
              className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm truncate"
            >
              {name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 italic">No available platforms.</p>
      )}
    </div>
  );
}
