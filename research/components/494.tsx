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
export type AutoViewInput = AutoViewInputSubTypes.package_version;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdAt = new Date(value.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const updatedAt = new Date(value.updated_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const isDeleted = Boolean(value.deleted_at);
  const deletedAt = value.deleted_at
    ? new Date(value.deleted_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;
  const tagList =
    value.metadata?.container?.tags ?? value.metadata?.docker?.tag ?? [];
  const homepageUrl = value.html_url ?? value.package_html_url;
  const repoUrl = value.package_html_url;
  const description = value.description ?? "";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm space-y-4">
      {/* Header: Name and optional license */}
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-semibold text-gray-800">{value.name}</h2>
        {value.license && (
          <div className="flex items-center text-gray-500 text-sm">
            <LucideReact.FileText size={16} className="mr-1" />
            <span>{value.license}</span>
          </div>
        )}
      </div>

      {/* Package type badge */}
      {value.metadata?.package_type && (
        <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded uppercase">
          <LucideReact.Tag size={12} className="mr-1" />
          {value.metadata.package_type}
        </span>
      )}

      {/* Description */}
      {description && (
        <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
      )}

      {/* Tags */}
      {tagList.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tagList.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded"
            >
              <LucideReact.Tag size={12} className="mr-1" />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Links */}
      <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
        {repoUrl && (
          <div className="flex items-center">
            <LucideReact.Link size={16} className="mr-1" />
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Package Page
            </a>
          </div>
        )}
        {homepageUrl && homepageUrl !== repoUrl && (
          <div className="flex items-center">
            <LucideReact.Link size={16} className="mr-1" />
            <a
              href={homepageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Homepage
            </a>
          </div>
        )}
      </div>

      {/* Timestamps */}
      <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span>Created: {createdAt}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span>Updated: {updatedAt}</span>
        </div>
        {isDeleted && deletedAt && (
          <div className="flex items-center text-red-500">
            <LucideReact.AlertTriangle size={16} className="mr-1" />
            <span>Deleted: {deletedAt}</span>
          </div>
        )}
      </div>
    </div>
  );
}
