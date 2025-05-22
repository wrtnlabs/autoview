import { tags } from "typia";
import React from "react";
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
  // Format ISO date strings into a readable format
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  // If there are no comments, show a placeholder
  if (value.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No comments available.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with total count */}
      <h2 className="text-xl font-semibold text-gray-800">
        Comments ({value.length})
      </h2>

      {/* Comment list */}
      {value.map((comment: AutoViewInputSubTypes.team_discussion_comment) => {
        const author = comment.author;
        const displayName = author
          ? author.name?.trim() || author.login
          : 'Unknown';
        const avatarUrl = author?.avatar_url;
        const created = formatDate(comment.created_at);
        const edited = comment.last_edited_at ? ' (edited)' : '';
        const reactions = comment.reactions;

        return (
          <div
            key={comment.node_id}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
          >
            {/* Author info */}
            <div className="flex items-center space-x-3">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 bg-gray-300 rounded-full" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {displayName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {created}
                  {edited}
                </p>
              </div>
            </div>

            {/* Comment body (HTML) */}
            <div
              className="mt-3 text-gray-800 prose max-w-none line-clamp-3"
              dangerouslySetInnerHTML={{ __html: comment.body_html }}
            />

            {/* Reactions summary */}
            {reactions && (
              <div className="mt-3 flex flex-wrap items-center text-sm text-gray-600 space-x-4">
                {reactions["+1"] > 0 && (
                  <span className="flex items-center space-x-1">
                    <span>👍</span>
                    <span>{reactions["+1"]}</span>
                  </span>
                )}
                {reactions["-1"] > 0 && (
                  <span className="flex items-center space-x-1">
                    <span>👎</span>
                    <span>{reactions["-1"]}</span>
                  </span>
                )}
                {reactions.laugh > 0 && (
                  <span className="flex items-center space-x-1">
                    <span>😄</span>
                    <span>{reactions.laugh}</span>
                  </span>
                )}
                {reactions.confused > 0 && (
                  <span className="flex items-center space-x-1">
                    <span>😕</span>
                    <span>{reactions.confused}</span>
                  </span>
                )}
                {reactions.heart > 0 && (
                  <span className="flex items-center space-x-1">
                    <span>❤️</span>
                    <span>{reactions.heart}</span>
                  </span>
                )}
                {reactions.hooray > 0 && (
                  <span className="flex items-center space-x-1">
                    <span>🎉</span>
                    <span>{reactions.hooray}</span>
                  </span>
                )}
                {reactions.eyes > 0 && (
                  <span className="flex items-center space-x-1">
                    <span>👀</span>
                    <span>{reactions.eyes}</span>
                  </span>
                )}
                {reactions.rocket > 0 && (
                  <span className="flex items-center space-x-1">
                    <span>🚀</span>
                    <span>{reactions.rocket}</span>
                  </span>
                )}
                <span className="ml-auto text-xs text-gray-400">
                  {reactions.total_count} reactions
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
