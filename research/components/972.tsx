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



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate = new Date(value.created_at);
  const updatedDate = new Date(value.updated_at);
  const deletedDate = value.deleted_at ? new Date(value.deleted_at) : null;
  const formatDate = (date: Date): string =>
    date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

  const licenseLabel = value.license ?? 'No license';
  const packageType = (value.metadata?.package_type ?? 'unknown').toUpperCase();

  const tags: string[] =
    value.metadata?.container?.tags
      ? value.metadata.container.tags
      : value.metadata?.docker?.tag ?? [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  const element = (
    <div className="max-w-md w-full mx-auto p-4 bg-white rounded-lg shadow">
      {/* Header with name and badges */}
      <div className="mb-3">
        <h2 className="text-xl font-semibold text-gray-900 truncate">{value.name}</h2>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <span className="px-2 py-1 text-xs font-medium text-white bg-indigo-600 rounded">
            {packageType}
          </span>
          <span className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded">
            {licenseLabel}
          </span>
        </div>
      </div>

      {/* Description */}
      {value.description && (
        <p className="text-gray-700 text-sm mb-3 line-clamp-3">
          {value.description}
        </p>
      )}

      {/* Tags from container or docker metadata */}
      {tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs text-gray-600 bg-gray-200 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Timestamps */}
      <div className="text-gray-500 text-xs space-y-1">
        <div>Created: {formatDate(createdDate)}</div>
        <div>Updated: {formatDate(updatedDate)}</div>
        {deletedDate && (
          <div className="text-red-500">Deleted: {formatDate(deletedDate)}</div>
        )}
      </div>
    </div>
  );

  // 3. Return the React element.
  return element;
}
