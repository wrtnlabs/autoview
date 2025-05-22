import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Information about a Copilot Business seat assignment for a user, team, or organization.
   *
   * @title Copilot Business Seat Detail
   */
  export type copilot_seat_details = {
    assignee: AutoViewInputSubTypes.simple_user;
    organization?: AutoViewInputSubTypes.nullable_organization_simple;
    /**
     * The team through which the assignee is granted access to GitHub Copilot, if applicable.
     */
    assigning_team?:
      | AutoViewInputSubTypes.team
      | AutoViewInputSubTypes.enterprise_team
      | null;
    /**
     * The pending cancellation date for the seat, in `YYYY-MM-DD` format. This will be null unless the assignee's Copilot access has been canceled during the current billing cycle. If the seat has been cancelled, this corresponds to the start of the organization's next billing cycle.
     */
    pending_cancellation_date?: (string & tags.Format<"date">) | null;
    /**
     * Timestamp of user's last GitHub Copilot activity, in ISO 8601 format.
     */
    last_activity_at?: (string & tags.Format<"date-time">) | null;
    /**
     * Last editor that was used by the user for a GitHub Copilot completion.
     */
    last_activity_editor?: string | null;
    /**
     * Timestamp of when the assignee was last granted access to GitHub Copilot, in ISO 8601 format.
     */
    created_at: string;
    /**
     * **Closing down notice:** This field is no longer relevant and is closing down. Use the `created_at` field to determine when the assignee was last granted access to GitHub Copilot. Timestamp of when the assignee's GitHub Copilot access was last updated, in ISO 8601 format.
     *
     * @deprecated
     */
    updated_at?: string;
    /**
     * The Copilot plan of the organization, or the parent enterprise, when applicable.
     */
    plan_type?: "business" | "enterprise" | "unknown";
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
  /**
   * A GitHub organization.
   *
   * @title Organization Simple
   */
  export type nullable_organization_simple = {
    login: string;
    id: number & tags.Type<"int32">;
    node_id: string;
    url: string & tags.Format<"uri">;
    repos_url: string & tags.Format<"uri">;
    events_url: string & tags.Format<"uri">;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string | null;
  } | null;
  /**
   * Groups of organization members that gives permissions on specified repositories.
   *
   * @title Team
   */
  export type team = {
    id: number & tags.Type<"int32">;
    node_id: string;
    name: string;
    slug: string;
    description: string | null;
    privacy?: string;
    notification_setting?: string;
    permission: string;
    permissions?: {
      pull: boolean;
      triage: boolean;
      push: boolean;
      maintain: boolean;
      admin: boolean;
    };
    url: string & tags.Format<"uri">;
    html_url: string & tags.Format<"uri">;
    members_url: string;
    repositories_url: string & tags.Format<"uri">;
    parent: AutoViewInputSubTypes.nullable_team_simple;
  };
  /**
   * Groups of organization members that gives permissions on specified repositories.
   *
   * @title Team Simple
   */
  export type nullable_team_simple = {
    /**
     * Unique identifier of the team
     */
    id: number & tags.Type<"int32">;
    node_id: string;
    /**
     * URL for the team
     */
    url: string;
    members_url: string;
    /**
     * Name of the team
     */
    name: string;
    /**
     * Description of the team
     */
    description: string | null;
    /**
     * Permission that the team will have for its repositories
     */
    permission: string;
    /**
     * The level of privacy this team should have
     */
    privacy?: string;
    /**
     * The notification setting the team has set
     */
    notification_setting?: string;
    html_url: string & tags.Format<"uri">;
    repositories_url: string & tags.Format<"uri">;
    slug: string;
    /**
     * Distinguished Name (DN) that team maps to within LDAP environment
     */
    ldap_dn?: string;
  } | null;
  /**
   * Group of enterprise owners and/or members
   *
   * @title Enterprise Team
   */
  export type enterprise_team = {
    id: number & tags.Type<"int32">;
    name: string;
    slug: string;
    url: string & tags.Format<"uri">;
    sync_to_organizations: string;
    group_id?: string | null;
    group_name?: string | null;
    html_url: string & tags.Format<"uri">;
    members_url: string;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.copilot_seat_details;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const assignee = value.assignee;
  const displayName = assignee.name ?? assignee.login;
  const formattedCreatedAt = new Date(value.created_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );
  const formattedLastActivity = value.last_activity_at
    ? new Date(value.last_activity_at).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
    : null;
  const formattedPendingCancellation = value.pending_cancellation_date
    ? new Date(value.pending_cancellation_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;
  const planKey = value.plan_type ?? "unknown";
  const planLabels: Record<string, string> = {
    business: "Business",
    enterprise: "Enterprise",
    unknown: "Unknown",
  };
  const planStyles: Record<string, string> = {
    business: "bg-blue-100 text-blue-800",
    enterprise: "bg-purple-100 text-purple-800",
    unknown: "bg-gray-100 text-gray-800",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <img
          src={assignee.avatar_url}
          alt={displayName}
          className="w-12 h-12 rounded-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                displayName,
              )}&background=0077B6&color=fff`;
          }}
        />
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-900">{displayName}</p>
          <div className="flex items-center text-sm text-gray-500 space-x-1">
            <LucideReact.User size={16} />
            <span>{assignee.login}</span>
          </div>
        </div>
        <span
          className={`px-2 py-1 text-xs font-medium rounded ${planStyles[planKey]}`}
        >
          {planLabels[planKey]}
        </span>
      </div>

      <div className="mt-4 space-y-3 text-sm text-gray-700">
        {assignee.email && (
          <div className="flex items-center space-x-2">
            <LucideReact.Mail size={16} className="text-gray-400" />
            <span className="truncate">{assignee.email}</span>
          </div>
        )}

        {value.organization && (
          <div className="flex items-center space-x-2">
            <LucideReact.Building size={16} className="text-gray-400" />
            <span className="truncate">{value.organization.login}</span>
          </div>
        )}

        {value.assigning_team && (
          <div className="flex items-center space-x-2">
            <LucideReact.Users size={16} className="text-gray-400" />
            <span className="truncate">{value.assigning_team.name}</span>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Assigned: {formattedCreatedAt}</span>
        </div>

        {formattedLastActivity && (
          <div className="flex items-center space-x-2">
            <LucideReact.Clock size={16} className="text-gray-400" />
            <span>
              Last Activity: {formattedLastActivity}
              {value.last_activity_editor
                ? ` via ${value.last_activity_editor}`
                : ""}
            </span>
          </div>
        )}

        {formattedPendingCancellation && (
          <div className="flex items-center space-x-2">
            <LucideReact.XCircle size={16} className="text-red-500" />
            <span>Pending Cancellation: {formattedPendingCancellation}</span>
          </div>
        )}
      </div>
    </div>
  );
}
