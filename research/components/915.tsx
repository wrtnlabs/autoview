import LucideReact from "lucide-react";
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
export type AutoViewInput = AutoViewInputSubTypes.reaction;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data derivations
  const displayName = value.user
    ? (value.user.name ?? value.user.login)
    : "Unknown User";
  const placeholderAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName,
  )}&background=random&color=fff`;
  const avatarSrc = value.user?.avatar_url || placeholderAvatar;

  const reactionMap: Record<
    AutoViewInput["content"],
    { icon: JSX.Element; label: string; color: string }
  > = {
    "+1": {
      icon: <LucideReact.ThumbsUp size={20} />,
      label: "Thumbs Up",
      color: "text-green-500",
    },
    "-1": {
      icon: <LucideReact.ThumbsDown size={20} />,
      label: "Thumbs Down",
      color: "text-red-500",
    },
    laugh: {
      icon: <LucideReact.Smile size={20} />,
      label: "Laugh",
      color: "text-yellow-500",
    },
    confused: {
      icon: <LucideReact.Meh size={20} />,
      label: "Confused",
      color: "text-gray-500",
    },
    heart: {
      icon: <LucideReact.Heart size={20} />,
      label: "Heart",
      color: "text-pink-500",
    },
    hooray: {
      icon: <LucideReact.Star size={20} />,
      label: "Hooray",
      color: "text-indigo-500",
    },
    rocket: {
      icon: <LucideReact.Rocket size={20} />,
      label: "Rocket",
      color: "text-purple-500",
    },
    eyes: {
      icon: <LucideReact.Eye size={20} />,
      label: "Eyes",
      color: "text-blue-500",
    },
  };
  const reaction = reactionMap[value.content];

  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // 2. Visual structure
  return (
    <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
      <img
        src={avatarSrc}
        alt={`${displayName}'s avatar`}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = placeholderAvatar;
        }}
      />
      <div className="ml-4 flex-1">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-900">{displayName}</span>
          <div className={`flex items-center space-x-1 ${reaction.color}`}>
            {React.cloneElement(reaction.icon, {
              "aria-label": reaction.label,
            })}
            <span className="text-sm">{reaction.label}</span>
          </div>
        </div>
        <p className="mt-1 text-sm text-gray-500">{formattedDate}</p>
      </div>
    </div>
  );
}
