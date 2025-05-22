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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { content, user, created_at } = value;

  // Map reaction types to icons and labels
  const reactionIcon = (() => {
    switch (content) {
      case "+1":
        return <LucideReact.ThumbsUp className="text-blue-500" size={20} />;
      case "-1":
        return <LucideReact.ThumbsDown className="text-red-500" size={20} />;
      case "laugh":
        return <LucideReact.Smile className="text-yellow-500" size={20} />;
      case "confused":
        return <LucideReact.HelpCircle className="text-orange-500" size={20} />;
      case "heart":
        return <LucideReact.Heart className="text-pink-500" size={20} />;
      case "hooray":
        return <LucideReact.Star className="text-green-500" size={20} />;
      case "rocket":
        return <LucideReact.Rocket className="text-indigo-500" size={20} />;
      case "eyes":
        return <LucideReact.Eye className="text-gray-500" size={20} />;
      default:
        return null;
    }
  })();

  const reactionLabels: Record<string, string> = {
    "+1": "Thumbs Up",
    "-1": "Thumbs Down",
    laugh: "Laugh",
    confused: "Confused",
    heart: "Heart",
    hooray: "Hooray",
    rocket: "Rocket",
    eyes: "Eyes",
  };
  const reactionLabel = reactionLabels[content] ?? content;

  // Derive user display name and avatar
  const displayName = user?.name ?? user?.login ?? "Unknown User";
  const avatarUrl =
    user?.avatar_url ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`;

  // Format creation date
  const formattedDate = new Date(created_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md max-w-sm">
      <div className="flex-shrink-0">
        <img
          src={avatarUrl}
          alt={`${displayName} avatar`}
          className="w-10 h-10 rounded-full object-cover"
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            img.onerror = null;
            img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              displayName,
            )}&background=random`;
          }}
        />
      </div>
      <div className="flex-1 ml-3">
        <div className="flex items-center text-sm font-medium text-gray-900 space-x-1">
          <span>{displayName}</span>
          <span className="text-gray-500">reacted with</span>
        </div>
        <div className="flex items-center mt-1 space-x-2">
          {reactionIcon}
          <span className="text-sm text-gray-800">{reactionLabel}</span>
        </div>
        <div className="flex items-center mt-1 text-xs text-gray-400 space-x-1">
          <LucideReact.Calendar size={14} />
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
