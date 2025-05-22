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
  const createdDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const updatedDate = new Date(value.updated_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const deletedDate = value.deleted_at
    ? new Date(value.deleted_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  const rawDescription = value.description?.trim() ?? "";
  const description =
    rawDescription.length > 150
      ? rawDescription.slice(0, 150).trim() + "..."
      : rawDescription;

  const containerTags = value.metadata?.container?.tags ?? [];
  const dockerTags = value.metadata?.docker?.tag ?? [];
  const combinedTags = Array.from(new Set([...containerTags, ...dockerTags]));

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Header: Package Name */}
      <div className="flex items-center text-xl font-semibold text-gray-900">
        <LucideReact.Package className="mr-2 text-blue-500" size={20} />
        <span className="truncate">{value.name}</span>
      </div>

      {/* Status: Active or Deleted */}
      <div className="mt-2 text-sm">
        {deletedDate ? (
          <div className="flex items-center text-red-500">
            <LucideReact.XCircle className="mr-1" size={16} />
            <span>Deleted on {deletedDate}</span>
          </div>
        ) : (
          <div className="flex items-center text-green-600">
            <LucideReact.CheckCircle className="mr-1" size={16} />
            <span>Active</span>
          </div>
        )}
      </div>

      {/* Dates */}
      <div className="mt-2 flex flex-wrap text-sm text-gray-500 gap-4">
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span>Created: {createdDate}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Edit3 size={16} className="mr-1" />
          <span>Updated: {updatedDate}</span>
        </div>
      </div>

      {/* License */}
      {value.license && (
        <div className="mt-3 flex items-center text-sm text-gray-600">
          <LucideReact.FileText size={16} className="mr-1 text-gray-500" />
          <span>{value.license}</span>
        </div>
      )}

      {/* Description */}
      {description && (
        <p className="mt-4 text-gray-700 text-sm leading-relaxed line-clamp-3">
          {description}
        </p>
      )}

      {/* URLs */}
      <div className="mt-4 space-y-1 text-sm text-gray-500">
        <div className="flex items-center">
          <LucideReact.Link size={16} className="mr-1" />
          <span className="break-all">{value.package_html_url}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Link size={16} className="mr-1" />
          <span className="break-all">{value.url}</span>
        </div>
        {value.html_url && (
          <div className="flex items-center">
            <LucideReact.Link size={16} className="mr-1" />
            <span className="break-all">{value.html_url}</span>
          </div>
        )}
      </div>

      {/* Metadata: Package Type */}
      <div className="mt-4 flex items-center text-sm text-gray-700">
        <LucideReact.Tag size={16} className="mr-1 text-gray-500" />
        <span className="capitalize">{value.metadata?.package_type}</span>
      </div>

      {/* Combined Tags */}
      {combinedTags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {combinedTags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
