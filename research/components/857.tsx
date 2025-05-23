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
  // 1. Define data aggregation/transformation
  type IconType = React.ComponentType<any>;
  const contentIconMap: Record<AutoViewInput["content"], IconType> = {
    "+1": LucideReact.ThumbsUp,
    "-1": LucideReact.ThumbsDown,
    laugh: LucideReact.Smile,
    confused: LucideReact.HelpCircle,
    heart: LucideReact.Heart,
    hooray: LucideReact.Star,
    rocket: LucideReact.Rocket,
    eyes: LucideReact.Eye,
  };
  const contentColorMap: Record<AutoViewInput["content"], string> = {
    "+1": "text-green-500",
    "-1": "text-red-500",
    laugh: "text-yellow-500",
    confused: "text-amber-500",
    heart: "text-pink-500",
    hooray: "text-indigo-500",
    rocket: "text-gray-500",
    eyes: "text-blue-500",
  };
  const ReactionIcon = contentIconMap[value.content];
  const iconColorClass = contentColorMap[value.content];
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const user = value.user;
  const displayName = user?.name ?? user?.login ?? "Unknown";
  const avatarPlaceholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName
  )}&background=0D8ABC&color=fff`;
  const avatarSrc = user?.avatar_url || avatarPlaceholder;

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md space-x-4">
      <ReactionIcon
        size={20}
        strokeWidth={1.5}
        className={`${iconColorClass} flex-shrink-0`}
        aria-label={value.content}
      />
      <img
        src={avatarSrc}
        alt={displayName}
        className="h-8 w-8 rounded-full object-cover flex-shrink-0"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = avatarPlaceholder;
        }}
      />
      <div className="flex-1 min-w-0">
        <div className="text-gray-900 font-medium truncate">{displayName}</div>
        <div className="text-sm text-gray-500 truncate">{formattedDate}</div>
      </div>
    </div>
  );
}
