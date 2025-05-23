import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.copilot_seat_details;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const fullName = value.assignee.name ?? value.assignee.login;
  const planType = value.plan_type ?? "unknown";
  const planTypeLabel = planType.charAt(0).toUpperCase() + planType.slice(1);
  const planBadgeClasses =
    planType === "business"
      ? "bg-green-100 text-green-800"
      : planType === "enterprise"
      ? "bg-blue-100 text-blue-800"
      : "bg-gray-100 text-gray-800";
  const isPendingCancellation = Boolean(value.pending_cancellation_date);
  const statusLabel = isPendingCancellation ? "Pending Cancellation" : "Active";
  const statusIcon = isPendingCancellation ? (
    <LucideReact.Clock className="text-amber-500" size={16} />
  ) : (
    <LucideReact.CheckCircle className="text-green-500" size={16} />
  );

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  const formatDateTime = (dateStr: string) =>
    new Date(dateStr).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // Avatar image error handling
  const [avatarError, setAvatarError] = React.useState(false);
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    fullName
  )}`;
  const avatarSrc = !avatarError ? value.assignee.avatar_url : avatarFallback;

  // Organization image error handling
  const hasOrg = Boolean(value.organization);
  const [orgError, setOrgError] = React.useState(false);
  const orgLogin = value.organization?.login ?? "";
  const orgFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    orgLogin
  )}&background=random`;
  const orgSrc =
    !orgError && value.organization?.avatar_url
      ? value.organization.avatar_url
      : orgFallback;

  // Team detection
  const assignTeam = value.assigning_team;
  const isEnterpriseTeam = Boolean(
    assignTeam && "sync_to_organizations" in assignTeam
  );
  const teamLabel = isEnterpriseTeam ? "Enterprise Team" : "Team";
  const teamName = assignTeam?.name ?? "";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      <div className="flex items-center space-x-4">
        <img
          src={avatarSrc}
          alt={`${fullName} avatar`}
          className="w-12 h-12 rounded-full object-cover"
          onError={() => setAvatarError(true)}
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-lg text-gray-900 truncate">
            {fullName}
          </p>
          <p className="text-sm text-gray-500 truncate">
            @{value.assignee.login}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-3 text-sm text-gray-700">
        {hasOrg && (
          <div className="flex items-center gap-2">
            <img
              src={orgSrc}
              alt={`${orgLogin} logo`}
              className="w-6 h-6 rounded object-cover"
              onError={() => setOrgError(true)}
            />
            <span className="truncate">{orgLogin}</span>
          </div>
        )}

        {assignTeam && (
          <div className="flex items-center gap-2">
            <LucideReact.Users className="text-gray-400" size={16} />
            <span className="truncate">{teamName}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <LucideReact.Tag className="text-gray-400" size={16} />
          <span
            className={`px-2 py-0.5 text-xs font-medium rounded ${planBadgeClasses}`}
          >
            {planTypeLabel}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {statusIcon}
          <span>{statusLabel}</span>
        </div>

        <div className="flex items-center gap-2">
          <LucideReact.Calendar className="text-gray-400" size={16} />
          <span>Granted: {formatDate(value.created_at)}</span>
        </div>

        {value.last_activity_at && (
          <div className="flex items-center gap-2">
            <LucideReact.Activity className="text-gray-400" size={16} />
            <span>
              Last Activity: {formatDateTime(value.last_activity_at)}
              {value.last_activity_editor
                ? ` via ${value.last_activity_editor}`
                : ""}
            </span>
          </div>
        )}

        {value.pending_cancellation_date && (
          <div className="flex items-center gap-2">
            <LucideReact.Clock className="text-amber-500" size={16} />
            <span>
              Cancellation Date:{" "}
              {formatDate(value.pending_cancellation_date)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
