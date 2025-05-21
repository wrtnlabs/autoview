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
  // Type aliases for clarity
  type Reaction = AutoViewInputSubTypes.reaction;
  type ReactionContent = Reaction["content"];

  // 1. Data aggregation: count reactions by type
  const counts = value.reduce((acc, reaction) => {
    const key = reaction.content as ReactionContent;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<ReactionContent, number>);

  // Emoji mapping for each reaction type
  const emojiMap: Record<ReactionContent, string> = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    confused: "😕",
    heart: "❤️",
    hooray: "🎉",
    rocket: "🚀",
    eyes: "👀",
  };

  // Sort reaction types by descending count for summary display
  const sortedContents = (Object.keys(counts) as ReactionContent[]).sort(
    (a, b) => counts[b] - counts[a]
  );

  // Utility: format ISO date-time into a readable string
  const formatDate = (iso: string): string => {
    const date = new Date(iso);
    const dateStr = date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const timeStr = date.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
    return `${dateStr}, ${timeStr}`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <section className="p-4 bg-white rounded-lg shadow-md">
      {value.length === 0 ? (
        <p className="text-gray-500 text-center">No reactions yet.</p>
      ) : (
        <>
          {/* Summary of reaction counts */}
          <div className="flex flex-wrap gap-2 mb-4">
            {sortedContents.map((type) => (
              <span
                key={type}
                className="inline-flex items-center bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm font-medium"
              >
                <span className="mr-1">{emojiMap[type]}</span>
                <span>{counts[type]}</span>
              </span>
            ))}
          </div>

          {/* Detailed reaction list */}
          <ul className="space-y-4">
            {value.map((reaction) => {
              const user = reaction.user;
              const username = user?.name ?? user?.login ?? "Unknown";
              const avatarUrl = user?.avatar_url ?? "";
              const emoji = emojiMap[reaction.content];
              const date = formatDate(reaction.created_at);

              return (
                <li key={reaction.id} className="flex items-start space-x-3">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={username}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-500 text-sm">{emoji}</span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{emoji}</span>
                      <span className="font-medium text-gray-900 truncate">
                        {username}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-0.5">{date}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
}
