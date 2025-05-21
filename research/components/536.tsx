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
export type AutoViewInput = AutoViewInputSubTypes.team_discussion[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string): string => {
    const date = new Date(iso);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const reactionEmoji: Record<string, string> = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    confused: "😕",
    heart: "❤️",
    hooray: "🎉",
    eyes: "👀",
    rocket: "🚀",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="flex flex-col gap-4 p-4">
      {value.map((discussion) => {
        const author = discussion.author;
        const authorName = author?.name ?? author?.login ?? "Unknown";
        const avatarUrl = author?.avatar_url;
        const bodySnippet =
          discussion.body.length > 150
            ? discussion.body.slice(0, 150) + "..."
            : discussion.body;

        let reactionsDisplay: React.ReactNode = null;
        if (discussion.reactions) {
          const { url, total_count, ...rest } = discussion.reactions;
          const entries = Object.entries(rest).filter(
            ([, count]) => count > 0,
          );
          if (entries.length > 0) {
            reactionsDisplay = (
              <div className="flex items-center space-x-3 text-sm text-gray-500">
                {entries.map(([key, count]) => {
                  const emoji = reactionEmoji[key] ?? key;
                  return (
                    <span
                      key={key}
                      className="flex items-center space-x-1"
                    >
                      <span>{emoji}</span>
                      <span>{count}</span>
                    </span>
                  );
                })}
              </div>
            );
          }
        }

        return (
          <div
            key={discussion.node_id}
            className="bg-white rounded-lg shadow-md p-5"
          >
            <h2 className="text-lg font-semibold text-gray-800 truncate">
              {discussion.title}
            </h2>
            <div className="flex items-center flex-wrap text-sm text-gray-500 mt-2 space-x-2">
              {avatarUrl && (
                <img
                  src={avatarUrl}
                  alt={authorName}
                  className="w-6 h-6 rounded-full"
                />
              )}
              <span>{authorName}</span>
              <span>·</span>
              <span>{formatDate(discussion.created_at)}</span>
              {discussion.pinned && (
                <span className="ml-auto bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">
                  Pinned
                </span>
              )}
              {discussion.private && (
                <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2 py-0.5 rounded">
                  Private
                </span>
              )}
            </div>
            <p className="text-gray-700 mt-3 line-clamp-3">{bodySnippet}</p>
            <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
              <span>{discussion.comments_count} comments</span>
              {reactionsDisplay}
            </div>
          </div>
        );
      })}
    </div>
  );
}
