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
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const updatedDate = new Date(value.updated_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const deletedDate = value.deleted_at
    ? new Date(value.deleted_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  const pkgType = value.metadata?.package_type;
  const containerTags = value.metadata?.container?.tags ?? [];
  const dockerTags = value.metadata?.docker?.tag ?? [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full mx-auto p-4 bg-white rounded-lg shadow-sm space-y-4">
      {/* Header: Version Name and Package Type */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 truncate">{value.name}</h2>
        {pkgType && (
          <div className="mt-1 flex items-center text-gray-600">
            <LucideReact.Tag size={16} className="mr-1 flex-shrink-0" />
            <span className="capitalize text-sm">{pkgType}</span>
          </div>
        )}
      </div>

      {/* Description (truncated) */}
      {value.description && (
        <p className="text-gray-700 text-sm line-clamp-3">{value.description}</p>
      )}

      {/* Container & Docker Tags */}
      {(containerTags.length > 0 || dockerTags.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {containerTags.map((tag, idx) => (
            <span
              key={`container-${idx}`}
              className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          {dockerTags.map((tag, idx) => (
            <span
              key={`docker-${idx}`}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* URLs */}
      <div className="space-y-1 text-sm">
        <div className="flex items-center text-blue-600">
          <LucideReact.Link size={16} className="mr-1 flex-shrink-0" />
          <span className="truncate flex-1">{value.package_html_url}</span>
        </div>
        {value.html_url && (
          <div className="flex items-center text-blue-600">
            <LucideReact.Link size={16} className="mr-1 flex-shrink-0" />
            <span className="truncate flex-1">{value.html_url}</span>
          </div>
        )}
      </div>

      {/* License */}
      {value.license && (
        <div className="flex items-center text-gray-600 text-sm">
          <LucideReact.FileText size={16} className="mr-1 flex-shrink-0" />
          <span>{value.license}</span>
        </div>
      )}

      {/* Timestamps */}
      <div className="flex flex-wrap gap-4 text-gray-500 text-sm">
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="mr-1 flex-shrink-0" />
          <span>Created {createdDate}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="mr-1 flex-shrink-0" />
          <span>Updated {updatedDate}</span>
        </div>
        {deletedDate && (
          <div className="flex items-center text-red-600">
            <LucideReact.Trash2 size={16} className="mr-1 flex-shrink-0" />
            <span>Deleted {deletedDate}</span>
          </div>
        )}
      </div>
    </div>
  );
}
