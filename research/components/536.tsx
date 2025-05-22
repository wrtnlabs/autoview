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
export type AutoViewInput = AutoViewInputSubTypes.team_discussion[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const discussions = value;
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!discussions || discussions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <span>No discussions available.</span>
      </div>
    );
  }

  // 3. Return the React element.
  return (
    <div className="space-y-4">
      {discussions.map((disc) => {
        const authorName = disc.author?.name ?? disc.author?.login ?? "Unknown";
        const avatarSrc =
          disc.author?.avatar_url ??
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            authorName,
          )}&background=0D8ABC&color=fff`;
        const commentCount = disc.comments_count;
        const reactionCount = disc.reactions?.total_count ?? 0;
        const isPinned = disc.pinned;
        const isPrivate = disc.private;

        return (
          <div
            key={disc.node_id}
            className="bg-white rounded-lg shadow border border-gray-200 p-4"
          >
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-semibold text-gray-800 flex-1 pr-2 truncate">
                {disc.title}
              </h2>
              <div className="flex items-center space-x-2">
                {isPinned && (
                  <LucideReact.Pin size={16} className="text-yellow-500" />
                )}
                {isPrivate && (
                  <LucideReact.Lock size={16} className="text-gray-500" />
                )}
              </div>
            </div>

            <div className="flex items-center mt-2 space-x-3 text-sm text-gray-500">
              <img
                src={avatarSrc}
                alt={authorName}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span>{authorName}</span>
              <div className="flex items-center space-x-1">
                <LucideReact.Calendar size={14} />
                <span>{formatDate(disc.created_at)}</span>
              </div>
              {disc.last_edited_at && (
                <div className="flex items-center space-x-1">
                  <LucideReact.Edit2 size={14} />
                  <span>Edited {formatDate(disc.last_edited_at)}</span>
                </div>
              )}
            </div>

            <p className="mt-2 text-gray-700 text-sm line-clamp-3">
              {disc.body}
            </p>

            <div className="mt-3 flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <LucideReact.MessageCircle size={16} />
                <span>{commentCount}</span>
              </div>
              <div className="flex items-center space-x-1">
                <LucideReact.ThumbsUp size={16} />
                <span>{reactionCount}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
