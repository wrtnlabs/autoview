import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A reply to a discussion within a team.
     *
     * @title Team Discussion Comment
    */
    export interface team_discussion_comment {
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
    }
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
export type AutoViewInput = AutoViewInputSubTypes.team_discussion_comment[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  const reactionIconMap: Record<string, React.ReactElement> = {
    "+1": <LucideReact.ThumbsUp size={16} className="text-gray-400" />,
    "-1": <LucideReact.ThumbsDown size={16} className="text-gray-400" />,
    laugh: <LucideReact.Laugh size={16} className="text-gray-400" />,
    confused: <LucideReact.AlertTriangle size={16} className="text-gray-400" />,
    heart: <LucideReact.Heart size={16} className="text-gray-400" />,
    hooray: <LucideReact.Star size={16} className="text-gray-400" />,
    eyes: <LucideReact.Eye size={16} className="text-gray-400" />,
    rocket: <LucideReact.Rocket size={16} className="text-gray-400" />,
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="flex flex-col space-y-6">
      {value.map((comment) => {
        const author = comment.author;
        const authorName =
          author?.name || author?.login || "Unknown author";
        const avatarSrc =
          author?.avatar_url ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            authorName
          )}&background=0D8ABC&color=fff`;
        const edited =
          comment.last_edited_at &&
          comment.last_edited_at !== comment.created_at;

        return (
          <article
            key={comment.node_id}
            className="bg-white p-4 rounded-lg shadow-sm"
          >
            <header className="flex items-center space-x-3">
              <img
                src={avatarSrc}
                alt={`${authorName}'s avatar`}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.onerror = null;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    authorName
                  )}&background=0D8ABC&color=fff`;
                }}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">
                  {authorName}
                </span>
                <span className="text-xs text-gray-500">
                  {`#${comment.number} • ${formatDate(
                    comment.created_at
                  )}`}
                  {edited && (
                    <span className="ml-2 italic text-gray-400 text-xs">
                      (edited)
                    </span>
                  )}
                </span>
              </div>
            </header>
            <div
              className="mt-3 text-gray-700 text-sm whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: comment.body_html }}
            />
            {comment.reactions && (
              <footer className="mt-4 flex flex-wrap gap-4">
                {(
                  Object.entries(comment.reactions) as Array<
                    [string, number]
                  >
                )
                  .filter(
                    ([type, count]) =>
                      type !== "url" &&
                      type !== "total_count" &&
                      count > 0
                  )
                  .map(([type, count]) => (
                    <div
                      key={type}
                      className="flex items-center gap-1 text-sm text-gray-500"
                      aria-label={`${count} ${type} reactions`}
                    >
                      {reactionIconMap[type] || null}
                      <span>{count}</span>
                    </div>
                  ))}
              </footer>
            )}
          </article>
        );
      })}
    </div>
  );
}
