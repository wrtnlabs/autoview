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
  //    Format ISO date strings into a human-readable format.
  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  const versions = value;
  if (versions.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No package versions available.
      </div>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {versions.map((v) => {
        const created = formatDate(v.created_at);
        const updated = formatDate(v.updated_at);
        const deleted = v.deleted_at ? formatDate(v.deleted_at) : null;
        const pkgType = v.metadata?.package_type;
        const containerTags = v.metadata?.container?.tags;
        const dockerTags = v.metadata?.docker?.tag;

        return (
          <div
            key={v.id}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {v.name}
              </h2>
              {pkgType && (
                <span className="px-2 py-1 text-xs font-medium text-indigo-800 bg-indigo-100 rounded">
                  {pkgType.toUpperCase()}
                </span>
              )}
            </div>

            {v.license && (
              <p className="mt-1 text-sm text-gray-600">License: {v.license}</p>
            )}

            {v.description && (
              <p className="mt-2 text-gray-700 text-sm line-clamp-2">
                {v.description}
              </p>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              {containerTags &&
                containerTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              {dockerTags &&
                dockerTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
            </div>

            <div className="mt-3 text-sm text-gray-500 flex flex-wrap items-center gap-x-2">
              <time dateTime={v.created_at}>Created: {created}</time>
              <span className="hidden sm:inline">|</span>
              <time dateTime={v.updated_at}>Updated: {updated}</time>
              {deleted && (
                <>
                  <span className="hidden sm:inline">|</span>
                  <time dateTime={v.deleted_at} className="text-red-600">
                    Deleted: {deleted}
                  </time>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
  // 3. Return the React element.
}
