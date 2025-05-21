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
  const authorName = author?.name ?? author?.login ?? "Unknown";
  const authorAvatar = author?.avatar_url;

  const createdDate = new Date(value.created_at);
  const formattedCreated = createdDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }) + " · " + createdDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const updatedDate = value.updated_at !== value.created_at
    ? new Date(value.updated_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  const snippet = value.body.length > 200 ? `${value.body.slice(0, 200)}...` : value.body;

  const badges: { label: string; color: string }[] = [];
  if (value.pinned) badges.push({ label: "Pinned", color: "bg-blue-100 text-blue-800" });
  if (value["private"]) badges.push({ label: "Private", color: "bg-red-100 text-red-800" });

  const reactionEmojis: Record<string, string> = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    confused: "😕",
    heart: "❤️",
    hooray: "🎉",
    eyes: "👀",
    rocket: "🚀",
  };

  const reactionList = value.reactions
    ? (Object.entries(value.reactions) as [keyof typeof reactionEmojis, number][])
        .filter(([, count]) => count > 0)
        .map(([key, count]) => ({ emoji: reactionEmojis[key], count }))
    : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between mb-4">
        <div className="flex items-center space-x-3">
          {authorAvatar && (
            <img
              src={authorAvatar}
              alt={authorName}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{value.title}</h2>
            <div className="text-sm text-gray-600">
              by <span className="font-medium">{authorName}</span> · {formattedCreated}
            </div>
            {updatedDate && (
              <div className="text-xs text-gray-500">Updated on {updatedDate}</div>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          {badges.map((badge) => (
            <span
              key={badge.label}
              className={`px-2 py-0.5 text-xs font-medium rounded ${badge.color}`}
            >
              {badge.label}
            </span>
          ))}
        </div>
      </div>
      <p className="text-gray-700 mb-4 line-clamp-3">{snippet}</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{value.comments_count} comments</span>
        {reactionList.length > 0 && (
          <div className="flex items-center space-x-3">
            {reactionList.map((r, i) => (
              <span key={i} className="flex items-center space-x-1">
                <span>{r.emoji}</span>
                <span>{r.count}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
