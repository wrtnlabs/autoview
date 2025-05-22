import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * The campaign metadata and alert stats.
   *
   * @title Campaign summary
   */
  export type campaign_summary = {
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
   * Indicates whether a campaign is open or closed
   *
   * @title Campaign state
   */
  export type campaign_state = "open" | "closed";
}
export type AutoViewInput = AutoViewInputSubTypes.campaign_summary;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation & formatting
  const displayName = value.name || `Campaign #${value.number}`;
  const createdAt = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const publishedAt = value.published_at
    ? new Date(value.published_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;
  const endsAt = new Date(value.ends_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const closedAt = value.closed_at
    ? new Date(value.closed_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;
  const isClosed = value.state === "closed";
  const managers = value.managers;
  const extraManagers = managers.length > 3 ? managers.length - 3 : 0;

  // 2. JSX structure using Tailwind CSS & LucideReact icons
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          {displayName}
          {isClosed ? (
            <LucideReact.XCircle
              className="text-red-500"
              size={18}
              role="img"
              aria-label="Closed"
            />
          ) : (
            <LucideReact.CheckCircle
              className="text-green-500"
              size={18}
              role="img"
              aria-label="Open"
            />
          )}
        </h2>
        <div className="mt-2 sm:mt-0 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={16} />
            <span>Created {createdAt}</span>
          </div>
          {publishedAt && (
            <div className="flex items-center gap-1">
              <LucideReact.Flag size={16} />
              <span>Published {publishedAt}</span>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {value.description && (
        <p className="mt-3 text-gray-700 line-clamp-3">{value.description}</p>
      )}

      {/* Details Grid */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-gray-700">
        {/* Managers */}
        <div>
          <h3 className="font-medium text-gray-800">Managers</h3>
          <div className="mt-2 flex items-center -space-x-2">
            {managers.slice(0, 3).map((mgr) => (
              <img
                key={mgr.id}
                src={mgr.avatar_url}
                alt={mgr.name || mgr.login}
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    mgr.name || mgr.login,
                  )}&background=0D8ABC&color=fff`;
                }}
              />
            ))}
            {extraManagers > 0 && (
              <span className="ml-2 text-gray-500">+{extraManagers}</span>
            )}
          </div>
        </div>

        {/* Team Managers */}
        {value.team_managers && value.team_managers.length > 0 && (
          <div>
            <h3 className="font-medium text-gray-800">Team Managers</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {value.team_managers.map(
                (team) =>
                  team && (
                    <span
                      key={team.id}
                      className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs"
                    >
                      {team.name}
                    </span>
                  ),
              )}
            </div>
          </div>
        )}

        {/* Alert Statistics */}
        <div>
          <h3 className="font-medium text-gray-800 flex items-center gap-1">
            Alerts
          </h3>
          {value.alert_stats ? (
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center gap-1 text-yellow-500">
                <LucideReact.AlertCircle size={16} />
                <span>{value.alert_stats.open_count}</span>
              </div>
              <div className="flex items-center gap-1 text-blue-500">
                <LucideReact.Loader className="animate-spin" size={16} />
                <span>{value.alert_stats.in_progress_count}</span>
              </div>
              <div className="flex items-center gap-1 text-green-500">
                <LucideReact.CheckCircle size={16} />
                <span>{value.alert_stats.closed_count}</span>
              </div>
            </div>
          ) : (
            <p className="mt-1 text-gray-500">No alert statistics</p>
          )}
        </div>

        {/* Timeline */}
        <div>
          <h3 className="font-medium text-gray-800">Timeline</h3>
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-1">
              <LucideReact.Calendar size={16} />
              <span>Ends {endsAt}</span>
            </div>
            {closedAt && (
              <div className="flex items-center gap-1 text-red-500">
                <LucideReact.XCircle size={16} />
                <span>Closed {closedAt}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Link */}
      {value.contact_link && (
        <div className="mt-6">
          <a
            href={value.contact_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            <LucideReact.Link size={16} />
            <span className="ml-1">Contact</span>
          </a>
        </div>
      )}
    </div>
  );
}
