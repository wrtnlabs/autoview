import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  // 1. Data transformation & derived values
  const builds = value
    .slice()
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );

  const formatDateTime = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const formatDuration = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m > 0 ? `${m}m ` : ""}${s}s`;
  };

  // 2. Visual structure using JSX and Tailwind CSS
  return (
    <div className="space-y-4">
      {builds.map((build, idx) => {
        const statusKey = build.status.toLowerCase();
        let statusIcon: JSX.Element;
        if (statusKey.includes("success")) {
          statusIcon = (
            <LucideReact.CheckCircle
              size={16}
              className="text-green-500"
              aria-label="Success"
            />
          );
        } else if (statusKey.includes("fail") || statusKey.includes("error")) {
          statusIcon = (
            <LucideReact.AlertTriangle
              size={16}
              className="text-red-500"
              aria-label="Error"
            />
          );
        } else {
          statusIcon = (
            <LucideReact.Clock
              size={16}
              className="text-amber-500"
              aria-label="Pending"
            />
          );
        }

        const pusherName =
          build.pusher && (build.pusher.name || build.pusher.login);

        const avatarSrc =
          build.pusher?.avatar_url ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            pusherName || "Unknown",
          )}&background=random`;

        return (
          <div
            key={`${build.commit}-${build.created_at}-${idx}`}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="sm:flex sm:justify-between sm:items-start">
              {/* Left: Pusher info */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={avatarSrc}
                    alt={pusherName || "Unknown pusher"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          pusherName || "Unknown",
                        )}&background=random`;
                    }}
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {pusherName || "Unknown"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    Commit: {build.commit}
                  </p>
                </div>
              </div>
              {/* Right: Build details */}
              <div className="mt-3 sm:mt-0 sm:ml-6 flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
                <div className="flex items-center text-sm text-gray-600 space-x-1">
                  {statusIcon}
                  <span className="capitalize">{statusKey}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 space-x-1">
                  <LucideReact.Timer
                    size={16}
                    className="text-gray-400"
                    aria-label="Duration"
                  />
                  <span>{formatDuration(build.duration)}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 space-x-1">
                  <LucideReact.Calendar
                    size={16}
                    className="text-gray-400"
                    aria-label="Created at"
                  />
                  <span>{formatDateTime(build.created_at)}</span>
                </div>
                {build.error?.message && (
                  <div className="flex items-center text-sm text-red-500 space-x-1 max-w-xs">
                    <LucideReact.AlertTriangle
                      size={16}
                      aria-label="Error message"
                    />
                    <span className="truncate">{build.error.message}</span>
                  </div>
                )}
                <div className="flex items-center text-sm text-gray-600 space-x-1 max-w-xs">
                  <LucideReact.Link
                    size={16}
                    className="text-gray-400"
                    aria-label="Build URL"
                  />
                  <span className="truncate">{build.url}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {builds.length === 0 && (
        <div className="flex flex-col items-center py-10 text-gray-500">
          <LucideReact.AlertCircle size={48} className="mb-2" />
          <p className="text-sm">No build data available.</p>
        </div>
      )}
    </div>
  );
}
