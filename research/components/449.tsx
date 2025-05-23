import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Organization Invitation
     *
     * @title Organization Invitation
    */
    export interface organization_invitation {
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
    }
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export interface simple_user {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.organization_invitation[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const invitations = value;
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {invitations.length === 0 ? (
        <div className="flex flex-col items-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <span className="mt-2 text-lg">No invitations found</span>
        </div>
      ) : (
        invitations.map((inv) => {
          const hasFailed = Boolean(inv.failed_at);
          const statusLabel = hasFailed ? "Failed" : "Pending";
          const statusIcon = hasFailed ? (
            <LucideReact.XCircle size={16} className="text-red-500" />
          ) : (
            <LucideReact.Clock size={16} className="text-amber-500" />
          );

          return (
            <div
              key={inv.id}
              className="flex flex-col md:flex-row items-start md:items-center p-4 bg-white rounded-lg shadow"
            >
              {/* Inviter Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={inv.inviter.avatar_url}
                  alt={inv.inviter.login}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      inv.inviter.login,
                    )}&background=random`;
                  }}
                />
              </div>
              <div className="mt-2 md:mt-0 md:ml-4 flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Invitee */}
                <div>
                  <div className="flex items-center text-sm font-medium text-gray-900">
                    <LucideReact.User
                      size={16}
                      className="mr-1 text-gray-500"
                    />
                    {inv.login || inv.email || "N/A"}
                  </div>
                  {inv.email && (
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <LucideReact.Mail size={16} className="mr-1" />
                      <span className="truncate">{inv.email}</span>
                    </div>
                  )}
                </div>

                {/* Role */}
                <div>
                  <div className="text-sm text-gray-500">Role</div>
                  <span className="inline-block px-2 py-0.5 mt-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">
                    {inv.role}
                  </span>
                </div>

                {/* Created At */}
                <div>
                  <div className="text-sm text-gray-500">Invited On</div>
                  <div className="flex items-center mt-1 text-sm text-gray-700">
                    <LucideReact.Calendar
                      size={16}
                      className="mr-1 text-gray-400"
                    />
                    {formatDate(inv.created_at)}
                  </div>
                </div>

                {/* Status */}
                <div>
                  <div className="text-sm text-gray-500">Status</div>
                  <div className="flex items-center mt-1 text-sm text-gray-700">
                    {statusIcon}
                    <span className="ml-1">{statusLabel}</span>
                  </div>
                  {hasFailed && inv.failed_reason && (
                    <div
                      className="mt-1 text-xs text-red-500 line-clamp-1"
                      title={inv.failed_reason}
                    >
                      {inv.failed_reason}
                    </div>
                  )}
                </div>

                {/* Team Count */}
                <div>
                  <div className="text-sm text-gray-500">Teams</div>
                  <div className="flex items-center mt-1 text-sm text-gray-700">
                    <LucideReact.Users
                      size={16}
                      className="mr-1 text-gray-400"
                    />
                    <span>{inv.team_count}</span>
                  </div>
                </div>

                {/* Source */}
                {inv.invitation_source && (
                  <div className="sm:col-span-2">
                    <div className="text-sm text-gray-500">Source</div>
                    <div className="mt-1 text-sm text-gray-700 truncate">
                      {inv.invitation_source}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
