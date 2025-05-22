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
      dateStyle: "medium",
      timeStyle: "short",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="space-y-4">
      {value.length === 0 ? (
        <p className="text-center text-gray-500">No invitations available.</p>
      ) : (
        value.map((inv) => {
          const displayName = inv.login ?? inv.email ?? "—";
          const inviterName = inv.inviter.name ?? inv.inviter.login;
          const status = inv.failed_at ? "Failed" : "Pending";
          const statusColor = inv.failed_at
            ? "text-red-600 bg-red-100"
            : "text-blue-600 bg-blue-100";

          return (
            <div
              key={inv.id}
              className="flex flex-col sm:flex-row items-start sm:items-center p-4 bg-white rounded-lg shadow"
            >
              <img
                src={inv.inviter.avatar_url}
                alt={`${inviterName} avatar`}
                className="w-10 h-10 rounded-full mr-4 flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {displayName}
                  </h3>
                  <span
                    className={`px-2 py-1 text-sm font-medium ${statusColor} rounded`}
                  >
                    {status}
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Role:</span> {inv.role}
                  </div>
                  <div>
                    <span className="font-medium">Teams:</span> {inv.team_count}
                  </div>
                  <div>
                    <span className="font-medium">Invited by:</span> {inviterName}
                  </div>
                  <div>
                    <span className="font-medium">Created:</span> {formatDate(inv.created_at)}
                  </div>
                </div>
                {inv.failed_at && inv.failed_reason && (
                  <p className="mt-2 text-sm text-red-500">
                    <span className="font-medium">Reason:</span> {inv.failed_reason}
                  </p>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
