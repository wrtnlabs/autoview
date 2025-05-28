import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Page Build
     *
     * @title Page Build
    */
    export interface page_build {
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
}
export type AutoViewInput = AutoViewInputSubTypes.page_build[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const builds = value;
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  const formatDuration = (seconds: number): string => {
    if (seconds >= 3600) {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      return `${h}h ${m}m`;
    } else if (seconds >= 60) {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return `${m}m ${s}s`;
    }
    return `${seconds}s`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (builds.length === 0) {
    return (
      <div className="flex flex-col items-center text-gray-500 p-6">
        <LucideReact.AlertCircle size={24} className="mb-2" />
        <span>No builds available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {builds.map((b, idx) => {
        const user = b.pusher;
        const login = user?.login ?? "Unknown";
        const avatarUrl = user?.avatar_url ?? "";
        return (
          <div
            key={idx}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-colors"
          >
            {/* Status & Duration */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-2">
                {b.status === "success" && (
                  <LucideReact.CheckCircle
                    size={16}
                    className="text-green-500"
                    aria-label="Success"
                  />
                )}
                {b.status === "failure" && (
                  <LucideReact.XCircle
                    size={16}
                    className="text-red-500"
                    aria-label="Failure"
                  />
                )}
                {b.status === "running" && (
                  <LucideReact.Clock
                    size={16}
                    className="text-amber-500"
                    aria-label="Running"
                  />
                )}
                {!["success", "failure", "running"].includes(b.status) && (
                  <LucideReact.Circle
                    size={16}
                    className="text-gray-400"
                    aria-label={b.status}
                  />
                )}
                <span className="font-medium capitalize">{b.status}</span>
              </div>
              <span className="text-sm text-gray-500">
                {formatDuration(b.duration)}
              </span>
            </div>

            {/* URL */}
            <div className="text-sm text-gray-600 truncate mb-2">
              <LucideReact.Link
                size={16}
                className="inline-block mr-1 text-gray-400"
              />
              <a
                href={b.url}
                title={b.url}
                className="hover:underline break-all"
              >
                {b.url}
              </a>
            </div>

            {/* Commit */}
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <LucideReact.Code
                size={16}
                className="inline-block mr-1 text-gray-400"
              />
              <span title={b.commit}>{b.commit.slice(0, 7)}</span>
            </div>

            {/* Pusher */}
            <div className="flex items-center text-sm text-gray-600 mb-2">
              {user ? (
                <>
                  <img
                    src={avatarUrl}
                    alt={login}
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        login,
                      )}&background=0D8ABC&color=fff`;
                    }}
                    className="w-6 h-6 rounded-full object-cover mr-2"
                  />
                  <span className="truncate">{login}</span>
                </>
              ) : (
                <>
                  <LucideReact.User
                    size={16}
                    className="text-gray-400 mr-1"
                    aria-label="Unknown user"
                  />
                  <span>Unknown</span>
                </>
              )}
            </div>

            {/* Timestamps */}
            <div className="flex flex-wrap text-xs text-gray-500 space-x-4 mb-2">
              <div className="flex items-center">
                <LucideReact.Calendar
                  size={12}
                  className="mr-1 text-gray-400"
                />
                <span>Created: {formatDate(b.created_at)}</span>
              </div>
              <div className="flex items-center">
                <LucideReact.Calendar
                  size={12}
                  className="mr-1 text-gray-400"
                />
                <span>Updated: {formatDate(b.updated_at)}</span>
              </div>
            </div>

            {/* Error Message */}
            {b.error?.message && (
              <div className="flex items-center text-red-600 text-sm">
                <LucideReact.AlertTriangle
                  size={16}
                  className="mr-1"
                  aria-label="Error"
                />
                <span>{b.error.message}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
  // 3. Return the React element.
  //    Ensure all displayed data is appropriately filtered, transformed, and formatted according to the guidelines.
}
