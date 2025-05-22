import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Project Collaborator Permission
     *
     * @title Project Collaborator Permission
    */
    export type project_collaborator_permission = {
        permission: string;
        user: AutoViewInputSubTypes.nullable_simple_user;
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
export type AutoViewInput = AutoViewInputSubTypes.project_collaborator_permission;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { permission, user } = value;
  const permissionLower = permission.toLowerCase();
  const permissionClass =
    permissionLower === "admin"
      ? "bg-red-100 text-red-800"
      : permissionLower === "write"
      ? "bg-blue-100 text-blue-800"
      : permissionLower === "read"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";

  const displayName = user
    ? user.name && user.name.trim().length > 0
      ? user.name
      : user.login
    : "Unknown";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-xs w-full bg-white shadow-sm rounded-lg p-4 mx-auto">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-gray-900 font-semibold text-lg">Collaborator</h2>
        <span className={`px-2 py-1 text-xs font-medium rounded ${permissionClass}`}>
          {permission}
        </span>
      </div>
      {user ? (
        <div className="flex items-center">
          <img
            src={user.avatar_url}
            alt={displayName}
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          />
          <div className="ml-3 min-w-0 flex-1">
            <p className="text-gray-900 font-medium text-base truncate">{displayName}</p>
            <p className="text-gray-500 text-sm truncate">@{user.login}</p>
            {user.email && (
              <p className="text-gray-500 text-sm truncate">{user.email}</p>
            )}
            {user.site_admin && (
              <span className="mt-1 inline-block px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded">
                Site Admin
              </span>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No user information available.</p>
      )}
    </div>
  );
}
