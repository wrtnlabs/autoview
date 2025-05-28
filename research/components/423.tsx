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
  const createdDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const publishedDate = value.published_at
    ? new Date(value.published_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : undefined;
  const endsDate = new Date(value.ends_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const closedDate =
    value.closed_at && value.closed_at !== null
      ? new Date(value.closed_at).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : undefined;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Campaign #{value.number}
          </h2>
          {value.name && (
            <p className="text-sm text-gray-600 truncate">{value.name}</p>
          )}
        </div>
        <span
          className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${
            value.state === "open"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {value.state.charAt(0).toUpperCase() + value.state.slice(1)}
        </span>
      </div>

      {/* Description */}
      <p className="mt-2 text-gray-700 text-sm line-clamp-3">
        {value.description}
      </p>

      {/* Dates */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Created: {createdDate}</span>
        </div>
        {publishedDate && (
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={16} className="text-gray-400" />
            <span>Published: {publishedDate}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Ends: {endsDate}</span>
        </div>
        {closedDate && (
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={16} className="text-gray-400" />
            <span>Closed: {closedDate}</span>
          </div>
        )}
      </div>

      {/* Managers */}
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Managers</h3>
        <div className="flex items-center -space-x-2">
          {value.managers.map((mgr) => (
            <img
              key={mgr.id}
              src={mgr.avatar_url}
              alt={mgr.name ?? mgr.login}
              className="w-8 h-8 rounded-full border-2 border-white object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  (mgr.name ?? mgr.login).trim()
                )}&background=0D8ABC&color=fff`;
              }}
            />
          ))}
        </div>
      </div>

      {/* Team Managers */}
      {value.team_managers && value.team_managers.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            Team Managers
          </h3>
          <div className="flex flex-wrap gap-2">
            {value.team_managers.map((team) => (
              <span
                key={team.id}
                className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded"
              >
                {team.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Contact Link */}
      {value.contact_link && (
        <div className="mt-4 flex items-center gap-1 text-sm text-gray-500">
          <LucideReact.Link size={16} className="text-gray-400" />
          <span className="truncate">{value.contact_link}</span>
        </div>
      )}

      {/* Alert Stats */}
      {value.alert_stats && (
        <div className="mt-4 grid grid-cols-3 gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <LucideReact.AlertTriangle
              size={16}
              className="text-amber-500"
            />
            <span>Open:</span>
            <span className="font-semibold">
              {value.alert_stats.open_count}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.CheckCircle size={16} className="text-green-500" />
            <span>Closed:</span>
            <span className="font-semibold">
              {value.alert_stats.closed_count}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.Clock size={16} className="text-blue-500" />
            <span>In Progress:</span>
            <span className="font-semibold">
              {value.alert_stats.in_progress_count}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
