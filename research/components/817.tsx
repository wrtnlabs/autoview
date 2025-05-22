import LucideReact from "lucide-react";
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

  // Shorten commit hash
  const shortCommit = value.commit.slice(0, 7);

  // Format dates
  const createdAt = new Date(value.created_at).toLocaleString();
  const updatedAt = new Date(value.updated_at).toLocaleString();

  // Interpret duration (assumed seconds)
  const durationLabel = `${value.duration}s`;

  // Map status to icon and color
  const statusText =
    value.status.charAt(0).toUpperCase() + value.status.slice(1);
  const statusKey = value.status.toLowerCase();
  const StatusIcon = statusKey.includes("success")
    ? LucideReact.CheckCircle
    : statusKey.includes("error") || statusKey.includes("fail")
      ? LucideReact.AlertTriangle
      : LucideReact.Clock;
  const statusColor = statusKey.includes("success")
    ? "text-green-500"
    : statusKey.includes("error") || statusKey.includes("fail")
      ? "text-red-500"
      : "text-amber-500";

  // Pusher info
  const pusher = value.pusher;
  const pusherName = pusher?.login ?? "Unknown";
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    pusherName,
  )}&background=ccc&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Status Header */}
      <div className="flex items-center space-x-2">
        <StatusIcon className={`${statusColor}`} size={20} strokeWidth={2} />
        <span className={`font-semibold ${statusColor}`}>{statusText}</span>
      </div>

      {/* Details List */}
      <dl className="divide-y divide-gray-200 text-sm text-gray-700">
        {/* URL */}
        <div className="flex items-center py-2">
          <LucideReact.Link className="text-gray-400" size={16} />
          <dd className="ml-2 truncate">{value.url}</dd>
        </div>

        {/* Commit */}
        <div className="flex items-center py-2">
          <LucideReact.GitCommit className="text-gray-400" size={16} />
          <dd className="ml-2 font-mono">{shortCommit}</dd>
        </div>

        {/* Duration */}
        <div className="flex items-center py-2">
          <LucideReact.Clock className="text-gray-400" size={16} />
          <dd className="ml-2">{durationLabel}</dd>
        </div>

        {/* Created At */}
        <div className="flex items-center py-2">
          <LucideReact.Calendar className="text-gray-400" size={16} />
          <dd className="ml-2">{createdAt}</dd>
        </div>

        {/* Updated At */}
        <div className="flex items-center py-2">
          <LucideReact.Calendar className="text-gray-400" size={16} />
          <dd className="ml-2">{updatedAt}</dd>
        </div>

        {/* Pusher */}
        <div className="flex items-center py-2">
          <LucideReact.User className="text-gray-400" size={16} />
          <div className="ml-2 flex items-center">
            <img
              src={pusher?.avatar_url ?? avatarFallback}
              alt={pusherName}
              className="w-6 h-6 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = avatarFallback;
              }}
            />
            <span className="ml-2">{pusherName}</span>
          </div>
        </div>

        {/* Error Message */}
        {value.error?.message && (
          <div className="flex items-center py-2">
            <LucideReact.AlertTriangle className="text-red-400" size={16} />
            <dd className="ml-2 text-red-600 line-clamp-2">
              {value.error.message}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
