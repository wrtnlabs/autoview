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
  const author = value.author;
  const displayName = author ? author.name?.trim() || author.login : "Unknown";
  const createdDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const createdTime = new Date(value.created_at).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
  const createdAtFormatted = `${createdDate} at ${createdTime}`;
  const editedAtFormatted = value.last_edited_at
    ? new Date(value.last_edited_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;
  const bodySnippet =
    value.body.length > 200 ? value.body.slice(0, 200) + "…" : value.body;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header with title, number, pinned/private indicators */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <span className="text-gray-500">#{value.number}</span>
          {value.title}
          {value.pinned && (
            <LucideReact.Pin
              size={16}
              className="text-yellow-500"
              aria-label="Pinned"
            />
          )}
          {value["private"] && (
            <LucideReact.Lock
              size={16}
              className="text-gray-500"
              aria-label="Private"
            />
          )}
        </h2>
      </div>

      {/* Body snippet, truncated if too long */}
      <p
        className="text-gray-700 text-sm line-clamp-3 break-words"
        title={value.body}
      >
        {bodySnippet}
      </p>

      {/* Footer with metadata */}
      <div className="flex flex-wrap items-center text-gray-500 text-sm gap-4">
        {/* Author info */}
        <div className="flex items-center gap-1">
          {author?.avatar_url ? (
            <img
              src={author.avatar_url}
              alt={displayName}
              className="w-6 h-6 rounded-full object-cover"
              onError={(e) => {
                const img = e.currentTarget;
                img.onerror = null;
                img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  displayName,
                )}&background=0D8ABC&color=fff`;
              }}
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
          <span>{displayName}</span>
        </div>

        {/* Creation timestamp */}
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} />
          <span>{createdAtFormatted}</span>
        </div>

        {/* Last edited timestamp */}
        {editedAtFormatted && (
          <div className="flex items-center gap-1">
            <LucideReact.Edit3 size={16} />
            <span>Edited on {editedAtFormatted}</span>
          </div>
        )}

        {/* Comments count */}
        <div className="flex items-center gap-1">
          <LucideReact.MessageCircle size={16} />
          <span>{value.comments_count} comments</span>
        </div>

        {/* Reactions summary */}
        {value.reactions && (
          <div className="flex items-center gap-1">
            <LucideReact.Heart size={16} />
            <span>{value.reactions.total_count} reactions</span>
          </div>
        )}
      </div>
    </div>
  );
}
