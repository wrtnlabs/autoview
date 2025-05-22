import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * A team discussion is a persistent record of a free-form conversation within a team.
     *
     * @title Team Discussion
    */
    export type team_discussion = {
        author: AutoViewInputSubTypes.nullable_simple_user;
        /**
         * The main text of the discussion.
        */
        body: string;
        body_html: string;
        /**
         * The current version of the body content. If provided, this update operation will be rejected if the given version does not match the latest version on the server.
        */
        body_version: string;
        comments_count: number & tags.Type<"int32">;
        comments_url: string & tags.Format<"uri">;
        created_at: string & tags.Format<"date-time">;
        last_edited_at: (string & tags.Format<"date-time">) | null;
        html_url: string & tags.Format<"uri">;
        node_id: string;
        /**
         * The unique sequence number of a team discussion.
        */
        number: number & tags.Type<"int32">;
        /**
         * Whether or not this discussion should be pinned for easy retrieval.
        */
        pinned: boolean;
        /**
         * Whether or not this discussion should be restricted to team members and organization owners.
        */
        "private": boolean;
        team_url: string & tags.Format<"uri">;
        /**
         * The title of the discussion.
        */
        title: string;
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
export type AutoViewInput = AutoViewInputSubTypes.team_discussion;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const author = value.author;
  const authorName = author ? (author.name ?? author.login) : "Unknown";
  const avatarUrl = author?.avatar_url;
  const formattedCreatedAt = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const formattedEditedAt = value.last_edited_at
    ? `Edited ${new Date(value.last_edited_at).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })}`
    : null;
  const truncatedBody =
    value.body.length > 200 ? value.body.slice(0, 200).trimEnd() + "…" : value.body;

  const reactionEmojis: Record<string, string> = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    confused: "😕",
    heart: "❤️",
    hooray: "🎉",
    eyes: "👀",
    rocket: "🚀",
  } as const;
  const reactionKeys = [
    "+1",
    "-1",
    "laugh",
    "confused",
    "heart",
    "hooray",
    "eyes",
    "rocket",
  ] as const;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col space-y-3">
      {/* Header: avatar, author name, creation date, badges */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt={authorName}
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">
              {authorName}
            </span>
            <span className="text-xs text-gray-500">{formattedCreatedAt}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {value.pinned && (
            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
              Pinned
            </span>
          )}
          {value.private && (
            <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full">
              Private
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900 truncate">
        {value.title}
      </h2>

      {/* Body preview */}
      <p className="text-gray-700 text-sm overflow-hidden line-clamp-3">
        {truncatedBody}
      </p>

      {/* Footer: comments, reactions, edited timestamp */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <span>💬</span>
            <span>{value.comments_count}</span>
          </div>
          {value.reactions && (
            <div className="flex items-center space-x-3">
              {reactionKeys.map((key) => {
                const count = (value.reactions as any)[key] as number;
                return count > 0 ? (
                  <div
                    key={key}
                    className="flex items-center space-x-1 text-sm text-gray-500"
                  >
                    <span>{reactionEmojis[key]}</span>
                    <span>{count}</span>
                  </div>
                ) : null;
              })}
            </div>
          )}
        </div>
        {formattedEditedAt && (
          <span className="text-xs text-gray-400">{formattedEditedAt}</span>
        )}
      </div>
    </div>
  );
}
