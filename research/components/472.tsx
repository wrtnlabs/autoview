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
export type AutoViewInput = AutoViewInputSubTypes.organization_invitation;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const inviterName = value.inviter.name && value.inviter.name.trim() !== ""
    ? value.inviter.name
    : value.inviter.login;
  const inviteeIdentifier = value.login ?? value.email ?? "Unknown";
  const createdAt = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  const isFailed = Boolean(value.failed_at || value.failed_reason);
  const statusLabel = isFailed ? "Failed" : "Pending";
  const statusColor = isFailed ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800";
  const failedReason = isFailed && value.failed_reason ? value.failed_reason : null;
  const sourceLabel = value.invitation_source ? value.invitation_source : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex items-center p-4 space-x-4">
        <img
          src={value.inviter.avatar_url}
          alt={`${inviterName} avatar`}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <p className="text-lg font-semibold text-gray-900 truncate">{inviteeIdentifier}</p>
          <p className="text-sm text-gray-500">
            Invited by <span className="font-medium text-gray-700">{inviterName}</span>
          </p>
        </div>
        <span className={`inline-block text-xs font-medium px-2 py-1 rounded ${statusColor}`}>
          {statusLabel}
        </span>
      </div>

      <div className="border-t border-gray-100 px-4 py-3 space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Role:</span>
          <span className="font-medium text-gray-800">{value.role}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Teams:</span>
          <span className="font-medium text-gray-800">{value.team_count}</span>
        </div>

        {sourceLabel && (
          <div className="flex justify-between text-sm text-gray-600">
            <span>Source:</span>
            <span className="font-medium text-gray-800 truncate">{sourceLabel}</span>
          </div>
        )}

        <div className="flex justify-between text-sm text-gray-600">
          <span>Created:</span>
          <span className="font-medium text-gray-800">{createdAt}</span>
        </div>

        {isFailed && value.failed_at && (
          <div className="flex justify-between text-sm text-gray-600">
            <span>Failed at:</span>
            <span className="font-medium text-gray-800">
              {new Date(value.failed_at).toLocaleString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })}
            </span>
          </div>
        )}

        {failedReason && (
          <div className="text-sm text-red-700">
            <p className="font-medium">Reason:</p>
            <p className="line-clamp-2">{failedReason}</p>
          </div>
        )}
      </div>
    </div>
  );
}
