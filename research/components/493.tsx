import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A version of a software package
     *
     * @title Package Version
    */
    export interface package_version {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.package_version[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data formatting helper
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  // 2. Handle empty state
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2">No package versions available</span>
      </div>
    );
  }

  // 3. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {value.map((pkg) => (
        <div key={pkg.id} className="p-4 bg-white rounded-lg shadow">
          {/* Header: Name and License */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {pkg.name}
            </h3>
            {pkg.license && (
              <span className="px-2 py-0.5 text-xs font-medium text-gray-800 bg-gray-200 rounded">
                {pkg.license}
              </span>
            )}
          </div>

          {/* Description */}
          {pkg.description && (
            <p className="text-gray-700 text-sm line-clamp-2">
              {pkg.description}
            </p>
          )}

          {/* Dates */}
          <div className="mt-3 space-y-1 text-gray-600 text-sm">
            <div className="flex items-center gap-1">
              <LucideReact.Calendar size={16} className="text-gray-400" />
              <span>Created: {formatDate(pkg.created_at)}</span>
            </div>
            <div className="flex items-center gap-1">
              <LucideReact.Calendar size={16} className="text-gray-400" />
              <span>Updated: {formatDate(pkg.updated_at)}</span>
            </div>
            {pkg.deleted_at && (
              <div className="flex items-center gap-1 text-red-500">
                <LucideReact.Trash2 size={16} className="text-red-400" />
                <span>Deleted: {formatDate(pkg.deleted_at)}</span>
              </div>
            )}
          </div>

          {/* Metadata badges */}
          {pkg.metadata && (
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              <div className="flex items-center gap-1 text-gray-600">
                <LucideReact.Package size={16} className="text-gray-400" />
                <span>{pkg.metadata.package_type}</span>
              </div>
              {pkg.metadata.container?.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-gray-800 bg-gray-100 rounded"
                >
                  {tag}
                </span>
              ))}
              {pkg.metadata.docker?.tag?.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-gray-800 bg-gray-100 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Links */}
          <div className="mt-3 space-y-1 text-gray-600 text-sm">
            <div className="flex items-center gap-1">
              <LucideReact.Link size={16} className="text-gray-400" />
              <span className="truncate">{pkg.url}</span>
            </div>
            <div className="flex items-center gap-1">
              <LucideReact.Link size={16} className="text-gray-400" />
              <span className="truncate">{pkg.package_html_url}</span>
            </div>
            {pkg.html_url && (
              <div className="flex items-center gap-1">
                <LucideReact.Link size={16} className="text-gray-400" />
                <span className="truncate">{pkg.html_url}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
