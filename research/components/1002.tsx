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
  const createdDate = new Date(value.created_at).toLocaleDateString("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const updatedDate = new Date(value.updated_at).toLocaleDateString("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const isDeleted = typeof value.deleted_at === "string";
  const deletedDate = isDeleted
    ? new Date(value.deleted_at!).toLocaleDateString("default", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  const packageType = value.metadata?.package_type;
  const tags =
    value.metadata?.container?.tags ??
    value.metadata?.docker?.tag ??
    [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Version {value.name}
        </h2>
        <div className="flex space-x-2">
          {packageType && (
            <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded">
              {packageType.toUpperCase()}
            </span>
          )}
          {value.license && (
            <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded">
              {value.license}
            </span>
          )}
          {isDeleted && (
            <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded">
              Deleted
            </span>
          )}
        </div>
      </div>

      <div className="mt-2 text-sm text-gray-600 space-y-1">
        <p>Created: {createdDate}</p>
        <p>Last updated: {updatedDate}</p>
        {isDeleted && (
          <p className="text-red-600">Removed: {deletedDate}</p>
        )}
      </div>

      {value.description && (
        <p className="mt-4 text-gray-700 line-clamp-3">
          {value.description}
        </p>
      )}

      {tags.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-900">Tags</h3>
          <div className="mt-1 flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
