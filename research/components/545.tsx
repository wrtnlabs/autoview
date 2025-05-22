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
  //    Map reaction content to emoji and human-readable label.
  const contentMap: Record<AutoViewInput["content"], { emoji: string; label: string }> = {
    "+1": { emoji: "👍", label: "Thumbs Up" },
    "-1": { emoji: "👎", label: "Thumbs Down" },
    laugh: { emoji: "😄", label: "Laugh" },
    confused: { emoji: "😕", label: "Confused" },
    heart: { emoji: "❤️", label: "Heart" },
    hooray: { emoji: "🎉", label: "Hooray" },
    rocket: { emoji: "🚀", label: "Rocket" },
    eyes: { emoji: "👀", label: "Eyes" },
  };
  const { emoji, label } = contentMap[value.content];

  // Format the creation timestamp into a readable string.
  const createdDate = new Date(value.created_at);
  const formattedDate =
    createdDate.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }) +
    " at " +
    createdDate.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });

  // Extract user info, handling possible null.
  const user = value.user;
  const login = user?.login ?? "Unknown";
  const displayName = user?.name ?? null;
  const avatarUrl = user?.avatar_url;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full mx-auto p-4 bg-white rounded-lg shadow flex items-start space-x-4">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={`${login} avatar`}
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500 font-semibold">
            {login.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
      <div className="flex-1">
        <div className="flex items-center space-x-2 text-gray-800">
          <span className="text-xl">{emoji}</span>
          <span className="font-medium">{label}</span>
        </div>
        <div className="mt-1 text-sm text-gray-500 flex flex-wrap">
          <span>
            {displayName ? `${displayName} (` : ""}
            {login}
            {displayName ? ")" : ""} reacted
          </span>
          <span className="mx-1">•</span>
          <time dateTime={value.created_at}>{formattedDate}</time>
        </div>
      </div>
    </div>
  );
}
