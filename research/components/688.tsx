import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiReposCodespacesDevcontainers {
    export type GetResponse = {
      total_count: number & tags.Type<"int32">;
      devcontainers: {
        path: string;
        name?: string;
        display_name?: string;
      }[];
    };
  }
}
export type AutoViewInput =
  AutoViewInputSubTypes.IApiReposCodespacesDevcontainers.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, devcontainers } = value;
  const hasContainers =
    Array.isArray(devcontainers) && devcontainers.length > 0;

  // Helper to pick the best label for each container
  const getLabel = (
    dc: AutoViewInputSubTypes.IApiReposCodespacesDevcontainers.GetResponse["devcontainers"][0],
  ) => dc.display_name ?? dc.name ?? dc.path;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm">
      {/* Header with total count */}
      <div className="flex items-center mb-4">
        <LucideReact.List size={20} className="text-gray-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">
          Devcontainers ({total_count})
        </h2>
      </div>

      {/* List or empty state */}
      {hasContainers ? (
        <ul className="space-y-2">
          {devcontainers.map((dc) => {
            const label = getLabel(dc);
            return (
              <li
                key={dc.path}
                className="flex items-center w-full min-w-0"
                title={label}
              >
                <LucideReact.FileText
                  size={16}
                  className="text-gray-500 mr-2 flex-shrink-0"
                />
                <span className="truncate text-gray-700">{label}</span>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center py-6 text-gray-500">
          <LucideReact.AlertCircle size={48} className="mb-2" />
          <span className="text-sm">No devcontainers available</span>
        </div>
      )}
    </div>
  );
}
