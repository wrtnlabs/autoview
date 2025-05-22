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
  const authorName =
    value.author?.name || value.author?.login || "Unknown user";
  const fallbackAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    authorName,
  )}&background=0D8ABC&color=fff`;
  const avatarUrl = value.author?.avatar_url || fallbackAvatarUrl;
  const createdAt = new Date(value.created_at).toLocaleString();
  const lastEditedAt = value.last_edited_at
    ? new Date(value.last_edited_at).toLocaleString()
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-full">
      {/* Header: Title and Status Badges */}
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.title}
        </h2>
        <div className="flex space-x-2">
          {value.pinned && (
            <span className="flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
              <LucideReact.Pin size={12} className="mr-1" />
              Pinned
            </span>
          )}
          {value.private ? (
            <span className="flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
              <LucideReact.Lock size={12} className="mr-1" />
              Private
            </span>
          ) : (
            <span className="flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
              <LucideReact.Globe size={12} className="mr-1" />
              Public
            </span>
          )}
        </div>
      </div>

      {/* Meta: Author and Dates */}
      <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500 space-x-2">
        <img
          src={avatarUrl}
          alt={authorName}
          className="h-6 w-6 rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackAvatarUrl;
          }}
        />
        <span className="truncate">{authorName}</span>
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} />
          <time dateTime={value.created_at}>{createdAt}</time>
        </div>
        {lastEditedAt && (
          <div className="flex items-center space-x-1">
            <span>· Edited</span>
            <time dateTime={value.last_edited_at!}>{lastEditedAt}</time>
          </div>
        )}
      </div>

      {/* Body: Truncated HTML Content */}
      <div
        className="mt-4 prose prose-sm max-w-none line-clamp-3 text-gray-700"
        dangerouslySetInnerHTML={{ __html: value.body_html }}
      />

      {/* Footer: Comments & Reactions */}
      <div className="mt-4 flex flex-wrap items-center space-x-6 text-gray-500 text-sm">
        <div className="flex items-center space-x-1">
          <LucideReact.MessageCircle size={16} />
          <span>
            {value.comments_count} comment
            {value.comments_count !== 1 ? "s" : ""}
          </span>
        </div>
        {value.reactions && (
          <div className="flex items-center space-x-1">
            <LucideReact.ThumbsUp size={16} />
            <span>
              {value.reactions.total_count} reaction
              {value.reactions.total_count !== 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
