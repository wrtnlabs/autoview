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
  const displayName = value.user?.name ?? value.user?.login ?? "Unknown User";
  const placeholderAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName,
  )}&background=0D8ABC&color=fff`;
  const avatarUrl = value.user?.avatar_url ?? placeholderAvatar;
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const getReactionIcon = (
    content: AutoViewInputSubTypes.reaction["content"],
  ): React.ReactNode => {
    switch (content) {
      case "+1":
        return (
          <LucideReact.ThumbsUp
            size={16}
            className="text-green-500"
            aria-label="Thumbs up"
          />
        );
      case "-1":
        return (
          <LucideReact.ThumbsDown
            size={16}
            className="text-red-500"
            aria-label="Thumbs down"
          />
        );
      case "laugh":
        return (
          <LucideReact.Smile
            size={16}
            className="text-yellow-500"
            aria-label="Laugh"
          />
        );
      case "confused":
        return (
          <LucideReact.HelpCircle
            size={16}
            className="text-amber-500"
            aria-label="Confused"
          />
        );
      case "heart":
        return (
          <LucideReact.Heart
            size={16}
            className="text-pink-500"
            aria-label="Heart"
          />
        );
      case "hooray":
        return (
          <LucideReact.Star
            size={16}
            className="text-violet-500"
            aria-label="Hooray"
          />
        );
      case "rocket":
        return (
          <LucideReact.Rocket
            size={16}
            className="text-indigo-500"
            aria-label="Rocket"
          />
        );
      case "eyes":
        return (
          <LucideReact.Eye
            size={16}
            className="text-blue-500"
            aria-label="Eyes"
          />
        );
      default:
        return null;
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm max-w-md">
      <img
        src={avatarUrl}
        alt={displayName}
        onError={(e) => {
          e.currentTarget.src = placeholderAvatar;
        }}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2 text-gray-800 font-medium">
          {getReactionIcon(value.content)}
          <span>{displayName}</span>
          <span className="text-gray-500 text-sm italic">
            reacted with "{value.content}"
          </span>
        </div>
        <div className="flex items-center text-gray-400 text-sm mt-1">
          <LucideReact.Calendar size={14} className="flex-shrink-0" />
          <span className="ml-1">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
