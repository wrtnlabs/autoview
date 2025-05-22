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
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const author = value.author;
  const authorLogin = author?.login ?? "Unknown";
  const avatarUrl = author?.avatar_url;
  const createdAt = formatDate(value.created_at);
  const updatedAt = value.last_edited_at ? formatDate(value.last_edited_at) : null;

  const reactions = value.reactions;
  const plusOne = reactions?.["+1"] ?? 0;
  const heart = reactions?.heart ?? 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-colors duration-200">
      <div className="flex items-start space-x-4">
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt={authorLogin}
            className="w-10 h-10 flex-shrink-0 rounded-full object-cover"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              #{value.number} {value.title}
            </h2>
            {value.pinned && (
              <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                Pinned
              </span>
            )}
            {value.private && (
              <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                Private
              </span>
            )}
          </div>
          <div className="mt-1 text-sm text-gray-500">
            {author
              ? `${authorLogin} · ${createdAt}`
              : `Posted · ${createdAt}`}
            {updatedAt && ` · Edited ${updatedAt}`}
          </div>
          <div
            className="mt-2 text-gray-700 text-sm max-w-full overflow-hidden line-clamp-3"
            dangerouslySetInnerHTML={{ __html: value.body_html }}
          />
          <div className="mt-4 flex items-center space-x-6 text-sm text-gray-500">
            <div>{value.comments_count} comments</div>
            {plusOne > 0 && <div>👍 {plusOne}</div>}
            {heart > 0 && <div>❤️ {heart}</div>}
          </div>
          <div className="mt-4">
            <a
              href={value.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
  // 3. Return the React element.
  //    All displayed data is appropriately filtered, transformed, and formatted.
}
