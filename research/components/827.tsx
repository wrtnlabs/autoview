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
  const { user, created_at, body_text, body, body_html, path, line, position, reactions } = value;

  // Derive the comment text: prefer body_text, then body, then strip HTML tags from body_html
  const displayBody = body_text
    ?? body
    ?? (body_html ? body_html.replace(/<[^>]+>/g, "") : "");

  // Format created_at into a human-friendly string
  const formattedDate = new Date(created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  // Determine the line number for the comment (use `line` if available, otherwise `position`)
  const commentLine = line ?? position;

  // Map reaction types to LucideReact icons
  const reactionIcons: Record<string, React.FC<any>> = {
    "+1": LucideReact.ThumbsUp,
    "-1": LucideReact.ThumbsDown,
    laugh: LucideReact.Smile,
    heart: LucideReact.Heart,
    rocket: LucideReact.Rocket,
    eyes: LucideReact.Eye,
  };

  // Build an array of rendered reaction items (filter out url and total_count)
  const reactionItems = reactions
    ? (Object.entries(reactions) as [string, number][])
        .filter(
          ([type, count]) =>
            type !== "url" && type !== "total_count" && count > 0
        )
        .map(([type, count]) => {
          const Icon = reactionIcons[type];
          return Icon ? (
            <div
              key={type}
              className="flex items-center text-sm text-gray-500 gap-0.5"
            >
              <Icon size={16} />
              <span>{count}</span>
            </div>
          ) : null;
        })
        .filter(Boolean)
    : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col space-y-4">
      {/* Header: Avatar, username, association, date, file/line info */}
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 flex-shrink-0">
          <img
            src={user.avatar_url}
            alt={`${user.login} avatar`}
            className="w-10 h-10 rounded-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.login
                )}&background=random`;
            }}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center flex-wrap space-x-2">
            <div className="flex items-center text-gray-900 font-medium space-x-1">
              <LucideReact.User size={16} />
              <span>{user.login}</span>
            </div>
            {value.author_association && (
              <span className="text-xs uppercase bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                {value.author_association.replace("_", " ")}
              </span>
            )}
            <div className="flex items-center text-sm text-gray-500 space-x-1">
              <LucideReact.Calendar size={16} />
              <span>{formattedDate}</span>
            </div>
          </div>
          {path && commentLine != null && (
            <div className="mt-1 flex items-center text-sm text-gray-500 space-x-1">
              <LucideReact.FileText size={16} />
              <span className="font-mono">
                {path}:{commentLine}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Body text (truncated to 4 lines on small screens) */}
      <div>
        <p className="text-gray-800 text-sm whitespace-pre-wrap line-clamp-4">
          {displayBody}
        </p>
      </div>

      {/* Reactions */}
      {reactionItems.length > 0 && (
        <div className="flex items-center space-x-4 pt-2 border-t border-gray-100">
          {reactionItems}
        </div>
      )}
    </div>
  );
}
