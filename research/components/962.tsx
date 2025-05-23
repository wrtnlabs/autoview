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
  const displayName = value.user
    ? value.user.name || value.user.login
    : "Unknown User";
  const userAvatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName
  )}&background=0D8ABC&color=fff`;
  const org = value.organization;
  const stateLabel = value.state === "active" ? "Active" : "Pending";
  const roleLabels: Record<AutoViewInput["role"], string> = {
    admin: "Admin",
    member: "Member",
    billing_manager: "Billing Manager",
  };
  const roleLabel = roleLabels[value.role];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* User & Organization Header */}
      <div className="flex items-center justify-between">
        {/* User Info */}
        <div className="flex items-center space-x-3">
          <img
            src={value.user?.avatar_url ?? userAvatarFallback}
            alt={displayName}
            className="w-12 h-12 rounded-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = userAvatarFallback;
            }}
          />
          <div className="min-w-0">
            <p className="text-base font-medium text-gray-900 truncate">
              {displayName}
            </p>
            {value.user?.login && (
              <p className="text-sm text-gray-500 truncate">
                @{value.user.login}
              </p>
            )}
          </div>
        </div>
        {/* Organization Info */}
        <div className="flex items-center space-x-3">
          <img
            src={org.avatar_url}
            alt={org.login}
            className="w-12 h-12 rounded-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://placehold.co/80x80/f1f5f9/64748b?text=Org";
            }}
          />
          <div className="min-w-0">
            <p className="text-base font-medium text-gray-900 truncate">
              {org.login}
            </p>
          </div>
        </div>
      </div>

      {/* Organization Description */}
      {org.description != null && (
        <p className="mt-3 text-sm text-gray-600 line-clamp-2">
          {org.description}
        </p>
      )}

      {/* Membership Details */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* State */}
        <div className="flex items-center">
          {value.state === "active" ? (
            <LucideReact.CheckCircle
              size={16}
              className="text-green-500"
              aria-label="Active"
            />
          ) : (
            <LucideReact.Clock
              size={16}
              className="text-amber-500"
              aria-label="Pending"
            />
          )}
          <span className="ml-2 text-sm text-gray-700">{stateLabel}</span>
        </div>

        {/* Role */}
        <div className="flex items-center">
          <LucideReact.Tag size={16} className="text-blue-500" />
          <span className="ml-2 text-sm text-gray-700">{roleLabel}</span>
        </div>

        {/* Permission: Create Repository */}
        {value.permissions && (
          <div className="flex items-center">
            {value.permissions.can_create_repository ? (
              <LucideReact.CheckSquare
                size={16}
                className="text-green-500"
                aria-label="Can create repositories"
              />
            ) : (
              <LucideReact.XCircle
                size={16}
                className="text-red-500"
                aria-label="Cannot create repositories"
              />
            )}
            <span className="ml-2 text-sm text-gray-700">
              Create Repositories
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
