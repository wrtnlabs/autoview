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
  const dismissalUsers = value.dismissal_restrictions?.users?.length ?? 0;
  const dismissalTeams = value.dismissal_restrictions?.teams?.length ?? 0;
  const dismissalApps = value.dismissal_restrictions?.apps?.length ?? 0;

  const bypassUsers = value.bypass_pull_request_allowances?.users?.length ?? 0;
  const bypassTeams = value.bypass_pull_request_allowances?.teams?.length ?? 0;
  const bypassApps = value.bypass_pull_request_allowances?.apps?.length ?? 0;

  const lastPushApproval = value.require_last_push_approval ?? false;

  const renderBadge = (enabled: boolean): JSX.Element => (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white ${
        enabled ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {enabled ? "Enabled" : "Disabled"}
    </span>
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Pull Request Review Requirements
      </h2>

      <dl className="space-y-3">
        <div className="flex justify-between items-center">
          <dt className="text-sm font-medium text-gray-500">Dismiss Stale Reviews</dt>
          <dd className="text-sm">{renderBadge(value.dismiss_stale_reviews)}</dd>
        </div>

        <div className="flex justify-between items-center">
          <dt className="text-sm font-medium text-gray-500">Require Code-Owner Reviews</dt>
          <dd className="text-sm">{renderBadge(value.require_code_owner_reviews)}</dd>
        </div>

        {value.required_approving_review_count != null && (
          <div className="flex justify-between items-center">
            <dt className="text-sm font-medium text-gray-500">
              Required Approving Reviews
            </dt>
            <dd className="text-sm text-gray-900">
              {value.required_approving_review_count}
            </dd>
          </div>
        )}

        <div className="flex justify-between items-center">
          <dt className="text-sm font-medium text-gray-500">
            Require Last Push Approval
          </dt>
          <dd className="text-sm">{renderBadge(lastPushApproval)}</dd>
        </div>
      </dl>

      {dismissalUsers + dismissalTeams + dismissalApps > 0 && (
        <div className="mt-6">
          <h3 className="text-md font-medium text-gray-700 mb-2">
            Dismissal Restrictions
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-900">
            <li>{dismissalUsers} User{dismissalUsers !== 1 ? "s" : ""}</li>
            <li>{dismissalTeams} Team{dismissalTeams !== 1 ? "s" : ""}</li>
            <li>{dismissalApps} App{dismissalApps !== 1 ? "s" : ""}</li>
          </ul>
        </div>
      )}

      {bypassUsers + bypassTeams + bypassApps > 0 && (
        <div className="mt-6">
          <h3 className="text-md font-medium text-gray-700 mb-2">
            Bypass Allowances
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-900">
            <li>{bypassUsers} User{bypassUsers !== 1 ? "s" : ""}</li>
            <li>{bypassTeams} Team{bypassTeams !== 1 ? "s" : ""}</li>
            <li>{bypassApps} App{bypassApps !== 1 ? "s" : ""}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
