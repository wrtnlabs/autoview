import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A GitHub Classroom classroom
   *
   * @title Classroom
   */
  export type classroom = {
    /**
     * Unique identifier of the classroom.
     */
    id: number & tags.Type<"int32">;
    /**
     * The name of the classroom.
     */
    name: string;
    /**
     * Whether classroom is archived.
     */
    archived: boolean;
    organization: AutoViewInputSubTypes.simple_classroom_organization;
    /**
     * The URL of the classroom on GitHub Classroom.
     */
    url: string;
  };
  /**
   * A GitHub organization.
   *
   * @title Organization Simple for Classroom
   */
  export type simple_classroom_organization = {
    id: number & tags.Type<"int32">;
    login: string;
    node_id: string;
    html_url: string & tags.Format<"uri">;
    name: string | null;
    avatar_url: string;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.classroom;

// The component name is "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const orgDisplayName = value.organization.name ?? value.organization.login;
  const placeholderAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    orgDisplayName,
  )}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      {/* Classroom Title */}
      <div className="flex items-center gap-2">
        <LucideReact.BookOpen size={20} className="text-indigo-600" />
        <h2
          className="text-lg font-semibold text-gray-900 truncate"
          title={value.name}
        >
          {value.name}
        </h2>
      </div>

      {/* Status */}
      <div className="mt-2 flex items-center text-sm">
        {value.archived ? (
          <div className="flex items-center text-red-500">
            <LucideReact.Archive size={16} className="mr-1" />
            <span>Archived</span>
          </div>
        ) : (
          <div className="flex items-center text-green-500">
            <LucideReact.CheckCircle size={16} className="mr-1" />
            <span>Active</span>
          </div>
        )}
      </div>

      {/* Organization Info */}
      <div className="mt-4 flex items-start">
        <img
          src={value.organization.avatar_url}
          alt={`${orgDisplayName} avatar`}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = placeholderAvatar;
          }}
        />
        <div className="ml-3 overflow-hidden">
          <p
            className="text-sm font-medium text-gray-900 truncate"
            title={orgDisplayName}
          >
            {orgDisplayName}
          </p>
          <div className="mt-1 flex items-center text-xs text-gray-500">
            <LucideReact.Link size={14} className="mr-1 flex-shrink-0" />
            <span className="truncate" title={value.organization.html_url}>
              {value.organization.html_url}
            </span>
          </div>
        </div>
      </div>

      {/* Classroom URL */}
      <div className="mt-4 flex items-center text-xs text-gray-600">
        <LucideReact.Link size={14} className="mr-1 flex-shrink-0" />
        <span className="truncate" title={value.url}>
          {value.url}
        </span>
      </div>
    </div>
  );
}
