import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Projects are a way to organize columns and cards of work.
   *
   * @title Project
   */
  export type project = {
    owner_url: string & tags.Format<"uri">;
    url: string & tags.Format<"uri">;
    html_url: string & tags.Format<"uri">;
    columns_url: string & tags.Format<"uri">;
    id: number & tags.Type<"int32">;
    node_id: string;
    /**
     * Name of the project
     */
    name: string;
    /**
     * Body of the project
     */
    body: string | null;
    number: number & tags.Type<"int32">;
    /**
     * State of the project; either 'open' or 'closed'
     */
    state: string;
    creator: AutoViewInputSubTypes.nullable_simple_user;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
    /**
     * The baseline permission that all organization members have on this project. Only present if owner is an organization.
     */
    organization_permission?: "read" | "write" | "admin" | "none";
    /**
     * Whether or not this project can be seen by everyone. Only present if owner is an organization.
     */
    private?: boolean;
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
export type AutoViewInput = AutoViewInputSubTypes.project;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const projectName = value.name;
  const projectNumber = `#${value.number}`;
  const stateLabel = value.state.charAt(0).toUpperCase() + value.state.slice(1);
  const stateIcon =
    value.state === "open" ? (
      <LucideReact.CheckCircle className="text-green-500" size={16} />
    ) : (
      <LucideReact.XCircle className="text-red-500" size={16} />
    );
  const formattedCreated = new Date(value.created_at).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );
  const formattedUpdated = new Date(value.updated_at).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );
  const isPrivate = value["private"] === true;
  const description = value.body?.trim()
    ? value.body
    : "No description provided.";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-4">
      {/* Header: Project title and state */}
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {projectName}
        </h2>
        <div className="flex items-center gap-1">
          {stateIcon}
          <span className="text-sm text-gray-600">{stateLabel}</span>
        </div>
      </div>

      {/* Subtitle: Project number and privacy */}
      <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <LucideReact.Hash size={16} className="text-gray-400" />
          <span>{projectNumber}</span>
        </div>
        {isPrivate && (
          <div className="flex items-center gap-1">
            <LucideReact.Lock size={16} className="text-gray-400" />
            <span>Private</span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="mt-3 text-gray-700 text-sm line-clamp-3">{description}</p>

      {/* Footer: Creator and dates */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 text-xs text-gray-500">
        {/* Creator info */}
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          {value.creator ? (
            <>
              <img
                src={value.creator.avatar_url}
                alt={value.creator.login}
                className="w-6 h-6 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    value.creator?.login || "User",
                  )}&background=random`;
                }}
              />
              <span>{value.creator.login}</span>
            </>
          ) : (
            <div className="flex items-center gap-1 text-gray-400">
              <LucideReact.User size={16} />
              <span>Unknown creator</span>
            </div>
          )}
        </div>

        {/* Dates */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={16} className="text-gray-400" />
            <span>Created {formattedCreated}</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={16} className="text-gray-400" />
            <span>Updated {formattedUpdated}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
