import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * A team discussion is a persistent record of a free-form conversation within a team.
     *
     * @title Team Discussion
    */
    export type team_discussion = {
        author: AutoViewInputSubTypes.nullable_simple_user;
        /**
         * The main text of the discussion.
        */
        body: string;
        body_html: string;
        /**
         * The current version of the body content. If provided, this update operation will be rejected if the given version does not match the latest version on the server.
        */
        body_version: string;
        comments_count: number & tags.Type<"int32">;
        comments_url: string & tags.Format<"uri">;
        created_at: string & tags.Format<"date-time">;
        last_edited_at: (string & tags.Format<"date-time">) | null;
        html_url: string & tags.Format<"uri">;
        node_id: string;
        /**
         * The unique sequence number of a team discussion.
        */
        number: number & tags.Type<"int32">;
        /**
         * Whether or not this discussion should be pinned for easy retrieval.
        */
        pinned: boolean;
        /**
         * Whether or not this discussion should be restricted to team members and organization owners.
        */
        "private": boolean;
        team_url: string & tags.Format<"uri">;
        /**
         * The title of the discussion.
        */
        title: string;
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
export type AutoViewInput = AutoViewInputSubTypes.team_discussion;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const author = value.author;
  const authorName = author?.name || author?.login || "Unknown";
  const formattedCreated = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedUpdated = value.last_edited_at
    ? new Date(value.last_edited_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  // Prepare reactions display
  const reactions = value.reactions;
  const reactionMap: { [K in keyof AutoViewInputSubTypes.reaction_rollup]?: { emoji: string; count: number } } = reactions
    ? {
        "+1": { emoji: "👍", count: reactions["+1"] },
        "-1": { emoji: "👎", count: reactions["-1"] },
        laugh: { emoji: "😄", count: reactions.laugh },
        confused: { emoji: "😕", count: reactions.confused },
        heart: { emoji: "❤️", count: reactions.heart },
        hooray: { emoji: "🎉", count: reactions.hooray },
        eyes: { emoji: "👀", count: reactions.eyes },
        rocket: { emoji: "🚀", count: reactions.rocket },
      }
    : {};

  const reactionEntries = reactions
    ? (Object.entries(reactionMap) as [keyof typeof reactionMap, { emoji: string; count: number }][])
        .filter(([, { count }]) => count > 0)
    : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Badges */}
      <div className="flex space-x-2">
        {value.pinned && (
          <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            Pinned
          </span>
        )}
        {value["private"] && (
          <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800">
            Private
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className="mt-2 text-xl font-semibold text-gray-900">{value.title}</h2>

      {/* Meta: Author and Date */}
      <div className="flex items-center mt-2 text-sm text-gray-600">
        {author?.avatar_url && (
          <img
            src={author.avatar_url}
            alt={authorName}
            className="w-6 h-6 rounded-full object-cover mr-2"
          />
        )}
        <span>
          {authorName} • {formattedCreated}
        </span>
      </div>

      {/* Body Preview */}
      <div
        className="mt-3 text-gray-700 prose prose-sm line-clamp-3 overflow-hidden"
        dangerouslySetInnerHTML={{ __html: value.body_html }}
      />

      {/* Footer: Comments, Last Edited, Reactions */}
      <div className="flex flex-wrap items-center justify-between mt-4 text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            💬 <span className="ml-1">{value.comments_count}</span>
          </span>
          {formattedUpdated && (
            <span className="italic">Edited: {formattedUpdated}</span>
          )}
        </div>
        {reactionEntries.length > 0 && (
          <div className="flex items-center space-x-3 mt-2 sm:mt-0">
            {reactionEntries.map(([key, { emoji, count }]) => (
              <span key={key} className="flex items-center">
                {emoji} <span className="ml-1">{count}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
