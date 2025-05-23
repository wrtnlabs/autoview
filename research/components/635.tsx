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
  const dismissalUsers = value.dismissal_restrictions?.users ?? [];
  const dismissalTeams = value.dismissal_restrictions?.teams ?? [];
  const dismissalAppsRaw = value.dismissal_restrictions?.apps ?? [];
  const dismissalApps = dismissalAppsRaw.filter(
    (app): app is NonNullable<typeof app> => app !== null,
  );
  const bypassUsers = value.bypass_pull_request_allowances?.users ?? [];
  const bypassTeams = value.bypass_pull_request_allowances?.teams ?? [];
  const bypassAppsRaw = value.bypass_pull_request_allowances?.apps ?? [];
  const bypassApps = bypassAppsRaw.filter(
    (app): app is NonNullable<typeof app> => app !== null,
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6 text-gray-700">
      <h2 className="flex items-center text-xl font-semibold text-gray-900 gap-2">
        <LucideReact.GitPullRequest size={20} className="text-gray-600" />
        Pull Request Review Settings
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center">
          {value.dismiss_stale_reviews ? (
            <LucideReact.CheckCircle size={16} className="text-green-500" />
          ) : (
            <LucideReact.XCircle size={16} className="text-red-500" />
          )}
          <span className="ml-2">Dismiss stale reviews</span>
        </div>
        <div className="flex items-center">
          {value.require_code_owner_reviews ? (
            <LucideReact.CheckCircle size={16} className="text-green-500" />
          ) : (
            <LucideReact.XCircle size={16} className="text-red-500" />
          )}
          <span className="ml-2">Require code owner reviews</span>
        </div>
        {typeof value.required_approving_review_count === 'number' && (
          <div className="flex items-center">
            <LucideReact.Users size={16} className="text-gray-600" />
            <span className="ml-2">
              Required approving reviews: {value.required_approving_review_count}
            </span>
          </div>
        )}
        <div className="flex items-center">
          {value.require_last_push_approval ? (
            <LucideReact.CheckCircle size={16} className="text-green-500" />
          ) : (
            <LucideReact.XCircle size={16} className="text-red-500" />
          )}
          <span className="ml-2">Require last push approval</span>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-900">Dismissal Restrictions</h3>
        {dismissalUsers.length + dismissalTeams.length + dismissalApps.length > 0 ? (
          <ul className="mt-2 space-y-2 max-h-44 overflow-y-auto">
            {dismissalUsers.map((user) => (
              <li key={user.id} className="flex items-center gap-2">
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-6 h-6 rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.login,
                    )}&background=cccccc&color=ffffff`;
                  }}
                />
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline truncate"
                >
                  {user.login}
                </a>
              </li>
            ))}
            {dismissalTeams.map((team) => (
              <li key={team.id} className="flex items-center gap-2">
                <LucideReact.Users size={16} className="text-gray-500" />
                <span className="truncate">{team.name}</span>
              </li>
            ))}
            {dismissalApps.map((app) => (
              <li key={app.id} className="flex items-center gap-2">
                <LucideReact.Layers size={16} className="text-gray-500" />
                <a
                  href={app.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline truncate"
                >
                  {app.name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-2 text-sm text-gray-500 italic">None specified</div>
        )}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-900">Bypass Approvals</h3>
        {bypassUsers.length + bypassTeams.length + bypassApps.length > 0 ? (
          <ul className="mt-2 space-y-2 max-h-44 overflow-y-auto">
            {bypassUsers.map((user) => (
              <li key={user.id} className="flex items-center gap-2">
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-6 h-6 rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.login,
                    )}&background=cccccc&color=ffffff`;
                  }}
                />
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline truncate"
                >
                  {user.login}
                </a>
              </li>
            ))}
            {bypassTeams.map((team) => (
              <li key={team.id} className="flex items-center gap-2">
                <LucideReact.Users size={16} className="text-gray-500" />
                <span className="truncate">{team.name}</span>
              </li>
            ))}
            {bypassApps.map((app) => (
              <li key={app.id} className="flex items-center gap-2">
                <LucideReact.Layers size={16} className="text-gray-500" />
                <a
                  href={app.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline truncate"
                >
                  {app.name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-2 text-sm text-gray-500 italic">None specified</div>
        )}
      </div>
      {value.url && (
        <div className="flex items-center text-sm text-gray-500">
          <LucideReact.Link size={16} className="text-gray-500" />
          <a
            href={value.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 hover:underline truncate break-all"
          >
            {value.url}
          </a>
        </div>
      )}
    </div>
  );
}
