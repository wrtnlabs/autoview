import * as LucideReact from "lucide-react";
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
  const createdDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const updatedDate = new Date(value.updated_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const stateLabel = value.state.charAt(0).toUpperCase() + value.state.slice(1);
  const creatorName =
    (value.creator && (value.creator.name ?? value.creator.login)) || "Unknown";
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    creatorName,
  )}&background=0D8ABC&color=fff`;
  const avatarUrl = value.creator?.avatar_url || avatarFallback;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header: Title, Number, State, Creator Avatar */}
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-4">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {value.name}{" "}
            <span className="text-gray-500 font-normal">#{value.number}</span>
          </h2>
          <div className="flex items-center mt-1">
            {value.state === "open" ? (
              <LucideReact.CheckCircle
                size={16}
                className="text-green-500"
                aria-label="Open"
              />
            ) : (
              <LucideReact.XCircle
                size={16}
                className="text-red-500"
                aria-label="Closed"
              />
            )}
            <span className="ml-1 text-sm text-gray-600">{stateLabel}</span>
          </div>
        </div>
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
            <img
              src={avatarUrl}
              alt={creatorName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = avatarFallback;
              }}
            />
          </div>
        </div>
      </div>

      {/* Body / Description */}
      <p className="mt-3 text-sm text-gray-700 line-clamp-3">
        {value.body ?? "No description provided."}
      </p>

      {/* Dates */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
        <div className="flex items-center">
          <LucideReact.Calendar size={16} />
          <span className="ml-1">Created {createdDate}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Edit2 size={16} />
          <span className="ml-1">Updated {updatedDate}</span>
        </div>
      </div>

      {/* Permissions & Privacy Badges */}
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {value.private && (
          <span className="flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
            <LucideReact.Lock size={12} className="mr-1" />
            Private
          </span>
        )}
        {value.organization_permission && (
          <span className="flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full capitalize">
            {value.organization_permission}
          </span>
        )}
      </div>
    </div>
  );
}
