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
export type AutoViewInput = AutoViewInputSubTypes.page_build;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { status, commit, duration, created_at, error, pusher } = value;

  // Format created date
  const formattedDate = new Date(created_at).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  // Format duration into minutes and seconds
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  const formattedDuration = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

  // Shorten commit hash
  const shortCommit = commit.slice(0, 7);

  // Capitalize status text
  const statusText = status.charAt(0).toUpperCase() + status.slice(1);

  // Determine badge colors based on status
  const statusStyles = (() => {
    const lower = status.toLowerCase();
    if (lower.includes('success') || lower.includes('passed'))
      return 'bg-green-100 text-green-800 ring-green-500';
    if (lower.includes('fail') || lower.includes('error'))
      return 'bg-red-100 text-red-800 ring-red-500';
    return 'bg-yellow-100 text-yellow-800 ring-yellow-500';
  })();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md ring-1 ring-gray-200 space-y-4">
      {/* Header: Commit & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div className="text-lg font-semibold text-gray-900 truncate">
          Build {shortCommit}
        </div>
        <span
          className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ring-1 ${statusStyles}`}
        >
          {statusText}
        </span>
      </div>

      {/* Error Message (if any) */}
      {error.message && (
        <div className="text-sm text-red-600">
          Error: {error.message}
        </div>
      )}

      {/* Build Info: Duration & Created Date */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <div>
          <span className="font-medium text-gray-800">Duration:</span>{' '}
          {formattedDuration}
        </div>
        <div>
          <span className="font-medium text-gray-800">Created:</span>{' '}
          {formattedDate}
        </div>
      </div>

      {/* Pusher Information */}
      <div className="flex items-center space-x-3">
        {pusher ? (
          <>
            <img
              src={pusher.avatar_url}
              alt={pusher.login}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="text-sm text-gray-700 truncate">
              {pusher.name ?? pusher.login}
            </div>
          </>
        ) : (
          <div className="text-sm text-gray-700">Unknown Pusher</div>
        )}
      </div>
    </div>
  );
}
