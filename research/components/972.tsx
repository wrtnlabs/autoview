import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
      package_type:
        | "npm"
        | "maven"
        | "rubygems"
        | "docker"
        | "nuget"
        | "container";
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
  const createdDate = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const updatedDate = new Date(value.updated_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const deletedDate = value.deleted_at
    ? new Date(value.deleted_at).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;
  const descriptionText = value.description ?? "No description available.";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center mb-4">
        <LucideReact.Package size={24} className="text-gray-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
      </div>

      {/* License */}
      {value.license && (
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <LucideReact.Tag size={16} className="mr-1" />
          <span className="uppercase">{value.license}</span>
        </div>
      )}

      {/* Description */}
      <p className="text-gray-700 text-sm mb-4 line-clamp-3">
        {descriptionText}
      </p>

      {/* Dates */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span>Created: {createdDate}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span>Updated: {updatedDate}</span>
        </div>
        {deletedDate && (
          <div className="flex items-center text-sm text-red-500">
            <LucideReact.AlertTriangle size={16} className="mr-1" />
            <span>Deleted: {deletedDate}</span>
          </div>
        )}
      </div>

      {/* Metadata: package type */}
      {value.metadata?.package_type && (
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <LucideReact.Tag size={16} className="mr-1" />
          <span>Type: {value.metadata.package_type}</span>
        </div>
      )}

      {/* Container tags */}
      {value.metadata?.container?.tags?.length && (
        <div className="mb-4">
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <LucideReact.Tag size={16} className="mr-1" />
            <span>Container Tags:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {value.metadata.container.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Docker tags */}
      {value.metadata?.docker?.tag?.length && (
        <div className="mb-4">
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <LucideReact.Droplet size={16} className="mr-1" />
            <span>Docker Tags:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {value.metadata.docker.tag.map((t) => (
              <span
                key={t}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* URLs */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center text-sm text-gray-500">
          <LucideReact.Link size={16} className="mr-1" />
          <span className="truncate">{value.package_html_url}</span>
        </div>
        {value.html_url && (
          <div className="flex items-center text-sm text-gray-500">
            <LucideReact.Link size={16} className="mr-1" />
            <span className="truncate">{value.html_url}</span>
          </div>
        )}
        <div className="flex items-center text-sm text-gray-500">
          <LucideReact.Link size={16} className="mr-1" />
          <span className="truncate">{value.url}</span>
        </div>
      </div>
    </div>
  );
}
