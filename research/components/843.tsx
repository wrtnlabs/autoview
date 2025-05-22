import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Legacy Review Comment
   *
   * @title Legacy Review Comment
   */
  export type review_comment = {
    url: string & tags.Format<"uri">;
    pull_request_review_id: (number & tags.Type<"int32">) | null;
    id: number & tags.Type<"int32">;
    node_id: string;
    diff_hunk: string;
    path: string;
    position: (number & tags.Type<"int32">) | null;
    original_position: number & tags.Type<"int32">;
    commit_id: string;
    original_commit_id: string;
    in_reply_to_id?: number & tags.Type<"int32">;
    user: AutoViewInputSubTypes.nullable_simple_user;
    body: string;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
    html_url: string & tags.Format<"uri">;
    pull_request_url: string & tags.Format<"uri">;
    author_association: AutoViewInputSubTypes.author_association;
    _links: {
      self: AutoViewInputSubTypes.link;
      html: AutoViewInputSubTypes.link;
      pull_request: AutoViewInputSubTypes.link;
    };
    body_text?: string;
    body_html?: string;
    reactions?: AutoViewInputSubTypes.reaction_rollup;
    /**
     * The side of the first line of the range for a multi-line comment.
     */
    side?: "LEFT" | "RIGHT";
    /**
     * The side of the first line of the range for a multi-line comment.
     */
    start_side?: "LEFT" | "RIGHT" | null;
    /**
     * The line of the blob to which the comment applies. The last line of the range for a multi-line comment
     */
    line?: number & tags.Type<"int32">;
    /**
     * The original line of the blob to which the comment applies. The last line of the range for a multi-line comment
     */
    original_line?: number & tags.Type<"int32">;
    /**
     * The first line of the range for a multi-line comment.
     */
    start_line?: (number & tags.Type<"int32">) | null;
    /**
     * The original first line of the range for a multi-line comment.
     */
    original_start_line?: (number & tags.Type<"int32">) | null;
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
   * How the author is associated with the repository.
   *
   * @title author_association
   */
  export type author_association =
    | "COLLABORATOR"
    | "CONTRIBUTOR"
    | "FIRST_TIMER"
    | "FIRST_TIME_CONTRIBUTOR"
    | "MANNEQUIN"
    | "MEMBER"
    | "NONE"
    | "OWNER";
  /**
   * Hypermedia Link
   *
   * @title Link
   */
  export type link = {
    href: string;
  };
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
export type AutoViewInput = AutoViewInputSubTypes.review_comment[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const comments = value;
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  const placeholderAvatar =
    "https://ui-avatars.com/api/?name=Anonymous&background=ccc&color=fff";

  // Empty state
  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-500 p-6">
        <LucideReact.AlertCircle size={48} className="text-gray-400" />
        <span className="mt-2 text-lg">No comments available</span>
      </div>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {comments.map((comment) => {
        const user = comment.user;
        const displayName = user ? (user.name ?? user.login) : "Anonymous";
        const avatarUrl = user ? user.avatar_url : placeholderAvatar;
        const onAvatarError = (
          e: React.SyntheticEvent<HTMLImageElement, Event>,
        ) => {
          e.currentTarget.src = placeholderAvatar;
        };
        const date = formatDate(comment.created_at);

        return (
          <div
            key={comment.id}
            className="bg-white p-4 rounded-lg shadow flex flex-col"
          >
            <div className="flex items-center">
              {user ? (
                <img
                  src={avatarUrl}
                  onError={onAvatarError}
                  alt={displayName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <LucideReact.User size={40} className="text-gray-400" />
              )}
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">
                    {displayName}
                  </span>
                  <span className="text-sm text-gray-500">{date}</span>
                </div>
                {comment.author_association && (
                  <span className="mt-1 inline-block bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded">
                    {comment.author_association.replace(/_/g, " ")}
                  </span>
                )}
              </div>
            </div>

            <p className="mt-3 text-gray-800 line-clamp-3 break-words">
              {comment.body}
            </p>

            <div className="mt-3 flex flex-wrap items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <LucideReact.FileText size={16} className="text-gray-400" />
                <span className="truncate">{comment.path}</span>
                {comment.line != null && (
                  <>
                    <LucideReact.Hash
                      size={16}
                      className="ml-2 text-gray-400"
                    />
                    <span>{comment.line}</span>
                  </>
                )}
              </div>
              {comment.reactions && (
                <div className="flex items-center space-x-1">
                  <LucideReact.Star size={16} className="text-yellow-400" />
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
