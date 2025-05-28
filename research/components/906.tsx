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
    new Date(iso).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!discussions || discussions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-sm">No discussions available.</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {discussions.map((disc) => {
        const author = disc.author;
        const authorName = author ? author.name ?? author.login : '';
        const authorLogin = author ? author.login : '';
        const avatarUrl = author ? author.avatar_url : '';

        return (
          <article
            key={disc.node_id}
            className="bg-white shadow-sm rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <header className="flex items-start justify-between">
              <div className="flex items-center">
                {author ? (
                  <img
                    src={avatarUrl}
                    alt={authorLogin}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        authorName
                      )}&background=0D8ABC&color=fff`;
                    }}
                  />
                ) : (
                  <LucideReact.User
                    className="w-10 h-10 text-gray-300"
                    aria-label="No avatar"
                  />
                )}
                <div className="ml-3">
                  <p className="text-sm font-semibold text-gray-900">
                    {authorName || 'Unknown User'}
                  </p>
                  {authorLogin && (
                    <p className="text-xs text-gray-500">{authorLogin}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {disc.pinned && (
                  <LucideReact.Pin
                    size={16}
                    className="text-indigo-500"
                    aria-label="Pinned"
                  />
                )}
                {disc.private && (
                  <LucideReact.Lock
                    size={16}
                    className="text-gray-500"
                    aria-label="Private"
                  />
                )}
              </div>
            </header>

            <h2 className="mt-3 text-lg font-medium text-gray-800 truncate">
              {disc.title}
            </h2>
            <p className="mt-2 text-gray-700 text-sm line-clamp-2">
              {disc.body}
            </p>

            <footer className="mt-4 flex flex-wrap items-center text-gray-500 text-sm space-x-4">
              <div className="flex items-center">
                <LucideReact.Calendar size={16} className="mr-1" />
                <time dateTime={disc.created_at}>
                  {formatDate(disc.created_at)}
                </time>
                {disc.last_edited_at && (
                  <span className="ml-2">
                    (edited {formatDate(disc.last_edited_at)})
                  </span>
                )}
              </div>

              <div className="flex items-center">
                <LucideReact.MessageCircle size={16} className="mr-1" />
                <span>{disc.comments_count}</span>
              </div>

              {disc.reactions && (
                <div className="flex items-center">
                  <LucideReact.ThumbsUp size={16} className="mr-1" />
                  <span>{disc.reactions.total_count}</span>
                </div>
              )}
            </footer>
          </article>
        );
      })}
    </div>
  );
}
