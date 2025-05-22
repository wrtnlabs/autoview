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
export type AutoViewInput = AutoViewInputSubTypes.package_version[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalCount = value.length;
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const packageTypeBadge = (type: string) => {
    switch (type) {
      case "npm":
        return "bg-yellow-100 text-yellow-800";
      case "maven":
        return "bg-red-100 text-red-800";
      case "rubygems":
        return "bg-pink-100 text-pink-800";
      case "docker":
        return "bg-blue-100 text-blue-800";
      case "nuget":
        return "bg-purple-100 text-purple-800";
      case "container":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <LucideReact.Box className="mr-2 text-gray-600" size={20} />
          Package Versions
        </h2>
        <span className="text-sm text-gray-500">{totalCount} items</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {value.map((pkg) => (
          <div
            key={pkg.id}
            className="flex flex-col p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="flex-1 text-md font-medium text-gray-800 truncate">
                {pkg.name}
              </h3>
              <span
                className={`ml-2 px-2 py-0.5 text-xs font-medium rounded ${packageTypeBadge(
                  pkg.metadata?.package_type ?? "",
                )}`}
              >
                {pkg.metadata?.package_type ?? "unknown"}
              </span>
            </div>
            {pkg.description && (
              <p className="text-sm text-gray-600 line-clamp-3 mb-2">
                {pkg.description}
              </p>
            )}
            <div className="text-xs text-gray-500 space-y-1">
              <div className="flex items-center gap-1">
                <LucideReact.Calendar size={14} />
                <span>Created: {formatDate(pkg.created_at)}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Calendar size={14} />
                <span>Updated: {formatDate(pkg.updated_at)}</span>
              </div>
              {pkg.deleted_at && (
                <div className="flex items-center gap-1 text-red-500">
                  <LucideReact.Trash2 size={14} />
                  <span>Deleted: {formatDate(pkg.deleted_at)}</span>
                </div>
              )}
            </div>
            {(pkg.metadata?.container?.tags || pkg.metadata?.docker?.tag) && (
              <div className="flex flex-wrap gap-1 mt-3">
                {(
                  pkg.metadata.container?.tags ||
                  pkg.metadata.docker?.tag ||
                  []
                ).map((tag, idx) => (
                  <span
                    key={idx}
                    className="flex items-center px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded"
                  >
                    <LucideReact.Tag size={12} className="mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
