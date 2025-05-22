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
export type AutoViewInput = AutoViewInputSubTypes.milestone;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const dueDate = value.due_on
    ? new Date(value.due_on).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;
  const stateIcon =
    value.state === "closed" ? (
      <LucideReact.CheckCircle
        className="text-green-500"
        size={16}
        aria-label="Closed"
      />
    ) : (
      <LucideReact.Circle
        className="text-yellow-500"
        size={16}
        aria-label="Open"
      />
    );
  const descriptionText = value.description || "No description provided";
  const creator = value.creator;
  const creatorLogin = creator?.login || "Unknown";
  const handleAvatarError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      creatorLogin,
    )}&background=0D8ABC&color=fff`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm space-y-3">
      {/* Header: Title, Number, State */}
      <div className="flex items-center justify-between">
        <h2 className="flex items-baseline text-lg font-semibold text-gray-900 truncate">
          {value.title}
          <span className="ml-2 text-sm text-gray-500">#{value.number}</span>
        </h2>
        <div className="flex items-center gap-1">
          {stateIcon}
          <span className="text-sm text-gray-600 capitalize">
            {value.state}
          </span>
        </div>
      </div>

      {/* Description (truncated) */}
      <p className="mt-1 text-gray-700 line-clamp-3">{descriptionText}</p>

      {/* Creator Info */}
      <div className="flex items-center space-x-2">
        {creator ? (
          <>
            <img
              src={creator.avatar_url}
              alt={creatorLogin}
              onError={handleAvatarError}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm text-gray-800 truncate">
              {creatorLogin}
            </span>
          </>
        ) : (
          <div className="flex items-center text-sm text-gray-600 gap-1">
            <LucideReact.User size={16} />
            <span>Unknown Creator</span>
          </div>
        )}
      </div>

      {/* Stats and Dates */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.GitPullRequest size={16} className="text-yellow-500" />
          <span>{value.open_issues} Open</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.CheckCircle size={16} className="text-green-500" />
          <span>{value.closed_issues} Closed</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} />
          <span>Created: {createdDate}</span>
        </div>
        {dueDate && (
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={16} />
            <span>Due: {dueDate}</span>
          </div>
        )}
      </div>
    </div>
  );
}
