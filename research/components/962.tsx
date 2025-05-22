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
export type AutoViewInput = AutoViewInputSubTypes.org_membership;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const membershipStateIcon =
    value.state === "active" ? (
      <LucideReact.CheckCircle
        className="text-green-500"
        size={16}
        aria-label="Active membership"
      />
    ) : (
      <LucideReact.Clock
        className="text-amber-500"
        size={16}
        aria-label="Pending membership"
      />
    );

  const org = value.organization;
  const orgAvatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    org.login,
  )}&background=0D8ABC&color=fff`;
  const orgDescription = org.description ?? "No description available";
  const truncatedDescription = orgDescription;

  const user = value.user;
  const userName = user ? (user.name ?? user.login) : "Unknown User";
  const userAvatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    userName,
  )}&background=random&color=fff`;

  // Capitalize and prettify role
  const prettyRole = value.role
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Organization Header */}
      <div className="flex items-start mb-4">
        <img
          src={org.avatar_url}
          alt={org.login}
          className="w-12 h-12 rounded-full object-cover mr-4 flex-shrink-0"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = orgAvatarFallback;
          }}
        />
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-800">{org.login}</h2>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {truncatedDescription}
          </p>
        </div>
      </div>

      {/* Membership State & Role */}
      <div className="flex items-center text-sm text-gray-700 mb-4">
        {membershipStateIcon}
        <span className="ml-1 capitalize">{value.state}</span>
        <span className="mx-2">|</span>
        <LucideReact.User className="text-gray-500" size={16} />
        <span className="ml-1">{prettyRole}</span>
      </div>

      {/* Organization URL */}
      <div className="flex items-center text-sm text-gray-600 mb-4 truncate">
        <LucideReact.Link className="text-gray-400" size={16} />
        <span className="ml-1">{value.organization_url}</span>
      </div>

      {/* User Info */}
      {user && (
        <div className="flex items-center mb-4">
          <img
            src={user.avatar_url}
            alt={userName}
            className="w-10 h-10 rounded-full object-cover mr-3 flex-shrink-0"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = userAvatarFallback;
            }}
          />
          <div className="text-sm">
            <div className="font-medium text-gray-800">{userName}</div>
            {user.email && (
              <div className="flex items-center text-gray-500 mt-1">
                <LucideReact.Mail
                  size={14}
                  className="text-gray-400 flex-shrink-0"
                />
                <span className="ml-1 truncate">{user.email}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Permissions */}
      {value.permissions && (
        <div className="flex items-center text-sm text-gray-700">
          {value.permissions.can_create_repository ? (
            <LucideReact.CheckCircle
              className="text-green-500"
              size={16}
              aria-label="Permission granted"
            />
          ) : (
            <LucideReact.XCircle
              className="text-red-500"
              size={16}
              aria-label="Permission denied"
            />
          )}
          <span className="ml-2">Can create repository</span>
        </div>
      )}
    </div>
  );
}
