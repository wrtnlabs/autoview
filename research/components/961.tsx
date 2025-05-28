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
export type AutoViewInput = AutoViewInputSubTypes.org_membership[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // No hooks needed; transforming and formatting data inline.

  // Helper to format role labels
  const formatRole = (role: AutoViewInputSubTypes.org_membership["role"]): string =>
    role
      .split("_")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {value.length === 0 ? (
        <div className="col-span-full flex flex-col items-center py-8 text-gray-500">
          <LucideReact.AlertCircle size={48} />
          <p className="mt-2 text-sm">No organization memberships available</p>
        </div>
      ) : (
        value.map((membership) => {
          const { organization, state, role, permissions } = membership;
          // Determine badge styles for role
          const badgeClasses =
            role === "admin"
              ? "bg-red-100 text-red-800"
              : role === "billing_manager"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-800";

          return (
            <div
              key={organization.id}
              className="flex flex-col bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                  <img
                    src={organization.avatar_url}
                    alt={`${organization.login} avatar`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://placehold.co/48x48?text=Org";
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {organization.login}
                  </h3>
                  {organization.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                      {organization.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded ${badgeClasses}`}
                >
                  {formatRole(role)}
                </span>
                <div className="flex items-center gap-1">
                  {state === "active" ? (
                    <LucideReact.CheckCircle
                      size={16}
                      className="text-green-500"
                      aria-label="Active membership"
                    />
                  ) : (
                    <LucideReact.Clock
                      size={16}
                      className="text-amber-500"
                      aria-label="Pending membership"
                    />
                  )}
                  <span className="text-sm text-gray-700">
                    {state === "active" ? "Active" : "Pending"}
                  </span>
                </div>
              </div>

              {permissions && (
                <div className="mt-3 flex items-center text-sm text-gray-700">
                  {permissions.can_create_repository ? (
                    <LucideReact.CheckCircle
                      size={16}
                      className="text-green-500 mr-1"
                      aria-label="Can create repositories"
                    />
                  ) : (
                    <LucideReact.XCircle
                      size={16}
                      className="text-red-500 mr-1"
                      aria-label="Cannot create repositories"
                    />
                  )}
                  <span>
                    {permissions.can_create_repository
                      ? "Can create repositories"
                      : "Cannot create repositories"}
                  </span>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
