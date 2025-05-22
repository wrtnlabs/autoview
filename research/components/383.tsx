import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiOrgsActionsHostedRunnersPlatforms {
    export type GetResponse = {
      total_count: number & tags.Type<"int32">;
      platforms: string[];
    };
  }
}
export type AutoViewInput =
  AutoViewInputSubTypes.IApiOrgsActionsHostedRunnersPlatforms.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalCount = value.total_count.toLocaleString();
  const hasPlatforms =
    Array.isArray(value.platforms) && value.platforms.length > 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md">
      {/* Header */}
      <div className="flex items-center text-gray-700 mb-3">
        <LucideReact.Server size={20} className="text-indigo-500" />
        <h3 className="ml-2 text-lg font-semibold">
          Supported Platforms ({totalCount})
        </h3>
      </div>

      {/* Platform List or Empty State */}
      {hasPlatforms ? (
        <div className="flex flex-wrap gap-2">
          {value.platforms.map((platform) => (
            <span
              key={platform}
              className="inline-flex items-center bg-gray-100 text-gray-800 text-sm font-medium px-2 py-0.5 rounded"
            >
              <LucideReact.CheckCircle
                size={14}
                className="text-green-500 mr-1"
              />
              {platform}
            </span>
          ))}
        </div>
      ) : (
        <div className="flex items-center text-gray-500">
          <LucideReact.AlertCircle size={18} className="mr-2" />
          <span>No supported platforms</span>
        </div>
      )}
    </div>
  );
}
