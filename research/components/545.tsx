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
  const user = value.user;
  const displayName = user?.name?.trim()
    ? user.name
    : user?.login
      ? user.login
      : "Unknown User";

  // Placeholder avatar via initials if no avatar_url or image fails
  const avatarPlaceholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName,
  )}&background=0D8ABC&color=fff`;

  // Map GitHub reaction content to emoji
  const reactionEmojiMap: Record<AutoViewInput["content"], string> = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    confused: "😕",
    heart: "❤️",
    hooray: "🎉",
    rocket: "🚀",
    eyes: "👀",
  };
  const emoji = reactionEmojiMap[value.content];

  // Format created_at to a human‐readable date/time
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full p-4 bg-white rounded-lg shadow-md flex items-start space-x-4">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <img
          src={user?.avatar_url || avatarPlaceholder}
          alt={`${displayName} avatar`}
          className="w-10 h-10 rounded-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = avatarPlaceholder;
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Header: username + reaction */}
        <div className="flex items-center space-x-1">
          <span className="font-semibold text-gray-800 truncate">
            {displayName}
          </span>
          <span role="img" aria-label={value.content} className="text-lg">
            {emoji}
          </span>
        </div>

        {/* Timestamp */}
        <div className="mt-1 text-xs text-gray-500 flex items-center">
          <LucideReact.Calendar size={12} className="mr-1" />
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
