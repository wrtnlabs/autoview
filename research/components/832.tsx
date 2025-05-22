import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Pull Request Review Comments are comments on a portion of the Pull Request's diff.
   *
   * @title Pull Request Review Comment
   */
  export type pull_request_review_comment = {
    /**
     * URL for the pull request review comment
     */
    url: string;
    /**
     * The ID of the pull request review to which the comment belongs.
     */
    pull_request_review_id: (number & tags.Type<"int32">) | null;
    /**
     * The ID of the pull request review comment.
     */
    id: number & tags.Type<"int32">;
    /**
     * The node ID of the pull request review comment.
     */
    node_id: string;
    /**
     * The diff of the line that the comment refers to.
     */
    diff_hunk: string;
    /**
     * The relative path of the file to which the comment applies.
     */
    path: string;
    /**
     * The line index in the diff to which the comment applies. This field is closing down; use `line` instead.
     */
    position?: number & tags.Type<"int32">;
    /**
     * The index of the original line in the diff to which the comment applies. This field is closing down; use `original_line` instead.
     */
    original_position?: number & tags.Type<"int32">;
    /**
     * The SHA of the commit to which the comment applies.
     */
    commit_id: string;
    /**
     * The SHA of the original commit to which the comment applies.
     */
    original_commit_id: string;
    /**
     * The comment ID to reply to.
     */
    in_reply_to_id?: number & tags.Type<"int32">;
    user: AutoViewInputSubTypes.simple_user;
    /**
     * The text of the comment.
     */
    body: string;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
    /**
     * HTML URL for the pull request review comment.
     */
    html_url: string;
    /**
     * URL for the pull request that the review comment belongs to.
     */
    pull_request_url: string;
    author_association: AutoViewInputSubTypes.author_association;
    _links: {
      self: {
        href: string & tags.Format<"uri">;
      };
      html: {
        href: string & tags.Format<"uri">;
      };
      pull_request: {
        href: string & tags.Format<"uri">;
      };
    };
    /**
     * The first line of the range for a multi-line comment.
     */
    start_line?: (number & tags.Type<"int32">) | null;
    /**
     * The first line of the range for a multi-line comment.
     */
    original_start_line?: (number & tags.Type<"int32">) | null;
    /**
     * The side of the first line of the range for a multi-line comment.
     */
    start_side?: "LEFT" | "RIGHT" | null;
    /**
     * The line of the blob to which the comment applies. The last line of the range for a multi-line comment
     */
    line?: number & tags.Type<"int32">;
    /**
     * The line of the blob to which the comment applies. The last line of the range for a multi-line comment
     */
    original_line?: number & tags.Type<"int32">;
    /**
     * The side of the diff to which the comment applies. The side of the last line of the range for a multi-line comment
     */
    side?: "LEFT" | "RIGHT";
    /**
     * The level at which the comment is targeted, can be a diff line or a file.
     */
    subject_type?: "line" | "file";
    reactions?: AutoViewInputSubTypes.reaction_rollup;
    body_html?: string;
    body_text?: string;
  };
  /**
   * A GitHub user.
   *
   * @title Simple User
   */
  export type simple_user = {
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
  };
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
export type AutoViewInput = AutoViewInputSubTypes.pull_request_review_comment[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  const getAvatarPlaceholder = (
    comment: AutoViewInputSubTypes.pull_request_review_comment,
  ): string => {
    const name = comment.user.name ?? comment.user.login;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {value.map((comment) => {
        const reactions = comment.reactions;
        return (
          <div
            key={comment.id}
            className="flex flex-col md:flex-row bg-white p-4 rounded-lg shadow-sm space-y-3 md:space-y-0 md:space-x-4"
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                src={comment.user.avatar_url}
                alt={comment.user.login}
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  img.onerror = null;
                  img.src = getAvatarPlaceholder(comment);
                }}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            {/* Content */}
            <div className="flex-1 flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-800">
                    {comment.user.login}
                  </span>
                  <span className="uppercase text-[10px] font-semibold text-gray-500 bg-gray-100 px-1 rounded">
                    {comment.author_association.replace(/_/g, " ")}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {formatDate(comment.created_at)}
                </span>
              </div>
              {/* File & Location */}
              <div className="flex items-center text-sm text-gray-600 mt-1 space-x-1">
                <LucideReact.FileText size={16} className="text-gray-400" />
                <span className="truncate">
                  {comment.path}
                  {comment.line !== undefined ? `#${comment.line}` : ""}
                </span>
              </div>
              {/* Body */}
              <p className="text-gray-700 text-sm mt-2 line-clamp-3 whitespace-pre-wrap">
                {comment.body_text ?? comment.body}
              </p>
              {/* Reactions */}
              {reactions && (
                <div className="flex flex-wrap items-center space-x-3 mt-3 text-gray-500 text-sm">
                  {reactions["+1"] > 0 && (
                    <div className="flex items-center space-x-1">
                      <LucideReact.ThumbsUp size={16} />
                      <span>{reactions["+1"]}</span>
                    </div>
                  )}
                  {reactions["-1"] > 0 && (
                    <div className="flex items-center space-x-1">
                      <LucideReact.ThumbsDown size={16} />
                      <span>{reactions["-1"]}</span>
                    </div>
                  )}
                  {reactions.heart > 0 && (
                    <div className="flex items-center space-x-1">
                      <LucideReact.Heart size={16} />
                      <span>{reactions.heart}</span>
                    </div>
                  )}
                  {reactions.laugh > 0 && (
                    <div className="flex items-center space-x-1">
                      <LucideReact.Smile size={16} />
                      <span>{reactions.laugh}</span>
                    </div>
                  )}
                  {reactions.hooray > 0 && (
                    <div className="flex items-center space-x-1">
                      <LucideReact.ChevronUp size={16} />
                      <span>{reactions.hooray}</span>
                    </div>
                  )}
                  {reactions.confused > 0 && (
                    <div className="flex items-center space-x-1">
                      <LucideReact.HelpCircle size={16} />
                      <span>{reactions.confused}</span>
                    </div>
                  )}
                  {reactions.rocket > 0 && (
                    <div className="flex items-center space-x-1">
                      <LucideReact.Rocket size={16} />
                      <span>{reactions.rocket}</span>
                    </div>
                  )}
                  {reactions.eyes > 0 && (
                    <div className="flex items-center space-x-1">
                      <LucideReact.Eye size={16} />
                      <span>{reactions.eyes}</span>
                    </div>
                  )}
                </div>
              )}
              {/* URL */}
              <div className="flex items-center text-xs text-gray-400 mt-2 space-x-1">
                <LucideReact.Link size={12} />
                <span className="truncate">{comment.html_url}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
