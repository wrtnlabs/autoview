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
  // Derived display name and avatar URL (with fallback)
  const displayName = value.user ? (value.user.name ?? value.user.login) : "Unknown User";
  const avatarUrl = value.user?.avatar_url ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`;
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`;

  // Format the creation date
  const date = new Date(value.created_at);
  const formattedDate = date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  // Map reaction content to a semantically appropriate icon
  function renderReactionIcon(): JSX.Element {
    switch (value.content) {
      case "+1":
        return <LucideReact.ThumbsUp className="text-green-500" size={16} strokeWidth={1.5} aria-label="+1" />;
      case "-1":
        return <LucideReact.ThumbsDown className="text-red-500" size={16} strokeWidth={1.5} aria-label="-1" />;
      case "laugh":
        return <LucideReact.Smile className="text-yellow-500" size={16} strokeWidth={1.5} aria-label="laugh" />;
      case "confused":
        return <LucideReact.HelpCircle className="text-amber-500" size={16} strokeWidth={1.5} aria-label="confused" />;
      case "heart":
        return <LucideReact.Heart className="text-red-500" size={16} strokeWidth={1.5} aria-label="heart" />;
      case "hooray":
        return <LucideReact.Gift className="text-purple-500" size={16} strokeWidth={1.5} aria-label="hooray" />;
      case "rocket":
        return <LucideReact.Rocket className="text-blue-500" size={16} strokeWidth={1.5} aria-label="rocket" />;
      case "eyes":
        return <LucideReact.Eye className="text-gray-600" size={16} strokeWidth={1.5} aria-label="eyes" />;
      default:
        return <LucideReact.Star className="text-gray-400" size={16} strokeWidth={1.5} aria-label="reaction" />;
    }
  }

  // Compose the visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow flex items-start space-x-4 max-w-full">
      <img
        src={avatarUrl}
        alt={displayName}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        onError={(e) => { e.currentTarget.src = fallbackAvatar; }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-1">
          <span className="font-medium text-gray-800 truncate">{displayName}</span>
          <span className="text-gray-500 text-sm">reacted with</span>
          {renderReactionIcon()}
        </div>
        <div className="flex items-center text-gray-400 text-sm mt-1">
          <LucideReact.Calendar className="mr-1" size={14} />
          <span className="truncate">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
