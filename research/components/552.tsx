import LucideReact from "lucide-react";
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
  // Derived and formatted values
  const formattedCreatedAt = new Date(value.created_at).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );
  const formattedUpdatedAt = new Date(value.updated_at).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );
  const stateLabel = value.state.charAt(0).toUpperCase() + value.state.slice(1);
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    value.creator.login,
  )}&background=0D8ABC&color=fff`;

  return (
    <div className="max-w-md mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header: Project Name & Number */}
      <div className="flex items-center">
        <LucideReact.Folder className="text-gray-600 mr-2" size={20} />
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
        <span className="ml-auto text-sm text-gray-500">#{value.number}</span>
      </div>

      {/* State, Privacy & Org Permission */}
      <div className="flex items-center mt-2 space-x-3">
        {value.state === "open" ? (
          <LucideReact.CheckCircle className="text-green-500" size={16} />
        ) : (
          <LucideReact.XCircle className="text-red-500" size={16} />
        )}
        <span
          className={`text-sm ${
            value.state === "open" ? "text-green-600" : "text-red-600"
          }`}
        >
          {stateLabel}
        </span>
        {value.private && (
          <LucideReact.Lock className="text-gray-500" size={16} />
        )}
        {value.organization_permission && (
          <span className="ml-2 px-2 py-0.5 text-xs font-medium uppercase text-blue-800 bg-blue-100 rounded">
            {value.organization_permission}
          </span>
        )}
      </div>

      {/* Description */}
      {value.body && (
        <p className="mt-3 text-gray-700 text-sm line-clamp-2">{value.body}</p>
      )}

      {/* Footer: Creator, Dates & Permissions */}
      <div className="mt-4 border-t border-gray-100 pt-4 space-y-3">
        {/* Creator Info */}
        <div className="flex items-center">
          <img
            src={value.creator.avatar_url}
            alt={value.creator.login}
            className="w-8 h-8 rounded-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = avatarFallback;
            }}
          />
          <span className="ml-2 text-sm text-gray-800 truncate">
            {value.creator.login}
          </span>
        </div>

        {/* Dates */}
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <LucideReact.Calendar className="mr-1" size={16} />
            <span>Created {formattedCreatedAt}</span>
          </div>
          <div className="flex items-center">
            <LucideReact.Calendar className="mr-1" size={16} />
            <span>Updated {formattedUpdatedAt}</span>
          </div>
        </div>

        {/* Permissions */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center text-sm text-gray-600">
            <LucideReact.CheckCircle
              size={16}
              className={`mr-1 ${
                value.permissions.read ? "text-green-500" : "text-gray-300"
              }`}
            />
            <span>Read</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <LucideReact.CheckCircle
              size={16}
              className={`mr-1 ${
                value.permissions.write ? "text-green-500" : "text-gray-300"
              }`}
            />
            <span>Write</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <LucideReact.CheckCircle
              size={16}
              className={`mr-1 ${
                value.permissions.admin ? "text-green-500" : "text-gray-300"
              }`}
            />
            <span>Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
}
