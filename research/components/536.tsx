import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A team discussion is a persistent record of a free-form conversation within a team.
     *
     * @title Team Discussion
    */
    export interface team_discussion {
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
export type AutoViewInput = AutoViewInputSubTypes.team_discussion[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const discussions = value;
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {discussions.map((discussion) => {
        const author = discussion.author;
        const title = discussion.title;
        const createdAt = formatDate(discussion.created_at);
        const editedAt = discussion.last_edited_at
          ? formatDate(discussion.last_edited_at)
          : null;
        const avatarSrc =
          author?.avatar_url ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            author?.login ?? "User"
          )}&background=0D8ABC&color=fff`;
        const authorName = author
          ? author.name || author.login
          : "Unknown author";

        return (
          <div
            key={discussion.node_id}
            className="p-4 bg-white rounded-lg shadow-sm"
          >
            {/* Title and badges */}
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {title}
              </h3>
              <div className="flex items-center space-x-2">
                {discussion.pinned && (
                  <LucideReact.Pin
                    size={16}
                    className="text-gray-500"
                    role="img"
                    aria-label="Pinned"
                  />
                )}
                {discussion["private"] && (
                  <LucideReact.Lock
                    size={16}
                    className="text-gray-500"
                    role="img"
                    aria-label="Private"
                  />
                )}
              </div>
            </div>

            {/* Author and dates */}
            <div className="flex items-center mt-3 space-x-2">
              <img
                src={avatarSrc}
                alt={authorName}
                className="w-8 h-8 rounded-full object-cover bg-gray-200"
              />
              <span className="text-sm font-medium text-gray-800 truncate">
                {authorName}
              </span>
              <span className="text-sm text-gray-400">·</span>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <LucideReact.Calendar size={16} />
                <span>{createdAt}</span>
                {editedAt && (
                  <span className="italic text-gray-400">(Edited)</span>
                )}
              </div>
            </div>

            {/* Body preview */}
            <p className="mt-2 text-gray-700 line-clamp-2">
              {discussion.body}
            </p>

            {/* Footer: comments and reactions */}
            <div className="flex items-center mt-4 space-x-6 text-gray-500">
              <div className="flex items-center space-x-1">
                <LucideReact.MessageSquare size={16} />
                <span className="text-sm">{discussion.comments_count}</span>
              </div>
              {discussion.reactions && (
                <div className="flex items-center space-x-1">
                  <LucideReact.Heart size={16} />
                  <span className="text-sm">
                    {discussion.reactions.total_count}
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
