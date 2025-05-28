import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsActionsHostedRunnersPlatforms {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            platforms: string[];
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsHostedRunnersPlatforms.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedTotal = new Intl.NumberFormat().format(value.total_count);
  const platformsList = Array.isArray(value.platforms) ? [...value.platforms].sort() : [];
  const hasPlatforms = platformsList.length > 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-2">
        <LucideReact.Server size={20} className="text-gray-500" />
        <span className="text-lg font-semibold text-gray-800">
          {formattedTotal} {value.total_count === 1 ? 'Platform' : 'Platforms'}
        </span>
      </div>
      <div className="mt-3">
        {hasPlatforms ? (
          <div className="flex flex-wrap gap-2">
            {platformsList.map((platform) => (
              <span
                key={platform}
                className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
              >
                {platform}
              </span>
            ))}
          </div>
        ) : (
          <div className="flex items-center text-gray-500">
            <LucideReact.AlertCircle size={24} className="text-gray-400" />
            <span className="ml-2">No platforms available.</span>
          </div>
        )}
      </div>
    </div>
  );
}
