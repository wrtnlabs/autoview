import LucideReact from "lucide-react";
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

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2">No package versions available.</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {value.map((pkg) => {
        const created = formatDate(pkg.created_at);
        const updated = formatDate(pkg.updated_at);
        const pkgType = pkg.metadata?.package_type ?? "unknown";
        const containerTags = pkg.metadata?.container?.tags ?? [];
        const dockerTags = pkg.metadata?.docker?.tag ?? [];
        return (
          <div
            key={pkg.id}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {pkg.name}
              </h3>
              <span className="mt-1 sm:mt-0 inline-flex items-center px-2 py-0.5 bg-indigo-100 text-indigo-800 text-xs font-medium rounded">
                {pkgType.toUpperCase()}
              </span>
            </div>

            {pkg.license && (
              <div className="mt-2 flex items-center text-sm text-gray-600 gap-1">
                <LucideReact.BookOpen size={16} className="flex-shrink-0" />
                <span>{pkg.license}</span>
              </div>
            )}

            {pkg.description && (
              <p className="mt-2 text-gray-700 text-sm line-clamp-2">
                {pkg.description}
              </p>
            )}

            {(containerTags.length > 0 || dockerTags.length > 0) && (
              <div className="mt-3 flex flex-wrap gap-2">
                {containerTags.map((tag) => (
                  <span
                    key={`c-${tag}`}
                    className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
                {dockerTags.map((tag) => (
                  <span
                    key={`d-${tag}`}
                    className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-4 flex flex-wrap text-xs text-gray-500 gap-4">
              <div className="flex items-center gap-1">
                <LucideReact.Calendar size={14} />
                <span>Created {created}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Edit2 size={14} />
                <span>Updated {updated}</span>
              </div>
              {pkg.deleted_at && (
                <div className="flex items-center gap-1">
                  <LucideReact.Trash2 size={14} className="text-red-400" />
                  <span>Deleted {formatDate(pkg.deleted_at)}</span>
                </div>
              )}
            </div>

            <div className="mt-3 flex items-center text-xs text-gray-500 space-x-1 break-all">
              <LucideReact.Link size={14} />
              <span>{pkg.package_html_url}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
