import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Organization Invitation
   *
   * @title Organization Invitation
   */
  export type organization_invitation = {
    id: number & tags.Type<"int32">;
    login: string | null;
    email: string | null;
    role: string;
    created_at: string;
    failed_at?: string | null;
    failed_reason?: string | null;
    inviter: AutoViewInputSubTypes.simple_user;
    team_count: number & tags.Type<"int32">;
    node_id: string;
    invitation_teams_url: string;
    invitation_source?: string;
  };
  /**
   * A GitHub user.
   *
   * @title Simple User
   */
  export type simple_user = {
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
  };
}
export type AutoViewInput = AutoViewInputSubTypes.organization_invitation;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const displayLogin = value.login ?? "N/A";
  const formattedDate = new Date(value.created_at).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );
  const isFailed = Boolean(value.failed_at);
  const statusText = isFailed ? "Failed" : "Pending";
  const statusIcon = isFailed ? (
    <LucideReact.XCircle className="text-red-500" size={16} />
  ) : (
    <LucideReact.Clock className="text-amber-500" size={16} />
  );
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    value.inviter.login,
  )}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm p-4 bg-white rounded-lg shadow-md space-y-3">
      {/* Header: Invited User and Role */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LucideReact.User className="text-gray-500" size={20} />
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {displayLogin}
          </h3>
        </div>
        <div className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded">
          {value.role}
        </div>
      </div>

      {/* Email */}
      {value.email && (
        <div className="flex items-center text-gray-600 text-sm truncate">
          <LucideReact.Mail size={16} />
          <span className="ml-1">{value.email}</span>
        </div>
      )}

      {/* Status and Date */}
      <div className="flex items-center text-sm text-gray-700 space-x-2">
        <div className="flex items-center gap-1">
          {statusIcon}
          <span className={isFailed ? "text-red-600" : "text-amber-700"}>
            {statusText}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar className="text-gray-400" size={16} />
          <span className="text-gray-600">{formattedDate}</span>
        </div>
      </div>

      {/* Failure Reason */}
      {isFailed && value.failed_reason && (
        <p className="text-xs text-red-600 line-clamp-2">
          {value.failed_reason}
        </p>
      )}

      {/* Team Count */}
      <div className="flex items-center text-sm text-gray-700">
        <LucideReact.Users className="text-gray-500" size={16} />
        <span className="ml-1">
          {value.team_count} team{value.team_count !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Invitation Source */}
      {value.invitation_source && (
        <div className="text-xs text-gray-500">
          Source: {value.invitation_source}
        </div>
      )}

      {/* Inviter Info */}
      <div className="flex items-center mt-2">
        <img
          src={value.inviter.avatar_url}
          alt={value.inviter.login}
          className="w-8 h-8 rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = avatarFallback;
          }}
        />
        <span className="ml-2 text-sm text-gray-800 truncate">
          Invited by {value.inviter.login}
        </span>
      </div>
    </div>
  );
}
