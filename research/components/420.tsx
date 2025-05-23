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
export type AutoViewInput = AutoViewInputSubTypes.campaign_summary[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4">
      {value.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10">
          <LucideReact.AlertCircle size={48} className="text-gray-400" />
          <span className="mt-2 text-gray-500">No campaigns available</span>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {value.map((camp, idx) => {
            const title = camp.name?.trim() || `Campaign #${camp.number}`;
            const primaryDate = camp.state === "closed" && camp.closed_at
              ? `Closed: ${formatDate(camp.closed_at)}`
              : formatDate(camp.published_at || camp.created_at);
            const managers = camp.managers || [];
            const extraManagers = managers.length > 3 ? managers.length - 3 : 0;

            return (
              <div
                key={idx}
                className="bg-white rounded-lg shadow p-4 flex flex-col h-full"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {title}
                  </h2>
                  {camp.state === "open" ? (
                    <LucideReact.CheckCircle
                      size={20}
                      className="text-green-500"
                      aria-label="Open"
                    />
                  ) : (
                    <LucideReact.XCircle
                      size={20}
                      className="text-red-500"
                      aria-label="Closed"
                    />
                  )}
                </div>

                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <LucideReact.Calendar size={16} />
                  <span className="ml-1">{primaryDate}</span>
                </div>

                <p className="mt-2 text-gray-600 text-sm line-clamp-3">
                  {camp.description}
                </p>

                {camp.contact_link && (
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <LucideReact.Link size={16} />
                    <span className="ml-1 truncate">{camp.contact_link}</span>
                  </div>
                )}

                {camp.alert_stats && (
                  <div className="mt-4 flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-700">
                      <LucideReact.AlertTriangle
                        size={16}
                        className="text-red-500"
                      />
                      <span className="ml-1">{camp.alert_stats.open_count}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <LucideReact.Clock
                        size={16}
                        className="text-amber-500"
                      />
                      <span className="ml-1">
                        {camp.alert_stats.in_progress_count}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <LucideReact.CheckCircle
                        size={16}
                        className="text-green-500"
                      />
                      <span className="ml-1">
                        {camp.alert_stats.closed_count}
                      </span>
                    </div>
                  </div>
                )}

                <div className="mt-auto">
                  <div className="mt-4 flex -space-x-2 items-center">
                    {managers.slice(0, 3).map((u, i) => {
                      const placeholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        u.name || u.login
                      )}&background=0D8ABC&color=fff`;
                      return (
                        <img
                          key={i}
                          src={u.avatar_url}
                          alt={u.name || u.login}
                          className="w-8 h-8 rounded-full border-2 border-white object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              placeholder;
                          }}
                        />
                      );
                    })}
                    {extraManagers > 0 && (
                      <span className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 text-xs font-medium rounded-full border-2 border-white">
                        +{extraManagers}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
