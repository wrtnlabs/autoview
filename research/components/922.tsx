import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A team's access to a project.
   *
   * @title Team Project
   */
  export type team_project = {
    owner_url: string;
    url: string;
    html_url: string;
    columns_url: string;
    id: number & tags.Type<"int32">;
    node_id: string;
    name: string;
    body: string | null;
    number: number & tags.Type<"int32">;
    state: string;
    creator: AutoViewInputSubTypes.simple_user;
    created_at: string;
    updated_at: string;
    /**
     * The organization permission for this project. Only present when owner is an organization.
     */
    organization_permission?: string;
    /**
     * Whether the project is private or not. Only present when owner is an organization.
     */
    private?: boolean;
    permissions: {
      read: boolean;
      write: boolean;
      admin: boolean;
    };
  };
  /**
   * A GitHub user.
   *
   * @title Simple User
   */
  export type simple_user = {
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
  };
}
export type AutoViewInput = AutoViewInputSubTypes.team_project;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const creator = value.creator;
  const createdDate = new Date(value.created_at);
  const updatedDate = new Date(value.updated_at);
  const createdAt = createdDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const updatedAt = updatedDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const permissionLevel = value.permissions.admin
    ? "Admin"
    : value.permissions.write
      ? "Write"
      : value.permissions.read
        ? "Read"
        : "None";
  const isOpen = value.state.toLowerCase() === "open";
  const isPrivate = Boolean(value["private"]);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <img
          src={creator.avatar_url}
          alt={`${creator.login} avatar`}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              creator.login,
            )}&background=0D8ABC&color=fff`;
          }}
        />
        <div className="flex-1 w-full">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <h2 className="text-lg font-semibold text-gray-800 truncate">
              {value.name}
            </h2>
            <span className="mt-1 sm:mt-0 text-sm text-gray-500">
              #{value.number}
            </span>
          </div>
          {value.body && (
            <p className="mt-2 text-gray-600 line-clamp-3">{value.body}</p>
          )}
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {/* State Badge */}
            <div
              className={`flex items-center gap-1 px-2 py-0.5 rounded ${
                isOpen
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {isOpen ? (
                <LucideReact.CheckCircle size={14} className="flex-shrink-0" />
              ) : (
                <LucideReact.XCircle size={14} className="flex-shrink-0" />
              )}
              <span>{isOpen ? "Open" : "Closed"}</span>
            </div>
            {/* Visibility Badge */}
            <div className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-800 rounded">
              {isPrivate ? (
                <LucideReact.Lock size={14} className="flex-shrink-0" />
              ) : (
                <LucideReact.Unlock size={14} className="flex-shrink-0" />
              )}
              <span>{isPrivate ? "Private" : "Public"}</span>
            </div>
            {/* Permission Badge */}
            <div
              className={`flex items-center gap-1 px-2 py-0.5 rounded ${
                permissionLevel === "Admin"
                  ? "bg-indigo-100 text-indigo-800"
                  : permissionLevel === "Write"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
              }`}
            >
              {permissionLevel === "Admin" ? (
                <LucideReact.ShieldCheck size={14} className="flex-shrink-0" />
              ) : permissionLevel === "Write" ? (
                <LucideReact.Edit size={14} className="flex-shrink-0" />
              ) : (
                <LucideReact.Eye size={14} className="flex-shrink-0" />
              )}
              <span>{permissionLevel}</span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-gray-500 text-sm">
            <div className="flex items-center gap-1">
              <LucideReact.Calendar size={16} />
              <span>Created {createdAt}</span>
            </div>
            <div className="flex items-center gap-1">
              <LucideReact.Calendar size={16} />
              <span>Updated {updatedAt}</span>
            </div>
            <div className="flex items-center gap-1">
              <LucideReact.User size={16} />
              <span>{creator.login}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
