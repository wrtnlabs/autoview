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
  // 1. Data aggregation/transformation
  const user = value.user;
  const displayName = user?.name ?? user?.login ?? "Unknown User";
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName
  )}&background=0D8ABC&color=fff`;
  const avatarSrc = user?.avatar_url ?? fallbackAvatar;

  const reactionInfo = {
    "+1": { icon: LucideReact.ThumbsUp, color: "#10B981", label: "Upvoted" },
    "-1": { icon: LucideReact.ThumbsDown, color: "#EF4444", label: "Downvoted" },
    laugh: { icon: LucideReact.Smile, color: "#FBBF24", label: "Laugh" },
    confused: { icon: LucideReact.HelpCircle, color: "#F59E0B", label: "Confused" },
    heart: { icon: LucideReact.Heart, color: "#EC4899", label: "Heart" },
    hooray: { icon: LucideReact.Gift, color: "#8B5CF6", label: "Hooray" },
    rocket: { icon: LucideReact.Rocket, color: "#6366F1", label: "Rocket" },
    eyes: { icon: LucideReact.Eye, color: "#6B7280", label: "Eyes" },
  } as const;

  type ReactionKey = keyof typeof reactionInfo;
  const { icon: ReactionIcon, color: iconColor, label: reactionLabel } =
    reactionInfo[value.content as ReactionKey];

  const date = new Date(value.created_at);
  const formattedDate = `${date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })} at ${date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
      <img
        src={avatarSrc}
        onError={(e) => {
          e.currentTarget.src = fallbackAvatar;
        }}
        alt={`${displayName} avatar`}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />
      <div className="ml-4 flex flex-col overflow-hidden">
        <span className="font-semibold text-gray-900 truncate">
          {displayName}
        </span>
        <div className="flex items-center mt-1 space-x-2">
          <ReactionIcon
            size={16}
            color={iconColor}
            className="flex-shrink-0"
            aria-label={reactionLabel}
          />
          <span className="text-sm text-gray-700 truncate">
            {reactionLabel}
          </span>
        </div>
        <span className="mt-1 text-sm text-gray-500 truncate">
          {formattedDate}
        </span>
      </div>
    </div>
  );
}
