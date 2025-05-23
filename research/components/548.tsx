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
  // Fallback avatar on image error
  const handleAvatarError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const name = encodeURIComponent(e.currentTarget.alt || "");
    e.currentTarget.src = `https://ui-avatars.com/api/?name=${name}&background=0D8ABC&color=fff`;
  };

  // If no invitations, show empty state
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <span className="text-sm">No invitations available.</span>
      </div>
    );
  }

  // Compose list of invitation cards
  return (
    <div className="space-y-4">
      {value.map((inv) => {
        const createdDate = new Date(inv.created_at).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        const failedDate = inv.failed_at
          ? new Date(inv.failed_at).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : null;
        const statusIcon = failedDate ? (
          <LucideReact.AlertTriangle size={16} className="text-red-500" />
        ) : (
          <LucideReact.Clock size={16} className="text-amber-500" />
        );
        const statusText = failedDate ? "Failed" : "Pending";
        return (
          <div
            key={inv.id}
            className="p-4 bg-white rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            {/* Left: Invitee Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <LucideReact.User size={20} className="text-gray-400" />
                <span className="font-medium text-blue-600 truncate">{inv.login ?? "Unknown"}</span>
              </div>
              {inv.email && (
                <div className="flex items-center text-gray-600 text-sm truncate">
                  <LucideReact.Mail size={16} className="text-gray-400" />
                  <span className="ml-1">{inv.email}</span>
                </div>
              )}
              <div className="flex items-center text-gray-600 text-sm mt-1">
                <LucideReact.Tag size={16} className="text-gray-400" />
                <span className="ml-1 capitalize">{inv.role}</span>
              </div>
            </div>

            {/* Middle: Meta Info */}
            <div className="mt-4 sm:mt-0 sm:mx-6 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <LucideReact.Calendar size={16} className="text-gray-400" />
                <span className="ml-1">{createdDate}</span>
              </div>
              {failedDate && (
                <div className="flex items-center">
                  {statusIcon}
                  <span className="ml-1">{`${statusText} on ${failedDate}`}</span>
                </div>
              )}
              {!failedDate && (
                <div className="flex items-center">
                  {statusIcon}
                  <span className="ml-1">{statusText}</span>
                </div>
              )}
              <div className="flex items-center">
                <LucideReact.Users size={16} className="text-gray-400" />
                <span className="ml-1">{inv.team_count}</span>
              </div>
              {inv.invitation_source && (
                <div className="flex items-center">
                  <LucideReact.Info size={16} className="text-gray-400" />
                  <span className="ml-1 capitalize truncate">{inv.invitation_source}</span>
                </div>
              )}
            </div>

            {/* Right: Inviter Info */}
            <div className="mt-4 sm:mt-0 flex items-center">
              <img
                src={inv.inviter.avatar_url}
                alt={inv.inviter.login}
                onError={handleAvatarError}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="ml-2 text-gray-700 text-sm truncate">{inv.inviter.login}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
