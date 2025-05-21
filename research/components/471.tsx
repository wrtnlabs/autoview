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
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  if (!value || value.length === 0) {
    return (
      <div className="text-center text-gray-500 py-6">
        No invitations available.
      </div>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <ul className="space-y-4">
      {value.map((inv) => {
        const statusLabel = inv.failed_at ? "Failed" : "Pending";
        const statusColor = inv.failed_at
          ? "bg-red-100 text-red-800"
          : "bg-yellow-100 text-yellow-800";
        const inviterName = inv.inviter.name ?? inv.inviter.login;

        return (
          <li
            key={inv.id}
            className="p-4 bg-white rounded-lg shadow flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <img
              src={inv.inviter.avatar_url}
              alt={`${inviterName} avatar`}
              className="w-12 h-12 rounded-full flex-shrink-0"
            />
            <div className="flex-1 w-full">
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {inv.login}
                  </h3>
                  {inv.email && (
                    <p className="text-sm text-gray-500 truncate">
                      {inv.email}
                    </p>
                  )}
                </div>
                <span
                  className={`${statusColor} inline-block px-2 py-0.5 text-xs font-semibold rounded`}
                >
                  {statusLabel}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap text-sm text-gray-600 gap-x-4 gap-y-1">
                <span>
                  Role:{" "}
                  <span className="font-medium text-gray-800">{inv.role}</span>
                </span>
                <span>
                  Teams:{" "}
                  <span className="font-medium text-gray-800">
                    {inv.team_count}
                  </span>
                </span>
                <span>
                  Invited by:{" "}
                  <span className="font-medium text-gray-800">
                    {inviterName}
                  </span>
                </span>
                <span>
                  Date:{" "}
                  <span className="font-medium text-gray-800">
                    {formatDate(inv.created_at)}
                  </span>
                </span>
                {inv.invitation_source && (
                  <span>
                    Source:{" "}
                    <span className="font-medium text-gray-800">
                      {inv.invitation_source}
                    </span>
                  </span>
                )}
              </div>
              {inv.failed_at && inv.failed_reason && (
                <p className="mt-2 text-sm text-red-600">
                  Reason: {inv.failed_reason}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
