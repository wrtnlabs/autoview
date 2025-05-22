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
  // Handle empty state
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <LucideReact.AlertCircle size={32} className="mb-2" />
        <span className="text-lg">No package versions available</span>
      </div>
    );
  }

  // Render list of package versions
  return (
    <ul className="space-y-4">
      {value.map((pkg) => {
        // Format dates
        const createdDate = new Date(pkg.created_at).toLocaleDateString(
          undefined,
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          },
        );
        const updatedDate = new Date(pkg.updated_at).toLocaleDateString(
          undefined,
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          },
        );

        return (
          <li
            key={pkg.id}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:justify-between">
              {/* Left section: Name, description, badges */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {pkg.name}
                </h3>
                {pkg.description && (
                  <p className="mt-1 text-gray-600 text-sm line-clamp-2">
                    {pkg.description}
                  </p>
                )}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {/* License badge */}
                  {pkg.license && (
                    <span className="flex items-center text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      <LucideReact.FileText
                        size={14}
                        className="mr-1 text-gray-500"
                      />
                      {pkg.license}
                    </span>
                  )}

                  {/* Package type badge */}
                  <span className="flex items-center text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    <LucideReact.Package
                      size={14}
                      className="mr-1 text-blue-500"
                    />
                    {pkg.metadata?.package_type ?? "unknown"}
                  </span>

                  {/* Container tags */}
                  {pkg.metadata?.container?.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
                    >
                      <LucideReact.Tag
                        size={14}
                        className="mr-1 text-green-500"
                      />
                      {tag}
                    </span>
                  ))}

                  {/* Docker tags */}
                  {pkg.metadata?.docker?.tag?.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded"
                    >
                      <LucideReact.Droplet
                        size={14}
                        className="mr-1 text-indigo-500"
                      />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right section: dates */}
              <div className="mt-4 md:mt-0 md:ml-6 flex flex-col text-right">
                <div className="flex items-center text-sm text-gray-500">
                  <LucideReact.Calendar size={16} className="mr-1" />
                  <span>Created: {createdDate}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <LucideReact.RefreshCw size={16} className="mr-1" />
                  <span>Updated: {updatedDate}</span>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
