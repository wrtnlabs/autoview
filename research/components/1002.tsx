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
  const isDeleted = Boolean(value.deleted_at);
  const deletedDate = value.deleted_at
    ? new Date(value.deleted_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  // Extract metadata
  const pkgType = value.metadata?.package_type;
  const containerTags = value.metadata?.container?.tags ?? [];
  const dockerTags = value.metadata?.docker?.tag ?? [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-4">
        <LucideReact.Package size={24} className="text-indigo-500" />
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
      </div>

      {/* Description */}
      {value.description && (
        <p className="text-gray-600 mb-4 line-clamp-3">
          {value.description}
        </p>
      )}

      {/* Dates */}
      <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-4 mb-4">
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Created {createdDate}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} className="text-gray-400 rotate-180" />
          <span>Updated {updatedDate}</span>
        </div>
        {isDeleted && (
          <div className="flex items-center space-x-1 text-red-500">
            <LucideReact.AlertTriangle size={16} />
            <span>Deleted {deletedDate}</span>
          </div>
        )}
      </div>

      {/* Metadata Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {pkgType && (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
            {pkgType.charAt(0).toUpperCase() + pkgType.slice(1)}
          </span>
        )}
        {containerTags.map((tag) => (
          <span
            key={`c-${tag}`}
            className="flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded"
          >
            <LucideReact.Tag size={12} className="mr-1" />
            {tag}
          </span>
        ))}
        {dockerTags.map((tag) => (
          <span
            key={`d-${tag}`}
            className="flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded"
          >
            <LucideReact.Tag size={12} className="mr-1" />
            {tag}
          </span>
        ))}
      </div>

      {/* Links & License */}
      <div className="border-t pt-4 space-y-2 text-sm text-gray-700">
        <div className="flex items-center space-x-1">
          <LucideReact.Link size={16} className="text-gray-400" />
          <span className="truncate">{value.url}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Globe size={16} className="text-gray-400" />
          <span className="truncate">{value.package_html_url}</span>
        </div>
        {value.html_url && (
          <div className="flex items-center space-x-1">
            <LucideReact.Globe size={16} className="text-gray-400" />
            <span className="truncate">{value.html_url}</span>
          </div>
        )}
        {value.license && (
          <div className="flex items-center space-x-1">
            <LucideReact.FileText size={16} className="text-gray-400" />
            <span>{value.license}</span>
          </div>
        )}
      </div>
    </div>
  );
}
