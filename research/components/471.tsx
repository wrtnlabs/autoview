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
  const invitations = value.map((inv) => {
    const inviteeName = inv.login ?? inv.email ?? "Unknown";
    const formattedCreatedAt = new Date(inv.created_at).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
    const isFailed = Boolean(inv.failed_at);
    const statusText = isFailed ? "Failed" : "Sent";
    const statusIcon = isFailed ? (
      <LucideReact.AlertTriangle
        className="text-red-500"
        size={16}
        aria-label="Failed invitation"
      />
    ) : (
      <LucideReact.CheckCircle
        className="text-green-500"
        size={16}
        aria-label="Invitation sent"
      />
    );

    return (
      <article key={inv.id} className="p-4 bg-white rounded-lg shadow space-y-2">
        {/* Header: Invitee + Role + Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 overflow-hidden">
            <LucideReact.User className="text-gray-400 flex-shrink-0" size={20} />
            <span className="font-semibold text-gray-900 truncate">{inviteeName}</span>
            <span className="px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800 rounded">
              {inv.role}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            {statusIcon}
            <span className={`text-sm ${isFailed ? "text-red-600" : "text-green-600"}`}>
              {statusText}
            </span>
          </div>
        </div>

        {/* Metadata: Date, Source, Team Count */}
        <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <LucideReact.Calendar size={16} />
            <span>{formattedCreatedAt}</span>
          </div>
          {inv.invitation_source && (
            <div className="flex items-center space-x-1">
              <LucideReact.Link size={16} />
              <span>{inv.invitation_source}</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <LucideReact.Users size={16} />
            <span>
              {inv.team_count} Team{inv.team_count !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Inviter Info */}
        <div className="flex items-center space-x-2 text-sm text-gray-700">
          <img
            src={inv.inviter.avatar_url}
            alt={`${inv.inviter.login} avatar`}
            className="w-6 h-6 rounded-full object-cover"
            onError={(e) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                inv.inviter.login
              )}&background=random`;
            }}
          />
          <span>Invited by {inv.inviter.login}</span>
        </div>

        {/* Failure Reason */}
        {isFailed && inv.failed_reason && (
          <div className="text-sm text-red-600">Reason: {inv.failed_reason}</div>
        )}
      </article>
    );
  });

  // 3. Return the React element.
  if (value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2">No invitations available.</span>
      </div>
    );
  }

  return <div className="space-y-4">{invitations}</div>;
}
