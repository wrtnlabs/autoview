import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A collection of related issues and pull requests.
   *
   * @title Milestone
   */
  export type milestone = {
    url: string & tags.Format<"uri">;
    html_url: string & tags.Format<"uri">;
    labels_url: string & tags.Format<"uri">;
    id: number & tags.Type<"int32">;
    node_id: string;
    /**
     * The number of the milestone.
     */
    number: number & tags.Type<"int32">;
    /**
     * The state of the milestone.
     */
    state: "open" | "closed";
    /**
     * The title of the milestone.
     */
    title: string;
    description: string | null;
    creator: AutoViewInputSubTypes.nullable_simple_user;
    open_issues: number & tags.Type<"int32">;
    closed_issues: number & tags.Type<"int32">;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
    closed_at: (string & tags.Format<"date-time">) | null;
    due_on: (string & tags.Format<"date-time">) | null;
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
export type AutoViewInput = AutoViewInputSubTypes.milestone[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const milestones = value;
  const formatDate = (dateString?: string | null): string =>
    dateString
      ? new Date(dateString).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "--";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!milestones || milestones.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-2 text-lg">No milestones available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {milestones.map((ms) => {
        const totalIssues = ms.open_issues + ms.closed_issues;
        const progress =
          totalIssues > 0 ? (ms.closed_issues / totalIssues) * 100 : 0;
        const stateIcon =
          ms.state === "closed" ? (
            <LucideReact.CheckCircle className="text-green-500" size={16} />
          ) : (
            <LucideReact.Clock className="text-amber-500" size={16} />
          );
        const creatorLogin = ms.creator?.login;
        const avatarUrl =
          ms.creator?.avatar_url ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            creatorLogin || "User",
          )}&background=random`;

        return (
          <div
            key={ms.id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                {stateIcon}
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  #{ms.number} {ms.title}
                </h3>
              </div>
              {ms.due_on && (
                <div className="flex items-center space-x-1 text-gray-500">
                  <LucideReact.Calendar size={16} />
                  <span className="text-sm">Due {formatDate(ms.due_on)}</span>
                </div>
              )}
            </div>

            <p className="mt-2 text-sm text-gray-600 line-clamp-3">
              {ms.description || "No description provided."}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100">
                  <img
                    src={avatarUrl}
                    alt={creatorLogin || "Creator"}
                    className="w-full h-full object-cover"
                    onError={(
                      e: React.SyntheticEvent<HTMLImageElement, Event>,
                    ) => {
                      e.currentTarget.src =
                        "https://ui-avatars.com/api/?name=User&background=random";
                    }}
                  />
                </div>
                <span className="text-sm text-gray-700">
                  {creatorLogin || "Unknown"}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                Created {formatDate(ms.created_at)}
              </div>
            </div>

            {totalIssues > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>
                    Issues: {ms.closed_issues}/{totalIssues}
                  </span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
