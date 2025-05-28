import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Repository Collaborator Permission
     *
     * @title Repository Collaborator Permission
    */
    export interface repository_collaborator_permission {
        permission: string;
        role_name: string;
        user: AutoViewInputSubTypes.nullable_collaborator;
    }
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
  const user = value.user;
  const displayName = user
    ? user.name?.trim() || user.login
    : "Unknown Collaborator";
  const permissionLabel =
    value.permission.charAt(0).toUpperCase() + value.permission.slice(1);
  const repoRoleLabel =
    value.role_name
      .replace(/_/g, " ")
      .replace(/\b\w/g, (ch) => ch.toUpperCase());
  // Avatar and fallback
  const rawAvatar = user?.avatar_url || "";
  const fallbackAvatar =
    user === null
      ? "https://placehold.co/48x48/e2e8f0/1e293b?text=?"
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          displayName
        )}&background=0D8ABC&color=fff`;
  const email = user?.email;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full p-4 bg-white rounded-lg shadow border border-gray-200">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={rawAvatar || fallbackAvatar}
            alt={displayName}
            className="w-full h-full object-cover"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackAvatar;
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-lg font-semibold text-gray-900 truncate">
            {displayName}
          </p>
          {user?.login && (
            <p className="text-sm text-gray-500 truncate">
              @{user.login}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded">
          <LucideReact.Shield size={12} className="mr-1" />
          {permissionLabel}
        </span>
        <span className="inline-flex items-center px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded">
          <LucideReact.User size={12} className="mr-1" />
          {repoRoleLabel}
        </span>
      </div>

      {email && (
        <div className="mt-3 flex items-center text-sm text-gray-500">
          <LucideReact.Mail size={14} className="mr-1" />
          <span className="truncate">{email}</span>
        </div>
      )}

      {user && (
        <div className="mt-2 flex items-center text-sm text-gray-500">
          {user.site_admin ? (
            <LucideReact.CheckCircle
              size={14}
              className="text-green-500 mr-1"
              aria-label="Site Admin"
            />
          ) : (
            <LucideReact.XCircle
              size={14}
              className="text-red-500 mr-1"
              aria-label="Not Site Admin"
            />
          )}
          <span>
            {user.site_admin ? "Site Admin" : "Regular User"}
          </span>
        </div>
      )}
    </div>
  );
}
