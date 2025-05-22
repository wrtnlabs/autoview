import { tags } from "typia";
import React from "react";
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
        url: string & tags.Format<"uri">;
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
  const createdAt = new Date(value.created_at).toLocaleString();
  const updatedAt = new Date(value.updated_at).toLocaleString();
  const publishedAt = value.published_at
    ? new Date(value.published_at).toLocaleString()
    : null;
  const endsAt = new Date(value.ends_at).toLocaleDateString();
  const closedAt = value.closed_at
    ? new Date(value.closed_at).toLocaleString()
    : null;

  const now = Date.now();
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysLeftRaw =
    (new Date(value.ends_at).getTime() - now) / msPerDay;
  const daysLeft = Math.ceil(daysLeftRaw);

  const stateLabel = value.state === "open" ? "Open" : "Closed";
  const badgeClass =
    value.state === "open"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold text-gray-900">
          {value.name || `Campaign #${value.number}`}
        </h2>
        <span
          className={`px-2 inline-flex text-xs font-medium rounded-full ${badgeClass}`}
        >
          {stateLabel}
        </span>
      </div>

      {/* Description */}
      <p className="mt-2 text-gray-700 line-clamp-3">
        {value.description}
      </p>

      {/* Dates Grid */}
      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
        <div>
          <span className="font-medium">Created:</span>
          <span className="ml-1">{createdAt}</span>
        </div>
        <div>
          <span className="font-medium">Ends:</span>
          <span className="ml-1">
            {endsAt}
            {value.state === "open" && daysLeft > 0
              ? ` (${daysLeft}d left)`
              : ""}
          </span>
        </div>
        {publishedAt && (
          <div>
            <span className="font-medium">Published:</span>
            <span className="ml-1">{publishedAt}</span>
          </div>
        )}
        {closedAt && (
          <div>
            <span className="font-medium">Closed:</span>
            <span className="ml-1">{closedAt}</span>
          </div>
        )}
      </div>

      {/* Alert Stats */}
      {value.alert_stats && (
        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-800">
            Alert Stats
          </h3>
          <div className="mt-2 flex justify-between text-sm">
            <div>
              <span className="font-medium text-blue-600">
                {value.alert_stats.open_count}
              </span>
              <span className="ml-1">Open</span>
            </div>
            <div>
              <span className="font-medium text-yellow-600">
                {value.alert_stats.in_progress_count}
              </span>
              <span className="ml-1">In Progress</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">
                {value.alert_stats.closed_count}
              </span>
              <span className="ml-1">Closed</span>
            </div>
          </div>
        </div>
      )}

      {/* Managers */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-800">
          Managers
        </h3>
        <div className="mt-2 flex -space-x-2 overflow-hidden">
          {value.managers.map((m, i) => (
            <img
              key={i}
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
              src={m.avatar_url}
              alt={m.name || m.login}
              title={m.name || m.login}
            />
          ))}
        </div>
      </div>

      {/* Team Managers */}
      {value.team_managers && value.team_managers.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-800">
            Team Managers
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {value.team_managers.map(
              (t, i) =>
                t && (
                  <span
                    key={i}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                  >
                    {t.name}
                  </span>
                )
            )}
          </div>
        </div>
      )}

      {/* Contact Link */}
      {value.contact_link && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-800">
            Contact
          </h3>
          <p className="mt-1 text-sm text-blue-600 truncate">
            {value.contact_link}
          </p>
        </div>
      )}
    </div>
  );
}
