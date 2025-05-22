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
  const title = value.name ?? `Campaign #${value.number}`;
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  const publishedDate = value.published_at ? formatDate(value.published_at) : null;
  const endDate = formatDate(value.ends_at);
  const closedDate = value.closed_at ? formatDate(value.closed_at) : null;
  const managers = value.managers;
  const teams = value.team_managers ?? [];
  const stats = value.alert_stats;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header: Title and State Badge */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-gray-800 truncate">{title}</h2>
        <span
          className={`px-2 py-1 text-xs font-medium rounded ${
            value.state === "open"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {value.state === "open" ? "Open" : "Closed"}
        </span>
      </div>

      {/* Description */}
      {value.description && (
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{value.description}</p>
      )}

      {/* Dates Grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-500 mb-4">
        <div>
          <span className="font-medium text-gray-700">Created:</span>{" "}
          {formatDate(value.created_at)}
        </div>
        <div>
          <span className="font-medium text-gray-700">Updated:</span>{" "}
          {formatDate(value.updated_at)}
        </div>
        {publishedDate && (
          <div>
            <span className="font-medium text-gray-700">Published:</span>{" "}
            {publishedDate}
          </div>
        )}
        <div>
          <span className="font-medium text-gray-700">
            {value.state === "closed" ? "Ended:" : "Ends:"}
          </span>{" "}
          {endDate}
        </div>
        {closedDate && (
          <div className="col-span-2">
            <span className="font-medium text-gray-700">Closed At:</span>{" "}
            {closedDate}
          </div>
        )}
      </div>

      {/* Managers Avatars */}
      <div className="mb-4">
        <span className="font-medium text-gray-700">Managers:</span>
        <div className="flex items-center mt-2 -space-x-2">
          {managers.map((mgr) => (
            <img
              key={mgr.id}
              src={mgr.avatar_url}
              alt={mgr.login}
              title={mgr.name ?? mgr.login}
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          ))}
        </div>
      </div>

      {/* Team Managers */}
      {teams.length > 0 && (
        <div className="mb-4">
          <span className="font-medium text-gray-700">Teams:</span>
          <p className="text-gray-600 text-sm mt-1 truncate">
            {teams.map((t) => t.name).join(", ")}
          </p>
        </div>
      )}

      {/* Contact Link */}
      {value.contact_link && (
        <div className="mb-4">
          <span className="font-medium text-gray-700">Contact:</span>
          <p className="text-blue-600 text-sm truncate mt-1">
            {(() => {
              try {
                return new URL(value.contact_link!).host;
              } catch {
                return value.contact_link;
              }
            })()}
          </p>
        </div>
      )}

      {/* Alert Statistics */}
      {stats && (
        <div className="flex items-center justify-between text-sm text-gray-700">
          <div className="flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></span>
            <span>Open: {stats.open_count}</span>
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
            <span>In Progress: {stats.in_progress_count}</span>
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-gray-500 rounded-full mr-1"></span>
            <span>Closed: {stats.closed_count}</span>
          </div>
        </div>
      )}
    </div>
  );
}
