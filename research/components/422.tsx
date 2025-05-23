import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * The campaign metadata and alert stats.
     *
     * @title Campaign summary
    */
    export interface campaign_summary {
        /**
         * The number of the newly created campaign
        */
        number: number & tags.Type<"int32">;
        /**
         * The date and time the campaign was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        created_at: string;
        /**
         * The date and time the campaign was last updated, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        updated_at: string;
        /**
         * The campaign name
        */
        name?: string;
        /**
         * The campaign description
        */
        description: string;
        /**
         * The campaign managers
        */
        managers: AutoViewInputSubTypes.simple_user[];
        /**
         * The campaign team managers
        */
        team_managers?: AutoViewInputSubTypes.team[];
        /**
         * The date and time the campaign was published, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        published_at?: string;
        /**
         * The date and time the campaign has ended, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        ends_at: string;
        /**
         * The date and time the campaign was closed, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ. Will be null if the campaign is still open.
        */
        closed_at?: (string & tags.Format<"date-time">) | null;
        state: AutoViewInputSubTypes.campaign_state;
        /**
         * The contact link of the campaign.
        */
        contact_link: (string & tags.Format<"uri">) | null;
        alert_stats?: {
            /**
             * The number of open alerts
            */
            open_count: number & tags.Type<"int32">;
            /**
             * The number of closed alerts
            */
            closed_count: number & tags.Type<"int32">;
            /**
             * The number of in-progress alerts
            */
            in_progress_count: number & tags.Type<"int32">;
        };
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
     * Indicates whether a campaign is open or closed
     *
     * @title Campaign state
    */
    export type campaign_state = "open" | "closed";
}
export type AutoViewInput = AutoViewInputSubTypes.campaign_summary;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const title = value.name?.trim() || `Campaign #${value.number}`;
  const description = value.description || "";
  const formatDateTime = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  const createdAt = formatDateTime(value.created_at);
  const updatedAt = formatDateTime(value.updated_at);
  const publishedAt = value.published_at ? formatDateTime(value.published_at) : null;
  const endsAt = formatDateTime(value.ends_at);
  const closedAt = value.closed_at ? formatDateTime(value.closed_at) : null;
  const daysRemaining = Math.ceil(
    (new Date(value.ends_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  const statusLabel = value.state.charAt(0).toUpperCase() + value.state.slice(1);
  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 truncate">{title}</h2>
        <div className="flex items-center space-x-1">
          {value.state === "open" ? (
            <LucideReact.CheckCircle className="text-green-500" size={20} />
          ) : (
            <LucideReact.XCircle className="text-red-500" size={20} />
          )}
          <span
            className={`text-sm ${
              value.state === "open" ? "text-green-600" : "text-red-600"
            }`}
          >
            {statusLabel}
          </span>
        </div>
      </div>
      {/* Description */}
      <p className="mt-2 text-gray-600 line-clamp-3">{description}</p>
      {/* Dates and Links */}
      <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-gray-500">
        <div className="flex items-center">
          <LucideReact.Calendar size={16} />
          <span className="ml-1">Created:</span>
          <span className="ml-auto">{createdAt}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar size={16} />
          <span className="ml-1">Updated:</span>
          <span className="ml-auto">{updatedAt}</span>
        </div>
        {publishedAt && (
          <div className="flex items-center">
            <LucideReact.Calendar size={16} />
            <span className="ml-1">Published:</span>
            <span className="ml-auto">{publishedAt}</span>
          </div>
        )}
        <div className="flex items-center">
          <LucideReact.Calendar size={16} />
          <span className="ml-1">Ends:</span>
          <span className="ml-auto">
            {endsAt}{" "}
            <span className="italic">
              ({daysRemaining > 0 ? `${daysRemaining} days left` : "Ended"})
            </span>
          </span>
        </div>
        {closedAt && (
          <div className="flex items-center">
            <LucideReact.Calendar size={16} />
            <span className="ml-1">Closed:</span>
            <span className="ml-auto">{closedAt}</span>
          </div>
        )}
        {value.contact_link && (
          <div className="flex items-center break-all">
            <LucideReact.Link size={16} />
            <span className="ml-1 text-blue-600">{value.contact_link}</span>
          </div>
        )}
      </div>
      {/* Alert Stats */}
      {value.alert_stats && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700">Alert Stats</h3>
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <LucideReact.Clock className="text-amber-500" size={16} />
              <span className="ml-1">{value.alert_stats.in_progress_count} In Progress</span>
            </div>
            <div className="flex items-center">
              <LucideReact.CheckCircle className="text-green-500" size={16} />
              <span className="ml-1">{value.alert_stats.closed_count} Closed</span>
            </div>
            <div className="flex items-center">
              <LucideReact.AlertTriangle className="text-red-500" size={16} />
              <span className="ml-1">{value.alert_stats.open_count} Open</span>
            </div>
          </div>
        </div>
      )}
      {/* Managers */}
      {value.managers.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700">Managers</h3>
          <div className="mt-2 flex -space-x-2">
            {value.managers.map((mgr) => {
              const label = mgr.name || mgr.login;
              return (
                <img
                  key={mgr.id}
                  src={mgr.avatar_url}
                  alt={label}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      label
                    )}&background=0D8ABC&color=fff`;
                  }}
                />
              );
            })}
          </div>
        </div>
      )}
      {/* Team Managers */}
      {value.team_managers && value.team_managers.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700">Team Managers</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {value.team_managers.map((team) => (
              <span
                key={team.id}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
              >
                {team.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
