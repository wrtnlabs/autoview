import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Branch protections protect branches
     *
     * @title Protected Branch
    */
    export type protected_branch = {
        url: string & tags.Format<"uri">;
        required_status_checks?: AutoViewInputSubTypes.status_check_policy;
        required_pull_request_reviews?: {
            url: string & tags.Format<"uri">;
            dismiss_stale_reviews?: boolean;
            require_code_owner_reviews?: boolean;
            required_approving_review_count?: number & tags.Type<"int32">;
            /**
             * Whether the most recent push must be approved by someone other than the person who pushed it.
            */
            require_last_push_approval?: boolean;
            dismissal_restrictions?: {
                url: string & tags.Format<"uri">;
                users_url: string & tags.Format<"uri">;
                teams_url: string & tags.Format<"uri">;
                users: AutoViewInputSubTypes.simple_user[];
                teams: AutoViewInputSubTypes.team[];
                apps?: AutoViewInputSubTypes.integration[];
            };
            bypass_pull_request_allowances?: {
                users: AutoViewInputSubTypes.simple_user[];
                teams: AutoViewInputSubTypes.team[];
                apps?: AutoViewInputSubTypes.integration[];
            };
        };
        required_signatures?: {
            url: string & tags.Format<"uri">;
            enabled: boolean;
        };
        enforce_admins?: {
            url: string & tags.Format<"uri">;
            enabled: boolean;
        };
        required_linear_history?: {
            enabled: boolean;
        };
        allow_force_pushes?: {
            enabled: boolean;
        };
        allow_deletions?: {
            enabled: boolean;
        };
        restrictions?: AutoViewInputSubTypes.branch_restriction_policy;
        required_conversation_resolution?: {
            enabled?: boolean;
        };
        block_creations?: {
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
     * Status Check Policy
     *
     * @title Status Check Policy
    */
    export type status_check_policy = {
        url: string & tags.Format<"uri">;
        strict: boolean;
        contexts: string[];
        checks: {
            context: string;
            app_id: (number & tags.Type<"int32">) | null;
        }[];
        contexts_url: string & tags.Format<"uri">;
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
export type AutoViewInput = AutoViewInputSubTypes.protected_branch;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const status = value.required_status_checks;
  const pr = value.required_pull_request_reviews;
  const restrictions = value.restrictions;
  const features = [
    { label: "Required Signatures", enabled: !!value.required_signatures?.enabled },
    { label: "Enforce Admins", enabled: !!value.enforce_admins?.enabled },
    { label: "Linear History", enabled: !!value.required_linear_history?.enabled },
    { label: "Force Pushes", enabled: !!value.allow_force_pushes?.enabled },
    { label: "Deletions", enabled: !!value.allow_deletions?.enabled },
    { label: "Conversation Resolution", enabled: !!value.required_conversation_resolution?.enabled },
    { label: "Block Creations", enabled: !!value.block_creations?.enabled },
    { label: "Lock Branch", enabled: !!value.lock_branch?.enabled },
    { label: "Fork Syncing", enabled: !!value.allow_fork_syncing?.enabled },
  ];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-lg font-semibold text-gray-800">Branch Protection Settings</h2>

      {status ? (
        <section>
          <h3 className="text-md font-medium text-gray-700 mb-1">Status Checks</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Strict Mode:</span>
              <span className="font-medium">{status.strict ? "Enabled" : "Disabled"}</span>
            </div>
            <div>Contexts:</div>
            <div className="flex flex-wrap mt-1">
              {status.contexts.map((ctx, idx) => (
                <span
                  key={idx}
                  className="bg-blue-50 text-blue-800 text-xs px-2 py-0.5 rounded mr-2 mb-2 truncate"
                >
                  {ctx}
                </span>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <div className="text-sm text-gray-600">No status check requirements.</div>
      )}

      {pr ? (
        <section>
          <h3 className="text-md font-medium text-gray-700 mb-1">Pull Request Reviews</h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600">
            <div className="flex justify-between">
              <dt>Required Approvals</dt>
              <dd className="font-medium">{pr.required_approving_review_count ?? 0}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Code Owner Reviews</dt>
              <dd className="font-medium">{pr.require_code_owner_reviews ? "Yes" : "No"}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Dismiss Stale Reviews</dt>
              <dd className="font-medium">{pr.dismiss_stale_reviews ? "Yes" : "No"}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Last Push Approval</dt>
              <dd className="font-medium">{pr.require_last_push_approval ? "Yes" : "No"}</dd>
            </div>
          </dl>
        </section>
      ) : (
        <div className="text-sm text-gray-600">No pull request review requirements.</div>
      )}

      {restrictions ? (
        <section>
          <h3 className="text-md font-medium text-gray-700 mb-1">Push Restrictions</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Users</span>
              <span className="font-medium">{restrictions.users.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Teams</span>
              <span className="font-medium">{restrictions.teams.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Apps</span>
              <span className="font-medium">{restrictions.apps.length}</span>
            </div>
          </div>
        </section>
      ) : null}

      <section>
        <h3 className="text-md font-medium text-gray-700 mb-2">Other Settings</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          {features.map((f) => (
            <div key={f.label} className="flex items-center space-x-2">
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  f.enabled ? "bg-green-500" : "bg-gray-300"
                }`}
              ></span>
              <span className="font-medium text-gray-700">{f.label}</span>
              <span className="ml-auto text-gray-600">{f.enabled ? "Enabled" : "Disabled"}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
  // 3. Return the React element.
}
