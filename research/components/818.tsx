import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Page Build
   *
   * @title Page Build
   */
  export type page_build = {
    url: string & tags.Format<"uri">;
    status: string;
    error: {
      message: string | null;
    };
    pusher: AutoViewInputSubTypes.nullable_simple_user;
    commit: string;
    duration: number & tags.Type<"int32">;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
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
export type AutoViewInput = AutoViewInputSubTypes.page_build;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const displayName = value.pusher
    ? value.pusher.name
      ? value.pusher.name
      : value.pusher.login
    : "Unknown User";
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName,
  )}&background=random`;
  const truncatedCommit =
    value.commit.length > 7 ? value.commit.slice(0, 7) : value.commit;
  const createdAt = new Date(value.created_at).toLocaleString();
  const updatedAt = new Date(value.updated_at).toLocaleString();
  const durationSeconds = (value.duration / 1000).toFixed(1) + "s";

  // Map status to icon, color, and label
  let StatusIcon: JSX.Element;
  let statusLabel =
    value.status.charAt(0).toUpperCase() + value.status.slice(1);
  switch (value.status.toLowerCase()) {
    case "success":
    case "passed":
      StatusIcon = (
        <LucideReact.CheckCircle className="text-green-500" size={20} />
      );
      statusLabel = "Success";
      break;
    case "pending":
    case "running":
      StatusIcon = <LucideReact.Clock className="text-amber-500" size={20} />;
      statusLabel = "Pending";
      break;
    case "failure":
    case "failed":
    case "error":
      StatusIcon = (
        <LucideReact.AlertTriangle className="text-red-500" size={20} />
      );
      statusLabel = "Error";
      break;
    default:
      StatusIcon = <LucideReact.Circle className="text-gray-400" size={20} />;
      break;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header with status */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Page Build</h2>
        <div className="flex items-center gap-1">
          {StatusIcon}
          <span className="text-sm font-medium text-gray-700">
            {statusLabel}
          </span>
        </div>
      </div>

      {/* Details grid */}
      <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
        {/* URL */}
        <div className="col-span-full">
          <dt className="text-sm font-medium text-gray-500">URL</dt>
          <dd className="mt-1 text-sm text-gray-900 flex items-center break-all">
            <LucideReact.Link className="text-gray-400" size={16} />
            <span className="ml-1">{value.url}</span>
          </dd>
        </div>

        {/* Commit */}
        <div>
          <dt className="text-sm font-medium text-gray-500">Commit</dt>
          <dd className="mt-1 text-sm font-mono text-gray-900">
            {truncatedCommit}
          </dd>
        </div>

        {/* Duration */}
        <div>
          <dt className="text-sm font-medium text-gray-500">Duration</dt>
          <dd className="mt-1 text-sm text-gray-900 flex items-center">
            <LucideReact.Clock className="text-gray-400" size={16} />
            <span className="ml-1">{durationSeconds}</span>
          </dd>
        </div>

        {/* Created At */}
        <div>
          <dt className="text-sm font-medium text-gray-500">Created</dt>
          <dd className="mt-1 text-sm text-gray-900 flex items-center">
            <LucideReact.Calendar className="text-gray-400" size={16} />
            <time className="ml-1">{createdAt}</time>
          </dd>
        </div>

        {/* Updated At */}
        <div>
          <dt className="text-sm font-medium text-gray-500">Updated</dt>
          <dd className="mt-1 text-sm text-gray-900 flex items-center">
            <LucideReact.RefreshCw className="text-gray-400" size={16} />
            <time className="ml-1">{updatedAt}</time>
          </dd>
        </div>

        {/* Pusher */}
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500">Pusher</dt>
          <dd className="mt-1 flex items-center">
            <img
              src={value.pusher?.avatar_url || avatarFallback}
              onError={(e) => {
                const img = e.currentTarget;
                img.onerror = null;
                img.src = avatarFallback;
              }}
              alt={displayName}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="ml-2 text-sm text-gray-900">{displayName}</span>
          </dd>
        </div>

        {/* Error Message */}
        {value.error.message && (
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Error</dt>
            <dd className="mt-1 flex items-start text-sm text-red-700">
              <LucideReact.AlertTriangle
                className="mt-0.5 text-red-500"
                size={16}
              />
              <span className="ml-1">{value.error.message}</span>
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
