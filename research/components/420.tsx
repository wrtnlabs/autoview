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
export type AutoViewInput = AutoViewInputSubTypes.campaign_summary[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Helper to format ISO dates into a human-readable form
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // If no campaigns, show a placeholder
  if (!value || value.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No campaign data available.
      </div>
    );
  }

  // Render a card for each campaign summary
  return (
    <div className="space-y-4">
      {value.map((camp, idx) => {
        const title = camp.name || `Campaign #${camp.number}`;
        const managers = camp.managers || [];
        const extraManagers = managers.length > 3 ? managers.length - 3 : 0;

        return (
          <div
            key={idx}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Header: Title and Status */}
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
              <span
                className={`text-xs font-medium px-2 py-1 rounded ${
                  camp.state === "open"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {camp.state === "open" ? "Open" : "Closed"}
              </span>
            </div>

            {/* Description (truncated) */}
            <p className="text-gray-600 text-sm mt-2 line-clamp-3">
              {camp.description}
            </p>

            {/* Managers and Creation Date */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex -space-x-2">
                {managers.slice(0, 3).map((mgr, i) => (
                  <img
                    key={i}
                    src={mgr.avatar_url}
                    alt={mgr.login}
                    title={mgr.login}
                    className="w-6 h-6 rounded-full border-2 border-white"
                  />
                ))}
                {extraManagers > 0 && (
                  <span className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-600 text-xs rounded-full border-2 border-white">
                    +{extraManagers}
                  </span>
                )}
              </div>
              <div className="text-gray-500 text-xs">
                Created: {formatDate(camp.created_at)}
              </div>
            </div>

            {/* Publication & End Dates */}
            <div className="flex justify-between mt-2 text-gray-500 text-xs">
              <span>
                Published:{" "}
                {camp.published_at ? formatDate(camp.published_at) : "—"}
              </span>
              <span>Ends: {formatDate(camp.ends_at)}</span>
            </div>

            {/* Alert Statistics */}
            {camp.alert_stats && (
              <div className="flex space-x-4 mt-3 text-sm">
                <span className="text-blue-600">
                  Open: {camp.alert_stats.open_count}
                </span>
                <span className="text-yellow-600">
                  In Progress: {camp.alert_stats.in_progress_count}
                </span>
                <span className="text-gray-600">
                  Closed: {camp.alert_stats.closed_count}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
