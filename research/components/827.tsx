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
  const createdAt = new Date(value.created_at);
  const formattedDate = createdAt.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const commentText = value.body_text ?? value.body;
  const lineNumber =
    value.line ??
    value.position ??
    value.original_line ??
    value.original_position;
  const fileInfo = lineNumber
    ? `${value.path}:${lineNumber}`
    : value.path;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center mb-3">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={value.user.avatar_url}
          alt={`${value.user.login} avatar`}
        />
        <div className="ml-3 flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {value.user.login}
            {value.user.name ? ` (${value.user.name})` : ""}
          </p>
          <p className="text-xs text-gray-500">{formattedDate}</p>
        </div>
        {value.author_association && (
          <span className="ml-2 text-xs font-medium text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
            {value.author_association}
          </span>
        )}
      </div>
      <div className="mb-2 text-xs text-gray-500 truncate">{fileInfo}</div>
      <div className="mb-3 text-gray-800 text-sm whitespace-pre-wrap line-clamp-3">
        {commentText}
      </div>
      {value.reactions && value.reactions.total_count > 0 && (
        <div className="flex flex-wrap gap-2 text-xs text-gray-600">
          <span className="inline-flex items-center">
            👍 <span className="ml-1">{value.reactions["+1"]}</span>
          </span>
          <span className="inline-flex items-center">
            👎 <span className="ml-1">{value.reactions["-1"]}</span>
          </span>
          <span className="inline-flex items-center">
            😂 <span className="ml-1">{value.reactions.laugh}</span>
          </span>
          <span className="inline-flex items-center">
            😕 <span className="ml-1">{value.reactions.confused}</span>
          </span>
          <span className="inline-flex items-center">
            ❤️ <span className="ml-1">{value.reactions.heart}</span>
          </span>
          <span className="inline-flex items-center">
            🎉 <span className="ml-1">{value.reactions.hooray}</span>
          </span>
          <span className="inline-flex items-center">
            👀 <span className="ml-1">{value.reactions.eyes}</span>
          </span>
          <span className="inline-flex items-center">
            🚀 <span className="ml-1">{value.reactions.rocket}</span>
          </span>
        </div>
      )}
    </div>
  );
}
