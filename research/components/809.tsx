import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A collection of related issues and pull requests.
   *
   * @title Milestone
   */
  export type milestone = {
    url: string & tags.Format<"uri">;
    html_url: string & tags.Format<"uri">;
    labels_url: string & tags.Format<"uri">;
    id: number & tags.Type<"int32">;
    node_id: string;
    /**
     * The number of the milestone.
     */
    number: number & tags.Type<"int32">;
    /**
     * The state of the milestone.
     */
    state: "open" | "closed";
    /**
     * The title of the milestone.
     */
    title: string;
    description: string | null;
    creator: AutoViewInputSubTypes.nullable_simple_user;
    open_issues: number & tags.Type<"int32">;
    closed_issues: number & tags.Type<"int32">;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
    closed_at: (string & tags.Format<"date-time">) | null;
    due_on: (string & tags.Format<"date-time">) | null;
  };
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
export type AutoViewInput = AutoViewInputSubTypes.milestone;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const {
    title,
    number,
    state,
    description,
    creator,
    open_issues,
    closed_issues,
    created_at,
    updated_at,
    due_on,
    closed_at,
  } = value;

  // Creator display name and avatar with fallback
  const creatorName = creator?.name || creator?.login || "Unknown";
  const initialAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    creatorName,
  )}&background=0D8ABC&color=fff`;
  const avatarSrc = creator?.avatar_url || initialAvatar;

  // Date formatting
  const formatDate = (iso?: string | null) =>
    iso
      ? new Date(iso).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : null;

  const createdDate = formatDate(created_at);
  const updatedDate = formatDate(updated_at);
  const dueDate = formatDate(due_on);
  const closedDate = formatDate(closed_at);

  // Capitalize state
  const prettyState = state.charAt(0).toUpperCase() + state.slice(1);
  const stateColors = state === "open" ? "green" : "gray";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header: Title, Number, State */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center space-x-2 truncate">
          <span className="truncate">{title}</span>
          <span className="text-sm text-gray-500">#{number}</span>
        </h2>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-${stateColors}-100 text-${stateColors}-800`}
        >
          {prettyState}
        </span>
      </div>

      {/* Description */}
      {description && (
        <p className="text-gray-700 text-sm line-clamp-3">{description}</p>
      )}

      {/* Metadata: Creator and Dates */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
        {/* Creator */}
        <div className="flex items-center space-x-2">
          <img
            src={avatarSrc}
            alt={creatorName}
            className="w-6 h-6 rounded-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = initialAvatar;
            }}
          />
          <span className="truncate">{creatorName}</span>
        </div>

        {/* Created */}
        {createdDate && (
          <div className="flex items-center space-x-1">
            <LucideReact.Calendar size={16} className="text-gray-400" />
            <span>Created {createdDate}</span>
          </div>
        )}

        {/* Updated */}
        {updatedDate && (
          <div className="flex items-center space-x-1">
            <LucideReact.Calendar size={16} className="text-gray-400" />
            <span>Updated {updatedDate}</span>
          </div>
        )}

        {/* Due */}
        {dueDate && (
          <div className="flex items-center space-x-1">
            <LucideReact.Calendar size={16} className="text-gray-400" />
            <span>Due {dueDate}</span>
          </div>
        )}

        {/* Closed */}
        {closedDate && (
          <div className="flex items-center space-x-1">
            <LucideReact.CheckCircle size={16} className="text-gray-400" />
            <span>Closed {closedDate}</span>
          </div>
        )}
      </div>

      {/* Issue Counts */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-1 text-sm text-gray-600">
          <LucideReact.Circle size={16} className="text-yellow-500" />
          <span>{open_issues} Open</span>
        </div>
        <div className="flex items-center space-x-1 text-sm text-gray-600">
          <LucideReact.CheckCircle size={16} className="text-green-500" />
          <span>{closed_issues} Closed</span>
        </div>
      </div>
    </div>
  );
}
