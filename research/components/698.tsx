import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Commit Comment
     *
     * @title Commit Comment
    */
    export type commit_comment = {
        html_url: string & tags.Format<"uri">;
        url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        node_id: string;
        body: string;
        path: string | null;
        position: (number & tags.Type<"int32">) | null;
        line: (number & tags.Type<"int32">) | null;
        commit_id: string;
        user: AutoViewInputSubTypes.nullable_simple_user;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        author_association: AutoViewInputSubTypes.author_association;
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
     * How the author is associated with the repository.
     *
     * @title author_association
    */
    export type author_association = "COLLABORATOR" | "CONTRIBUTOR" | "FIRST_TIMER" | "FIRST_TIME_CONTRIBUTOR" | "MANNEQUIN" | "MEMBER" | "NONE" | "OWNER";
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
export type AutoViewInput = AutoViewInputSubTypes.commit_comment[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const comments = value;
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {comments.map((comment) => {
        const {
          id,
          body,
          path,
          line,
          user,
          created_at,
          author_association,
          reactions,
        } = comment;
        const displayName = user?.name ?? user?.login ?? "Unknown";
        const avatarUrl = user?.avatar_url;

        return (
          <div
            key={id}
            className="p-4 bg-white rounded-lg shadow-sm flex flex-col sm:flex-row sm:space-x-4"
          >
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-12 h-12 rounded-full flex-shrink-0 mb-3 sm:mb-0"
              />
            )}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center space-x-2">
                  <span className="font-semibold text-gray-800 truncate">
                    {displayName}
                  </span>
                  {user?.login && (
                    <span className="text-sm text-gray-500 truncate">
                      @{user.login}
                    </span>
                  )}
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                    {author_association}
                  </span>
                </div>
                <span className="text-sm text-gray-500 mt-1 sm:mt-0">
                  {formatDate(created_at)}
                </span>
              </div>

              {path && (
                <div className="mt-2 text-sm text-gray-600 truncate">
                  <span className="font-medium">File:</span>{" "}
                  {path}
                  {line !== null ? `:${line}` : ""}
                </div>
              )}

              <p className="mt-3 text-gray-700 text-sm line-clamp-3">
                {body}
              </p>

              {reactions && (
                <div className="mt-4 flex flex-wrap items-center space-x-4 text-gray-600 text-sm">
                  <div className="flex items-center space-x-1">
                    <span>👍</span>
                    <span>{reactions["+1"]}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>👎</span>
                    <span>{reactions["-1"]}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>😂</span>
                    <span>{reactions.laugh}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>❤️</span>
                    <span>{reactions.heart}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>🚀</span>
                    <span>{reactions.rocket}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>👀</span>
                    <span>{reactions.eyes}</span>
                  </div>
                  <span className="ml-auto text-gray-500">
                    {reactions.total_count} reactions
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
