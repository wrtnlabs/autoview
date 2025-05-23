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
  const user = value.user;
  const displayName = user?.name ?? user?.login ?? "Unknown User";
  const avatarUrl =
    user?.avatar_url ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      displayName
    )}&background=ccc&color=fff`;
  const formattedDate = new Date(value.created_at).toLocaleDateString(
    undefined,
    { year: "numeric", month: "short", day: "numeric" }
  );

  const getReactionIcon = (
    content: AutoViewInputSubTypes.reaction["content"]
  ): JSX.Element => {
    switch (content) {
      case "+1":
        return (
          <LucideReact.ThumbsUp
            size={20}
            className="text-blue-500"
            aria-label="Like"
          />
        );
      case "-1":
        return (
          <LucideReact.ThumbsDown
            size={20}
            className="text-red-500"
            aria-label="Dislike"
          />
        );
      case "laugh":
        return (
          <LucideReact.Smile
            size={20}
            className="text-yellow-500"
            aria-label="Laugh"
          />
        );
      case "confused":
        return (
          <LucideReact.HelpCircle
            size={20}
            className="text-amber-500"
            aria-label="Confused"
          />
        );
      case "heart":
        return (
          <LucideReact.Heart
            size={20}
            className="text-red-500"
            aria-label="Heart"
          />
        );
      case "hooray":
        return (
          <LucideReact.Trophy
            size={20}
            className="text-purple-500"
            aria-label="Hooray"
          />
        );
      case "rocket":
        return (
          <LucideReact.Rocket
            size={20}
            className="text-indigo-500"
            aria-label="Rocket"
          />
        );
      case "eyes":
        return (
          <LucideReact.Eye
            size={20}
            className="text-green-500"
            aria-label="Eyes"
          />
        );
      default:
        return (
          <LucideReact.HelpCircle
            size={20}
            className="text-gray-400"
            aria-label={content}
          />
        );
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
      <img
        src={avatarUrl}
        alt={displayName}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        onError={(e) => {
          const img = e.currentTarget as HTMLImageElement;
          img.onerror = null;
          img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            displayName
          )}&background=ccc&color=fff`;
        }}
      />
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex items-center space-x-2 truncate">
          <span className="text-sm font-medium text-gray-900 truncate">
            {displayName}
          </span>
          {user?.login && (
            <span className="text-xs text-gray-500 truncate">
              @{user.login}
            </span>
          )}
        </div>
        <div className="mt-1 flex items-center text-xs text-gray-500">
          <LucideReact.Calendar
            size={14}
            className="mr-1"
            aria-hidden="true"
          />
          <time dateTime={value.created_at}>{formattedDate}</time>
        </div>
      </div>
      <div className="ml-auto flex-shrink-0">
        {getReactionIcon(value.content)}
      </div>
    </div>
  );
}
