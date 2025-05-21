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
export type AutoViewInput = AutoViewInputSubTypes.reaction[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const emojiMap = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    confused: "😕",
    heart: "❤️",
    hooray: "🎉",
    rocket: "🚀",
    eyes: "👀",
  } as const;

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto">
      {value.length === 0 ? (
        <p className="text-center text-gray-500 italic">No reactions to display.</p>
      ) : (
        <ul role="list">
          {value.map((reaction) => {
            const { id, content, created_at, user } = reaction;
            const userName = user?.name ?? user?.login ?? "Unknown User";
            return (
              <li
                key={id}
                className="flex items-center space-x-4 py-2 border-b last:border-b-0"
              >
                {user?.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={userName}
                    className="w-10 h-10 rounded-full flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 flex-shrink-0">
                    ?
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {userName}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {emojiMap[content]} {content}
                  </p>
                </div>
                <div className="text-xs text-gray-400 whitespace-nowrap">
                  {formatDate(created_at)}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
