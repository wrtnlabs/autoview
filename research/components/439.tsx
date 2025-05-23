import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsCopilotBillingSeats {
        export interface GetResponse {
            /**
             * Total number of Copilot seats for the organization currently being billed.
            */
            total_seats?: number & tags.Type<"int32">;
            seats?: AutoViewInputSubTypes.copilot_seat_details[];
        }
    }
    /**
     * Information about a Copilot Business seat assignment for a user, team, or organization.
     *
     * @title Copilot Business Seat Detail
    */
    export interface copilot_seat_details {
        assignee: AutoViewInputSubTypes.simple_user;
        organization?: AutoViewInputSubTypes.nullable_organization_simple;
        /**
         * The team through which the assignee is granted access to GitHub Copilot, if applicable.
        */
        assigning_team?: AutoViewInputSubTypes.team | AutoViewInputSubTypes.enterprise_team | null;
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
    export interface team {
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
    }
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
    export interface enterprise_team {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsCopilotBillingSeats.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalSeats: number = value.total_seats ?? (value.seats?.length ?? 0);
  const assignedCount: number = value.seats?.length ?? 0;
  const availableSeats: number = Math.max(totalSeats - assignedCount, 0);

  // A small helper to format ISO date strings into "Jan 1, 2023" format
  const formatDate = (iso?: string | null): string =>
    iso
      ? new Date(iso).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "—";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Summary Header */}
      <div className="flex flex-wrap justify-between items-center p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 text-gray-700 text-sm">
          <LucideReact.Users size={18} className="text-gray-500" />
          <span>Total seats: <span className="font-medium">{totalSeats}</span></span>
        </div>
        <div className="flex items-center gap-2 text-gray-700 text-sm">
          <LucideReact.CheckCircle size={18} className="text-green-500" />
          <span>Assigned: <span className="font-medium">{assignedCount}</span></span>
        </div>
        <div className="flex items-center gap-2 text-gray-700 text-sm">
          <LucideReact.PlusCircle size={18} className="text-blue-500" />
          <span>Available: <span className="font-medium">{availableSeats}</span></span>
        </div>
      </div>

      {/* Seats List or Empty State */}
      {assignedCount > 0 && value.seats ? (
        <ul className="divide-y divide-gray-200">
          {value.seats.map((seat) => {
            const user = seat.assignee;
            const displayName = user.name?.trim() || user.login;
            const placeholderAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              displayName,
            )}&background=0D8ABC&color=fff`;
            return (
              <li key={user.id} className="flex items-center p-4">
                <img
                  src={user.avatar_url}
                  alt={`${displayName} avatar`}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    img.onerror = null;
                    img.src = placeholderAvatar;
                  }}
                />
                <div className="flex-1 ml-4 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{displayName}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mt-1">
                    <div className="flex items-center gap-1">
                      <LucideReact.Calendar size={14} />
                      <span>Granted: {formatDate(seat.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <LucideReact.Clock size={14} />
                      <span>Last activity: {formatDate(seat.last_activity_at)}</span>
                    </div>
                    {seat.pending_cancellation_date ? (
                      <div className="flex items-center gap-1 text-amber-600">
                        <LucideReact.AlertTriangle size={14} />
                        <span>Cancel on: {formatDate(seat.pending_cancellation_date)}</span>
                      </div>
                    ) : null}
                    {seat.plan_type ? (
                      <div className="flex items-center gap-1 text-blue-600">
                        <LucideReact.Tag size={14} />
                        <span>{seat.plan_type.charAt(0).toUpperCase() + seat.plan_type.slice(1)}</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 text-gray-500">
          <LucideReact.AlertCircle size={32} className="text-gray-400 mb-2" />
          <p className="text-sm">No assigned seats found.</p>
        </div>
      )}
    </div>
  );
}
