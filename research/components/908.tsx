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
  const createdDate = new Date(value.created_at).toLocaleDateString("default", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const updatedDate =
    value.updated_at !== null
      ? new Date(value.updated_at).toLocaleDateString("default", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : null;
  const authorName = value.author?.login ?? "Unknown";
  const avatarUrl = value.author?.avatar_url;
  const discussionNumber = `#${value.number}`;
  const bodyExcerpt =
    value.body.length > 200
      ? value.body.slice(0, 200).trim() + "..."
      : value.body;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{value.title}</h2>
        <div className="flex space-x-1">
          {value.pinned && (
            <span className="px-2 py-0.5 text-xs font-medium text-blue-800 bg-blue-100 rounded">
              Pinned
            </span>
          )}
          {value.private && (
            <span className="px-2 py-0.5 text-xs font-medium text-red-800 bg-red-100 rounded">
              Private
            </span>
          )}
        </div>
      </div>

      {/* Meta Info */}
      <div className="mt-2 flex items-center text-sm text-gray-500">
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt={authorName}
            className="w-6 h-6 rounded-full mr-2 flex-shrink-0"
          />
        )}
        <span className="truncate">{authorName}</span>
        <span className="mx-2">·</span>
        <span>{discussionNumber}</span>
        <span className="mx-2">·</span>
        <span>Created {createdDate}</span>
        {updatedDate && (
          <>
            <span className="mx-2">·</span>
            <span>Updated {updatedDate}</span>
          </>
        )}
      </div>

      {/* Body Excerpt */}
      <p className="mt-3 text-gray-700 text-sm line-clamp-3">
        {bodyExcerpt}
      </p>

      {/* Footer: Comments & Reactions */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <span>{value.comments_count} Comments</span>
        {value.reactions && (
          <div className="flex items-center space-x-2">
            <span>👍 {value.reactions["+1"]}</span>
            <span>👎 {value.reactions["-1"]}</span>
            <span>❤ {value.reactions.heart}</span>
            <span>🎉 {value.reactions.hooray}</span>
            <span>😄 {value.reactions.laugh}</span>
            <span>😕 {value.reactions.confused}</span>
            <span>🚀 {value.reactions.rocket}</span>
            <span>👀 {value.reactions.eyes}</span>
          </div>
        )}
      </div>
    </div>
  );
}
