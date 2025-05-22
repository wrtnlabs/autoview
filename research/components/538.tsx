import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
    private: boolean;
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
  const createdAt = new Date(value.created_at);
  const formattedDate = createdAt.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const editedDate = value.last_edited_at
    ? new Date(value.last_edited_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  const authorName =
    value.author?.name?.trim() || value.author?.login || "Unknown";
  const avatarUrl =
    value.author?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header: author info & flags */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={avatarUrl}
            alt={`${authorName} avatar`}
            className="w-8 h-8 rounded-full object-cover bg-gray-100"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                authorName,
              )}&background=0D8ABC&color=fff`;
            }}
          />
          <div className="text-sm">
            <p className="font-medium text-gray-900">{authorName}</p>
            <p className="text-gray-500">
              {formattedDate}
              {editedDate && (
                <span className="ml-1">· Edited {editedDate}</span>
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-gray-500">
          {value.pinned && (
            <LucideReact.Pin
              size={16}
              className="text-gray-500"
              aria-label="Pinned"
            />
          )}
          {value.private && (
            <LucideReact.Lock
              size={16}
              className="text-gray-500"
              aria-label="Private"
            />
          )}
        </div>
      </div>

      {/* Title */}
      <h2 className="mt-3 text-lg font-semibold text-gray-800">
        {value.title}
      </h2>

      {/* Body preview */}
      <p className="mt-2 text-gray-700 text-sm line-clamp-3">{value.body}</p>

      {/* Footer: comments, reactions, discussion number */}
      <div className="mt-4 flex items-center justify-between text-gray-500 text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <LucideReact.MessageCircle size={16} />
            <span>{value.comments_count}</span>
          </div>
          {value.reactions && value.reactions.total_count > 0 && (
            <div className="flex items-center space-x-1">
              <LucideReact.ThumbsUp size={16} />
              <span>{value.reactions.total_count}</span>
            </div>
          )}
        </div>
        <span className="text-gray-400">#{value.number}</span>
      </div>
    </div>
  );
}
