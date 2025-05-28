import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A GitHub Classroom classroom
     *
     * @title Classroom
    */
    export interface classroom {
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
    }
    /**
     * A GitHub organization.
     *
     * @title Organization Simple for Classroom
    */
    export interface simple_classroom_organization {
        id: number & tags.Type<"int32">;
        login: string;
        node_id: string;
        html_url: string & tags.Format<"uri">;
        name: string | null;
        avatar_url: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.classroom;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const statusLabel = value.archived ? "Archived" : "Active";
  const statusColor = value.archived ? "text-red-600" : "text-green-600";
  const orgName = value.organization.name ?? value.organization.login;
  const orgAvatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    orgName,
  )}&background=0D8ABC&color=fff`;

  // Manage avatar fallback state
  const [avatarSrc, setAvatarSrc] = React.useState<string>(
    value.organization.avatar_url,
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md">
      {/* Header: Classroom name and status */}
      <div className="flex items-center justify-between mb-3">
        <h2
          className="flex-1 text-lg font-semibold text-gray-800 truncate"
          title={value.name}
        >
          {value.name}
        </h2>
        <div className="flex items-center gap-1">
          {value.archived ? (
            <LucideReact.XCircle className="text-red-500" size={16} />
          ) : (
            <LucideReact.CheckCircle className="text-green-500" size={16} />
          )}
          <span className={`text-sm ${statusColor}`}>{statusLabel}</span>
        </div>
      </div>

      {/* Organization info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src={avatarSrc}
            alt={`${orgName} avatar`}
            className="w-full h-full object-cover"
            onError={() => setAvatarSrc(orgAvatarFallback)}
          />
        </div>
        <div className="flex-1 overflow-hidden">
          <p
            className="text-sm font-medium text-gray-700 truncate"
            title={orgName}
          >
            {orgName}
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-500 truncate">
            <LucideReact.Link size={12} />
            <span title={value.organization.html_url}>
              {value.organization.html_url}
            </span>
          </div>
        </div>
      </div>

      {/* Classroom URL */}
      <div className="flex items-center gap-2 text-sm text-blue-500 truncate">
        <LucideReact.Link size={16} />
        <span title={value.url}>{value.url}</span>
      </div>
    </div>
  );
}
