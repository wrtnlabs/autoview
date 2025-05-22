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
  const stateIcon =
    value.state === "open" ? (
      <LucideReact.CheckCircle className="text-green-500" size={16} />
    ) : (
      <LucideReact.XCircle className="text-red-500" size={16} />
    );
  const stateLabel = value.state.charAt(0).toUpperCase() + value.state.slice(1);

  const creator = value.creator;
  const avatarSrc =
    creator && creator.avatar_url
      ? creator.avatar_url
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          creator ? creator.login : "Unknown",
        )}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-2">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {value.name}
          </h2>
          <p className="text-sm text-gray-500 mt-1">#{value.number}</p>
        </div>
        <div className="flex items-center space-x-1">
          {stateIcon}
          <span className="text-sm text-gray-700">{stateLabel}</span>
          {value.private && (
            <LucideReact.Lock className="text-gray-500 ml-2" size={16} />
          )}
        </div>
      </div>

      {/* Permission Badge */}
      {value.organization_permission && (
        <div className="mt-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
            Permission:{" "}
            {value.organization_permission.charAt(0).toUpperCase() +
              value.organization_permission.slice(1)}
          </span>
        </div>
      )}

      {/* Description */}
      {value.body && (
        <p className="text-gray-600 text-sm mt-3 line-clamp-3">{value.body}</p>
      )}

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between text-gray-600 text-xs">
        <div className="flex items-center">
          <img
            src={avatarSrc}
            alt={creator ? creator.login : "Unknown user"}
            className="w-6 h-6 rounded-full object-cover mr-2"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  creator ? creator.login : "Unknown",
                )}&background=0D8ABC&color=fff`;
            }}
          />
          <span>{creator ? creator.login : "Unknown"}</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <LucideReact.Calendar className="text-gray-400" size={14} />
            <span className="ml-1">Created {createdDate}</span>
          </div>
          <div className="flex items-center">
            <LucideReact.RefreshCcw className="text-gray-400" size={14} />
            <span className="ml-1">Updated {updatedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
