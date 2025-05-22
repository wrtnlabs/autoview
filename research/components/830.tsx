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
  const user = value.user;
  const displayName = user ? user.name?.trim() || user.login : "Unknown User";
  const avatarPlaceholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName,
  )}&background=0D8ABC&color=fff`;
  const [avatarSrc, setAvatarSrc] = React.useState<string>(
    user?.avatar_url || avatarPlaceholder,
  );

  // Format creation date
  const createdDate = new Date(value.created_at);
  const formattedDate = createdDate.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  // Map reaction content to human label and icon
  const contentMap: Record<AutoViewInput["content"], string> = {
    "+1": "Thumbs Up",
    "-1": "Thumbs Down",
    laugh: "Laugh",
    confused: "Confused",
    heart: "Heart",
    hooray: "Hooray",
    rocket: "Rocket",
    eyes: "Eyes",
  };
  const contentLabel = contentMap[value.content] || value.content;

  const ReactionIcon = (() => {
    switch (value.content) {
      case "+1":
        return <LucideReact.ThumbsUp className="text-green-500" size={20} />;
      case "-1":
        return <LucideReact.ThumbsDown className="text-red-500" size={20} />;
      case "laugh":
        return <LucideReact.Smile className="text-yellow-500" size={20} />;
      case "confused":
        return <LucideReact.Frown className="text-amber-500" size={20} />;
      case "heart":
        return <LucideReact.Heart className="text-pink-500" size={20} />;
      case "hooray":
        return (
          <LucideReact.PartyPopper className="text-purple-500" size={20} />
        );
      case "rocket":
        return <LucideReact.Rocket className="text-indigo-500" size={20} />;
      case "eyes":
        return <LucideReact.Eye className="text-gray-500" size={20} />;
      default:
        return null;
    }
  })();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex items-start space-x-4">
      <img
        src={avatarSrc}
        alt={`${displayName} avatar`}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        onError={() => setAvatarSrc(avatarPlaceholder)}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-gray-900 truncate">
            {displayName}
          </h4>
          <div className="flex items-center space-x-1">
            {ReactionIcon}
            <span className="text-xs text-gray-500">{contentLabel}</span>
          </div>
        </div>
        <div className="flex items-center mt-1 text-xs text-gray-400">
          <LucideReact.Calendar size={14} className="flex-shrink-0" />
          <time dateTime={value.created_at} className="ml-1 truncate">
            {formattedDate}
          </time>
        </div>
      </div>
    </div>
  );
}
