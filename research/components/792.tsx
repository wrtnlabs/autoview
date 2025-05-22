import { tags } from "typia";
import React from "react";
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
        content: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes";
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
  //    Mapping reaction content to emoji for a more visual presentation.
  const reactionEmojiMap: Record<string, string> = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    confused: "😕",
    heart: "❤️",
    hooray: "🎉",
    rocket: "🚀",
    eyes: "👀",
  };

  //    A simple utility to display relative time (e.g., "5m ago", "2h ago").
  function getRelativeTime(dateString: string): string {
    const now = Date.now();
    const past = new Date(dateString).getTime();
    const diff = now - past;
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }

  //    Derive display values for user and reaction.
  const user = value.user;
  const login = user?.login;
  const name = user?.name;
  const displayName = name ?? login ?? "Unknown User";
  const avatarUrl = user?.avatar_url;
  const emoji = reactionEmojiMap[value.content] || value.content;
  const timeAgo = getRelativeTime(value.created_at);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm space-x-4 w-full max-w-xs">
      {/* Avatar */}
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={`${displayName}'s avatar`}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 flex-shrink-0">
          ?
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* User name and login */}
        <div className="flex items-baseline space-x-1 truncate">
          <span className="font-semibold text-gray-800 truncate">{displayName}</span>
          {name && login && login !== name ? (
            <span className="text-gray-500 text-sm truncate">@{login}</span>
          ) : null}
        </div>

        {/* Reaction and timestamp */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
          <span className="text-lg">{emoji}</span>
          <span className="truncate">{timeAgo}</span>
        </div>
      </div>
    </div>
  );
}
