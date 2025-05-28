import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Pull Request Review Comments are comments on a portion of the Pull Request's diff.
     *
     * @title Pull Request Review Comment
    */
    export interface pull_request_review_comment {
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
    }
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export interface simple_user {
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
    }
    /**
     * How the author is associated with the repository.
     *
     * @title author_association
    */
    export type author_association = "COLLABORATOR" | "CONTRIBUTOR" | "FIRST_TIMER" | "FIRST_TIME_CONTRIBUTOR" | "MANNEQUIN" | "MEMBER" | "NONE" | "OWNER";
    /**
     * @title Reaction Rollup
    */
    export interface reaction_rollup {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.pull_request_review_comment;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const author = value.user;
  const avatarUrl = author.avatar_url;
  const displayName = author.name || author.login;
  const association =
    value.author_association.charAt(0) +
    value.author_association.slice(1).toLowerCase();
  const formattedDate = new Date(value.created_at).toLocaleString();
  const content = value.body_text || value.body;
  const fileLocation = value.path + (value.line !== undefined ? `:${value.line}` : '');

  const reactions = value.reactions;
  const reactionIconMap: Record<string, React.ComponentType<any>> = {
    "+1": LucideReact.ThumbsUp,
    "-1": LucideReact.ThumbsDown,
    laugh: LucideReact.Smile,
    heart: LucideReact.Heart,
    rocket: LucideReact.Rocket,
    eyes: LucideReact.Eye,
  };
  const activeReactions = reactions
    ? (Object.entries(reactions) as [string, number][])
        .filter(
          ([key, count]) =>
            key !== "url" &&
            key !== "total_count" &&
            typeof count === "number" &&
            count > 0
        )
    : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col space-y-4">
      {/* Header: Avatar, Name, Association, Date */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={avatarUrl}
            alt={displayName}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                displayName
              )}&background=888&color=fff`;
            }}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {displayName}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {association}
            </span>
          </div>
        </div>
        <div className="flex items-center text-gray-400 text-xs">
          <LucideReact.Calendar size={14} className="mr-1" />
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* File path and location */}
      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
        <LucideReact.FileText size={16} className="mr-1" />
        <span className="truncate">{fileLocation}</span>
      </div>

      {/* Comment content */}
      <p className="text-gray-800 dark:text-gray-200 text-sm line-clamp-3">
        {content}
      </p>

      {/* Reactions */}
      {reactions?.total_count! > 0 && (
        <div className="flex items-center space-x-4 text-gray-500 text-sm">
          {activeReactions.map(([type, count]) => {
            const Icon = reactionIconMap[type];
            if (!Icon) return null;
            return (
              <div key={type} className="flex items-center space-x-1">
                <Icon size={16} className="text-current" />
                <span>{count}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
