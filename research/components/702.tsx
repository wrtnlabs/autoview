import * as LucideReact from "lucide-react";
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

  // Derive display name and avatar URL with fallback
  const user = value.user;
  const displayName = user?.name?.trim() || user?.login || "Unknown";
  const avatarPlaceholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName,
  )}&background=0D8ABC&color=fff`;
  const avatarUrl = user?.avatar_url || avatarPlaceholder;

  // Format the creation date for readability
  const createdDate = new Date(value.created_at);
  const formattedDate = createdDate.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Map reaction content to emoji and accessible label
  const emojiMap: Record<
    AutoViewInput["content"],
    { icon: string; label: string }
  > = {
    "+1": { icon: "👍", label: "Thumbs up" },
    "-1": { icon: "👎", label: "Thumbs down" },
    laugh: { icon: "😄", label: "Laugh" },
    confused: { icon: "😕", label: "Confused" },
    heart: { icon: "❤️", label: "Heart" },
    hooray: { icon: "🎉", label: "Hooray" },
    rocket: { icon: "🚀", label: "Rocket" },
    eyes: { icon: "👀", label: "Eyes" },
  };
  const { icon: reactionIcon, label: reactionLabel } = emojiMap[value.content];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <img
          src={avatarUrl}
          alt={`${displayName}'s avatar`}
          className="w-10 h-10 rounded-full object-cover"
          onError={(e) => {
            // Fallback to placeholder if avatar fails to load
            (e.currentTarget as HTMLImageElement).src = avatarPlaceholder;
          }}
        />
      </div>

      {/* User and reaction details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <span className="truncate font-medium text-gray-900">
            {displayName}
          </span>
          <span
            role="img"
            aria-label={reactionLabel}
            className="text-xl leading-none"
          >
            {reactionIcon}
          </span>
        </div>
        <div className="mt-1 flex items-center text-sm text-gray-500">
          <LucideReact.Calendar
            size={16}
            className="mr-1 text-gray-400 flex-shrink-0"
          />
          <time dateTime={value.created_at}>{formattedDate}</time>
        </div>
      </div>
    </div>
  );
}
