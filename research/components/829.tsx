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
  // 1. Data aggregation: count occurrences of each reaction type
  const counts: Record<AutoViewInputSubTypes.reaction['content'], number> = value.reduce(
    (acc, r) => {
      acc[r.content] = (acc[r.content] ?? 0) + 1;
      return acc;
    },
    {} as Record<AutoViewInputSubTypes.reaction['content'], number>
  );

  // 2. Icon and label mappings for reaction types
  const iconMap: Record<AutoViewInputSubTypes.reaction['content'], JSX.Element> = {
    '+1': <LucideReact.ThumbsUp size={16} className="text-gray-500" />,
    '-1': <LucideReact.ThumbsDown size={16} className="text-gray-500" />,
    laugh: <LucideReact.Smile size={16} className="text-yellow-500" />,
    confused: <LucideReact.HelpCircle size={16} className="text-orange-500" />,
    heart: <LucideReact.Heart size={16} className="text-red-500" />,
    hooray: <LucideReact.Star size={16} className="text-purple-500" />,
    rocket: <LucideReact.Rocket size={16} className="text-indigo-500" />,
    eyes: <LucideReact.Eye size={16} className="text-blue-500" />,
  };
  const labelMap: Record<AutoViewInputSubTypes.reaction['content'], string> = {
    '+1': 'Upvote',
    '-1': 'Downvote',
    laugh: 'Laugh',
    confused: 'Confused',
    heart: 'Heart',
    hooray: 'Hooray',
    rocket: 'Rocket',
    eyes: 'Eyes',
  };

  // 3. Prepare summary items (only types that occurred)
  const summaryKeys = (Object.keys(counts) as AutoViewInputSubTypes.reaction['content'][]).filter(
    (key) => counts[key] > 0
  );

  // Placeholder for missing avatars
  const defaultAvatar = 'https://ui-avatars.com/api/?name=Unknown&background=random';

  // 4. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Summary of reaction counts */}
      <div className="flex flex-wrap gap-2">
        {summaryKeys.map((key) => (
          <div
            key={key}
            className="flex items-center gap-1 bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded-full"
          >
            {iconMap[key]}
            <span>{counts[key]}</span>
          </div>
        ))}
      </div>

      {/* Detailed list of reactions */}
      <div className="mt-4 space-y-4">
        {value.map((r) => {
          const displayName = r.user?.name ?? r.user?.login ?? 'Unknown';
          const avatarSrc =
            r.user?.avatar_url ??
            `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`;
          const formattedDate = new Date(r.created_at).toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
          });

          return (
            <div key={r.id} className="flex items-start gap-3">
              <img
                src={avatarSrc}
                alt={displayName}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.src = defaultAvatar;
                }}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-gray-800 truncate">
                    {displayName}
                  </span>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {formattedDate}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-1">
                  {iconMap[r.content]}
                  <span className="text-sm text-gray-600">{labelMap[r.content]}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
