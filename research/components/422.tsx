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
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const createdAt = formatDate(value.created_at);
  const updatedAt = formatDate(value.updated_at);
  const endsAt = formatDate(value.ends_at);
  const publishedAt = value.published_at ? formatDate(value.published_at) : null;
  const closedAt = value.closed_at ? formatDate(value.closed_at) : null;

  const stateMap = {
    open: { label: "Open", bg: "bg-green-100", text: "text-green-800" },
    closed: { label: "Closed", bg: "bg-red-100", text: "text-red-800" },
  } as const;
  const stateBadge = stateMap[value.state];

  const descriptionSnippet =
    value.description.length > 150
      ? value.description.slice(0, 150) + "…"
      : value.description;

  const managers = value.managers;
  const maxAvatars = 5;
  const visibleManagers = managers.slice(0, maxAvatars);
  const extraManagers = managers.length - maxAvatars;

  const teamCount = value.team_managers?.length ?? 0;

  const contactLinkDisplay = value.contact_link
    ? value.contact_link.length > 40
      ? value.contact_link.slice(0, 40) + "…"
      : value.contact_link
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800">
          {value.name ? value.name : `Campaign #${value.number}`}
        </h2>
        <span
          className={`px-2 py-1 text-xs font-medium rounded ${stateBadge.bg} ${stateBadge.text}`}
        >
          {stateBadge.label}
        </span>
      </div>

      {value.name && (
        <p className="text-xs text-gray-500 mb-2">ID: #{value.number}</p>
      )}

      <p className="text-sm text-gray-600 mb-4">{descriptionSnippet}</p>

      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
        <div>
          <span className="font-medium">Created:</span> {createdAt}
        </div>
        <div>
          <span className="font-medium">Updated:</span> {updatedAt}
        </div>
        {publishedAt && (
          <div>
            <span className="font-medium">Published:</span> {publishedAt}
          </div>
        )}
        <div>
          <span className="font-medium">Ends:</span> {endsAt}
        </div>
        {closedAt && (
          <div className="col-span-2">
            <span className="font-medium">Closed:</span> {closedAt}
          </div>
        )}
      </div>

      <div className="flex items-center mb-4">
        <div className="flex -space-x-2">
          {visibleManagers.map((mgr) => (
            <img
              key={mgr.id}
              src={mgr.avatar_url}
              alt={mgr.login}
              title={mgr.name ?? mgr.login}
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          ))}
          {extraManagers > 0 && (
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 text-xs flex items-center justify-center border-2 border-white">
              +{extraManagers}
            </div>
          )}
        </div>
        {teamCount > 0 && (
          <span className="ml-3 text-xs text-gray-600">
            {teamCount} Team{teamCount > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {contactLinkDisplay && (
        <div className="text-xs text-blue-600 mb-4 break-all">
          {contactLinkDisplay}
        </div>
      )}

      {value.alert_stats && (
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
            {value.alert_stats.open_count} Open
          </span>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            {value.alert_stats.in_progress_count} In Progress
          </span>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            {value.alert_stats.closed_count} Closed
          </span>
        </div>
      )}
    </div>
  );
}
