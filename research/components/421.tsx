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
  const {
    number,
    name,
    description,
    created_at,
    published_at,
    ends_at,
    closed_at,
    state,
    contact_link,
    managers,
    team_managers,
    alert_stats,
  } = value;

  const displayName = name ?? `Campaign #${number}`;

  const formatDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const maxDescLength = 200;
  const truncatedDescription =
    description.length > maxDescLength
      ? `${description.slice(0, maxDescLength)}...`
      : description;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm flex flex-col space-y-4">
      {/* Header with title and state */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">{displayName}</h2>
        {state === "open" ? (
          <LucideReact.CheckCircle
            className="text-green-500"
            size={20}
            role="img"
            aria-label="Open"
          />
        ) : (
          <LucideReact.XCircle
            className="text-red-500"
            size={20}
            role="img"
            aria-label="Closed"
          />
        )}
      </div>

      {/* Date metadata */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} />
          <span>Created: {formatDate(created_at)}</span>
        </div>
        {published_at && (
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={16} />
            <span>Published: {formatDate(published_at)}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} />
          <span>Ends: {formatDate(ends_at)}</span>
        </div>
        {closed_at && (
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={16} />
            <span>Closed: {formatDate(closed_at)}</span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-700 line-clamp-3">{truncatedDescription}</p>

      {/* Managers avatars */}
      <div>
        <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
          <LucideReact.Users size={16} />
          <span>Managers</span>
        </div>
        <div className="flex -space-x-2">
          {managers.map((mgr) => {
            const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              mgr.name ?? mgr.login
            )}&background=0D8ABC&color=fff`;
            return (
              <img
                key={mgr.id}
                src={mgr.avatar_url}
                alt={mgr.name ?? mgr.login}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = fallbackAvatar;
                }}
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
              />
            );
          })}
        </div>
      </div>

      {/* Team managers list */}
      {team_managers && team_managers.length > 0 && (
        <div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <LucideReact.Users size={16} />
            <span>Team Managers</span>
          </div>
          <div className="mt-1 text-sm text-gray-700">
            {team_managers.map((team) => team.name).join(", ")}
          </div>
        </div>
      )}

      {/* Contact link */}
      {contact_link && (
        <div className="flex items-center gap-1 text-sm text-blue-600">
          <LucideReact.Link size={16} />
          <a
            href={contact_link}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate underline"
          >
            {contact_link}
          </a>
        </div>
      )}

      {/* Alert statistics */}
      {alert_stats && (
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div className="flex flex-col items-center text-yellow-500">
            <LucideReact.AlertTriangle size={20} />
            <span className="mt-1 text-gray-800">
              {alert_stats.open_count}
            </span>
            <span className="text-gray-500">Open</span>
          </div>
          <div className="flex flex-col items-center text-blue-500">
            <LucideReact.Clock size={20} />
            <span className="mt-1 text-gray-800">
              {alert_stats.in_progress_count}
            </span>
            <span className="text-gray-500">In Progress</span>
          </div>
          <div className="flex flex-col items-center text-green-500">
            <LucideReact.CheckCircle size={20} />
            <span className="mt-1 text-gray-800">
              {alert_stats.closed_count}
            </span>
            <span className="text-gray-500">Closed</span>
          </div>
        </div>
      )}
    </div>
  );
}
