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
export type AutoViewInput = AutoViewInputSubTypes.pull_request_review_comment[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const reactionEmojis: Record<string, string> = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😆",
    confused: "😕",
    heart: "❤️",
    hooray: "🎉",
    eyes: "👀",
    rocket: "🚀",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="space-y-4">
      {value.length === 0 ? (
        <div className="text-gray-500 text-center py-4">No comments to display.</div>
      ) : (
        value.map((comment) => {
          const date = new Date(comment.created_at).toLocaleString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
          });
          const lineNumber = comment.line ?? comment.position ?? null;
          const location = lineNumber
            ? `${comment.path}:${lineNumber}`
            : comment.path;
          return (
            <article
              key={comment.id}
              className="p-4 bg-white rounded-lg shadow flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4"
            >
              <img
                src={comment.user.avatar_url}
                alt={comment.user.login}
                className="w-12 h-12 rounded-full flex-shrink-0"
              />
              <div className="flex-1">
                <header className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {comment.user.login}
                  </h3>
                  <time
                    dateTime={comment.created_at}
                    className="text-sm text-gray-500 whitespace-nowrap"
                  >
                    {date}
                  </time>
                </header>
                <div className="text-sm text-gray-600 mt-1 truncate">
                  {location}
                </div>
                <p className="text-gray-700 mt-2 line-clamp-3">
                  {comment.body}
                </p>
                {comment.reactions && (
                  <footer className="flex flex-wrap items-center mt-3 space-x-3 text-sm text-gray-500">
                    {Object.entries(reactionEmojis).map(([key, emoji]) => {
                      const count = (comment.reactions as any)[key] as number;
                      return count > 0 ? (
                        <span
                          key={key}
                          className="flex items-center space-x-1"
                          title={key}
                        >
                          <span>{emoji}</span>
                          <span>{count}</span>
                        </span>
                      ) : null;
                    })}
                  </footer>
                )}
              </div>
            </article>
          );
        })
      )}
    </div>
  );
}
