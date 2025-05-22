import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput = AutoViewInputSubTypes.org_membership[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const memberships = value ?? [];

  // Helper: capitalize and title-case strings
  const titleCase = (str: string): string =>
    str
      .split(/[\s_]+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (memberships.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="text-gray-300" />
        <p className="mt-2 text-sm">No memberships found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {memberships.map((m, idx) => {
        const { organization, user, state, role, permissions } = m;
        const displayState = titleCase(state);
        const displayRole = titleCase(role);
        const displayUserName = user
          ? user.name?.trim() || user.login
          : "Unknown User";

        // Placeholder image for organization
        const orgFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          organization.login,
        )}&background=0D8ABC&color=fff`;

        // Placeholder image for user
        const userFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          displayUserName,
        )}&background=random`;

        return (
          <div
            key={idx}
            className="flex flex-col md:flex-row bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden"
          >
            <div className="flex-shrink-0 p-4 flex items-center justify-center">
              <img
                src={organization.avatar_url}
                alt={organization.login}
                onError={(e) => {
                  const img = e.currentTarget;
                  img.onerror = null;
                  img.src = orgFallback;
                }}
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {organization.login}
                </h3>
                {organization.description && (
                  <p className="mt-1 text-gray-600 text-sm line-clamp-2">
                    {organization.description}
                  </p>
                )}
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-700">
                {/* Membership State */}
                <div className="flex items-center">
                  {state === "active" ? (
                    <LucideReact.CheckCircle
                      className="text-green-500"
                      size={16}
                      aria-label="Active"
                    />
                  ) : (
                    <LucideReact.Clock
                      className="text-amber-500"
                      size={16}
                      aria-label="Pending"
                    />
                  )}
                  <span className="ml-1">{displayState}</span>
                </div>

                {/* Role */}
                <div className="flex items-center">
                  <LucideReact.BadgeCheck
                    className="text-blue-500"
                    size={16}
                    aria-label="Role"
                  />
                  <span className="ml-1">{displayRole}</span>
                </div>

                {/* User */}
                <div className="flex items-center">
                  <img
                    src={user?.avatar_url ?? userFallback}
                    alt={displayUserName}
                    onError={(e) => {
                      const img = e.currentTarget;
                      img.onerror = null;
                      img.src = userFallback;
                    }}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="ml-1">{displayUserName}</span>
                </div>

                {/* Permission */}
                {permissions?.can_create_repository && (
                  <div className="flex items-center">
                    <LucideReact.CheckCircle
                      className="text-green-500"
                      size={16}
                      aria-label="Can create repositories"
                    />
                    <span className="ml-1">Can create repos</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
