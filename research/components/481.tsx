import * as LucideReact from "lucide-react";
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
  const user = value.user;
  const userName = user ? (user.name ?? user.login) : "Unknown User";
  const userAvatar =
    user?.avatar_url ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=0D8ABC&color=fff`;
  const onUserImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      userName,
    )}&background=0D8ABC&color=fff`;
  };

  const statusIcon =
    value.state === "active" ? (
      <LucideReact.CheckCircle className="text-green-500" size={16} />
    ) : (
      <LucideReact.Clock className="text-amber-500" size={16} />
    );
  const statusLabel =
    value.state === "active" ? "Active Member" : "Invitation Pending";

  const roleMap: Record<
    AutoViewInput["role"],
    { label: string; style: string }
  > = {
    admin: { label: "Administrator", style: "bg-blue-100 text-blue-800" },
    member: { label: "Member", style: "bg-gray-100 text-gray-800" },
    billing_manager: {
      label: "Billing Manager",
      style: "bg-purple-100 text-purple-800",
    },
  };
  const { label: roleLabel, style: roleStyle } = roleMap[value.role];

  const canCreateRepo = value.permissions?.can_create_repository;
  const permissionIcon =
    canCreateRepo === true ? (
      <LucideReact.CheckCircle className="text-green-500" size={16} />
    ) : canCreateRepo === false ? (
      <LucideReact.XCircle className="text-red-500" size={16} />
    ) : null;
  const permissionLabel =
    canCreateRepo === true
      ? "Can create repositories"
      : canCreateRepo === false
        ? "Cannot create repositories"
        : "";

  const org = value.organization;
  const orgName = org.login;
  const orgAvatar = org.avatar_url;
  const onOrgImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = `https://placehold.co/40?text=${encodeURIComponent(orgName)}`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow p-4 space-y-6">
      {/* User & Membership Info */}
      <div className="flex items-center space-x-4">
        <img
          src={userAvatar}
          alt={userName}
          className="w-16 h-16 rounded-full object-cover flex-shrink-0"
          onError={onUserImgError}
        />
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {userName}
          </h3>
          {user?.login && (
            <p className="text-sm text-gray-500">@{user.login}</p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <div className="flex items-center space-x-1">
              {statusIcon}
              <span className="text-sm text-gray-700">{statusLabel}</span>
            </div>
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded ${roleStyle}`}
            >
              {roleLabel}
            </span>
          </div>
          {permissionIcon && (
            <div className="mt-2 flex items-center space-x-1">
              {permissionIcon}
              <span className="text-xs text-gray-600">{permissionLabel}</span>
            </div>
          )}
        </div>
      </div>

      {/* Organization Info */}
      <div className="flex items-center space-x-3 border-t pt-4">
        <img
          src={orgAvatar}
          alt={orgName}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          onError={onOrgImgError}
        />
        <div className="flex-grow">
          <h4 className="text-md font-medium text-gray-800 truncate">
            {orgName}
          </h4>
          {org.description && (
            <p className="text-sm text-gray-500 line-clamp-2">
              {org.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
