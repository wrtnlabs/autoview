import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Org Membership
     *
     * @title Org Membership
    */
    export type org_membership = {
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
    };
    /**
     * A GitHub organization.
     *
     * @title Organization Simple
    */
    export type organization_simple = {
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
export type AutoViewInput = AutoViewInputSubTypes.org_membership;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const membershipStateLabel = value.state === "active" ? "Active" : "Pending";
  const membershipStateColor =
    value.state === "active"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";

  const roleLabels: Record<AutoViewInputSubTypes.org_membership["role"], string> = {
    admin: "Admin",
    member: "Member",
    billing_manager: "Billing Manager",
  };
  const roleColors: Record<AutoViewInputSubTypes.org_membership["role"], string> = {
    admin: "bg-red-100 text-red-800",
    member: "bg-blue-100 text-blue-800",
    billing_manager: "bg-purple-100 text-purple-800",
  };
  const roleLabel = roleLabels[value.role];
  const roleColor = roleColors[value.role];

  const canCreateRepo = value.permissions?.can_create_repository;
  const permissionLabel = canCreateRepo
    ? "Repo Creation Allowed"
    : "Repo Creation Not Allowed";
  const permissionColor = canCreateRepo
    ? "bg-green-100 text-green-800"
    : "bg-gray-100 text-gray-800";

  const orgDescription = value.organization.description ?? "No description available";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      {/* Organization Section */}
      <div className="flex items-start">
        <img
          src={value.organization.avatar_url}
          alt={`${value.organization.login} avatar`}
          className="w-12 h-12 rounded-full mr-4 flex-shrink-0"
        />
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {value.organization.login}
          </h2>
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
            {orgDescription}
          </p>
        </div>
      </div>

      {/* Membership Badges */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span
          className={`px-2 py-1 text-xs font-medium rounded ${membershipStateColor}`}
        >
          {membershipStateLabel}
        </span>
        <span className={`px-2 py-1 text-xs font-medium rounded ${roleColor}`}>
          {roleLabel}
        </span>
        {value.permissions && (
          <span
            className={`px-2 py-1 text-xs font-medium rounded ${permissionColor}`}
          >
            {permissionLabel}
          </span>
        )}
      </div>

      {/* User Section */}
      <div className="mt-4">
        {value.user ? (
          <div className="flex items-center">
            <img
              src={value.user.avatar_url}
              alt={`${value.user.login} avatar`}
              className="w-10 h-10 rounded-full mr-3 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {value.user.name ?? value.user.login}
              </p>
              <p className="text-xs text-gray-500 truncate">
                @{value.user.login}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">User information not available</p>
        )}
      </div>
    </div>
  );
}
