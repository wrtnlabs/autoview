import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposCodespacesDevcontainers.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const countLabel = `${value.total_count} Devcontainer${value.total_count !== 1 ? "s" : ""}`;
  const items: { title: string; path: string }[] = value.devcontainers.map((d) => ({
    title: d.display_name || d.name || d.path,
    path: d.path,
  }));

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      <div className="text-lg font-semibold text-gray-800">{countLabel}</div>

      {items.length > 0 ? (
        <ul className="mt-3 divide-y divide-gray-200">
          {items.map((item, idx) => (
            <li key={idx} className="py-3 flex flex-col">
              <span className="font-medium text-gray-900 truncate">{item.title}</span>
              <span className="mt-1 text-xs text-gray-500 font-mono truncate">{item.path}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-3 text-gray-500">No devcontainers available.</div>
      )}
    </div>
  );
}
