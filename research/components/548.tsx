import * as LucideReact from "lucide-react";
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
export type AutoViewInput = AutoViewInputSubTypes.organization_invitation[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation and derived values
  const invitations = value;
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    If no invitations, show an empty state.
  if (invitations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-4" />
        <p className="text-lg">No invitations found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {invitations.map((invite) => {
        const displayName = invite.login ?? invite.email ?? "Unknown";
        const createdAt = formatDate(invite.created_at);
        const status = invite.failed_at ? "Failed" : "Pending";
        const StatusIcon = invite.failed_at
          ? LucideReact.AlertTriangle
          : LucideReact.Clock;
        const statusColor = invite.failed_at
          ? "text-red-500"
          : "text-amber-500";

        return (
          <div
            key={invite.id}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start space-x-3">
              <LucideReact.User size={24} className="text-gray-400 mt-1" />
              <div className="min-w-0">
                <p className="text-lg font-medium text-gray-900 dark:text-gray-100 truncate">
                  {displayName}
                </p>
                <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mt-1 space-x-2">
                  {invite.email && (
                    <div className="flex items-center gap-1">
                      <LucideReact.Mail size={16} />
                      <span className="truncate">{invite.email}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <LucideReact.Calendar size={16} />
                    <span>{createdAt}</span>
                  </div>
                  <div
                    className={`px-2 py-0.5 rounded text-xs font-medium bg-${status === "Failed" ? "red-100" : "amber-100"} ${
                      status === "Failed" ? "text-red-800" : "text-amber-800"
                    }`}
                  >
                    {invite.role}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm gap-1">
                <LucideReact.Users size={16} />
                <span>{invite.team_count} Teams</span>
              </div>
              <div className="flex items-center text-sm {statusColor} gap-1">
                <StatusIcon size={16} className={statusColor} />
                <span className={`font-medium ${statusColor}`}>{status}</span>
              </div>
            </div>
            {invite.failed_reason && (
              <p className="mt-2 sm:mt-0 sm:ml-6 text-sm text-red-600 dark:text-red-400 line-clamp-2">
                Reason: {invite.failed_reason}
              </p>
            )}
            <div className="w-full border-t border-gray-100 dark:border-gray-700 my-3 sm:hidden"></div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 sm:space-x-2">
              <span>Invited by</span>
              <LucideReact.User size={16} />
              <span className="truncate">{invite.inviter.login}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
