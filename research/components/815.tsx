import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Page Build
     *
     * @title Page Build
    */
    export type page_build = {
        url: string & tags.Format<"uri">;
        status: string;
        error: {
            message: string | null;
        };
        pusher: AutoViewInputSubTypes.nullable_simple_user;
        commit: string;
        duration: number & tags.Type<"int32">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
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
export type AutoViewInput = AutoViewInputSubTypes.page_build[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const builds = value;
  const totalBuilds = builds.length;
  const successfulBuilds = builds.filter(b => b.status.toLowerCase() === 'success').length;
  const failedBuilds = builds.filter(b => b.status.toLowerCase() !== 'success').length;
  const averageDuration =
    totalBuilds > 0
      ? builds.reduce((acc, b) => acc + b.duration, 0) / totalBuilds
      : 0;
  const formattedAvgDuration = `${averageDuration.toFixed(2)}s`;

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

  const getStatusClasses = (status: string): string => {
    const s = status.toLowerCase();
    if (s === 'success') return 'bg-green-100 text-green-800';
    if (s === 'failure' || s === 'error') return 'bg-red-100 text-red-800';
    if (s === 'running' || s === 'in_progress') return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  const capitalize = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 space-y-6 bg-white rounded-lg shadow-sm">
      {/* Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex space-x-6 text-sm text-gray-700">
          <div>
            <span className="font-semibold text-gray-900">{totalBuilds}</span> Builds
          </div>
          <div>
            <span className="font-semibold text-green-600">{successfulBuilds}</span> Success
          </div>
          <div>
            <span className="font-semibold text-red-600">{failedBuilds}</span> Failures
          </div>
        </div>
        <div className="text-sm text-gray-700">
          ⌀ Duration: <span className="font-medium text-gray-900">{formattedAvgDuration}</span>
        </div>
      </div>

      {/* Build List */}
      <div className="divide-y divide-gray-200">
        {builds.map((b, idx) => (
          <div key={idx} className="py-4 flex items-start space-x-4">
            {/* Avatar */}
            {b.pusher?.avatar_url && (
              <img
                src={b.pusher.avatar_url}
                alt={b.pusher.login}
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
            )}
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">
                    {b.pusher?.login ?? 'Unknown User'}
                  </span>
                </div>
                <span
                  className={`px-2 inline-flex text-xs font-semibold rounded-full ${getStatusClasses(
                    b.status
                  )}`}
                >
                  {capitalize(b.status)}
                </span>
              </div>
              <p className="text-sm text-gray-600 truncate">{b.commit}</p>
              <div className="flex flex-wrap text-xs text-gray-500 space-x-2">
                <time dateTime={b.created_at}>{formatDate(b.created_at)}</time>
                <span>· {b.duration.toFixed(2)}s</span>
              </div>
              {b.error.message && (
                <p className="text-sm text-red-600 truncate">
                  Error: {b.error.message}
                </p>
              )}
            </div>
          </div>
        ))}
        {totalBuilds === 0 && (
          <div className="py-4 text-center text-gray-500">
            No builds available.
          </div>
        )}
      </div>
    </div>
  );
}
