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
export type AutoViewInput = AutoViewInputSubTypes.team_discussion_comment;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const author = value.author;
  const authorName = author?.name?.trim() || author?.login || 'Unknown';
  const avatarUrl = author?.avatar_url;
  const createdAt = new Date(value.created_at).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const editedAt = value.last_edited_at
    ? new Date(value.last_edited_at).toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  const reactionEmoji: Record<string, string> = {
    '+1': '👍',
    '-1': '👎',
    laugh: '😂',
    confused: '😕',
    heart: '❤️',
    hooray: '🎉',
    eyes: '👀',
    rocket: '🚀',
  };

  const reactions =
    value.reactions
      ? (Object.keys(reactionEmoji) as Array<keyof typeof reactionEmoji>)
          .map((key) => ({
            key,
            count: (value.reactions as any)[key] as number,
          }))
          .filter((r) => r.count > 0)
      : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="w-full bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <header className="flex items-center space-x-3">
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt={authorName}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-gray-900 truncate">
            {authorName}
          </div>
          <div className="flex flex-wrap items-center text-xs text-gray-500 space-x-1 truncate">
            <span>#{value.number}</span>
            <span>·</span>
            <time dateTime={value.created_at}>{createdAt}</time>
            {editedAt && (
              <>
                <span>·</span>
                <span>Edited</span>
                <time dateTime={value.last_edited_at!}>{editedAt}</time>
              </>
            )}
          </div>
        </div>
      </header>

      <section className="mt-4 text-gray-800 leading-relaxed break-words">
        <div
          dangerouslySetInnerHTML={{ __html: value.body_html }}
          className="space-y-2"
        />
      </section>

      {reactions.length > 0 && (
        <footer className="mt-4 flex flex-wrap items-center space-x-4">
          {reactions.map((r) => (
            <div
              key={r.key}
              className="flex items-center text-sm text-gray-600 space-x-1"
            >
              <span>{reactionEmoji[r.key]}</span>
              <span>{r.count}</span>
            </div>
          ))}
        </footer>
      )}
    </article>
  );
}
