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
  const user = value.user;
  const displayName =
    user?.name?.trim() || user?.login || "Unknown User";
  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName
  )}&background=0D8ABC&color=fff`;
  const avatarSrc = user?.avatar_url || fallbackAvatar;

  const formattedDate = new Date(value.created_at).toLocaleString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }
  );

  const reactionDetails: Record<
    AutoViewInput["content"],
    {
      Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
      label: string;
      color: string;
    }
  > = {
    "+1": {
      Icon: LucideReact.ThumbsUp,
      label: "Thumbs Up",
      color: "text-green-500",
    },
    "-1": {
      Icon: LucideReact.ThumbsDown,
      label: "Thumbs Down",
      color: "text-red-500",
    },
    laugh: {
      Icon: LucideReact.Smile,
      label: "Laugh",
      color: "text-yellow-500",
    },
    confused: {
      Icon: LucideReact.HelpCircle,
      label: "Confused",
      color: "text-amber-500",
    },
    heart: {
      Icon: LucideReact.Heart,
      label: "Heart",
      color: "text-pink-500",
    },
    hooray: {
      Icon: LucideReact.Star,
      label: "Hooray",
      color: "text-indigo-500",
    },
    rocket: {
      Icon: LucideReact.Rocket,
      label: "Rocket",
      color: "text-indigo-600",
    },
    eyes: {
      Icon: LucideReact.Eye,
      label: "Eyes",
      color: "text-gray-500",
    },
  };

  const { Icon, label, color } = reactionDetails[value.content];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="max-w-sm w-full p-4 bg-white rounded-lg shadow flex items-start space-x-4">
      <div className="flex-shrink-0">
        <img
          src={avatarSrc}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackAvatar;
          }}
          alt={`${displayName}'s avatar`}
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2 flex-wrap">
          <span className="font-medium text-gray-900">{displayName}</span>
          <Icon
            className={`w-5 h-5 ${color}`}
            aria-hidden="true"
          />
          <span className="text-sm text-gray-600">{label}</span>
        </div>
        <div className="mt-1 text-xs text-gray-400">{formattedDate}</div>
      </div>
    </div>
  );
}
