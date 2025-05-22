import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiOrgsCopilotBillingSeats {
    export type GetResponse = {
      /**
       * Total number of Copilot seats for the organization currently being billed.
       */
      total_seats?: number & tags.Type<"int32">;
      seats?: AutoViewInputSubTypes.copilot_seat_details[];
    };
  }
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
export type AutoViewInput =
  AutoViewInputSubTypes.IApiOrgsCopilotBillingSeats.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const totalSeats = value.total_seats ?? value.seats?.length ?? 0;
  const seats = value.seats ?? [];

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const formatDateTime = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getPlanDisplay = (
    plan?: "business" | "enterprise" | "unknown",
  ): JSX.Element => {
    switch (plan) {
      case "business":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
            <LucideReact.Briefcase className="mr-1" size={14} />
            Business
          </span>
        );
      case "enterprise":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
            <LucideReact.Building2 className="mr-1" size={14} />
            Enterprise
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
            <LucideReact.HelpCircle className="mr-1" size={14} />
            Unknown
          </span>
        );
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center text-lg font-semibold text-gray-800">
          <LucideReact.Users className="mr-2 text-gray-600" size={20} /> Copilot
          Seats
        </h2>
        <div className="text-sm text-gray-600">
          Total: <span className="font-medium text-gray-800">{totalSeats}</span>
        </div>
      </div>

      {seats.length > 0 ? (
        <ul className="space-y-4">
          {seats.map((seat, index) => {
            const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              seat.assignee.name ?? seat.assignee.login,
            )}&background=0D8ABC&color=fff`;
            const assignerName =
              seat.assigning_team?.name ||
              seat.organization?.login ||
              "Organization";

            return (
              <li
                key={index}
                className="flex space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex-shrink-0">
                  <img
                    src={seat.assignee.avatar_url}
                    alt={seat.assignee.name ?? seat.assignee.login}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        fallbackAvatar;
                    }}
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline space-x-2">
                      <span className="font-medium text-gray-800">
                        {seat.assignee.name ?? seat.assignee.login}
                      </span>
                      <span className="text-sm text-gray-500">
                        @{seat.assignee.login}
                      </span>
                    </div>
                    {getPlanDisplay(seat.plan_type)}
                  </div>

                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <LucideReact.Users className="text-gray-400" size={16} />
                      <span>Assigned by: {assignerName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <LucideReact.Calendar
                        className="text-gray-400"
                        size={16}
                      />
                      <span>
                        Last activity:{" "}
                        {seat.last_activity_at
                          ? formatDateTime(seat.last_activity_at)
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <LucideReact.Calendar
                        className="text-gray-400"
                        size={16}
                      />
                      <span>Granted: {formatDateTime(seat.created_at)}</span>
                    </div>
                    {seat.pending_cancellation_date && (
                      <div className="flex items-center gap-1 text-amber-600">
                        <LucideReact.AlertTriangle size={16} />
                        <span>
                          Pending cancellation:{" "}
                          {formatDate(seat.pending_cancellation_date)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex flex-col items-center py-10 text-gray-500">
          <LucideReact.AlertCircle size={48} />
          <p className="mt-2 text-sm">No seats assigned</p>
        </div>
      )}
    </div>
  );
}
