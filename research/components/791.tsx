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
export type AutoViewInput = AutoViewInputSubTypes.reaction[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.

  // Map GitHub reaction content values to emoji icons.
  const contentEmojiMap: Record<AutoViewInputSubTypes.reaction["content"], string> = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    confused: "😕",
    heart: "❤️",
    hooray: "🎉",
    rocket: "🚀",
    eyes: "👀",
  };

  // Format an ISO date string to a short, readable date.
  const formatDate = (iso: string): string => {
    const date = new Date(iso);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Sort reactions by creation time, most recent first.
  const sortedReactions = [...value].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // If there are no reactions, display a friendly empty state.
  if (sortedReactions.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-center text-gray-500">
        No reactions to display.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
      {sortedReactions.map((reaction) => {
        const user = reaction.user;
        const displayName = user
          ? user.name?.trim() || user.login
          : "Unknown user";
        const avatarUrl = user
          ? user.avatar_url
          : "https://via.placeholder.com/40?text=U";
        const emoji = contentEmojiMap[reaction.content] || reaction.content;

        return (
          <div
            key={reaction.id}
            className="flex items-center p-4 space-x-4 hover:bg-gray-50 transition-colors"
          >
            {/* Reaction Emoji */}
            <span className="text-2xl">{emoji}</span>

            {/* User Avatar */}
            <img
              className="w-10 h-10 rounded-full flex-shrink-0"
              src={avatarUrl}
              alt={displayName}
            />

            {/* User Info and Timestamp */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {displayName}
              </p>
              <p className="text-xs text-gray-500">
                {formatDate(reaction.created_at)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
