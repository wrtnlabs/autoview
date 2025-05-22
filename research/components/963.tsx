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
  const org = value.organization;
  const user = value.user;
  const stateLabel = value.state === "active" ? "Active" : "Pending";
  const stateClasses =
    value.state === "active"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  const roleLabel =
    value.role === "admin"
      ? "Admin"
      : value.role === "billing_manager"
      ? "Billing Manager"
      : "Member";
  const canCreateRepo = value.permissions?.can_create_repository ?? false;
  const description = org.description ?? "";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Organization header */}
      <div className="flex items-center space-x-4">
        <img
          src={org.avatar_url}
          alt={`${org.login} avatar`}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {org.login}
          </h2>
          <p className="text-gray-500 text-sm truncate">{org.url}</p>
        </div>
      </div>

      {/* Organization description */}
      {description && (
        <p className="text-gray-700 text-sm mt-2 line-clamp-2">
          {description}
        </p>
      )}

      {/* Membership state and user info */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-3">
          <img
            src={user?.avatar_url ?? ""}
            alt={`${user?.login ?? "Unknown User"} avatar`}
            className="w-8 h-8 rounded-full object-cover"
          />
          <p className="text-gray-900 text-sm font-medium truncate">
            {user?.login ?? "Unknown User"}
          </p>
        </div>
        <span
          className={`px-2 py-0.5 text-xs font-semibold rounded-full ${stateClasses}`}
        >
          {stateLabel}
        </span>
      </div>

      {/* Role and permissions */}
      <div className="flex items-center justify-between mt-3">
        <span className="px-2 py-0.5 text-xs font-semibold text-indigo-800 bg-indigo-100 rounded-full">
          {roleLabel}
        </span>
        {canCreateRepo && (
          <p className="text-green-600 text-xs font-medium">
            ✓ Can create repository
          </p>
        )}
      </div>
    </div>
  );
}
