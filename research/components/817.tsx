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
  const { url, status, error, pusher, commit, duration, created_at } = value;

  // Shorten commit hash
  const commitShort = commit.slice(0, 7);

  // Format created date
  const formattedDate = new Date(created_at).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // Duration formatter (HHh MMm SSs)
  const formatDuration = (sec: number): string => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    if (h > 0) return `${h}h ${m}m ${s}s`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  };
  const durationText = formatDuration(duration);

  // Badge color mapping
  const statusStyles: Record<string, string> = {
    success: 'bg-green-100 text-green-800',
    failure: 'bg-red-100 text-red-800',
    error: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
  };
  const badgeStyle = statusStyles[status] || 'bg-gray-100 text-gray-800';

  // Human-readable status
  const statusLabel = status.replace(/_/g, ' ').toLowerCase();
  const statusText = statusLabel.charAt(0).toUpperCase() + statusLabel.slice(1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-900 text-lg font-semibold truncate">
          {commitShort}
        </h2>
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${badgeStyle}`}>
          {statusText}
        </span>
      </div>

      <div className="mt-3 text-sm text-gray-500 space-y-2">
        <div className="flex items-center space-x-2">
          {pusher ? (
            <>
              <img
                src={pusher.avatar_url}
                alt={pusher.login}
                className="w-5 h-5 rounded-full"
              />
              <span className="truncate">{pusher.login}</span>
            </>
          ) : (
            <span className="italic text-gray-400">Unknown pusher</span>
          )}
        </div>
        <div className="truncate text-xs" title={url}>
          {url}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap text-sm text-gray-600 space-x-4">
        <span>{durationText}</span>
        <span>{formattedDate}</span>
      </div>

      {error?.message && (
        <div className="mt-4 text-sm text-red-600 break-words">
          <strong>Error:</strong> {error.message}
        </div>
      )}
    </div>
  );
}
