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
  const formatDate = (dateStr?: string | null): string =>
    dateStr
      ? new Date(dateStr).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "—";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (invitations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-lg">No invitations found</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {invitations.map((inv) => {
        const status = inv.failed_at ? "Failed" : "Pending";
        const statusIcon =
          status === "Failed" ? (
            <LucideReact.AlertTriangle className="text-red-500" size={16} />
          ) : (
            <LucideReact.Clock className="text-amber-500" size={16} />
          );
        const inviteeLabel = inv.login ?? inv.email ?? "Unknown user";

        return (
          <div
            key={inv.id}
            className="p-4 bg-white rounded-lg shadow flex flex-col"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <LucideReact.User size={20} className="text-gray-500" />
                <span className="text-lg font-medium text-gray-900 truncate">
                  {inviteeLabel}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium">
                {statusIcon}
                <span
                  className={
                    status === "Failed"
                      ? "text-red-600"
                      : "text-amber-600"
                  }
                >
                  {status}
                </span>
              </div>
            </div>

            <div className="mt-2 text-sm text-gray-500 flex items-center gap-1">
              <LucideReact.Calendar size={16} />
              <span>Invited on {formatDate(inv.created_at)}</span>
            </div>

            {inv.failed_at && (
              <div className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <LucideReact.AlertTriangle size={16} />
                <span>Failed on {formatDate(inv.failed_at)}</span>
              </div>
            )}

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
              <div className="flex items-center gap-1">
                <LucideReact.Crown size={16} />
                <span>Role: {inv.role}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Users size={16} />
                <span>Teams: {inv.team_count}</span>
              </div>
              {inv.invitation_source && (
                <div className="flex items-center gap-1">
                  <LucideReact.Tag size={16} />
                  <span>Source: {inv.invitation_source}</span>
                </div>
              )}
              <div className="flex items-center gap-2 col-span-full sm:col-auto">
                <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-100">
                  <img
                    src={inv.inviter.avatar_url}
                    alt={inv.inviter.login}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        inv.inviter.login,
                      )}&background=random`;
                    }}
                  />
                </div>
                <span>Invited by {inv.inviter.login}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
