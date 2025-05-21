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
  type Reaction = AutoViewInputSubTypes.reaction;
  type ReactionContent = Reaction["content"];

  const reactions: Reaction[] = Array.isArray(value) ? value : [];

  // Map reaction content to emoji icons
  const contentIcons: Record<ReactionContent, string> = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    confused: "😕",
    heart: "❤️",
    hooray: "🎉",
    rocket: "🚀",
    eyes: "👀",
  };

  // Aggregate counts per reaction type
  const summary: Record<ReactionContent, number> = {} as Record<ReactionContent, number>;
  reactions.forEach((r) => {
    summary[r.content] = (summary[r.content] || 0) + 1;
  });

  // Format timestamp into a concise, readable string
  const formatDate = (iso: string): string => {
    const dt = new Date(iso);
    return dt.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Reactions ({reactions.length})
        </h2>
      </div>

      {/* Summary of reaction counts */}
      <div className="flex space-x-4 mb-4 overflow-x-auto">
        {Object.entries(summary).map(([content, count]) => (
          <div
            key={content}
            className="flex items-center space-x-1 bg-gray-50 px-2 py-1 rounded-full"
          >
            <span className="text-lg">{contentIcons[content as ReactionContent]}</span>
            <span className="text-sm font-medium text-gray-700">{count}</span>
          </div>
        ))}
      </div>

      {/* Detailed list */}
      <ul className="divide-y divide-gray-200">
        {reactions.map((r) => (
          <li key={r.id} className="flex items-start py-3">
            {/* Avatar or placeholder */}
            {r.user?.avatar_url ? (
              <img
                src={r.user.avatar_url}
                alt={r.user.login}
                className="w-8 h-8 rounded-full flex-shrink-0 mr-3"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center mr-3">
                ?
              </div>
            )}

            {/* User and reaction info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900 truncate">
                  {r.user?.login ?? "Unknown"}
                </span>
                {r.user?.name && (
                  <span className="text-xs text-gray-500 truncate">
                    ({r.user.name})
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                <span>{contentIcons[r.content]}</span>
                <span>{formatDate(r.created_at)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
