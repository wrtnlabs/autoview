import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput = AutoViewInputSubTypes.team_discussion_comment[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-sm">No comments available</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {value.map((comment) => {
        const author = comment.author;
        const authorName = author?.name || author?.login || "Unknown";
        const avatarUrl =
          author?.avatar_url ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            authorName,
          )}&background=0D8ABC&color=fff`;
        const createdAt = formatDate(comment.created_at);
        const editedAt = comment.last_edited_at
          ? ` • edited ${formatDate(comment.last_edited_at)}`
          : "";

        return (
          <div
            key={comment.node_id}
            className="p-4 bg-white rounded-lg shadow-sm"
          >
            <div className="flex items-start">
              <img
                src={avatarUrl}
                alt={authorName}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      authorName,
                    )}&background=0D8ABC&color=fff`;
                }}
              />
              <div className="ml-4 flex-1">
                <div className="flex flex-wrap items-center space-x-2 text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">
                    {authorName}
                  </span>
                  <span className="text-gray-500">#{comment.number}</span>
                  <span>·</span>
                  <span className="flex items-center">
                    <LucideReact.Calendar
                      size={14}
                      className="mr-1 text-gray-400"
                    />
                    {createdAt}
                    {editedAt}
                  </span>
                </div>
                <div
                  className="mt-2 text-gray-700 text-sm prose prose-sm max-w-none line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: comment.body_html }}
                />
                {comment.reactions && (
                  <div className="mt-3 flex flex-wrap items-center text-gray-500 space-x-4 text-sm">
                    {comment.reactions["+1"] > 0 && (
                      <div className="flex items-center space-x-1">
                        <LucideReact.ThumbsUp size={16} />
                        <span>{comment.reactions["+1"]}</span>
                      </div>
                    )}
                    {comment.reactions["-1"] > 0 && (
                      <div className="flex items-center space-x-1">
                        <LucideReact.ThumbsDown size={16} />
                        <span>{comment.reactions["-1"]}</span>
                      </div>
                    )}
                    {comment.reactions.laugh > 0 && (
                      <div className="flex items-center space-x-1">
                        <LucideReact.Smile size={16} />
                        <span>{comment.reactions.laugh}</span>
                      </div>
                    )}
                    {comment.reactions.heart > 0 && (
                      <div className="flex items-center space-x-1">
                        <LucideReact.Heart size={16} />
                        <span>{comment.reactions.heart}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <LucideReact.User size={16} />
                      <span>{comment.reactions.total_count} total</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
