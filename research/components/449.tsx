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
export type AutoViewInput = AutoViewInputSubTypes.organization_invitation[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // Handle empty state
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2 text-sm">No invitations available.</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {value.map((invitation) => {
        const inviterName = invitation.inviter.name || invitation.inviter.login;
        const createdAt = formatDate(invitation.created_at);
        const status = invitation.failed_at ? "Failed" : "Pending";
        const statusIcon = invitation.failed_at ? (
          <LucideReact.AlertTriangle className="text-red-500" size={16} />
        ) : (
          <LucideReact.Clock className="text-amber-500" size={16} />
        );
        const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          inviterName,
        )}&background=0D8ABC&color=fff`;

        return (
          <div
            key={invitation.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LucideReact.User size={20} className="text-gray-500" />
                <span className="text-gray-900 font-medium truncate">
                  {invitation.login || "Unknown"}
                </span>
              </div>
              <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">
                {invitation.role}
              </span>
            </div>

            {invitation.email && (
              <div className="flex items-center gap-2 text-gray-600 text-sm truncate">
                <LucideReact.Mail size={16} />
                <span>{invitation.email}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <LucideReact.Calendar size={16} />
              <span>{createdAt}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              {statusIcon}
              <span
                className={
                  invitation.failed_at ? "text-red-600" : "text-amber-600"
                }
              >
                {status}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-auto pt-2 border-t border-gray-100">
              <img
                src={invitation.inviter.avatar_url}
                alt={inviterName}
                className="w-6 h-6 rounded-full object-cover"
                onError={(e) => {
                  const img = e.currentTarget;
                  img.onerror = null;
                  img.src = avatarFallback;
                }}
              />
              <span className="text-gray-700 text-sm truncate">
                Invited by {inviterName}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
