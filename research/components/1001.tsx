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
  // 1. Sort versions by creation date descending for better chronology
  const sortedVersions = React.useMemo(
    () =>
      [...value].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      ),
    [value],
  )

  // 2. If no data, show empty state
  if (sortedVersions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2 text-sm">No versions available</span>
      </div>
    )
  }

  // 3. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {sortedVersions.map((version) => (
        <div
          key={version.id}
          className="flex flex-col sm:flex-row sm:items-start sm:justify-between p-4 bg-white rounded-lg shadow"
        >
          {/* Main info */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{version.name}</h3>
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">
              {version.description ?? 'No description provided.'}
            </p>
            <div className="mt-3 flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-2">
              <div className="flex items-center">
                <LucideReact.Calendar size={16} className="text-gray-400" />
                <span className="ml-1">
                  Created: {new Date(version.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center">
                <LucideReact.Calendar size={16} className="text-gray-400" />
                <span className="ml-1">
                  Updated: {new Date(version.updated_at).toLocaleDateString()}
                </span>
              </div>
              {version.license && (
                <div className="flex items-center">
                  <LucideReact.Tag size={16} className="text-gray-400" />
                  <span className="ml-1">{version.license}</span>
                </div>
              )}
            </div>
            {/* Metadata tags */}
            {version.metadata?.container?.tags && (
              <div className="mt-3 flex flex-wrap gap-2">
                {version.metadata.container.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {version.metadata?.docker?.tag && (
              <div className="mt-2 flex flex-wrap gap-2">
                {version.metadata.docker.tag.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
          {/* Links and type */}
          <div className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0 w-full sm:w-auto">
            <div className="flex flex-col text-sm text-blue-600 break-all space-y-2">
              <div className="flex items-center">
                <LucideReact.Link size={16} />
                <span className="ml-1">{version.package_html_url}</span>
              </div>
              {version.html_url && (
                <div className="flex items-center">
                  <LucideReact.Link size={16} />
                  <span className="ml-1">{version.html_url}</span>
                </div>
              )}
            </div>
            {version.metadata?.package_type && (
              <div className="mt-3">
                <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">
                  {version.metadata.package_type.toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
