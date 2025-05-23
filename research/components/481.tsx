import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Org Membership
     *
     * @title Org Membership
    */
    export interface org_membership {
        url: string & tags.Format<"uri">;
        /**
         * The state of the member in the organization. The `pending` state indicates the user has not yet accepted an invitation.
        */
        state: "active" | "pending";
        /**
         * The user's membership type in the organization.
        */
        role: "admin" | "member" | "billing_manager";
        organization_url: string & tags.Format<"uri">;
        organization: AutoViewInputSubTypes.organization_simple;
        user: AutoViewInputSubTypes.nullable_simple_user;
        permissions?: {
            can_create_repository: boolean;
        };
    }
    /**
     * A GitHub organization.
     *
     * @title Organization Simple
    */
    export interface organization_simple {
        login: string;
        id: number & tags.Type<"int32">;
        node_id: string;
        url: string & tags.Format<"uri">;
        repos_url: string & tags.Format<"uri">;
        events_url: string & tags.Format<"uri">;
        hooks_url: string;
        issues_url: string;
        members_url: string;
        public_members_url: string;
        avatar_url: string;
        description: string | null;
    }
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
export type AutoViewInput = AutoViewInputSubTypes.org_membership;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const user = value.user;
  const userName = user ? user.name || user.login : "Unknown User";
  const org = value.organization;
  const orgName = org.login;
  const orgDesc = org.description;
  const stateIcon = value.state === "active" ? (
    <LucideReact.CheckCircle className="text-green-500" size={16} />
  ) : (
    <LucideReact.Clock className="text-amber-500" size={16} />
  );
  const roleLabel = value.role
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  const fallbackUserAvatar = user
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
        userName
      )}&background=0D8ABC&color=fff`
    : `https://placehold.co/48x48/e2e8f0/1e293b?text=?`;
  const fallbackOrgAvatar = `https://placehold.co/80x80/f8fafc/475569?text=${encodeURIComponent(
    orgName
  )}`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="max-w-sm w-full p-4 bg-white rounded-lg shadow-md">
      {/* User Section */}
      <div className="flex items-center">
        <img
          src={user?.avatar_url || fallbackUserAvatar}
          alt={userName}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = fallbackUserAvatar;
          }}
        />
        <div className="ml-4 flex-1 min-w-0">
          <div className="text-lg font-semibold text-gray-900 flex items-center gap-2 truncate">
            <LucideReact.User className="text-gray-500" size={16} />
            <span className="truncate">{userName}</span>
          </div>
          {user?.html_url && (
            <div className="flex items-center text-sm text-gray-500 gap-1 truncate">
              <LucideReact.Link size={12} />
              <span className="truncate">{user.html_url}</span>
            </div>
          )}
        </div>
      </div>

      {/* Organization Section */}
      <div className="mt-4 flex items-start">
        <img
          src={org.avatar_url}
          alt={orgName}
          className="w-10 h-10 rounded-md object-cover flex-shrink-0"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = fallbackOrgAvatar;
          }}
        />
        <div className="ml-3 flex-1 min-w-0">
          <div className="text-md font-semibold text-gray-900 flex items-center gap-2 truncate">
            <LucideReact.Building className="text-gray-500" size={16} />
            <span className="truncate">{orgName}</span>
          </div>
          {orgDesc && (
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">
              {orgDesc}
            </p>
          )}
        </div>
      </div>

      {/* Membership Status and Role */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-1">
          {stateIcon}
          <span className="capitalize text-gray-700">{value.state}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Tag className="text-blue-500" size={16} />
          <span className="text-gray-700">{roleLabel}</span>
        </div>
      </div>

      {/* Permissions */}
      {value.permissions?.can_create_repository !== undefined && (
        <div className="mt-3 flex items-center text-sm">
          {value.permissions.can_create_repository ? (
            <>
              <LucideReact.GitBranch
                className="text-green-500"
                size={16}
                strokeWidth={1.5}
              />
              <span className="ml-1 text-gray-700">
                Can create repositories
              </span>
            </>
          ) : (
            <>
              <LucideReact.Lock
                className="text-red-500"
                size={16}
                strokeWidth={1.5}
              />
              <span className="ml-1 text-gray-700">
                No repository permissions
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
