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
  const invitations = value ?? [];

  const formatDate = (iso: string): string => {
    const date = new Date(iso);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (invitations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <span>No invitations found</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <div className="hidden md:grid md:grid-cols-6 gap-4 px-4 py-2 text-sm font-semibold text-gray-500 uppercase">
        <div>Invitee</div>
        <div>Role</div>
        <div>Teams</div>
        <div>Invited By</div>
        <div>Date</div>
        <div>Status</div>
      </div>
      <div className="divide-y">
        {invitations.map((inv) => {
          const inviteeLabel = inv.login ?? inv.email ?? "N/A";
          const inviteeIcon = inv.login ? (
            <LucideReact.User size={16} className="text-gray-400" />
          ) : (
            <LucideReact.Mail size={16} className="text-gray-400" />
          );
          const createdDate = formatDate(inv.created_at);
          const statusIcon = inv.failed_at ? (
            <LucideReact.AlertTriangle size={16} className="text-red-500" />
          ) : (
            <LucideReact.Clock size={16} className="text-amber-500" />
          );
          const statusText = inv.failed_at ? "Failed" : "Pending";

          return (
            <div
              key={inv.id}
              className="grid grid-cols-1 md:grid-cols-6 gap-4 px-4 py-3 items-center"
            >
              <div className="flex items-center space-x-2">
                {inviteeIcon}
                <span className="text-gray-900 truncate">{inviteeLabel}</span>
              </div>
              <div className="text-gray-700 truncate">{inv.role}</div>
              <div className="flex items-center space-x-1">
                <LucideReact.Users size={16} className="text-gray-500" />
                <span>{inv.team_count}</span>
              </div>
              <div className="flex items-center space-x-2">
                <img
                  src={inv.inviter.avatar_url}
                  alt={`${inv.inviter.login} avatar`}
                  className="w-6 h-6 rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(inv.inviter.login)}&background=0D8ABC&color=fff`;
                  }}
                />
                <span className="text-gray-900 truncate">
                  {inv.inviter.login}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <LucideReact.Calendar size={16} className="text-gray-400" />
                <span className="text-gray-700">{createdDate}</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1">
                  {statusIcon}
                  <span
                    className={`font-medium ${inv.failed_at ? "text-red-600" : "text-amber-600"}`}
                  >
                    {statusText}
                  </span>
                </div>
                {inv.failed_reason && (
                  <span className="text-sm text-gray-500 truncate">
                    {inv.failed_reason}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
