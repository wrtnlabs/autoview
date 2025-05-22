import { tags } from "typia";
import React from "react";
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
        content: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes";
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
  // Map reaction content to emoji for a friendly display.
  const reactionEmojiMap: Record<AutoViewInput["content"], string> = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    confused: "😕",
    heart: "❤️",
    hooray: "🎉",
    rocket: "🚀",
    eyes: "👀",
  };
  const emoji = reactionEmojiMap[value.content] || "❓";

  // Format the creation date to a medium date + short time string.
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // Extract user information, providing fallbacks if necessary.
  const user = value.user;
  const displayName = user ? user.name ?? user.login : "Unknown User";
  const avatarUrl =
    user?.avatar_url ||
    // Fallback to a neutral placeholder if avatar is missing.
    "https://via.placeholder.com/40?text=U";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
      <img
        src={avatarUrl}
        alt={displayName}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />
      <div className="ml-4 flex-grow overflow-hidden">
        <div className="flex items-center space-x-2">
          <span className="text-xl">{emoji}</span>
          <span className="font-semibold text-gray-900 truncate">
            {displayName}
          </span>
        </div>
        <p className="text-gray-500 text-sm mt-1 truncate">{formattedDate}</p>
      </div>
    </div>
  );
}
