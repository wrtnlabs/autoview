import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Protected Branch Pull Request Review
     *
     * @title Protected Branch Pull Request Review
    */
    export interface protected_branch_pull_request_review {
        url?: string & tags.Format<"uri">;
        dismissal_restrictions?: {
            /**
             * The list of users with review dismissal access.
            */
            users?: AutoViewInputSubTypes.simple_user[];
            /**
             * The list of teams with review dismissal access.
            */
            teams?: AutoViewInputSubTypes.team[];
            /**
             * The list of apps with review dismissal access.
            */
            apps?: AutoViewInputSubTypes.integration[];
            url?: string;
            users_url?: string;
            teams_url?: string;
        };
        /**
         * Allow specific users, teams, or apps to bypass pull request requirements.
        */
        bypass_pull_request_allowances?: {
            /**
             * The list of users allowed to bypass pull request requirements.
            */
            users?: AutoViewInputSubTypes.simple_user[];
            /**
             * The list of teams allowed to bypass pull request requirements.
            */
            teams?: AutoViewInputSubTypes.team[];
            /**
             * The list of apps allowed to bypass pull request requirements.
            */
            apps?: AutoViewInputSubTypes.integration[];
        };
        dismiss_stale_reviews: boolean;
        require_code_owner_reviews: boolean;
        required_approving_review_count?: number & tags.Type<"uint32"> & tags.Maximum<6>;
        /**
         * Whether the most recent push must be approved by someone other than the person who pushed it.
        */
        require_last_push_approval?: boolean;
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
     * GitHub apps are a new way to extend GitHub. They can be installed directly on organizations and user accounts and granted access to specific repositories. They come with granular permissions and built-in webhooks. GitHub apps are first class actors within GitHub.
     *
     * @title GitHub app
    */
    export type integration = {
        /**
         * Unique identifier of the GitHub app
        */
        id: number & tags.Type<"int32">;
        /**
         * The slug name of the GitHub app
        */
        slug?: string;
        node_id: string;
        client_id?: string;
        owner: AutoViewInputSubTypes.simple_user | AutoViewInputSubTypes.enterprise;
        /**
         * The name of the GitHub app
        */
        name: string;
        description: string | null;
        external_url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        /**
         * The set of permissions for the GitHub app
        */
        permissions: {
            [key: string]: string;
        };
        /**
         * The list of events for the GitHub app
        */
        events: string[];
        /**
         * The number of installations associated with the GitHub app
        */
        installations_count?: number & tags.Type<"int32">;
        client_secret?: string;
        webhook_secret?: string | null;
        pem?: string;
    } | null;
    /**
     * An enterprise on GitHub.
     *
     * @title Enterprise
    */
    export interface enterprise {
        /**
         * A short description of the enterprise.
        */
        description?: string | null;
        html_url: string & tags.Format<"uri">;
        /**
         * The enterprise's website URL.
        */
        website_url?: (string & tags.Format<"uri">) | null;
        /**
         * Unique identifier of the enterprise
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The name of the enterprise.
        */
        name: string;
        /**
         * The slug url identifier for the enterprise.
        */
        slug: string;
        created_at: (string & tags.Format<"date-time">) | null;
        updated_at: (string & tags.Format<"date-time">) | null;
        avatar_url: string & tags.Format<"uri">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.protected_branch_pull_request_review;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  type Integration = NonNullable<AutoViewInputSubTypes.integration>;

  const drUsers = value.dismissal_restrictions?.users ?? [];
  const drTeams = value.dismissal_restrictions?.teams ?? [];
  const drAppsRaw = value.dismissal_restrictions?.apps ?? [];
  const drApps = drAppsRaw.filter(
    (app): app is Integration => app !== null
  );

  const baUsers = value.bypass_pull_request_allowances?.users ?? [];
  const baTeams = value.bypass_pull_request_allowances?.teams ?? [];
  const baAppsRaw = value.bypass_pull_request_allowances?.apps ?? [];
  const baApps = baAppsRaw.filter(
    (app): app is Integration => app !== null
  );

  const truncate = (text: string, length = 30) =>
    text.length > length ? text.slice(0, length) + "…" : text;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
        <LucideReact.Shield size={20} className="mr-2 text-blue-500" />
        Pull Request Review Settings
      </h2>

      {value.url && (
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <LucideReact.Link size={16} className="mr-1" />
          <a
            href={value.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline truncate"
            title={value.url}
          >
            {truncate(value.url, 40)}
          </a>
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-700">
          {value.dismiss_stale_reviews ? (
            <LucideReact.CheckCircle size={16} className="mr-2 text-green-500" />
          ) : (
            <LucideReact.XCircle size={16} className="mr-2 text-red-500" />
          )}
          <span>
            Dismiss stale reviews: {value.dismiss_stale_reviews ? "Enabled" : "Disabled"}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-700">
          {value.require_code_owner_reviews ? (
            <LucideReact.CheckCircle size={16} className="mr-2 text-green-500" />
          ) : (
            <LucideReact.XCircle size={16} className="mr-2 text-red-500" />
          )}
          <span>
            Require code owner reviews: {value.require_code_owner_reviews ? "Yes" : "No"}
          </span>
        </div>
        {typeof value.required_approving_review_count === "number" && (
          <div className="flex items-center text-sm text-gray-700">
            <LucideReact.Users size={16} className="mr-2 text-gray-500" />
            <span>
              Required approving reviews: {value.required_approving_review_count}
            </span>
          </div>
        )}
        {value.require_last_push_approval != null && (
          <div className="flex items-center text-sm text-gray-700">
            {value.require_last_push_approval ? (
              <LucideReact.CheckCircle size={16} className="mr-2 text-green-500" />
            ) : (
              <LucideReact.XCircle size={16} className="mr-2 text-red-500" />
            )}
            <span>
              Require last push approval: {value.require_last_push_approval ? "Yes" : "No"}
            </span>
          </div>
        )}
      </div>

      {(drUsers.length > 0 || drTeams.length > 0 || drApps.length > 0) && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-800 mb-2">
            Dismissal Restrictions
          </h3>
          <div className="space-y-2">
            {drUsers.length > 0 && (
              <div className="flex items-center">
                <LucideReact.User size={16} className="mr-2 text-gray-500" />
                <div className="flex -space-x-1">
                  {drUsers.slice(0, 3).map((user) => (
                    <img
                      key={user.id}
                      className="w-6 h-6 rounded-full border-2 border-white object-cover"
                      src={user.avatar_url}
                      alt={user.login}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user.login
                          )}&background=random`;
                      }}
                    />
                  ))}
                  {drUsers.length > 3 && (
                    <span className="flex items-center justify-center w-6 h-6 text-xs bg-gray-100 text-gray-600 rounded-full border-2 border-white">
                      +{drUsers.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}
            {drTeams.length > 0 && (
              <div className="flex items-start">
                <LucideReact.Users size={16} className="mt-1 mr-2 text-gray-500" />
                <div className="flex flex-wrap">
                  {drTeams.slice(0, 3).map((team) => (
                    <span
                      key={team.id}
                      className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs font-medium mr-2 mb-2 rounded"
                    >
                      {truncate(team.name, 15)}
                    </span>
                  ))}
                  {drTeams.length > 3 && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs mr-2 mb-2 rounded">
                      +{drTeams.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}
            {drApps.length > 0 && (
              <div className="flex items-start">
                <LucideReact.Box size={16} className="mt-1 mr-2 text-gray-500" />
                <div className="flex flex-wrap">
                  {drApps.slice(0, 3).map((app) => (
                    <span
                      key={app.id ?? app.node_id}
                      className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs font-medium mr-2 mb-2 rounded"
                    >
                      {truncate(app.name, 15)}
                    </span>
                  ))}
                  {drApps.length > 3 && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs mr-2 mb-2 rounded">
                      +{drApps.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {(baUsers.length > 0 || baTeams.length > 0 || baApps.length > 0) && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-800 mb-2">
            Bypass Pull Request Allowances
          </h3>
          <div className="space-y-2">
            {baUsers.length > 0 && (
              <div className="flex items-center">
                <LucideReact.User size={16} className="mr-2 text-gray-500" />
                <div className="flex -space-x-1">
                  {baUsers.slice(0, 3).map((user) => (
                    <img
                      key={user.id}
                      className="w-6 h-6 rounded-full border-2 border-white object-cover"
                      src={user.avatar_url}
                      alt={user.login}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user.login
                          )}&background=random`;
                      }}
                    />
                  ))}
                  {baUsers.length > 3 && (
                    <span className="flex items-center justify-center w-6 h-6 text-xs bg-gray-100 text-gray-600 rounded-full border-2 border-white">
                      +{baUsers.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}
            {baTeams.length > 0 && (
              <div className="flex items-start">
                <LucideReact.Users size={16} className="mt-1 mr-2 text-gray-500" />
                <div className="flex flex-wrap">
                  {baTeams.slice(0, 3).map((team) => (
                    <span
                      key={team.id}
                      className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs font-medium mr-2 mb-2 rounded"
                    >
                      {truncate(team.name, 15)}
                    </span>
                  ))}
                  {baTeams.length > 3 && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs mr-2 mb-2 rounded">
                      +{baTeams.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}
            {baApps.length > 0 && (
              <div className="flex items-start">
                <LucideReact.Box size={16} className="mt-1 mr-2 text-gray-500" />
                <div className="flex flex-wrap">
                  {baApps.slice(0, 3).map((app) => (
                    <span
                      key={app.id ?? app.node_id}
                      className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs font-medium mr-2 mb-2 rounded"
                    >
                      {truncate(app.name, 15)}
                    </span>
                  ))}
                  {baApps.length > 3 && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs mr-2 mb-2 rounded">
                      +{baApps.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
