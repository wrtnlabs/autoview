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
  const emoji = reactionEmojiMap[value.content] ?? value.content;

  const user = value.user;
  const displayName =
    user?.name && user.name.trim().length > 0
      ? user.name
      : user?.login ?? "Unknown User";

  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  const avatar = user ? (
    <img
      src={user.avatar_url}
      alt={`${displayName} avatar`}
      className="w-10 h-10 rounded-full object-cover"
    />
  ) : (
    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xl">
      🙍
    </div>
  );

  // 3. Return the React element.
  //    Ensure all displayed data is appropriately filtered, transformed, and formatted according to the guidelines.
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md max-w-full">
      {avatar}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-900 truncate">{displayName}</span>
          <span className="text-2xl leading-none">{emoji}</span>
        </div>
        <p className="mt-1 text-xs text-gray-500 truncate">{formattedDate}</p>
      </div>
    </div>
  );
}
