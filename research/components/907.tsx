import LucideReact from "lucide-react";
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
  const createdDate = new Date(value.created_at).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const author = value.author;
  const authorName = author?.name || author?.login || "Unknown";
  const placeholderAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    authorName,
  )}&background=0D8ABC&color=fff`;
  const avatarSrc = author?.avatar_url || placeholderAvatar;
  const reactionsTotal = value.reactions?.total_count ?? 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition max-w-md">
      {/* Header: Title, Pinned/Private Icons, Discussion Number */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-gray-800">{value.title}</h2>
          {value.pinned && (
            <LucideReact.Pin
              size={16}
              className="text-yellow-500"
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
        <span className="text-sm text-gray-500">#{value.number}</span>
      </div>

      {/* Body snippet */}
      <p className="mt-2 text-gray-700 text-sm line-clamp-2">{value.body}</p>

      {/* Footer: Author, Date, Comments & Reactions */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <img
            src={avatarSrc}
            alt={`${authorName} avatar`}
            className="w-6 h-6 rounded-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = placeholderAvatar;
            }}
          />
          <span>{authorName}</span>
          <LucideReact.Calendar
            size={16}
            className="text-gray-400"
            aria-label="Created date"
          />
          <span>{createdDate}</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <LucideReact.MessageSquare
              size={16}
              className="text-gray-400"
              aria-label="Comments"
            />
            <span>{value.comments_count}</span>
          </div>
          {value.reactions && (
            <div className="flex items-center space-x-1">
              <LucideReact.ThumbsUp
                size={16}
                className="text-gray-400"
                aria-label="Total reactions"
              />
              <span>{reactionsTotal}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
