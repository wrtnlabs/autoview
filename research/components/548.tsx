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
    new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!value || value.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No organization invitations available.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {value.map((invitation) => {
        const {
          login,
          email,
          role,
          created_at,
          failed_at,
          failed_reason,
          inviter,
          team_count,
          invitation_source,
          node_id,
        } = invitation;

        // Derive display values
        const displayName = login ?? email ?? 'Unknown invitee';
        const status = failed_at ? 'Failed' : 'Pending';
        const statusClasses = failed_at
          ? 'text-red-700 bg-red-100'
          : 'text-blue-700 bg-blue-100';
        const teamLabel = `${team_count} ${team_count === 1 ? 'team' : 'teams'}`;

        return (
          <div
            key={node_id}
            className="p-4 bg-white rounded-lg shadow-md flex flex-col sm:flex-row sm:justify-between"
          >
            <div className="flex-1 space-y-1">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {displayName}
              </h3>
              <p className="text-sm text-gray-600 truncate capitalize">
                Role: {role}
              </p>
              <p className="text-sm text-gray-600">
                Invited by{' '}
                <span className="font-medium text-gray-800 truncate">
                  {inviter.login}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Created: {formatDate(created_at)}
              </p>
              {invitation_source && (
                <p className="text-sm text-gray-600 truncate">
                  Source: {invitation_source}
                </p>
              )}
              {failed_at && (
                <>
                  <p className="text-sm text-red-600">
                    Failed at: {formatDate(failed_at)}
                  </p>
                  {failed_reason && (
                    <p className="text-sm text-red-600 truncate">
                      Reason: {failed_reason}
                    </p>
                  )}
                </>
              )}
            </div>

            <div className="mt-3 sm:mt-0 flex items-start sm:items-center space-x-4">
              <span
                className={`px-2 py-0.5 text-xs font-medium rounded ${statusClasses}`}
              >
                {status}
              </span>
              <div className="text-sm text-gray-600">
                Teams: <span className="font-medium text-gray-800">{teamLabel}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
