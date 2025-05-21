import { tags } from "typia";
import React from "react";
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
  const formatDate = (iso: string): string => {
    try {
      return new Date(iso).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return iso;
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!Array.isArray(value) || value.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No invitations found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {value.map((invitation) => {
        const {
          id,
          login,
          email,
          role,
          created_at,
          failed_at,
          failed_reason,
          inviter,
          team_count,
        } = invitation;
        const invitee = login || email || "Unknown";
        const createdDate = formatDate(created_at);
        const failedDate = failed_at ? formatDate(failed_at) : null;
        const status = failed_at ? "Failed" : "Pending";
        const statusColor = failed_at
          ? "bg-red-100 text-red-800"
          : "bg-yellow-100 text-yellow-800";

        return (
          <div
            key={id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-lg shadow-md"
          >
            {/* Left: Invitee and Role */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {invitee}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Role:{" "}
                <span className="font-medium text-gray-700">{role}</span>
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Created:{" "}
                <time dateTime={created_at} className="font-medium">
                  {createdDate}
                </time>
              </p>
              {failed_at && failed_reason && (
                <p className="mt-1 text-sm text-red-600">
                  Reason: <span className="font-medium">{failed_reason}</span>
                </p>
              )}
            </div>

            {/* Right: Status, Teams, Inviter */}
            <div className="mt-4 sm:mt-0 sm:ml-6 flex flex-col sm:items-end space-y-2">
              <span
                className={`inline-block px-2 py-1 text-xs font-medium rounded ${statusColor}`}
              >
                {status}
              </span>
              <span className="text-sm text-gray-600">
                Teams invited: <span className="font-medium">{team_count}</span>
              </span>
              <div className="flex items-center space-x-2">
                <img
                  src={inviter.avatar_url}
                  alt={inviter.login}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-sm text-gray-700 truncate">
                  {inviter.name || inviter.login}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
