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
export type AutoViewInput = AutoViewInputSubTypes.reaction;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const displayName = value.user?.name || value.user?.login || 'Unknown User';
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName,
  )}&background=0D8ABC&color=fff`;
  const avatarUrl = value.user?.avatar_url ?? avatarFallback;

  const reactionMap = {
    '+1': { Icon: LucideReact.ThumbsUp, colorClass: 'text-green-500', label: 'Thumbs up' },
    '-1': { Icon: LucideReact.ThumbsDown, colorClass: 'text-red-500', label: 'Thumbs down' },
    laugh: { Icon: LucideReact.Laugh, colorClass: 'text-yellow-500', label: 'Laugh' },
    confused: { Icon: LucideReact.HelpCircle, colorClass: 'text-amber-500', label: 'Confused' },
    heart: { Icon: LucideReact.Heart, colorClass: 'text-pink-500', label: 'Heart' },
    hooray: { Icon: LucideReact.Star, colorClass: 'text-purple-500', label: 'Hooray' },
    rocket: { Icon: LucideReact.Rocket, colorClass: 'text-sky-500', label: 'Rocket' },
    eyes: { Icon: LucideReact.Eye, colorClass: 'text-gray-500', label: 'Eyes' },
  } as const;

  const { Icon, colorClass, label } = reactionMap[value.content];
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow flex items-center gap-4">
      <img
        src={avatarUrl}
        alt={`${displayName} avatar`}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = avatarFallback;
        }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900 truncate">{displayName}</span>
          <Icon className={colorClass} size={16} aria-label={label} />
        </div>
        <div className="mt-1 flex items-center text-sm text-gray-500">
          <LucideReact.Calendar size={16} className="mr-1" aria-label="Date" />
          <time dateTime={value.created_at} className="truncate">
            {formattedDate}
          </time>
        </div>
      </div>
    </div>
  );
}
