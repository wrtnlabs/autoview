import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposCodespacesDevcontainers {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            devcontainers: {
                path: string;
                name?: string;
                display_name?: string;
            }[];
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiReposCodespacesDevcontainers.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, devcontainers } = value;
  const items = devcontainers.map((dc) => ({
    key: dc.path,
    label: dc.display_name ?? dc.name ?? dc.path,
  }));

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <LucideReact.Folder className="text-gray-600" size={20} />
          <h2 className="text-lg font-semibold text-gray-800">Devcontainers</h2>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <LucideReact.ListOrdered className="mr-1" size={16} />
          <span>{total_count}</span>
        </div>
      </div>

      {/* List or Empty State */}
      {items.length > 0 ? (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.key}
              className="flex items-center text-gray-700 hover:bg-gray-50 rounded px-2 py-1"
            >
              <LucideReact.Folder className="text-gray-400 mr-2 flex-shrink-0" size={16} />
              <span className="truncate">{item.label}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center text-gray-500">
          <LucideReact.AlertCircle className="mr-2" size={20} />
          <span>No devcontainers available.</span>
        </div>
      )}
    </div>
  );
}
