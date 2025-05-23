import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Reactions to conversations provide a way to help people express their feelings more simply and effectively.
     *
     * @title Reaction
    */
    export interface reaction {
        id: number & tags.Type<"int32">;
        node_id: string;
        user: AutoViewInputSubTypes.nullable_simple_user;
        /**
         * The reaction to use
        */
        content: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes";
        created_at: string & tags.Format<"date-time">;
    }
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

  // Derive user display name and avatar URL, with fallbacks
  const userName = value.user?.name || value.user?.login || "Unknown User";
  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    userName,
  )}&background=random&color=fff`;
  const avatarSrc = value.user?.avatar_url || defaultAvatar;

  // Reaction mapping to emoji, label, and Tailwind text color
  const reactionMap: Record<
    AutoViewInput["content"],
    { emoji: string; label: string; color: string }
  > = {
    "+1": { emoji: "👍", label: "Thumbs Up", color: "text-green-500" },
    "-1": { emoji: "👎", label: "Thumbs Down", color: "text-red-500" },
    laugh: { emoji: "😄", label: "Laugh", color: "text-yellow-500" },
    confused: { emoji: "😕", label: "Confused", color: "text-amber-500" },
    heart: { emoji: "❤️", label: "Heart", color: "text-pink-500" },
    hooray: { emoji: "🎉", label: "Hooray", color: "text-purple-500" },
    rocket: { emoji: "🚀", label: "Rocket", color: "text-indigo-500" },
    eyes: { emoji: "👀", label: "Eyes", color: "text-gray-500" },
  };
  const reaction = reactionMap[value.content];

  // Format created_at as relative time (e.g., "5m ago", "2h ago", "3d ago")
  function getRelativeTime(date: Date): string {
    const now = Date.now();
    const diffSec = (now - date.getTime()) / 1000;
    if (diffSec < 60) return `${Math.floor(diffSec)}s ago`;
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    const days = Math.floor(diffSec / 86400);
    return `${days}d ago`;
  }
  const createdAtDate = new Date(value.created_at);
  const timeAgo = getRelativeTime(createdAtDate);

  // Image error handler to fallback to generated avatar
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = defaultAvatar;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
      <img
        src={avatarSrc}
        alt={userName}
        onError={handleImageError}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-900 truncate">
            {userName}
          </span>
          <span
            className={`${reaction.color} text-sm`}
            role="img"
            aria-label={reaction.label}
          >
            {reaction.emoji}
          </span>
        </div>
        <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
          <LucideReact.Clock size={12} className="text-gray-400 flex-shrink-0" />
          <span>{timeAgo}</span>
        </div>
      </div>
    </div>
  );
}
