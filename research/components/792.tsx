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
  const displayName = value.user
    ? value.user.name?.trim() || value.user.login
    : "Unknown User";

  // Prepare avatar URL with fallback to initials
  const avatarSrc = value.user?.avatar_url || "";
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    const initials = encodeURIComponent(
      displayName
        .split(" ")
        .map((n) => n.charAt(0))
        .join("")
        .toUpperCase(),
    );
    e.currentTarget.src = `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff`;
  };

  // Map reaction content to icons and colors
  const reactionIcon: React.ReactNode = (() => {
    switch (value.content) {
      case "+1":
        return <LucideReact.ThumbsUp className="text-green-500" size={20} />;
      case "-1":
        return <LucideReact.ThumbsDown className="text-red-500" size={20} />;
      case "laugh":
        return <LucideReact.Smile className="text-yellow-500" size={20} />;
      case "confused":
        return <LucideReact.Meh className="text-yellow-600" size={20} />;
      case "heart":
        return <LucideReact.Heart className="text-pink-500" size={20} />;
      case "hooray":
        return (
          <LucideReact.PartyPopper className="text-purple-500" size={20} />
        );
      case "rocket":
        return <LucideReact.Rocket className="text-indigo-500" size={20} />;
      case "eyes":
        return <LucideReact.Eye className="text-gray-500" size={20} />;
      default:
        return <span className="text-gray-500">{value.content}</span>;
    }
  })();

  // Format timestamp
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md max-w-sm">
      <div className="flex-shrink-0">
        {value.user ? (
          <img
            src={avatarSrc}
            alt={displayName}
            onError={handleImgError}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <LucideReact.User className="w-10 h-10 text-gray-300" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 text-sm font-medium text-gray-900 truncate">
          <span>{displayName}</span>
          <span className="flex items-center">{reactionIcon}</span>
          <span>reacted</span>
        </div>
        <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
          <LucideReact.Calendar size={12} className="text-gray-400" />
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
