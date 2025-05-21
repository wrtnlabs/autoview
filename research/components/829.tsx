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
  type ContentType = AutoViewInputSubTypes.reaction["content"];
  const contentEmojiMap: Record<ContentType, string> = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    confused: "😕",
    heart: "❤️",
    hooray: "🎉",
    rocket: "🚀",
    eyes: "👀",
  };

  // Initialize and count reactions by type
  const counts = (Object.keys(contentEmojiMap) as ContentType[]).reduce(
    (acc, key) => {
      acc[key] = 0;
      return acc;
    },
    {} as Record<ContentType, number>,
  );
  for (const reaction of value) {
    counts[reaction.content] = (counts[reaction.content] || 0) + 1;
  }

  // Sort types by descending count
  const sortedTypes = (Object.keys(counts) as ContentType[])
    .filter((type) => counts[type] > 0)
    .sort((a, b) => counts[b] - counts[a]);

  // Date formatting helper
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Summary of reaction counts */}
      {sortedTypes.length > 0 && (
        <div className="flex space-x-4 overflow-x-auto pb-2 mb-4 border-b">
          {sortedTypes.map((type) => (
            <div key={type} className="flex items-center space-x-1">
              <span className="text-xl">{contentEmojiMap[type]}</span>
              <span className="text-sm text-gray-600">{counts[type]}</span>
            </div>
          ))}
        </div>
      )}

      {/* Detailed list of reactions */}
      <ul className="space-y-4">
        {value.map((reaction) => {
          const emoji = contentEmojiMap[reaction.content];
          const user = reaction.user;
          const userName =
            user?.name?.trim() || user?.login || "Unknown User";
          const avatarUrl = user?.avatar_url;
          const dateStr = formatDate(reaction.created_at);

          return (
            <li
              key={reaction.id}
              className="flex items-center space-x-3"
            >
              <span className="text-2xl">{emoji}</span>
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={userName}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {userName}
                </p>
                <p className="text-xs text-gray-500">{dateStr}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
