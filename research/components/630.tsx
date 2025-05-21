import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Branch Protection
     *
     * @title Branch Protection
    */
    export type branch_protection = {
        url?: string;
        enabled?: boolean;
        required_status_checks?: AutoViewInputSubTypes.protected_branch_required_status_check;
        enforce_admins?: AutoViewInputSubTypes.protected_branch_admin_enforced;
        required_pull_request_reviews?: AutoViewInputSubTypes.protected_branch_pull_request_review;
        restrictions?: AutoViewInputSubTypes.branch_restriction_policy;
        required_linear_history?: {
            enabled?: boolean;
        };
        allow_force_pushes?: {
            enabled?: boolean;
        };
        allow_deletions?: {
            enabled?: boolean;
        };
        block_creations?: {
            enabled?: boolean;
        };
        required_conversation_resolution?: {
            enabled?: boolean;
        };
        name?: string;
        protection_url?: string;
        required_signatures?: {
            url: string & tags.Format<"uri">;
            enabled: boolean;
        };
        /**
         * Whether to set the branch as read-only. If this is true, users will not be able to push to the branch.
        */
        lock_branch?: {
            enabled?: boolean;
        };
        /**
         * Whether users can pull changes from upstream when the branch is locked. Set to `true` to allow fork syncing. Set to `false` to prevent fork syncing.
        */
        allow_fork_syncing?: {
            enabled?: boolean;
        };
    };
    /**
     * Protected Branch Required Status Check
     *
     * @title Protected Branch Required Status Check
    */
    export type protected_branch_required_status_check = {
        url?: string;
        enforcement_level?: string;
        contexts: string[];
        checks: {
            context: string;
            app_id: (number & tags.Type<"int32">) | null;
        }[];
        contexts_url?: string;
        strict?: boolean;
    };
    /**
     * Protected Branch Admin Enforced
     *
     * @title Protected Branch Admin Enforced
    */
    export type protected_branch_admin_enforced = {
        url: string & tags.Format<"uri">;
        enabled: boolean;
    };
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
    /**
     * Branch Restriction Policy
     *
     * @title Branch Restriction Policy
    */
    export type branch_restriction_policy = {
        url: string & tags.Format<"uri">;
        users_url: string & tags.Format<"uri">;
        teams_url: string & tags.Format<"uri">;
        apps_url: string & tags.Format<"uri">;
        users: {
            login?: string;
            id?: number & tags.Type<"int32">;
            node_id?: string;
            avatar_url?: string;
            gravatar_id?: string;
            url?: string;
            html_url?: string;
            followers_url?: string;
            following_url?: string;
            gists_url?: string;
            starred_url?: string;
            subscriptions_url?: string;
            organizations_url?: string;
            repos_url?: string;
            events_url?: string;
            received_events_url?: string;
            type?: string;
            site_admin?: boolean;
            user_view_type?: string;
        }[];
        teams: {
            id?: number & tags.Type<"int32">;
            node_id?: string;
            url?: string;
            html_url?: string;
            name?: string;
            slug?: string;
            description?: string | null;
            privacy?: string;
            notification_setting?: string;
            permission?: string;
            members_url?: string;
            repositories_url?: string;
            parent?: string | null;
        }[];
        apps: {
            id?: number & tags.Type<"int32">;
            slug?: string;
            node_id?: string;
            owner?: {
                login?: string;
                id?: number & tags.Type<"int32">;
                node_id?: string;
                url?: string;
                repos_url?: string;
                events_url?: string;
                hooks_url?: string;
                issues_url?: string;
                members_url?: string;
                public_members_url?: string;
                avatar_url?: string;
                description?: string;
                gravatar_id?: string;
                html_url?: string;
                followers_url?: string;
                following_url?: string;
                gists_url?: string;
                starred_url?: string;
                subscriptions_url?: string;
                organizations_url?: string;
                received_events_url?: string;
                type?: string;
                site_admin?: boolean;
                user_view_type?: string;
            };
            name?: string;
            client_id?: string;
            description?: string;
            external_url?: string;
            html_url?: string;
            created_at?: string;
            updated_at?: string;
            permissions?: {
                metadata?: string;
                contents?: string;
                issues?: string;
                single_file?: string;
            };
            events?: string[];
        }[];
    };
}
export type AutoViewInput = AutoViewInputSubTypes.branch_protection;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const branchName = value.name || 'Unnamed Branch';
  const isProtected = Boolean(value.enabled);

  // Status Checks
  const statusChecks = value.required_status_checks;
  const statusCount = statusChecks?.contexts.length ?? 0;
  const strictChecks = statusChecks?.strict;
  const displayedContexts = statusChecks?.contexts.slice(0, 3) ?? [];
  const remainingContexts = statusCount - displayedContexts.length;

  // Admin enforcement
  const enforceAdmins = Boolean(value.enforce_admins?.enabled);

  // Pull request reviews
  const prReviews = value.required_pull_request_reviews;
  const requiredApprovals = prReviews?.required_approving_review_count;
  const dismissStale = prReviews?.dismiss_stale_reviews;
  const codeOwner = prReviews?.require_code_owner_reviews;

  // Restrictions
  const restrictions = value.restrictions;
  const restrictUsers = restrictions?.users.length ?? 0;
  const restrictTeams = restrictions?.teams.length ?? 0;
  const restrictApps = restrictions?.apps.length ?? 0;

  // Other boolean settings
  const otherSettings = [
    { label: 'Linear History', flag: value.required_linear_history?.enabled },
    { label: 'Force Pushes', flag: value.allow_force_pushes?.enabled },
    { label: 'Deletions', flag: value.allow_deletions?.enabled },
    { label: 'New Branches', flag: value.block_creations?.enabled },
    { label: 'Conversation Resolution', flag: value.required_conversation_resolution?.enabled },
    { label: 'Lock Branch', flag: value.lock_branch?.enabled },
    { label: 'Fork Syncing', flag: value.allow_fork_syncing?.enabled },
    { label: 'Signatures', flag: value.required_signatures?.enabled },
  ].filter(item => item.flag !== undefined) as { label: string; flag: boolean }[];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 truncate">{branchName}</h2>
        <span
          className={`px-2 py-1 text-xs font-medium rounded ${
            isProtected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {isProtected ? 'Protected' : 'Unprotected'}
        </span>
      </div>

      {/* Status Checks */}
      {statusChecks && (
        <div>
          <h3 className="text-sm font-medium text-gray-700">Status Checks</h3>
          <p className="mt-1 text-sm text-gray-600">
            {statusCount} required context{statusCount !== 1 ? 's' : ''}{strictChecks ? ' (Strict)' : ''}
          </p>
          {statusCount > 0 && (
            <ul className="mt-2 flex flex-wrap gap-2">
              {displayedContexts.map((ctx, idx) => (
                <li
                  key={idx}
                  className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded truncate"
                  title={ctx}
                >
                  {ctx}
                </li>
              ))}
              {remainingContexts > 0 && (
                <li className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                  +{remainingContexts} more
                </li>
              )}
            </ul>
          )}
        </div>
      )}

      {/* Enforce Admins */}
      {'enabled' in (value.enforce_admins || {}) && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Enforce Admins</span>
          <span
            className={`px-2 py-1 text-xs font-medium rounded ${
              enforceAdmins ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {enforceAdmins ? 'On' : 'Off'}
          </span>
        </div>
      )}

      {/* Pull Request Reviews */}
      {prReviews && (
        <div>
          <h3 className="text-sm font-medium text-gray-700">Pull Request Reviews</h3>
          <dl className="mt-2 space-y-1 text-sm text-gray-600">
            {requiredApprovals != null && (
              <div className="flex justify-between">
                <dt className="font-medium">Approvals:</dt>
                <dd>{requiredApprovals}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="font-medium">Require Code Owner:</dt>
              <dd>{codeOwner ? 'Yes' : 'No'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium">Dismiss Stale Reviews:</dt>
              <dd>{dismissStale ? 'Yes' : 'No'}</dd>
            </div>
          </dl>
        </div>
      )}

      {/* Restrictions */}
      {restrictions && (
        <div>
          <h3 className="text-sm font-medium text-gray-700">Restrictions</h3>
          <p className="mt-1 text-sm text-gray-600">
            Users: {restrictUsers}, Teams: {restrictTeams}, Apps: {restrictApps}
          </p>
        </div>
      )}

      {/* Other Settings */}
      {otherSettings.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700">Other Settings</h3>
          <ul className="mt-2 grid grid-cols-2 gap-3">
            {otherSettings.map((setting) => (
              <li
                key={setting.label}
                className="flex items-center justify-between text-sm text-gray-700"
              >
                <span className="truncate">{setting.label}</span>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    setting.flag ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {setting.flag ? 'On' : 'Off'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
