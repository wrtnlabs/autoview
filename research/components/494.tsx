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
export type AutoViewInput = AutoViewInputSubTypes.package_version;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdAt = new Date(value.created_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const updatedAt = new Date(value.updated_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const isDeleted = typeof value.deleted_at === 'string';
  const deletedAt = isDeleted
    ? new Date(value.deleted_at!).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Version {value.name}
        </h2>
        <span
          className={`mt-2 sm:mt-0 inline-block px-2 py-1 text-xs font-medium rounded-full ${
            isDeleted
              ? 'bg-red-100 text-red-800'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {isDeleted ? 'Deleted' : 'Active'}
        </span>
      </div>

      {/* License */}
      {value.license && (
        <div className="mt-3">
          <span className="inline-block bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
            {value.license}
          </span>
        </div>
      )}

      {/* Description */}
      {value.description && (
        <p className="mt-3 text-gray-700 text-sm line-clamp-3">
          {value.description}
        </p>
      )}

      {/* Metadata Badges */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-gray-600 text-sm font-medium mr-2">Type:</span>
        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
          {value.metadata?.package_type}
        </span>
        {(value.metadata?.container?.tags ?? []).map((tag) => (
          <span
            key={`container-${tag}`}
            className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
        {(value.metadata?.docker?.tag ?? []).map((tag) => (
          <span
            key={`docker-${tag}`}
            className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Dates */}
      <div className="mt-4 space-y-1 text-sm text-gray-600">
        <div>
          <span className="font-medium">Created:</span> {createdAt}
        </div>
        <div>
          <span className="font-medium">Updated:</span> {updatedAt}
        </div>
        {isDeleted && deletedAt && (
          <div>
            <span className="font-medium">Deleted:</span> {deletedAt}
          </div>
        )}
      </div>

      {/* URLs */}
      <div className="mt-4 text-sm">
        <div className="text-gray-600 font-medium">URLs:</div>
        <div className="mt-1 space-y-1">
          <div className="truncate text-blue-600">
            <code>{value.package_html_url}</code>
          </div>
          {value.html_url && (
            <div className="truncate text-blue-600">
              <code>{value.html_url}</code>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
