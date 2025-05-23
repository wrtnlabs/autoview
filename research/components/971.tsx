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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const sortedPkgs = React.useMemo(
    () =>
      [...value].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      ),
    [value],
  );
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (sortedPkgs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-lg">No package versions available</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sortedPkgs.map((pkg) => {
        const {
          id,
          name,
          license,
          description,
          metadata,
          created_at,
          updated_at,
          url,
        } = pkg;
        const pkgType = metadata?.package_type;
        const tags = metadata?.container?.tags ?? metadata?.docker?.tag;

        return (
          <div
            key={id}
            className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm p-4"
          >
            <div className="flex items-center mb-2">
              <LucideReact.Box size={20} className="text-gray-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {name}
              </h3>
            </div>
            {license && (
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <LucideReact.FileText size={16} className="mr-1" />
                <span>{license}</span>
              </div>
            )}
            {pkgType && (
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <LucideReact.Tag size={16} className="mr-1" />
                <span className="capitalize">{pkgType}</span>
              </div>
            )}
            <div className="text-sm text-gray-500 mb-2 space-y-1">
              <div className="flex items-center">
                <LucideReact.Calendar size={16} className="mr-1" />
                <span>Created: {formatDate(created_at)}</span>
              </div>
              <div className="flex items-center">
                <LucideReact.Calendar size={16} className="mr-1" />
                <span>Updated: {formatDate(updated_at)}</span>
              </div>
            </div>
            {description && (
              <p className="text-sm text-gray-700 mb-2 line-clamp-3">
                {description}
              </p>
            )}
            {url && (
              <div className="flex items-center text-sm text-blue-600 truncate mb-2">
                <LucideReact.Link size={16} className="mr-1" />
                <span className="truncate">{url}</span>
              </div>
            )}
            {tags && tags.length > 0 && (
              <div className="mt-auto flex flex-wrap gap-2">
                {tags.slice(0, 5).map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
                {tags.length > 5 && (
                  <span className="text-gray-500 text-xs">
                    +{tags.length - 5} more
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
