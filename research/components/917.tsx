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
  const { content, user, created_at } = value;

  // Map reaction content to emoji and human-readable label
  const contentMap: Record<
    AutoViewInput["content"],
    { emoji: string; label: string }
  > = {
    "+1": { emoji: "👍", label: "Thumbs Up" },
    "-1": { emoji: "👎", label: "Thumbs Down" },
    laugh: { emoji: "😄", label: "Laugh" },
    confused: { emoji: "😕", label: "Confused" },
    heart: { emoji: "❤️", label: "Heart" },
    hooray: { emoji: "🎉", label: "Hooray" },
    rocket: { emoji: "🚀", label: "Rocket" },
    eyes: { emoji: "👀", label: "Eyes" },
  };
  const { emoji, label } = contentMap[content];

  // Parse and format creation date as relative time or fallback to localized date
  const reactionDate = new Date(created_at);
  function formatRelativeTime(date: Date): string {
    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffSeconds < 60) return "just now";
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`;
    if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)}h ago`;

    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  const formattedDate = formatRelativeTime(reactionDate);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md space-x-3">
      {/* Reaction Emoji */}
      <span
        className="text-2xl flex-shrink-0"
        role="img"
        aria-label={label}
      >
        {emoji}
      </span>

      {/* User Info and Timestamp */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          {user ? (
            <>
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-6 h-6 rounded-full flex-shrink-0"
              />
              <span className="text-sm font-medium text-gray-900 truncate">
                {user.name ? `${user.name} (${user.login})` : user.login}
              </span>
            </>
          ) : (
            <span className="text-sm font-medium text-gray-900">
              Unknown User
            </span>
          )}
        </div>
        <div className="text-xs text-gray-500">{formattedDate}</div>
      </div>
    </div>
  );
}
