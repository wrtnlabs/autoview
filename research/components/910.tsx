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
  // 1. Data aggregation and formatting
  const comments = value;
  const commentCount = comments.length;
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="flex items-center text-lg font-semibold mb-4 text-gray-800">
        <LucideReact.MessageSquare className="mr-2 text-gray-600" size={20} />
        {commentCount} Comment{commentCount !== 1 ? "s" : ""}
      </h2>
      {comments.map((comment) => {
        // Derive author display name and avatar
        const author = comment.author;
        const authorName = author?.name ?? author?.login ?? "Unknown Author";
        const avatarSrc =
          author?.avatar_url ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}`;

        // Fallback to initials avatar on image error
        const handleImageError = (
          e: React.SyntheticEvent<HTMLImageElement>,
        ) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            authorName,
          )}&background=ccc&color=fff`;
        };

        return (
          <div key={comment.node_id} className="flex space-x-4 mb-6 last:mb-0">
            <div className="flex-shrink-0">
              <img
                src={avatarSrc}
                alt={authorName}
                onError={handleImageError}
                className="w-10 h-10 rounded-full object-cover bg-gray-100"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center text-sm text-gray-500">
                <span className="font-medium text-gray-800">{authorName}</span>
                <LucideReact.Calendar
                  className="ml-3 mr-1 text-gray-400"
                  size={14}
                />
                <time dateTime={comment.created_at}>
                  {formatDate(comment.created_at)}
                </time>
              </div>
              <div
                className="prose prose-sm mt-2 text-gray-700"
                dangerouslySetInnerHTML={{ __html: comment.body_html }}
              />
              {comment.reactions && (
                <div className="flex items-center text-sm text-gray-500 mt-3">
                  <LucideReact.ThumbsUp
                    className="mr-1 text-gray-400"
                    size={16}
                  />
                  <span>{comment.reactions.total_count}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
