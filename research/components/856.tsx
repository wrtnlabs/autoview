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
  const reactions = value;
  // If no reactions, display a placeholder
  if (reactions.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No reactions
      </div>
    );
  }

  // 1. Derive reaction counts
  const counts: Record<string, number> = {
    "+1": 0,
    "-1": 0,
    laugh: 0,
    confused: 0,
    heart: 0,
    hooray: 0,
    rocket: 0,
    eyes: 0,
  };
  reactions.forEach((r) => {
    counts[r.content] = (counts[r.content] || 0) + 1;
  });

  // 2. Map reaction content to emoji icons
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

  // 3. Prepare summary entries sorted by count descending
  const summaryEntries = Object.entries(counts)
    .filter(([, cnt]) => cnt > 0)
    .sort((a, b) => b[1] - a[1]);

  // 4. Prepare a small list of recent reactions (first 5) and count remainder
  const previewCount = 5;
  const recent = reactions.slice(0, previewCount);
  const moreCount = reactions.length - recent.length;

  // Helper to format timestamp
  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const date = d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    const time = d.toLocaleTimeString(undefined, { hour: "numeric", minute: "numeric" });
    return `${date} ${time}`;
  };

  // 5. Compose JSX
  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto">
      {/* Summary bar */}
      <div className="flex flex-wrap items-center gap-4 border-b border-gray-200 pb-3 mb-4">
        {summaryEntries.map(([content, cnt]) => (
          <div key={content} className="flex items-center space-x-1 text-gray-700">
            <span className="text-lg">{iconMap[content] || content}</span>
            <span className="text-sm font-medium">{cnt}</span>
          </div>
        ))}
      </div>

      {/* Recent reactions list */}
      <ul className="divide-y divide-gray-100">
        {recent.map((r) => {
          const user = r.user;
          const displayName = user
            ? user.name ?? user.login
            : "Unknown user";
          const avatar = user?.avatar_url;
          return (
            <li key={r.id} className="flex items-center py-3 space-x-3">
              {avatar ? (
                <img
                  src={avatar}
                  alt={displayName}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {displayName}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(r.created_at)}
                </p>
              </div>
              <span className="text-xl">{iconMap[r.content]}</span>
            </li>
          );
        })}
        {moreCount > 0 && (
          <li className="py-3 text-center text-sm text-gray-500">
            +{moreCount} more reaction{moreCount > 1 ? "s" : ""}
          </li>
        )}
      </ul>
    </div>
  );
}
