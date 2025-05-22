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
  const user = value.user;
  const userDisplayName = user ? (user.name ?? user.login) : "Unknown User";
  const userAvatarUrl =
    user?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      userDisplayName,
    )}&background=0D8ABC&color=fff`;

  const org = value.organization;
  const orgName = org.login;
  const orgDescription = org.description || "No description provided";

  const stateMap = {
    active: {
      label: "Active",
      bg: "bg-green-100",
      text: "text-green-800",
      icon: <LucideReact.CheckCircle className="inline-block mr-1" size={16} />,
    },
    pending: {
      label: "Pending",
      bg: "bg-amber-100",
      text: "text-amber-800",
      icon: <LucideReact.Clock className="inline-block mr-1" size={16} />,
    },
  } as const;
  const stateInfo = stateMap[value.state];

  const roleMap = {
    admin: {
      label: "Admin",
      bg: "bg-purple-100",
      text: "text-purple-800",
      icon: <LucideReact.User className="inline-block mr-1" size={16} />,
    },
    member: {
      label: "Member",
      bg: "bg-blue-100",
      text: "text-blue-800",
      icon: <LucideReact.Users className="inline-block mr-1" size={16} />,
    },
    billing_manager: {
      label: "Billing Manager",
      bg: "bg-green-100",
      text: "text-green-800",
      icon: <LucideReact.DollarSign className="inline-block mr-1" size={16} />,
    },
  } as const;
  const roleInfo = roleMap[value.role];

  const canCreateRepo = value.permissions?.can_create_repository ?? false;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow p-4 space-y-4">
      {/* User Info */}
      <div className="flex items-center space-x-4">
        <img
          src={userAvatarUrl}
          alt={userDisplayName}
          className="w-10 h-10 rounded-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                userDisplayName,
              )}&background=0D8ABC&color=fff`;
          }}
        />
        <div className="flex flex-col">
          <span className="text-gray-900 font-semibold">{userDisplayName}</span>
          {user?.html_url && (
            <span className="flex items-center text-gray-500 text-sm">
              <LucideReact.Link className="mr-1" size={14} />
              {user.html_url.replace(/^https?:\/\//, "")}
            </span>
          )}
        </div>
      </div>

      {/* Organization Info */}
      <div className="flex items-center space-x-4">
        <img
          src={org.avatar_url}
          alt={orgName}
          className="w-10 h-10 rounded-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://placehold.co/40x40/f8fafc/475569?text=${encodeURIComponent(
                orgName,
              )}`;
          }}
        />
        <div className="flex-1">
          <span className="text-gray-900 font-semibold">{orgName}</span>
          <p className="text-gray-500 text-sm truncate line-clamp-2">
            {orgDescription}
          </p>
        </div>
      </div>

      {/* Membership Details */}
      <div className="flex flex-wrap gap-2">
        <span
          className={`inline-flex items-center ${stateInfo.bg} ${stateInfo.text} text-xs font-medium px-2 py-1 rounded-full`}
        >
          {stateInfo.icon}
          {stateInfo.label}
        </span>
        <span
          className={`inline-flex items-center ${roleInfo.bg} ${roleInfo.text} text-xs font-medium px-2 py-1 rounded-full`}
        >
          {roleInfo.icon}
          {roleInfo.label}
        </span>
        <span
          className={`inline-flex items-center ${
            canCreateRepo
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          } text-xs font-medium px-2 py-1 rounded-full`}
        >
          {canCreateRepo ? (
            <LucideReact.CheckCircle className="inline-block mr-1" size={16} />
          ) : (
            <LucideReact.XCircle className="inline-block mr-1" size={16} />
          )}
          {canCreateRepo ? "Can create repo" : "Cannot create repo"}
        </span>
      </div>
    </div>
  );
}
