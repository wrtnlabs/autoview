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
export type AutoViewInput = AutoViewInputSubTypes.campaign_summary[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const campaigns = value || [];

  const formatDate = (dateStr: string): string => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateStr: string): string => {
    const d = new Date(dateStr);
    const date = d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const time = d.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${date}, ${time}`;
  };

  const handleImageError = (
    ev: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    ev.currentTarget.onerror = null;
    ev.currentTarget.src =
      "https://ui-avatars.com/api/?name=User&background=ccc&color=fff";
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (campaigns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2">No campaigns available</span>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {campaigns.map((campaign) => {
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
        } = campaign;
        const displayName = name || `Campaign #${number}`;
        const isOpen = state === "open";

        return (
          <div
            key={number}
            className="relative bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            {/* Header: Title & State */}
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {displayName}
              </h3>
              <div className="flex items-center text-sm font-medium">
                {isOpen ? (
                  <LucideReact.CheckCircle
                    className="text-green-500"
                    size={16}
                  />
                ) : (
                  <LucideReact.XCircle className="text-red-500" size={16} />
                )}
                <span className="ml-1 capitalize">
                  {isOpen ? "Open" : "Closed"}
                </span>
              </div>
            </div>

            {/* Dates */}
            <div className="flex flex-wrap gap-3 text-xs text-gray-500 mt-2">
              <div className="flex items-center">
                <LucideReact.Calendar size={14} />
                <span className="ml-1">Created: {formatDate(created_at)}</span>
              </div>
              {published_at && (
                <div className="flex items-center">
                  <LucideReact.Calendar size={14} />
                  <span className="ml-1">
                    Published: {formatDateTime(published_at)}
                  </span>
                </div>
              )}
              <div className="flex items-center">
                <LucideReact.Calendar size={14} />
                <span className="ml-1">Ends: {formatDate(ends_at)}</span>
              </div>
              {closed_at && (
                <div className="flex items-center">
                  <LucideReact.Calendar size={14} />
                  <span className="ml-1">
                    Closed: {formatDateTime(closed_at)}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            {description && (
              <p className="text-gray-700 text-sm mt-3 line-clamp-2">
                {description}
              </p>
            )}

            {/* Managers */}
            {managers.length > 0 && (
              <div className="flex items-center mt-4 -space-x-2">
                {managers.map((mgr) => {
                  const tooltip = mgr.name || mgr.login;
                  return (
                    <img
                      key={mgr.id}
                      src={mgr.avatar_url}
                      alt={tooltip}
                      title={tooltip}
                      onError={handleImageError}
                      className="w-6 h-6 rounded-full border-2 border-white object-cover"
                    />
                  );
                })}
              </div>
            )}

            {/* Team Managers */}
            {team_managers && team_managers.length > 0 && (
              <div className="mt-3 text-xs text-gray-600">
                <span className="font-medium">Team:</span>{" "}
                {team_managers
                  .map((t) => t?.name)
                  .filter(Boolean)
                  .join(", ")}
              </div>
            )}

            {/* Contact Link */}
            {contact_link && (
              <div className="flex items-center mt-4 text-sm">
                <LucideReact.Link className="text-gray-400" size={16} />
                <a
                  href={contact_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-blue-500 hover:underline truncate"
                >
                  Contact
                </a>
              </div>
            )}

            {/* Alert Stats */}
            {alert_stats && (
              <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <LucideReact.AlertCircle
                    className="text-yellow-500"
                    size={16}
                  />
                  <span className="ml-1">Open: {alert_stats.open_count}</span>
                </div>
                <div className="flex items-center">
                  <LucideReact.Clock className="text-blue-500" size={16} />
                  <span className="ml-1">
                    In-Progress: {alert_stats.in_progress_count}
                  </span>
                </div>
                <div className="flex items-center">
                  <LucideReact.CheckCircle
                    className="text-green-500"
                    size={16}
                  />
                  <span className="ml-1">
                    Closed: {alert_stats.closed_count}
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
