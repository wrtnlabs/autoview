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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    We display a list of discussion comments with author info, timestamp, body preview, and reactions.
  return (
    <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
      {value.map((comment) => {
        const {
          node_id,
          author,
          body,
          created_at,
          last_edited_at,
          number,
          reactions,
        } = comment;
        const authorName = author?.name || author?.login || "Unknown";
        const avatarUrl = author?.avatar_url;
        const isEdited = Boolean(last_edited_at);
        // Prepare non-zero reactions with emojis
        const reactionEntries: { emoji: string; count: number }[] = [];
        if (reactions) {
          if (reactions["+1"] > 0) reactionEntries.push({ emoji: "👍", count: reactions["+1"] });
          if (reactions["-1"] > 0) reactionEntries.push({ emoji: "👎", count: reactions["-1"] });
          if (reactions.laugh > 0)  reactionEntries.push({ emoji: "😄", count: reactions.laugh });
          if (reactions.confused > 0) reactionEntries.push({ emoji: "😕", count: reactions.confused });
          if (reactions.heart > 0) reactionEntries.push({ emoji: "❤️", count: reactions.heart });
          if (reactions.hooray > 0) reactionEntries.push({ emoji: "🎉", count: reactions.hooray });
          if (reactions.eyes > 0) reactionEntries.push({ emoji: "👀", count: reactions.eyes });
          if (reactions.rocket > 0) reactionEntries.push({ emoji: "🚀", count: reactions.rocket });
        }

        return (
          <div key={node_id} className="p-4 flex flex-col sm:flex-row sm:items-start">
            {/* Avatar */}
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt={`${authorName} avatar`}
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
            )}
            <div className="mt-2 sm:mt-0 sm:ml-4 flex-1">
              {/* Header: Author name and timestamp */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="font-medium text-gray-800">{authorName}</span>
                <span>·</span>
                <time dateTime={created_at}>{formatDate(created_at)}</time>
                {isEdited && <span className="italic text-gray-500">(edited)</span>}
                <span className="ml-auto text-gray-400">#{number}</span>
              </div>
              {/* Body preview */}
              <p className="mt-2 text-gray-700 text-sm line-clamp-4 whitespace-pre-wrap">
                {body}
              </p>
              {/* Reactions */}
              {reactionEntries.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center space-x-3 text-sm text-gray-600">
                  {reactionEntries.map((r, idx) => (
                    <span key={idx} className="flex items-center space-x-1">
                      <span>{r.emoji}</span>
                      <span>{r.count}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
