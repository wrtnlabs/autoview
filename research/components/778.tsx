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

  // Define the known reaction types in a desired display order
  const reactionTypes: AutoViewInputSubTypes.reaction["content"][] = [
    "+1",
    "-1",
    "laugh",
    "confused",
    "heart",
    "hooray",
    "rocket",
    "eyes",
  ];

  // Count how many of each reaction content type we have
  const reactionCounts: Record<string, number> = reactionTypes.reduce((acc, type) => {
    acc[type] = 0;
    return acc;
  }, {} as Record<string, number>);
  value.forEach((r) => {
    reactionCounts[r.content] = (reactionCounts[r.content] || 0) + 1;
  });

  // Helper: map reaction content to an icon element
  function getIcon(
    content: AutoViewInputSubTypes.reaction["content"]
  ): JSX.Element {
    switch (content) {
      case "+1":
        return <LucideReact.ThumbsUp size={16} className="text-gray-500" />;
      case "-1":
        return <LucideReact.ThumbsDown size={16} className="text-gray-500" />;
      case "laugh":
        return <LucideReact.Smile size={16} className="text-yellow-500" />;
      case "confused":
        return <LucideReact.Frown size={16} className="text-gray-500" />;
      case "heart":
        return <LucideReact.Heart size={16} className="text-red-500" />;
      case "hooray":
        // Lucide doesn't have a built-in "hooray" icon; use emoji fallback
        return <span className="text-yellow-500 text-lg">🎉</span>;
      case "rocket":
        return <LucideReact.Rocket size={16} className="text-gray-500" />;
      case "eyes":
        return <LucideReact.Eye size={16} className="text-gray-500" />;
      default:
        return <LucideReact.HelpCircle size={16} className="text-gray-400" />;
    }
  }

  // Format ISO date to a user-friendly short date
  function formatDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Summarize counts at top, then list each reaction with avatar, user, icon, and date.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Summary of reaction counts */}
      <div className="flex flex-wrap items-center gap-4">
        {reactionTypes.map((type) => {
          const count = reactionCounts[type];
          if (count > 0) {
            return (
              <div
                key={type}
                className="flex items-center space-x-1 bg-gray-50 px-2 py-1 rounded-full"
              >
                {getIcon(type)}
                <span className="text-sm font-medium text-gray-700">
                  {count}
                </span>
              </div>
            );
          }
          return null;
        })}
        {value.length === 0 && (
          <div className="flex items-center space-x-2 text-gray-400">
            <LucideReact.AlertCircle size={24} />
            <span className="text-sm">No reactions</span>
          </div>
        )}
      </div>

      {/* Detailed list of reactions */}
      {value.length > 0 && (
        <ul className="mt-4 divide-y divide-gray-200">
          {value.map((reaction) => {
            const user = reaction.user;
            const displayName = user
              ? user.name?.trim() || user.login
              : "Unknown user";
            const avatarSrc = user?.avatar_url;
            return (
              <li
                key={reaction.id}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center space-x-3">
                  {avatarSrc ? (
                    <img
                      src={avatarSrc}
                      alt={`${displayName} avatar`}
                      className="w-8 h-8 rounded-full object-cover"
                      onError={(e) => {
                        const img = e.currentTarget;
                        img.onerror = null;
                        img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          displayName
                        )}&background=0D8ABC&color=fff`;
                      }}
                    />
                  ) : (
                    <LucideReact.User
                      size={32}
                      className="text-gray-300"
                      aria-label="No avatar"
                    />
                  )}
                  <span className="font-medium text-gray-800">
                    {displayName}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {getIcon(reaction.content)}
                  <span className="text-sm text-gray-500">
                    <LucideReact.Calendar
                      size={14}
                      className="inline mr-1 text-gray-400"
                    />
                    {formatDate(reaction.created_at)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
