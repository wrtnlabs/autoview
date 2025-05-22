import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * The status of a commit.
     *
     * @title Status
    */
    export type status = {
        url: string;
        avatar_url: string | null;
        id: number & tags.Type<"int32">;
        node_id: string;
        state: string;
        description: string | null;
        target_url: string | null;
        context: string;
        created_at: string;
        updated_at: string;
        creator: AutoViewInputSubTypes.nullable_simple_user;
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
}
export type AutoViewInput = AutoViewInputSubTypes.status[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const statuses = value;
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  const stateColorMap: Record<string, string> = {
    success: 'bg-green-100 text-green-800',
    failure: 'bg-red-100 text-red-800',
    error: 'bg-gray-100 text-gray-800',
    pending: 'bg-yellow-100 text-yellow-800',
    default: 'bg-blue-100 text-blue-800',
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 space-y-4">
      {statuses.length === 0 ? (
        <p className="text-center text-gray-500">No statuses available.</p>
      ) : (
        statuses.map((status) => {
          const colorClass =
            stateColorMap[status.state] || stateColorMap.default;

          return (
            <div
              key={status.id}
              className="flex space-x-4 p-4 bg-white rounded-lg shadow"
            >
              {status.creator?.avatar_url ? (
                <img
                  src={status.creator.avatar_url}
                  alt={status.creator.login}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                  ?
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {status.context}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-medium uppercase rounded ${colorClass}`}
                  >
                    {status.state}
                  </span>
                </div>
                {status.description && (
                  <p className="mt-2 text-gray-700 line-clamp-2">
                    {status.description}
                  </p>
                )}
                <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                  <span>{status.creator?.login || 'Unknown'}</span>
                  <span>{formatDate(status.created_at)}</span>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
