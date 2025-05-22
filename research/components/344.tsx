import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Base Gist
     *
     * @title Base Gist
    */
    export type base_gist = {
        url: string & tags.Format<"uri">;
        forks_url: string & tags.Format<"uri">;
        commits_url: string & tags.Format<"uri">;
        id: string;
        node_id: string;
        git_pull_url: string & tags.Format<"uri">;
        git_push_url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        files: {
            [key: string]: {
                filename?: string;
                type?: string;
                language?: string;
                raw_url?: string;
                size?: number & tags.Type<"int32">;
                /**
                 * The encoding used for `content`. Currently, `"utf-8"` and `"base64"` are supported.
                */
                encoding?: string & tags.Default<"utf-8">;
            };
        };
        "public": boolean;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        description: string | null;
        comments: number & tags.Type<"int32">;
        comments_enabled?: boolean;
        user: AutoViewInputSubTypes.nullable_simple_user;
        comments_url: string & tags.Format<"uri">;
        owner?: AutoViewInputSubTypes.simple_user;
        truncated?: boolean;
        forks?: any[];
        history?: any[];
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
     * A GitHub user.
     *
     * @title Simple User
    */
    export type simple_user = {
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
    };
}
export type AutoViewInput = AutoViewInputSubTypes.base_gist[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!value || value.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No gists available.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {value.map((gist) => {
        const fileNames = Object.keys(gist.files);
        const primaryFile = fileNames[0] ?? "Untitled";
        const avatarUrl =
          gist.owner?.avatar_url ?? gist.user?.avatar_url ?? "";
        const ownerName =
          gist.owner?.login ?? gist.user?.login ?? "Unknown";
        return (
          <div
            key={gist.id}
            className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition p-4"
          >
            <div className="flex items-center mb-3">
              {avatarUrl && (
                <img
                  src={avatarUrl}
                  alt={`${ownerName} avatar`}
                  className="w-8 h-8 rounded-full mr-2 flex-shrink-0"
                />
              )}
              <span className="text-sm font-medium text-gray-700 truncate">
                {ownerName}
              </span>
              <span
                className={
                  "ml-auto px-2 py-0.5 text-xs font-semibold rounded-full " +
                  (gist.public
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800")
                }
              >
                {gist.public ? "Public" : "Private"}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
              {gist.description ?? primaryFile}
            </h3>
            {gist.description && (
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {gist.description}
              </p>
            )}
            <div className="mt-auto pt-3 border-t border-gray-200 flex flex-wrap text-sm text-gray-500">
              <span className="mr-2">
                {fileNames.length} file{fileNames.length !== 1 ? "s" : ""}
              </span>
              <span className="mx-1">•</span>
              <span className="mr-2">{formatDate(gist.created_at)}</span>
              <span className="mx-1">•</span>
              <span>
                {gist.comments} comment{gist.comments !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
  // 3. Return the React element.
}
