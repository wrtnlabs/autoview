import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Projects are a way to organize columns and cards of work.
     *
     * @title Project
    */
    export interface project {
        owner_url: string & tags.Format<"uri">;
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        columns_url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * Name of the project
        */
        name: string;
        /**
         * Body of the project
        */
        body: string | null;
        number: number & tags.Type<"int32">;
        /**
         * State of the project; either 'open' or 'closed'
        */
        state: string;
        creator: AutoViewInputSubTypes.nullable_simple_user;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        /**
         * The baseline permission that all organization members have on this project. Only present if owner is an organization.
        */
        organization_permission?: "read" | "write" | "admin" | "none";
        /**
         * Whether or not this project can be seen by everyone. Only present if owner is an organization.
        */
        "private"?: boolean;
    }
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export type nullable_simple_user = {
        name?: string | null;
        email?: string | null;
        login: string;
        id: number & tags.Type<"int32">;
        node_id: string;
        avatar_url: string & tags.Format<"uri">;
        gravatar_id: string | null;
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        followers_url: string & tags.Format<"uri">;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string & tags.Format<"uri">;
        organizations_url: string & tags.Format<"uri">;
        repos_url: string & tags.Format<"uri">;
        events_url: string;
        received_events_url: string & tags.Format<"uri">;
        type: string;
        site_admin: boolean;
        starred_at?: string;
        user_view_type?: string;
    } | null;
}
export type AutoViewInput = AutoViewInputSubTypes.project;



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
  const statusIcon =
    value.state === "open" ? (
      <LucideReact.FolderOpen className="text-green-500" size={16} />
    ) : (
      <LucideReact.Lock className="text-red-500" size={16} />
    );
  const statusLabel =
    value.state === "open" ? "Open" : "Closed";
  const creatorName = value.creator?.login ?? "Unknown";
  const creatorAvatar =
    value.creator?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      creatorName
    )}&background=0D8ABC&color=fff`;
  const description = value.body
    ? value.body
    : "No description provided";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header: Name and Status */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
        <div className="flex items-center space-x-1">
          {statusIcon}
          <span className="text-sm font-medium text-gray-700">
            {statusLabel}
          </span>
        </div>
      </div>

      {/* Project Number */}
      <div className="text-sm text-gray-500">Project #{value.number}</div>

      {/* Creator and Dates */}
      <div className="flex items-center space-x-3 mt-3">
        <img
          src={creatorAvatar}
          alt={creatorName}
          className="h-8 w-8 rounded-full object-cover flex-shrink-0"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              creatorName
            )}&background=0D8ABC&color=fff`;
          }}
        />
        <div className="flex-1 space-y-1">
          <div className="text-sm text-gray-700 truncate">{creatorName}</div>
          <div className="flex items-center text-xs text-gray-500 space-x-3">
            <div className="flex items-center space-x-1">
              <LucideReact.Calendar size={14} className="text-gray-400" />
              <span>Created: {createdDate}</span>
            </div>
            <div className="flex items-center space-x-1">
              <LucideReact.RefreshCw size={14} className="text-gray-400" />
              <span>Updated: {updatedDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="mt-4 text-gray-700 text-sm line-clamp-3">
        {description}
      </p>

      {/* Links and Organization Permission */}
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
        <div className="flex items-center space-x-1 text-gray-500">
          <LucideReact.Link size={16} />
          <span className="truncate">{value.html_url}</span>
        </div>
        {value.organization_permission && (
          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded">
            {value.organization_permission.charAt(0).toUpperCase() +
              value.organization_permission.slice(1)}
          </span>
        )}
        {value.private && (
          <div className="flex items-center space-x-1 text-gray-500">
            <LucideReact.Lock size={16} />
            <span className="text-xs">Private</span>
          </div>
        )}
      </div>
    </div>
  );
}
