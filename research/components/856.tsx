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
  type Reaction = AutoViewInputSubTypes.reaction;
  type ReactionContent = Reaction["content"];

  // 1. Data aggregation: count each reaction type
  const summary = value.reduce<Record<ReactionContent, number>>(
    (acc, reaction) => {
      acc[reaction.content] = (acc[reaction.content] ?? 0) + 1;
      return acc;
    },
    {} as Record<ReactionContent, number>,
  );

  // 2. Map reaction content to icons
  const contentIcon: Record<ReactionContent, JSX.Element> = {
    "+1": <LucideReact.ThumbsUp className="text-blue-500" size={16} />,
    "-1": <LucideReact.ThumbsDown className="text-blue-500" size={16} />,
    laugh: <LucideReact.Smile className="text-yellow-400" size={16} />,
    confused: <LucideReact.Frown className="text-orange-400" size={16} />,
    heart: <LucideReact.Heart className="text-red-500" size={16} />,
    hooray: (
      <span className="text-indigo-500" aria-label="hooray">
        🎉
      </span>
    ),
    rocket: <LucideReact.Rocket className="text-purple-500" size={16} />,
    eyes: <LucideReact.Eye className="text-gray-500" size={16} />,
  };

  // 3. Utility: relative time formatter
  function relativeTime(dateString: string): string {
    const delta = Date.now() - new Date(dateString).getTime();
    const seconds = Math.floor(delta / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;
    const years = Math.floor(months / 12);
    return `${years}y ago`;
  }

  // 4. Utility: generate fallback avatar URL based on user name
  function fallbackAvatar(name: string): string {
    const encoded = encodeURIComponent(name);
    return `https://ui-avatars.com/api/?name=${encoded}&background=0D8ABC&color=fff`;
  }

  // 5. Compose visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {/* Summary of reactions */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(summary).map(([content, count]) => (
          <div
            key={content}
            className="flex items-center space-x-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
          >
            {contentIcon[content as ReactionContent]}
            <span>{count}</span>
          </div>
        ))}
      </div>

      {/* Detailed reaction list */}
      <ul className="space-y-3">
        {value.map((reaction) => {
          const user = reaction.user;
          const userName = user?.login ?? "Unknown";
          const avatarSrc = user?.avatar_url ?? fallbackAvatar(userName);

          return (
            <li key={reaction.id} className="flex items-center space-x-3">
              <img
                src={avatarSrc}
                alt={userName}
                className="w-8 h-8 rounded-full object-cover bg-gray-200"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = fallbackAvatar(userName);
                }}
              />
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center space-x-2">
                  {contentIcon[reaction.content]}
                  <span className="font-medium text-gray-800">{userName}</span>
                </div>
                <span className="text-gray-500 text-sm mt-1 sm:mt-0">
                  {relativeTime(reaction.created_at)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
