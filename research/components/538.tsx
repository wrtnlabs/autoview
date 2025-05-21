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
  const authorName = author ? author.login : "Unknown";
  const authorAvatar = author ? author.avatar_url : "";
  const createdDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const updatedDate =
    value.last_edited_at || value.updated_at
      ? new Date(value.last_edited_at ?? value.updated_at).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : null;
  const isEdited = !!value.last_edited_at;
  const commentCount = value.comments_count;
  const reactions = value.reactions;
  const reactionIcons: { [key: string]: string } = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    confused: "😕",
    heart: "❤️",
    hooray: "🎉",
    eyes: "👀",
    rocket: "🚀",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center space-x-3">
        {authorAvatar && (
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={authorAvatar}
            alt={authorName}
          />
        )}
        <h2 className="text-lg font-semibold text-gray-800">{value.title}</h2>
        {value.pinned && (
          <span className="ml-auto px-2 py-0.5 text-xs font-medium text-yellow-800 bg-yellow-100 rounded">
            Pinned
          </span>
        )}
        {value["private"] && (
          <span className="ml-2 px-2 py-0.5 text-xs font-medium text-red-800 bg-red-100 rounded">
            Private
          </span>
        )}
      </div>

      {/* Metadata */}
      <div className="mt-1 flex flex-wrap items-center text-xs text-gray-500 space-x-2">
        <span>#{value.number}</span>
        <span>By {authorName}</span>
        <span>on {createdDate}</span>
        {isEdited && <span>(Edited {updatedDate})</span>}
      </div>

      {/* Body Preview */}
      <p className="mt-3 text-gray-700 text-sm line-clamp-3">
        {value.body}
      </p>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between text-gray-500 text-xs">
        <span className="flex items-center space-x-1">
          <span>💬</span>
          <span>{commentCount} comment{commentCount !== 1 ? "s" : ""}</span>
        </span>
        {reactions && (
          <div className="flex items-center space-x-3">
            {Object.entries(reactionIcons).map(([key, icon]) => {
              const count = (reactions as any)[key] as number;
              return count > 0 ? (
                <span key={key} className="flex items-center space-x-1">
                  <span>{icon}</span>
                  <span>{count}</span>
                </span>
              ) : null;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
