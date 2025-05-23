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
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const packageUrl = value.html_url || value.package_html_url;
  const hasMetadata = !!value.metadata;
  const containerTags = value.metadata?.container?.tags || [];
  const dockerTags = value.metadata?.docker?.tag || [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col gap-4 max-w-md mx-auto">
      {/* Header: Name and Link */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 truncate">{value.name}</h2>
        <a
          href={packageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
          aria-label="View package"
        >
          <LucideReact.Link size={20} strokeWidth={1.5} />
        </a>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 line-clamp-3">
        {value.description ?? (
          <span className="italic text-gray-400">No description available.</span>
        )}
      </p>

      {/* Metadata Badges */}
      <div className="flex flex-wrap gap-2">
        {/* Package Type */}
        {hasMetadata && (
          <span className="px-2 py-1 text-xs font-medium uppercase bg-indigo-100 text-indigo-800">
            {value.metadata!.package_type}
          </span>
        )}
        {/* Container Tags */}
        {containerTags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {containerTags.map((tag, idx) => (
              <span
                key={`ct-${idx}`}
                className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {/* Docker Tags */}
        {dockerTags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {dockerTags.map((tag, idx) => (
              <span
                key={`dt-${idx}`}
                className="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Dates & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Created: {formatDate(value.created_at)}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.RefreshCw size={16} className="text-gray-400" />
          <span>Updated: {formatDate(value.updated_at)}</span>
        </div>
        {value.deleted_at && (
          <div className="flex items-center gap-1">
            <LucideReact.XCircle size={16} className="text-red-500" />
            <span>Deleted: {formatDate(value.deleted_at)}</span>
          </div>
        )}
      </div>

      {/* License */}
      {value.license && (
        <div className="flex items-center gap-1 text-sm text-gray-700">
          <LucideReact.FileText size={16} className="text-gray-400" />
          <span className="font-medium">{value.license}</span>
        </div>
      )}
    </div>
  );
}
