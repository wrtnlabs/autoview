import { tags } from "typia";
import React from "react";
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



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const orgDisplayName = value.organization.name ?? value.organization.login;
  const statusLabel = value.archived ? "Archived" : "Active";
  const statusColor = value.archived
    ? "bg-red-100 text-red-800"
    : "bg-green-100 text-green-800";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="bg-white rounded-lg shadow p-4 max-w-md mx-auto">
      {/* Header: Classroom name and status */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 truncate">{value.name}</h2>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor}`}
        >
          {statusLabel}
        </span>
      </div>

      {/* Organization info */}
      <div className="mt-4 flex items-center">
        <img
          src={value.organization.avatar_url}
          alt={`${orgDisplayName} avatar`}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="ml-4 flex-1">
          <p className="text-sm text-gray-600 truncate">{orgDisplayName}</p>
          <p className="text-xs text-gray-500 truncate">{value.organization.html_url}</p>
        </div>
      </div>

      {/* Classroom URL */}
      <div className="mt-4">
        <p className="text-xs text-gray-500 truncate">{value.url}</p>
      </div>
    </div>
  );
}
