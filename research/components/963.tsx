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
  const { organization, user, state, role, permissions } = value;
  const displayName = user ? (user.name ?? user.login) : null;
  const description = organization.description;
  const roleLabelMap = {
    admin: "Admin",
    member: "Member",
    billing_manager: "Billing Manager",
  } as const;
  const roleLabel = roleLabelMap[role];
  const orgAvatarFallback = "https://placehold.co/100x100/e2e8f0/1e293b?text=Org";
  const userAvatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName ?? organization.login
  )}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 space-y-4">
        {/* Organization Section */}
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <img
              src={organization.avatar_url}
              alt={`${organization.login} avatar`}
              className="w-12 h-12 rounded-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = orgAvatarFallback;
              }}
            />
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-900">
                {organization.login}
              </h3>
              {description && (
                <p className="text-sm text-gray-500 line-clamp-2">
                  {description}
                </p>
              )}
            </div>
          </div>
          <div className="flex-shrink-0">
            {state === "active" ? (
              <LucideReact.CheckCircle
                className="text-green-500"
                size={20}
                aria-label="Active membership"
              />
            ) : (
              <LucideReact.Clock
                className="text-amber-500"
                size={20}
                aria-label="Pending membership"
              />
            )}
          </div>
        </div>

        {/* User Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center min-w-0">
            <img
              src={user?.avatar_url ?? userAvatarFallback}
              alt={displayName ? `${displayName} avatar` : "User avatar"}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src = userAvatarFallback;
              }}
            />
            <div className="ml-3 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {displayName ?? user?.login ?? "Unknown User"}
              </p>
              {user?.email && (
                <p className="text-xs text-gray-500 truncate">
                  {user.email}
                </p>
              )}
            </div>
          </div>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {roleLabel}
          </span>
        </div>

        {/* Permissions */}
        {permissions?.can_create_repository && (
          <div className="flex items-center text-green-600 text-sm">
            <LucideReact.Key
              className="mr-1"
              size={16}
              aria-label="Create repository permission"
            />
            <span>Can create repositories</span>
          </div>
        )}
      </div>
    </div>
  );
}
