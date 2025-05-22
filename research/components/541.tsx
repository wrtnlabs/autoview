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
  const { author, body_html, created_at, last_edited_at, reactions } = value;
  const displayName = author
    ? author.name?.trim() || author.login
    : "Unknown User";
  const avatarUrl = author?.avatar_url || "";
  const formattedCreated = new Date(created_at).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );
  const formattedEdited = last_edited_at
    ? new Date(last_edited_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  // Build a filtered list of reactions with emojis
  let reactionData: { emoji: string; count: number }[] = [];
  if (reactions) {
    reactionData = [
      { emoji: "👍", count: reactions["+1"] },
      { emoji: "👎", count: reactions["-1"] },
      { emoji: "😄", count: reactions.laugh },
      { emoji: "😕", count: reactions.confused },
      { emoji: "❤️", count: reactions.heart },
      { emoji: "🎉", count: reactions.hooray },
      { emoji: "👀", count: reactions.eyes },
      { emoji: "🚀", count: reactions.rocket },
    ].filter((r) => r.count > 0);
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex items-center">
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt={displayName}
            className="w-8 h-8 rounded-full mr-3"
          />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {displayName}
          </p>
          <p className="text-xs text-gray-500">{formattedCreated}</p>
        </div>
        {formattedEdited && (
          <span className="ml-2 text-xs text-gray-400 italic whitespace-nowrap">
            Edited {formattedEdited}
          </span>
        )}
      </div>

      <div
        className="mt-3 prose prose-sm max-w-none text-gray-800 line-clamp-6"
        dangerouslySetInnerHTML={{ __html: body_html }}
      />

      {reactionData.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {reactionData.map((r, idx) => (
            <span
              key={idx}
              className="flex items-center space-x-1 text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded"
            >
              <span>{r.emoji}</span>
              <span>{r.count}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
