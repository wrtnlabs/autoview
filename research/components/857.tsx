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
  const createdDate = new Date(value.created_at);
  const formattedDate = createdDate.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Determine user display values
  const user = value.user;
  const userName = user?.name ?? user?.login ?? "Unknown User";
  const avatarSrc =
    user?.avatar_url ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      userName,
    )}&background=0D8ABC&color=fff`;

  // Map reaction content to emoji and labels
  const contentMap: Record<
    AutoViewInput["content"],
    { emoji: string; label: string }
  > = {
    "+1": { emoji: "👍", label: "Thumbs up" },
    "-1": { emoji: "👎", label: "Thumbs down" },
    laugh: { emoji: "😄", label: "Laugh" },
    confused: { emoji: "😕", label: "Confused" },
    heart: { emoji: "❤️", label: "Heart" },
    hooray: { emoji: "🎉", label: "Hooray" },
    rocket: { emoji: "🚀", label: "Rocket" },
    eyes: { emoji: "👀", label: "Eyes" },
  };
  const reaction = contentMap[value.content];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm space-x-4">
      <img
        src={avatarSrc}
        alt={`${userName}'s avatar`}
        className="w-10 h-10 rounded-full object-cover bg-gray-100"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src =
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              userName,
            )}&background=0D8ABC&color=fff`;
        }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-900 truncate">{userName}</span>
          <span role="img" aria-label={reaction.label} className="text-xl">
            {reaction.emoji}
          </span>
        </div>
        <time dateTime={value.created_at} className="text-gray-500 text-sm">
          {formattedDate}
        </time>
      </div>
    </div>
  );
}
