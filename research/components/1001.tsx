import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * A version of a software package
     *
     * @title Package Version
    */
    export type package_version = {
        /**
         * Unique identifier of the package version.
        */
        id: number & tags.Type<"int32">;
        /**
         * The name of the package version.
        */
        name: string;
        url: string;
        package_html_url: string;
        html_url?: string;
        license?: string;
        description?: string;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        deleted_at?: string & tags.Format<"date-time">;
        /**
         * @title Package Version Metadata
        */
        metadata?: {
            package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
            /**
             * @title Container Metadata
            */
            container?: {
                tags: string[];
            };
            /**
             * @title Docker Metadata
            */
            docker?: {
                tag?: string[];
            };
        };
    };
}
export type AutoViewInput = AutoViewInputSubTypes.package_version[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-lg mx-auto space-y-4">
      {value.map((item) => {
        const created = formatDate(item.created_at);
        const updated = formatDate(item.updated_at);
        const isUpdated = item.updated_at !== item.created_at;

        return (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {item.name}
              </h3>
              {item.metadata?.package_type && (
                <span className="text-sm text-gray-500 uppercase">
                  {item.metadata.package_type}
                </span>
              )}
            </div>

            {item.description && (
              <p className="mt-2 text-gray-700 text-sm line-clamp-3">
                {item.description}
              </p>
            )}

            <div className="mt-3 flex items-center text-xs text-gray-500 space-x-4">
              <span>Created: {created}</span>
              {isUpdated && <span>Updated: {updated}</span>}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {item.license && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {item.license}
                </span>
              )}
              {item.metadata?.container?.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
              {item.metadata?.docker?.tag?.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
