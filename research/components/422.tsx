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
  // 1. Define data aggregation/transformation functions or derived constants
  const displayName = value.name ?? `Campaign #${value.number}`;
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  const createdAt = formatDate(value.created_at);
  const updatedAt = formatDate(value.updated_at);
  const publishedAt = value.published_at
    ? formatDate(value.published_at)
    : null;
  const endsAt = formatDate(value.ends_at);
  const closedAt = value.closed_at ?? null;
  const stateLabel = value.state === "open" ? "Open" : "Closed";
  const stateIcon =
    value.state === "open" ? (
      <LucideReact.Clock className="text-amber-500" size={16} />
    ) : (
      <LucideReact.CheckCircle className="text-green-500" size={16} />
    );
  const {
    open_count = 0,
    in_progress_count = 0,
    closed_count = 0,
  } = value.alert_stats ?? {};
  const managersDisplay = value.managers.slice(0, 3);
  const additionalManagers = value.managers.length - managersDisplay.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-gray-800">{displayName}</h2>
        <div className="flex items-center gap-1 text-sm font-medium text-gray-600">
          {stateIcon}
          <span>{stateLabel}</span>
        </div>
      </div>

      {/* Description */}
      <p className="mt-2 text-gray-600 text-sm line-clamp-3">
        {value.description}
      </p>

      {/* Key dates and contact */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-500 text-xs">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={14} />
          <span>Created: {createdAt}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={14} />
          <span>Updated: {updatedAt}</span>
        </div>
        {publishedAt && (
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={14} />
            <span>Published: {publishedAt}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={14} />
          <span>Ends: {endsAt}</span>
        </div>
        {closedAt && (
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={14} />
            <span>Closed: {formatDate(closedAt)}</span>
          </div>
        )}
        {value.contact_link && (
          <div className="flex items-center gap-1 break-all">
            <LucideReact.Link size={14} />
            <span className="text-blue-500">{value.contact_link}</span>
          </div>
        )}
      </div>

      {/* Alert statistics */}
      {value.alert_stats && (
        <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <LucideReact.AlertTriangle className="text-yellow-500" size={16} />
            <span>{open_count} Open</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.Clock className="text-blue-500" size={16} />
            <span>{in_progress_count} In Progress</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.CheckCircle className="text-green-500" size={16} />
            <span>{closed_count} Closed</span>
          </div>
        </div>
      )}

      {/* Managers */}
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-700">Managers</h3>
        <div className="mt-1 flex items-center">
          {managersDisplay.map((manager) => {
            const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              manager.name ?? manager.login,
            )}&background=0D8ABC&color=fff`;
            return (
              <img
                key={manager.id}
                src={manager.avatar_url}
                alt={manager.name ?? manager.login}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = fallback;
                }}
                className="w-8 h-8 rounded-full object-cover border-2 border-white -ml-2 first:ml-0"
              />
            );
          })}
          {additionalManagers > 0 && (
            <div className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 text-xs rounded-full border-2 border-white -ml-2">
              +{additionalManagers}
            </div>
          )}
        </div>
      </div>

      {/* Team managers */}
      {value.team_managers && value.team_managers.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700">Teams</h3>
          <div className="mt-1 flex flex-wrap gap-2">
            {value.team_managers.map(
              (team) =>
                team && (
                  <span
                    key={team.id}
                    className="flex items-center gap-1 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                  >
                    <LucideReact.Users size={14} />
                    {team.name}
                  </span>
                ),
            )}
          </div>
        </div>
      )}
    </div>
  );
}
