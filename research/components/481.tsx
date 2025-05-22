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
  const {
    organization,
    state,
    role,
    user,
    permissions,
  } = value;

  const stateLabel = state === "active" ? "Active" : "Pending";
  const stateColor =
    state === "active"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";

  const roleLabel =
    role === "admin"
      ? "Admin"
      : role === "billing_manager"
      ? "Billing Manager"
      : "Member";

  const roleColor =
    role === "admin"
      ? "bg-blue-100 text-blue-800"
      : role === "billing_manager"
      ? "bg-purple-100 text-purple-800"
      : "bg-gray-100 text-gray-800";

  const orgDescription = organization.description ?? "";
  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-md w-full mx-auto">
      {/* Organization Header */}
      <div className="flex items-center space-x-4">
        <img
          src={organization.avatar_url}
          alt={`${organization.login} avatar`}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1 overflow-hidden">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {organization.login}
          </h2>
          {orgDescription && (
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">
              {orgDescription}
            </p>
          )}
        </div>
      </div>

      {/* Divider */}
      <hr className="my-4 border-gray-200" />

      {/* Membership Status & Role */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${stateColor}`}
        >
          {stateLabel}
        </span>
        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${roleColor}`}
        >
          {roleLabel}
        </span>
      </div>

      {/* User Info */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Member Details
        </h3>
        {user ? (
          <div className="flex items-center space-x-3">
            <img
              src={user.avatar_url}
              alt={`${user.login} avatar`}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.name ?? user.login}
              </p>
              <p className="text-xs text-gray-500 truncate">
                @{user.login}
              </p>
              {user.email && (
                <p className="text-xs text-gray-500">{user.email}</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No user information available.</p>
        )}
      </div>

      {/* Permissions */}
      {permissions && permissions.can_create_repository && (
        <div className="mt-4">
          <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-indigo-100 text-indigo-800">
            Can create repositories
          </span>
        </div>
      )}
    </div>
  );
}
