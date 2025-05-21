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
  // Map reaction content types to emojis for intuitive display.
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
  const emoji = reactionEmojiMap[value.content] || value.content;

  // Format the creation timestamp into a human-readable date and time.
  const createdDate = new Date(value.created_at);
  const formattedDate = createdDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedTime = createdDate.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
  const displayTimestamp = `${formattedDate} at ${formattedTime}`;

  // Safely extract user information, falling back if the user is null.
  const user = value.user;
  const displayName = user?.name?.trim() || user?.login || "Unknown User";
  const displayLogin = user?.login ? `@${user.login}` : "";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
      {/* Avatar */}
      <img
        className="w-10 h-10 flex-shrink-0 rounded-full bg-gray-100 object-cover"
        src={user?.avatar_url || ""}
        alt={displayName}
      />

      {/* User info */}
      <div className="flex-1 min-w-0 overflow-hidden">
        <p className="text-sm font-medium text-gray-900 truncate">{displayName}</p>
        {displayLogin && (
          <p className="text-xs text-gray-500 truncate">{displayLogin}</p>
        )}
      </div>

      {/* Reaction and timestamp */}
      <div className="flex flex-col items-end space-y-1">
        <span className="text-2xl leading-none">{emoji}</span>
        <time
          className="text-xs text-gray-400 whitespace-nowrap"
          dateTime={value.created_at}
        >
          {displayTimestamp}
        </time>
      </div>
    </div>
  );
}
