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
export type AutoViewInput = AutoViewInputSubTypes.organization_invitation;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isFailed = Boolean(value.failed_at);
  const statusText = isFailed ? "Failed" : "Pending";
  const statusIcon = isFailed ? (
    <LucideReact.AlertTriangle className="text-red-500" size={16} />
  ) : (
    <LucideReact.Clock className="text-amber-500" size={16} />
  );
  const createdDate = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const failedDate = value.failed_at
    ? new Date(value.failed_at).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;
  const inviterName = value.inviter.name || value.inviter.login;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="w-full sm:max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Status */}
      <div className="flex items-center justify-between mb-4">
        <div className={`flex items-center ${isFailed ? "text-red-600" : "text-amber-600"}`}>
          {statusIcon}
          <span className="ml-2 font-semibold">{statusText}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Invitee */}
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-500">Invitee</div>
          <div className="text-gray-900 font-medium">
            {value.login || "—"}
          </div>
          {value.email && (
            <div className="flex items-center text-gray-700">
              <LucideReact.Mail size={16} className="mr-1" />
              <span>{value.email}</span>
            </div>
          )}
        </div>

        {/* Role */}
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-500">Role</div>
          <div className="flex items-center text-gray-900">
            <LucideReact.UserCheck size={16} className="mr-1" />
            <span className="capitalize">{value.role}</span>
          </div>
        </div>

        {/* Created At */}
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-500">Created</div>
          <div className="flex items-center text-gray-900">
            <LucideReact.Calendar size={16} className="mr-1" />
            <span>{createdDate}</span>
          </div>
        </div>

        {/* Teams Invited */}
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-500">Teams Invited</div>
          <div className="flex items-center text-gray-900">
            <LucideReact.Users size={16} className="mr-1" />
            <span>{value.team_count}</span>
          </div>
        </div>

        {/* Invitation Source */}
        {value.invitation_source && (
          <div className="space-y-1">
            <div className="text-sm font-medium text-gray-500">Source</div>
            <div className="flex items-center text-gray-900">
              <LucideReact.Link size={16} className="mr-1" />
              <span>{value.invitation_source}</span>
            </div>
          </div>
        )}

        {/* Failure Details */}
        {isFailed && (
          <div className="space-y-1 pt-2 border-t border-gray-100 text-red-600">
            <div className="text-sm font-medium text-red-500">Failure Reason</div>
            <div className="flex items-center">
              <LucideReact.AlertTriangle size={16} className="mr-1" />
              <span>{value.failed_reason || "Unknown reason"}</span>
            </div>
            {failedDate && (
              <div className="flex items-center text-gray-900">
                <LucideReact.Calendar size={16} className="mr-1" />
                <span>{failedDate}</span>
              </div>
            )}
          </div>
        )}

        {/* Inviter Info */}
        <div className="col-span-full pt-4 border-t border-gray-100">
          <div className="text-sm font-medium text-gray-500 mb-2">Invited By</div>
          <div className="flex items-center">
            <img
              src={value.inviter.avatar_url}
              alt={`${inviterName} avatar`}
              onError={(e) => {
                const img = e.currentTarget;
                img.onerror = null;
                img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  inviterName
                )}&background=0D8ABC&color=fff`;
              }}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="ml-3">
              <div className="text-gray-900 font-medium">{inviterName}</div>
              <div className="text-gray-500 text-sm">{value.inviter.login}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
