import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * A reply to a discussion within a team.
     *
     * @title Team Discussion Comment
    */
    export type team_discussion_comment = {
        author: AutoViewInputSubTypes.nullable_simple_user;
        /**
         * The main text of the comment.
        */
        body: string;
        body_html: string;
        /**
         * The current version of the body content. If provided, this update operation will be rejected if the given version does not match the latest version on the server.
        */
        body_version: string;
        created_at: string & tags.Format<"date-time">;
        last_edited_at: (string & tags.Format<"date-time">) | null;
        discussion_url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        node_id: string;
        /**
         * The unique sequence number of a team discussion comment.
        */
        number: number & tags.Type<"int32">;
        updated_at: string & tags.Format<"date-time">;
        url: string & tags.Format<"uri">;
        reactions?: AutoViewInputSubTypes.reaction_rollup;
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
    /**
     * @title Reaction Rollup
    */
    export type reaction_rollup = {
        url: string & tags.Format<"uri">;
        total_count: number & tags.Type<"int32">;
        "+1": number & tags.Type<"int32">;
        "-1": number & tags.Type<"int32">;
        laugh: number & tags.Type<"int32">;
        confused: number & tags.Type<"int32">;
        heart: number & tags.Type<"int32">;
        hooray: number & tags.Type<"int32">;
        eyes: number & tags.Type<"int32">;
        rocket: number & tags.Type<"int32">;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.team_discussion_comment;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const author = value.author;
  const displayName = author ? (author.name ?? author.login) : "Unknown";
  const avatarUrl = author?.avatar_url;
  const commentNumber = `#${value.number}`;
  const formattedCreatedAt = new Date(value.created_at).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const isEdited = value.last_edited_at !== null;
  const formattedEditedAt = isEdited
    ? new Date(value.last_edited_at!).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
    : "";

  // Prepare reaction summary
  const reactionMap: Record<string, string> = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    confused: "😕",
    heart: "❤️",
    hooray: "🎉",
    eyes: "👀",
    rocket: "🚀",
  };
  const reactionList: { emoji: string; count: number }[] = value.reactions
    ? (Object.entries(value.reactions) as [string, number][])
        .filter(
          ([key, count]) =>
            reactionMap[key] !== undefined && count > 0
        )
        .map(([key, count]) => ({
          emoji: reactionMap[key],
          count,
        }))
    : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex items-start space-x-4">
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt={`${displayName} avatar`}
            className="w-10 h-10 rounded-full flex-shrink-0"
          />
        )}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline space-x-2">
              <span className="text-gray-500">{commentNumber}</span>
              <span className="text-sm font-medium text-gray-900">
                {displayName}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              {formattedCreatedAt}
            </span>
          </div>
          {isEdited && (
            <p className="mt-0.5 text-xs italic text-gray-400">
              Edited {formattedEditedAt}
            </p>
          )}
          <div
            className="mt-2 text-gray-800 whitespace-pre-wrap break-words line-clamp-3"
            dangerouslySetInnerHTML={{ __html: value.body_html }}
          />
          {reactionList.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {reactionList.map((r, idx) => (
                <div
                  key={idx}
                  className="flex items-center bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm"
                >
                  <span className="mr-1">{r.emoji}</span>
                  <span>{r.count.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
