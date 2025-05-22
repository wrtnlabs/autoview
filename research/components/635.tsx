import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Protected Branch Pull Request Review
     *
     * @title Protected Branch Pull Request Review
    */
    export type protected_branch_pull_request_review = {
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
        owner: any | any;
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
    export type enterprise = any;
}
export type AutoViewInput = AutoViewInputSubTypes.protected_branch_pull_request_review;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const {
    dismiss_stale_reviews,
    require_code_owner_reviews,
    required_approving_review_count,
    require_last_push_approval,
    dismissal_restrictions,
    bypass_pull_request_allowances,
  } = value;

  const approvalsCount = required_approving_review_count ?? 1;
  const yesNo = (flag: boolean | undefined) => (flag ? "Yes" : "No");

  const drUsers = dismissal_restrictions?.users ?? [];
  const drTeams = dismissal_restrictions?.teams ?? [];
  const drApps = dismissal_restrictions?.apps ?? [];

  const baUsers = bypass_pull_request_allowances?.users ?? [];
  const baTeams = bypass_pull_request_allowances?.teams ?? [];
  const baApps = bypass_pull_request_allowances?.apps ?? [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800">
        Protected Branch Pull Request Review
      </h2>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <dt className="text-sm font-medium text-gray-600">Dismiss Stale Reviews</dt>
          <dd className="mt-1 text-gray-900">{yesNo(dismiss_stale_reviews)}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-600">Require Code Owner Reviews</dt>
          <dd className="mt-1 text-gray-900">{yesNo(require_code_owner_reviews)}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-600">Required Approvals</dt>
          <dd className="mt-1 text-gray-900">{approvalsCount}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-600">Require Last Push Approval</dt>
          <dd className="mt-1 text-gray-900">{yesNo(require_last_push_approval)}</dd>
        </div>
      </dl>

      {/* Bypass Pull Request Allowances */}
      {(baUsers.length > 0 || baTeams.length > 0 || baApps.length > 0) && (
        <section className="space-y-2">
          <h3 className="text-lg font-medium text-gray-700">
            Bypass Pull Request Allowances
          </h3>
          <div className="space-y-2">
            {baUsers.length > 0 && (
              <div>
                <dt className="text-sm font-medium text-gray-600">Users</dt>
                <dd className="mt-1 flex flex-wrap gap-2">
                  {baUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center space-x-2 bg-gray-50 px-2 py-1 rounded"
                    >
                      <img
                        src={user.avatar_url}
                        alt={user.login}
                        className="w-5 h-5 rounded-full"
                      />
                      <span className="text-sm text-gray-800 truncate max-w-xs">
                        {user.login}
                      </span>
                    </div>
                  ))}
                </dd>
              </div>
            )}
            {baTeams.length > 0 && (
              <div>
                <dt className="text-sm font-medium text-gray-600">Teams</dt>
                <dd className="mt-1 flex flex-wrap gap-2">
                  {baTeams.map((team) => (
                    <span
                      key={team.id}
                      className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded"
                    >
                      {team.name}
                    </span>
                  ))}
                </dd>
              </div>
            )}
            {baApps.length > 0 && (
              <div>
                <dt className="text-sm font-medium text-gray-600">Apps</dt>
                <dd className="mt-1 flex flex-wrap gap-2">
                  {baApps.map(
                    (app, idx) =>
                      app && (
                        <span
                          key={app.id ?? idx}
                          className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded"
                        >
                          {app.name}
                        </span>
                      )
                  )}
                </dd>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Dismissal Restrictions */}
      {(drUsers.length > 0 || drTeams.length > 0 || drApps.length > 0) && (
        <section className="space-y-2">
          <h3 className="text-lg font-medium text-gray-700">
            Dismissal Restrictions
          </h3>
          <div className="space-y-2">
            {drUsers.length > 0 && (
              <div>
                <dt className="text-sm font-medium text-gray-600">Users</dt>
                <dd className="mt-1 flex flex-wrap gap-2">
                  {drUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center space-x-2 bg-gray-50 px-2 py-1 rounded"
                    >
                      <img
                        src={user.avatar_url}
                        alt={user.login}
                        className="w-5 h-5 rounded-full"
                      />
                      <span className="text-sm text-gray-800 truncate max-w-xs">
                        {user.login}
                      </span>
                    </div>
                  ))}
                </dd>
              </div>
            )}
            {drTeams.length > 0 && (
              <div>
                <dt className="text-sm font-medium text-gray-600">Teams</dt>
                <dd className="mt-1 flex flex-wrap gap-2">
                  {drTeams.map((team) => (
                    <span
                      key={team.id}
                      className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded"
                    >
                      {team.name}
                    </span>
                  ))}
                </dd>
              </div>
            )}
            {drApps.length > 0 && (
              <div>
                <dt className="text-sm font-medium text-gray-600">Apps</dt>
                <dd className="mt-1 flex flex-wrap gap-2">
                  {drApps.map(
                    (app, idx) =>
                      app && (
                        <span
                          key={app.id ?? idx}
                          className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded"
                        >
                          {app.name}
                        </span>
                      )
                  )}
                </dd>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
