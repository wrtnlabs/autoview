import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Repository Collaborator Permission
     *
     * @title Repository Collaborator Permission
    */
    export type repository_collaborator_permission = {
        permission: string;
        role_name: string;
        user: AutoViewInputSubTypes.nullable_collaborator;
    };
    /**
     * Collaborator
     *
     * @title Collaborator
    */
    export type nullable_collaborator = {
        login: string;
        id: number & tags.Type<"int32">;
        email?: string | null;
        name?: string | null;
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
        permissions?: {
            pull: boolean;
            triage?: boolean;
            push: boolean;
            maintain?: boolean;
            admin: boolean;
        };
        role_name: string;
        user_view_type?: string;
    } | null;
}
export type AutoViewInput = AutoViewInputSubTypes.repository_collaborator_permission;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { permission, role_name: topRole, user } = value;
  const hasUser = user !== null;

  // User display name: prefer full name, otherwise login; fallback "Unknown User"
  const displayName = hasUser
    ? user.name?.trim() || user.login
    : "Unknown User";

  // Email if available
  const email = hasUser && user.email ? user.email : "";

  // Site admin status
  const isSiteAdmin = hasUser && user.site_admin;

  // Capitalize permission label
  const permissionLabel =
    permission.charAt(0).toUpperCase() + permission.slice(1);

  // Map permission to badge colors
  const permissionColorMap: Record<string, string> = {
    admin: "bg-red-100 text-red-800",
    push: "bg-yellow-100 text-yellow-800",
    maintain: "bg-green-100 text-green-800",
    triage: "bg-indigo-100 text-indigo-800",
    pull: "bg-blue-100 text-blue-800",
    read: "bg-blue-100 text-blue-800",
  };
  const permissionBadgeClasses =
    permissionColorMap[permission] || "bg-gray-100 text-gray-800";

  // Aggregate finer-grained scopes from user.permissions if present
  const scopes = hasUser && user.permissions
    ? (Object.entries(user.permissions)
        .filter(([, enabled]) => enabled)
        .map(([scope]) => scope) as string[])
    : [];
  const scopesDisplay = scopes.length > 0 ? scopes.join(", ") : "";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="flex flex-col items-center sm:flex-row sm:items-start p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      {hasUser ? (
        <img
          src={user.avatar_url}
          alt={`${displayName} avatar`}
          className="w-16 h-16 rounded-full object-cover shrink-0"
        />
      ) : (
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 shrink-0">
          ?
        </div>
      )}
      <div className="mt-3 sm:mt-0 sm:ml-4 flex-1 min-w-0 text-center sm:text-left">
        <div className="text-lg font-medium text-gray-900 truncate">
          {displayName}
        </div>
        {hasUser && (
          <div className="mt-1 text-sm text-gray-500 truncate">
            @{user.login}
          </div>
        )}
        {email && (
          <div className="mt-1 text-sm text-gray-500">{email}</div>
        )}
        {isSiteAdmin && (
          <div className="mt-2 inline-block text-xs font-medium bg-gray-100 text-gray-800 rounded-full px-2 py-0.5">
            Site Admin
          </div>
        )}
        <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
          <span
            className={`text-xs font-semibold ${permissionBadgeClasses} rounded-full px-2 py-0.5`}
          >
            {permissionLabel}
          </span>
          <span className="text-xs font-semibold bg-purple-100 text-purple-800 rounded-full px-2 py-0.5">
            {topRole}
          </span>
          {scopesDisplay && (
            <span className="text-xs font-semibold bg-gray-100 text-gray-800 rounded-full px-2 py-0.5">
              Scopes: {scopesDisplay}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
