import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Reactions to conversations provide a way to help people express their feelings more simply and effectively.
     *
     * @title Reaction
    */
    export interface reaction {
        id: number & tags.Type<"int32">;
        node_id: string;
        user: AutoViewInputSubTypes.nullable_simple_user;
        /**
         * The reaction to use
        */
        content: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes";
        created_at: string & tags.Format<"date-time">;
    }
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
  if (totalReactions === 0) {
    return (
      <div className="flex flex-col items-center p-4 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <span>No reactions yet</span>
      </div>
    );
  }

  type ReactionType = AutoViewInputSubTypes.reaction["content"];
  const contentCounts = value.reduce((acc, reaction) => {
    const key = reaction.content as ReactionType;
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {} as Record<ReactionType, number>);

  // Reaction metadata mapping
  const reactionMeta: Record<ReactionType, React.ReactNode> = {
    "+1": <LucideReact.ThumbsUp size={16} strokeWidth={2} className="text-green-500" />,
    "-1": <LucideReact.ThumbsDown size={16} strokeWidth={2} className="text-red-500" />,
    laugh: <LucideReact.Laugh size={16} strokeWidth={2} className="text-yellow-500" />,
    confused: <LucideReact.Frown size={16} strokeWidth={2} className="text-amber-500" />,
    heart: <LucideReact.Heart size={16} strokeWidth={2} className="text-pink-500" />,
    hooray: <LucideReact.Star size={16} strokeWidth={2} className="text-violet-500" />,
    rocket: <LucideReact.Rocket size={16} strokeWidth={2} className="text-indigo-500" />,
    eyes: <LucideReact.Eye size={16} strokeWidth={2} className="text-blue-500" />,
  };

  // Sorted reaction types by count descending
  const sortedTypes = (Object.keys(contentCounts) as ReactionType[]).sort(
    (a, b) => (contentCounts[b] ?? 0) - (contentCounts[a] ?? 0)
  );

  // Date formatting options
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {/* Reaction summary chips */}
      <div className="flex overflow-x-auto gap-2 mb-4">
        {sortedTypes.map((type) => (
          <span
            key={type}
            className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-sm whitespace-nowrap"
          >
            {reactionMeta[type]}
            <span className="text-gray-700">{contentCounts[type]}</span>
          </span>
        ))}
      </div>

      {/* Detailed reaction list */}
      <ul className="space-y-3">
        {value.map((reaction) => {
          const login = reaction.user?.login ?? "Unknown";
          const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            login
          )}&background=0D8ABC&color=fff`;

          return (
            <li key={reaction.id} className="flex items-center gap-3">
              <img
                src={reaction.user?.avatar_url ?? fallbackAvatar}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = fallbackAvatar;
                }}
                alt={login}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 truncate">{login}</span>
                  {reactionMeta[reaction.content]}
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(reaction.created_at).toLocaleString(undefined, dateOptions)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
