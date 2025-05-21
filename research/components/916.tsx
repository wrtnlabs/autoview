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
  // Map reaction content to emoji icons.
  const reactionEmojis: Record<AutoViewInputSubTypes.reaction['content'], string> = {
    '+1': '👍',
    '-1': '👎',
    laugh: '😄',
    confused: '😕',
    heart: '❤️',
    hooray: '🎉',
    rocket: '🚀',
    eyes: '👀'
  };

  // Count total reactions by type.
  const counts = value.reduce((acc, { content }) => {
    acc[content] = (acc[content] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Sort and take the 5 most recent reactions.
  const recent = [...value]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 5);

  // Helper to display relative time.
  const relativeTime = (iso: string): string => {
    const diff = Date.now() - new Date(iso).getTime();
    const sec = Math.floor(diff / 1000);
    if (sec < 60) return `${sec}s ago`;
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h ago`;
    const d = Math.floor(hr / 24);
    return `${d}d ago`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Summary Section */}
      <h2 className="text-lg font-semibold text-gray-700 mb-2">Reactions</h2>
      <div className="flex flex-wrap gap-2">
        {(
          Object.keys(reactionEmojis) as AutoViewInputSubTypes.reaction['content'][]
        )
          .filter((type) => counts[type] > 0)
          .map((type) => (
            <span
              key={type}
              className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full"
            >
              <span className="mr-1">{reactionEmojis[type]}</span>
              <span>{counts[type]}</span>
            </span>
          ))}
        {value.length === 0 && (
          <span className="text-gray-500 text-sm">No reactions yet</span>
        )}
      </div>

      {/* Recent Reactions List */}
      {recent.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <h3 className="text-md font-medium text-gray-600 mb-2">Recent</h3>
          <ul className="divide-y divide-gray-200">
            {recent.map((r) => {
              const user = r.user;
              return (
                <li
                  key={r.id}
                  className="py-2 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    {user && user.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        alt={user.login}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                    ) : (
                      <div className="w-6 h-6 bg-gray-300 rounded-full mr-2" />
                    )}
                    <span className="text-gray-700 text-sm">
                      {user?.login ?? 'Unknown'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{reactionEmojis[r.content]}</span>
                    <span className="text-xs text-gray-500">
                      {relativeTime(r.created_at)}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
