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
  const totalReactions = value.length;
  const reactionCounts: Record<string, number> = {};
  value.forEach((r) => {
    reactionCounts[r.content] = (reactionCounts[r.content] || 0) + 1;
  });

  const sortedReactions = Object.entries(reactionCounts).sort(
    (a, b) => b[1] - a[1]
  ) as [string, number][];

  const iconMap: Record<string, string> = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    confused: "😕",
    heart: "❤️",
    hooray: "🎉",
    rocket: "🚀",
    eyes: "👀",
  };

  // Determine the most recent reaction date
  const lastReactionDate =
    value.length > 0
      ? new Date(
          Math.max(...value.map((r) => new Date(r.created_at).getTime()))
        )
      : null;
  const formattedLastDate = lastReactionDate
    ? lastReactionDate.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row md:justify-between mb-4">
        <div className="text-gray-700 font-semibold">
          Total Reactions: <span className="text-blue-600">{totalReactions}</span>
        </div>
        {lastReactionDate && (
          <div className="text-gray-500 text-sm mt-2 md:mt-0">
            Last: <span className="font-medium">{formattedLastDate}</span>
          </div>
        )}
      </div>
      {totalReactions > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {sortedReactions.map(([type, count]) => (
            <li key={type} className="inline-flex items-center">
              <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
                <span className="mr-1">{iconMap[type] || "❓"}</span>
                <span>{type}</span>
                <span className="ml-2 bg-blue-600 text-white rounded-full px-2 py-0.5 text-xs">
                  {count}
                </span>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-gray-500 italic text-center py-4">
          No reactions yet
        </div>
      )}
    </div>
  );
}
