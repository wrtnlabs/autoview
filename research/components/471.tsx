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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const invitations = value;

  const formatDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const avatarFallback = (user: AutoViewInputSubTypes.simple_user): string =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      `${user.name ?? user.login}`,
    )}&background=random`;

  // 2. Handle empty state
  if (!invitations || invitations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-2 text-sm">No invitations found</p>
      </div>
    );
  }

  // 3. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="bg-white rounded-lg shadow-md">
      <ul className="divide-y divide-gray-200">
        {invitations.map((invite) => {
          const isFailed = invite.failed_at != null;
          const statusText = isFailed ? "Failed" : "Pending";
          const StatusIcon = isFailed
            ? LucideReact.AlertTriangle
            : LucideReact.Clock;
          const statusColor = isFailed ? "text-red-500" : "text-amber-500";
          const identifier = invite.login ?? invite.email ?? "Unknown user";
          return (
            <li
              key={invite.id}
              className="px-4 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={invite.inviter.avatar_url}
                  alt={`${invite.inviter.name ?? invite.inviter.login}'s avatar`}
                  className="w-8 h-8 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = avatarFallback(invite.inviter);
                  }}
                />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {identifier}
                  </p>
                  <div className="flex items-center text-xs text-gray-500 space-x-1">
                    <LucideReact.User className="text-gray-400" size={14} />
                    <span className="truncate">
                      Invited by {invite.inviter.name ?? invite.inviter.login}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-3 sm:mt-0 flex flex-wrap items-center gap-4">
                <span className="flex items-center text-xs text-gray-500">
                  <LucideReact.Tag className="mr-1" size={14} />
                  <span className="capitalize">{invite.role}</span>
                </span>
                <span className="flex items-center text-xs text-gray-500">
                  <LucideReact.Users className="mr-1" size={14} />
                  {invite.team_count}
                </span>
                <span className={`flex items-center text-xs ${statusColor}`}>
                  <StatusIcon className="mr-1" size={14} />
                  {statusText}
                </span>
                <span className="flex items-center text-xs text-gray-500">
                  <LucideReact.Calendar className="mr-1" size={14} />
                  {formatDate(invite.created_at)}
                </span>
              </div>
              {isFailed && invite.failed_reason && (
                <p className="mt-2 sm:mt-1 text-xs text-red-500 truncate max-w-full">
                  Reason: {invite.failed_reason}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
