import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * The status of a commit.
   *
   * @title Status
   */
  export type status = {
    url: string;
    avatar_url: string | null;
    id: number & tags.Type<"int32">;
    node_id: string;
    state: string;
    description: string | null;
    target_url: string | null;
    context: string;
    created_at: string;
    updated_at: string;
    creator: AutoViewInputSubTypes.nullable_simple_user;
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
export type AutoViewInput = AutoViewInputSubTypes.status;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { state, context, description, created_at, creator } = value;

  // Map state to icon and colors
  let StateIcon = LucideReact.Info;
  let badgeBg = "bg-gray-100";
  let badgeText = "text-gray-800";
  switch (state.toLowerCase()) {
    case "success":
      StateIcon = LucideReact.CheckCircle;
      badgeBg = "bg-green-100";
      badgeText = "text-green-800";
      break;
    case "pending":
    case "waiting":
      StateIcon = LucideReact.Clock;
      badgeBg = "bg-amber-100";
      badgeText = "text-amber-800";
      break;
    case "failure":
    case "failed":
    case "error":
      StateIcon = LucideReact.XCircle;
      badgeBg = "bg-red-100";
      badgeText = "text-red-800";
      break;
    default:
      StateIcon = LucideReact.AlertTriangle;
      badgeBg = "bg-gray-100";
      badgeText = "text-gray-800";
      break;
  }

  // Format creation date
  const formattedDate = new Date(created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Determine creator display
  const creatorName = creator?.name || creator?.login || "Unknown";
  const avatarSrc = creator?.avatar_url;
  const placeholderSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    creatorName,
  )}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col space-y-3 max-w-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 truncate">
          <StateIcon
            size={20}
            className={`flex-shrink-0 ${badgeText}`}
            aria-label={`Status: ${state}`}
          />
          <span className="text-lg font-semibold text-gray-800 truncate">
            {context}
          </span>
        </div>
        <span
          className={`px-2 py-0.5 text-xs font-medium uppercase rounded-full ${badgeBg} ${badgeText}`}
        >
          {state}
        </span>
      </div>

      {description && (
        <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
      )}

      <div className="flex items-center justify-between text-gray-500 text-sm">
        <div className="flex items-center space-x-2">
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt={creatorName}
              className="w-6 h-6 rounded-full object-cover"
              onError={(e) => {
                const img = e.currentTarget;
                img.onerror = null;
                img.src = placeholderSrc;
              }}
            />
          ) : (
            <LucideReact.User
              size={20}
              className="text-gray-400 flex-shrink-0"
              aria-label="No avatar"
            />
          )}
          <span className="truncate">{creatorName}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar
            size={16}
            className="text-gray-400 flex-shrink-0"
            aria-label="Created at"
          />
          <time dateTime={created_at}>{formattedDate}</time>
        </div>
      </div>
    </div>
  );
}
