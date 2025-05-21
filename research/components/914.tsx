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

  // Map reaction content to emoji
  const emojiMap: Record<AutoViewInputSubTypes.reaction["content"], string> = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    confused: "😕",
    heart: "❤️",
    hooray: "🎉",
    rocket: "🚀",
    eyes: "👀",
  };

  // Count reactions by content
  const reactionCounts = value.reduce<Record<string, number>>((acc, reaction) => {
    acc[reaction.content] = (acc[reaction.content] || 0) + 1;
    return acc;
  }, {});

  // Get latest reactions with non-null users, sorted by date descending
  const latestReactions = value
    .filter((r) => r.user !== null)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, 5);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Reactions ({totalReactions})
      </h2>

      {totalReactions === 0 ? (
        <p className="text-gray-500">No reactions yet.</p>
      ) : (
        <>
          {/* Summary badges */}
          <div className="flex flex-wrap items-center gap-2">
            {Object.entries(reactionCounts).map(([content, count]) => (
              <div
                key={content}
                className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm shadow-sm"
              >
                <span className="mr-1">{emojiMap[content as any]}</span>
                <span>{count}</span>
              </div>
            ))}
          </div>

          {/* Latest reactors' avatars */}
          {latestReactions.length > 0 && (
            <div className="mt-4">
              <p className="text-gray-600 text-sm mb-2">Latest Reacted:</p>
              <div className="flex -space-x-2">
                {latestReactions.map((reaction) => {
                  const user = reaction.user!;
                  return (
                    <img
                      key={reaction.id}
                      src={user.avatar_url}
                      alt={user.login}
                      title={`${user.login} reacted ${emojiMap[reaction.content]}`}
                      className="w-8 h-8 rounded-full border-2 border-white shadow"
                    />
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
