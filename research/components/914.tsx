import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
    content:
      | "+1"
      | "-1"
      | "laugh"
      | "confused"
      | "heart"
      | "hooray"
      | "rocket"
      | "eyes";
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
  // 1. Data aggregation / transformation
  const counts = value.reduce(
    (acc, reaction) => {
      acc[reaction.content] = (acc[reaction.content] ?? 0) + 1;
      return acc;
    },
    {} as Record<AutoViewInputSubTypes.reaction["content"], number>,
  );

  const sortedByDate = [...value].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
  const recentReactions = sortedByDate.slice(0, 5);

  const formatDate = (iso: string): string => {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getIcon = (type: AutoViewInputSubTypes.reaction["content"]) => {
    switch (type) {
      case "+1":
        return <LucideReact.ThumbsUp className="text-blue-500" size={16} />;
      case "-1":
        return <LucideReact.ThumbsDown className="text-red-500" size={16} />;
      case "laugh":
        return <LucideReact.Smile className="text-yellow-500" size={16} />;
      case "confused":
        return (
          <LucideReact.AlertTriangle className="text-amber-500" size={16} />
        );
      case "heart":
        return <LucideReact.Heart className="text-pink-500" size={16} />;
      case "hooray":
        return <LucideReact.Star className="text-green-500" size={16} />;
      case "rocket":
        return <LucideReact.Rocket className="text-indigo-500" size={16} />;
      case "eyes":
        return <LucideReact.Eye className="text-gray-500" size={16} />;
      default:
        return null;
    }
  };

  // 2. Compose visual structure
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow">
      {/* Reaction Summary */}
      <div className="mb-4 flex flex-wrap gap-2">
        {Object.entries(counts).map(([type, cnt]) => (
          <div
            key={type}
            className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
          >
            {getIcon(type as AutoViewInputSubTypes.reaction["content"])}
            <span className="text-sm font-medium">{cnt}</span>
          </div>
        ))}
        {value.length === 0 && (
          <div className="flex items-center gap-2 text-gray-400">
            <LucideReact.AlertCircle size={20} />
            <span className="text-sm">No reactions</span>
          </div>
        )}
      </div>

      {/* Recent Reactors */}
      <ul className="space-y-3">
        {recentReactions.map((reaction) => {
          const user = reaction.user;
          const displayName = user?.name ?? user?.login ?? "Unknown";
          const avatarSrc =
            user?.avatar_url ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              displayName,
            )}&background=random`;

          return (
            <li key={reaction.id} className="flex items-center gap-3 truncate">
              <img
                src={avatarSrc}
                alt={displayName}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    displayName,
                  )}&background=random`;
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800 truncate">
                    {displayName}
                  </span>
                  <span className="ml-2 text-xs text-gray-500 whitespace-nowrap">
                    {formatDate(reaction.created_at)}
                  </span>
                </div>
              </div>
              <div>{getIcon(reaction.content)}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
