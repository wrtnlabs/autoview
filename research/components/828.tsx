import { tags } from "typia";
import React from "react";
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
    export type author_association = "COLLABORATOR" | "CONTRIBUTOR" | "FIRST_TIMER" | "FIRST_TIME_CONTRIBUTOR" | "MANNEQUIN" | "MEMBER" | "NONE" | "OWNER";
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
export type AutoViewInput = AutoViewInputSubTypes.pull_request_review_comment;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
  const fileLocation = `${value.path}${typeof value.line === 'number' ? `:${value.line}` : ''}`;

  // Map author_association to human-readable form
  const authorAssociation = value.author_association
    .split('_')
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');

  // Prepare reactions
  const reactions = value.reactions;
  const reactionEmojiMap: Record<string, string> = {
    '+1': '👍',
    '-1': '👎',
    laugh: '😄',
    confused: '😕',
    heart: '❤️',
    hooray: '🎉',
    eyes: '👀',
    rocket: '🚀',
  };
  const reactionsArray = reactions
    ? (Object.entries(reactionEmojiMap) as [keyof typeof reactions, string][])
        .filter(([key]) => (reactions as any)[key] > 0)
        .map(([key, emoji]) => ({
          emoji,
          count: (reactions as any)[key] as number,
        }))
    : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-4 space-y-4">
      {/* Header: Avatar, username, association, date */}
      <div className="flex items-center space-x-3">
        <img
          src={value.user.avatar_url}
          alt={value.user.login}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-900">{value.user.login}</p>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span>{authorAssociation}</span>
            <span>·</span>
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

      {/* File path and line */}
      <div className="text-xs text-gray-500 truncate">{fileLocation}</div>

      {/* Comment body */}
      <div className="text-gray-800 text-sm line-clamp-3">{value.body}</div>

      {/* Reactions */}
      {reactionsArray.length > 0 && (
        <div className="flex flex-wrap items-center space-x-3 text-gray-600">
          {reactionsArray.map((r, i) => (
            <span key={i} className="flex items-center space-x-1 text-sm">
              <span>{r.emoji}</span>
              <span>{r.count}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
