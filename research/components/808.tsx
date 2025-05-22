import LucideReact from "lucide-react";
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
export type AutoViewInput = AutoViewInputSubTypes.milestone;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalIssues = value.open_issues + value.closed_issues;
  const completion =
    totalIssues > 0 ? Math.round((value.closed_issues / totalIssues) * 100) : 0;
  const formattedCreated = new Date(value.created_at).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );
  const formattedDue = value.due_on
    ? new Date(value.due_on).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;
  const creatorLogin = value.creator?.login ?? "Unknown";
  const creatorAvatar = value.creator?.avatar_url;
  const isOpen = value.state === "open";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow">
      {/* Header: Title, Number, and State */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {isOpen ? (
            <LucideReact.Circle className="text-green-500" size={16} />
          ) : (
            <LucideReact.XCircle className="text-red-500" size={16} />
          )}
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {value.title}
            <span className="text-gray-500 ml-1">#{value.number}</span>
          </h2>
        </div>
        <span
          className={`text-sm font-medium ${
            isOpen ? "text-green-600" : "text-red-600"
          }`}
        >
          {isOpen ? "Open" : "Closed"}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm mt-2 line-clamp-3">
        {value.description ?? "No description provided."}
      </p>

      {/* Issue Metrics & Progress */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <LucideReact.GitPullRequest size={16} className="text-gray-400" />
            <span>{value.open_issues} open</span>
          </div>
          <div className="flex items-center space-x-1">
            <LucideReact.CheckCircle size={16} className="text-gray-400" />
            <span>{value.closed_issues} closed</span>
          </div>
          <span>{completion}% done</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>

      {/* Footer: Creator and Dates */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          {creatorAvatar ? (
            <img
              src={creatorAvatar}
              alt={creatorLogin}
              className="w-6 h-6 rounded-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    creatorLogin,
                  )}&background=0D8ABC&color=fff`;
              }}
            />
          ) : (
            <LucideReact.User className="text-gray-400" size={16} />
          )}
          <span className="truncate">{creatorLogin}</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <LucideReact.Calendar size={16} className="text-gray-400" />
            <span>Created {formattedCreated}</span>
          </div>
          {formattedDue && (
            <div className="flex items-center space-x-1">
              <LucideReact.Calendar size={16} className="text-gray-400" />
              <span>Due {formattedDue}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
