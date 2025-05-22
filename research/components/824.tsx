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
  const creator = value.creator;
  const displayName = creator ? (creator.name ?? creator.login) : "Unknown";
  const avatarFallback = creator
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0D8ABC&color=fff`
    : "https://placehold.co/40x40/e2e8f0/1e293b?text=?";
  const [avatarSrc, setAvatarSrc] = React.useState<string>(
    creator?.avatar_url ?? avatarFallback,
  );
  const handleAvatarError = () => {
    if (avatarSrc !== avatarFallback) setAvatarSrc(avatarFallback);
  };

  const createdAt = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const updatedAt = new Date(value.updated_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const isPrivate = value["private"] ?? false;
  const stateIcon =
    value.state === "open" ? (
      <LucideReact.CheckCircle className="text-green-500" size={16} />
    ) : (
      <LucideReact.XCircle className="text-red-500" size={16} />
    );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.name}
        </h2>
        <div className="flex items-center gap-1">
          {stateIcon}
          <span
            className={`uppercase text-xs font-medium ${
              value.state === "open" ? "text-green-600" : "text-red-600"
            }`}
          >
            {value.state}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center text-sm text-gray-500 mb-3 gap-4">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} />
          <span>Created {createdAt}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.RefreshCw size={16} />
          <span>Updated {updatedAt}</span>
        </div>
      </div>

      {value.body && (
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">{value.body}</p>
      )}

      <div className="flex items-center mb-3">
        <img
          src={avatarSrc}
          onError={handleAvatarError}
          alt={displayName}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
        />
        <span className="ml-2 text-sm text-gray-800">{displayName}</span>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-1 truncate">
          <LucideReact.Link size={16} />
          <span className="truncate">{value.html_url}</span>
        </div>
        <div className="flex items-center gap-2">
          {value.organization_permission && (
            <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded">
              {value.organization_permission}
            </span>
          )}
          {isPrivate ? (
            <LucideReact.Lock size={16} className="text-gray-500" />
          ) : (
            <LucideReact.Unlock size={16} className="text-gray-500" />
          )}
        </div>
      </div>
    </div>
  );
}
