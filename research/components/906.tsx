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
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });

  const stripHtml = (html: string): string =>
    html.replace(/<\/?[^>]+(>|$)/g, '').trim();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!Array.isArray(value) || value.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No discussions found.
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {value.map((disc) => {
        const {
          number,
          title,
          author,
          created_at,
          updated_at,
          body_html,
          comments_count,
          pinned,
          private: isPrivate,
          reactions,
        } = disc;
        const snippet = stripHtml(body_html).slice(0, 120) + '…';
        return (
          <li
            key={disc.node_id}
            className="bg-white rounded-lg shadow-sm p-4 flex flex-col sm:flex-row gap-4"
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              {author && author.avatar_url ? (
                <img
                  src={author.avatar_url}
                  alt={author.login}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
              )}
            </div>
            {/* Content */}
            <div className="flex-1 flex flex-col">
              <div className="flex items-center flex-wrap gap-2">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {title}
                </h3>
                {pinned && (
                  <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">
                    Pinned
                  </span>
                )}
                {isPrivate && (
                  <span className="px-2 py-0.5 text-xs bg-red-100 text-red-800 rounded">
                    Private
                  </span>
                )}
              </div>
              <div className="mt-1 text-sm text-gray-500 flex flex-wrap gap-2">
                <span>#{number}</span>
                {author && <span>by {author.login}</span>}
                <span>· {formatDate(created_at)}</span>
                {updated_at && updated_at !== created_at && (
                  <span>· updated {formatDate(updated_at)}</span>
                )}
              </div>
              <p className="mt-2 text-gray-700 text-sm line-clamp-2">
                {snippet}
              </p>
              <div className="mt-3 flex items-center text-sm text-gray-600 space-x-4">
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M18 10c0 3.866-3.582 7-8 7s-8-3.134-8-7 3.582-7 8-7 8 3.134 8 7zM9 7v6l5-3-5-3z" />
                  </svg>
                  {comments_count}
                </span>
                {reactions && reactions.total_count > 0 && (
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 10a6 6 0 0111.293-3.707L18 6v4h-4l1.707 1.707A6 6 0 112 10z" />
                    </svg>
                    {reactions.total_count}
                  </span>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
