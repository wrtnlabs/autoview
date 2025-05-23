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
  const date = new Date(value.created_at);
  const formattedDate = date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const content = value.content;
  // Map each reaction content to an appropriate Lucide icon and color
  const reactionIcon = (() => {
    switch (content) {
      case "+1":
        return <LucideReact.ThumbsUp className="text-blue-500" size={20} />;
      case "-1":
        return <LucideReact.ThumbsDown className="text-red-500" size={20} />;
      case "laugh":
        return <LucideReact.Smile className="text-yellow-500" size={20} />;
      case "confused":
        return <LucideReact.Frown className="text-amber-500" size={20} />;
      case "heart":
        return <LucideReact.Heart className="text-pink-500" size={20} />;
      case "hooray":
        return <LucideReact.Star className="text-green-500" size={20} />;
      case "rocket":
        return <LucideReact.Rocket className="text-gray-700" size={20} />;
      case "eyes":
        return <LucideReact.Eye className="text-indigo-500" size={20} />;
      default:
        return null;
    }
  })();

  // Derive a user-friendly label for the reaction
  const reactionLabel = (() => {
    switch (content) {
      case "+1":
        return "Thumbs Up";
      case "-1":
        return "Thumbs Down";
      case "laugh":
        return "Laugh";
      case "confused":
        return "Confused";
      case "heart":
        return "Heart";
      case "hooray":
        return "Hooray";
      case "rocket":
        return "Rocket";
      case "eyes":
        return "Eyes";
      default:
        return content;
    }
  })();

  // Prepare user display values, with fallbacks
  const userName = value.user?.name || value.user?.login || "Unknown";
  const avatarSrc =
    value.user?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
      <div className="flex-shrink-0">
        <img
          src={avatarSrc}
          alt={userName}
          className="w-12 h-12 rounded-full object-cover bg-gray-100"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              userName
            )}&background=0D8ABC&color=fff`;
          }}
        />
      </div>
      <div className="flex-1 flex flex-col space-y-1">
        <div className="flex items-center space-x-2">
          <span className="text-gray-900 font-semibold">{userName}</span>
          <span className="text-gray-500 text-sm">reacted</span>
        </div>
        <div className="flex items-center space-x-2">
          {reactionIcon}
          <span className="text-gray-700 font-medium">{reactionLabel}</span>
        </div>
        <div className="flex items-center text-gray-400 text-sm">
          <LucideReact.Calendar className="mr-1" size={16} />
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
