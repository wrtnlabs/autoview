import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Reactions to conversations provide a way to help people express their feelings more simply and effectively.
   *
   * @title Reaction
   */
  export type reaction = {
    id: number & tags.Type<"int32">;
    node_id: string;
    user: AutoViewInputSubTypes.nullable_simple_user;
    /**
     * The reaction to use
     */
    content:
      | "+1"
      | "-1"
      | "laugh"
      | "confused"
      | "heart"
      | "hooray"
      | "rocket"
      | "eyes";
    created_at: string & tags.Format<"date-time">;
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
export type AutoViewInput = AutoViewInputSubTypes.reaction;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { user, content, created_at } = value;
  const displayName = user?.name ?? user?.login ?? "Unknown User";
  const formattedDate = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(created_at));

  const reactionEmojis: Record<AutoViewInput["content"], string> = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    confused: "😕",
    heart: "❤️",
    hooray: "🎉",
    rocket: "🚀",
    eyes: "👀",
  };
  const reactionEmoji = reactionEmojis[content];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
      {user ? (
        <img
          src={user.avatar_url}
          alt={`${displayName} avatar`}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              displayName,
            )}&background=0D8ABC&color=fff`;
          }}
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
          <LucideReact.User className="text-gray-500" size={24} />
        </div>
      )}

      <div className="ml-4 flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
        <div>
          <div className="text-sm font-medium text-gray-900">{displayName}</div>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <span
              role="img"
              aria-label={content}
              className="text-lg mr-2 select-none"
            >
              {reactionEmoji}
            </span>
            <span className="capitalize">{content}</span>
          </div>
        </div>

        <div className="text-xs text-gray-500 mt-2 sm:mt-0 flex items-center">
          <LucideReact.Calendar className="mr-1" size={16} />
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
