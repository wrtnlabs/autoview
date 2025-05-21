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
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!value || value.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 italic">
        No versions available.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {value.map((version) => {
        const { metadata } = version;
        const packageType = metadata?.package_type;
        const containerTags = metadata?.container?.tags ?? [];
        const dockerTags = metadata?.docker?.tag ?? [];
        const isDeleted = typeof version.deleted_at === "string";

        return (
          <div
            key={version.id}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow mobile:w-full"
          >
            {/* Header: Version Name and Status Badges */}
            <div className="flex flex-wrap items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 truncate">
                {version.name}
              </h2>
              <div className="flex flex-shrink-0 space-x-2 mt-1">
                {version.license && (
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded">
                    {version.license}
                  </span>
                )}
                {packageType && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                    {packageType.toUpperCase()}
                  </span>
                )}
                {isDeleted && (
                  <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded">
                    Deleted
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            {version.description && (
              <p className="mt-2 text-gray-600 text-sm line-clamp-3">
                {version.description}
              </p>
            )}

            {/* Metadata Tags */}
            {(containerTags.length > 0 || dockerTags.length > 0) && (
              <div className="mt-3 flex flex-wrap">
                {containerTags.map((tag, idx) => (
                  <span
                    key={`ct-${idx}`}
                    className="mr-2 mb-2 px-2 py-0.5 bg-gray-200 text-gray-800 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
                {dockerTags.map((tag, idx) => (
                  <span
                    key={`dt-${idx}`}
                    className="mr-2 mb-2 px-2 py-0.5 bg-gray-200 text-gray-800 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Dates */}
            <div className="mt-4 flex flex-wrap text-gray-500 text-sm space-x-4">
              <div>
                Created:&nbsp;
                <time dateTime={version.created_at}>
                  {formatDate(version.created_at)}
                </time>
              </div>
              {isDeleted ? (
                <div className="text-red-600">
                  Deleted:&nbsp;
                  <time dateTime={version.deleted_at!}>
                    {formatDate(version.deleted_at!)}
                  </time>
                </div>
              ) : (
                <div>
                  Updated:&nbsp;
                  <time dateTime={version.updated_at}>
                    {formatDate(version.updated_at)}
                  </time>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
