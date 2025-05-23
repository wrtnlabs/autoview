import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Branch protections protect branches
     *
     * @title Protected Branch
    */
    export interface protected_branch {
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
    }
    /**
     * Status Check Policy
     *
     * @title Status Check Policy
    */
    export interface status_check_policy {
        url: string & tags.Format<"uri">;
        strict: boolean;
        contexts: string[];
        checks: {
            context: string;
            app_id: (number & tags.Type<"int32">) | null;
        }[];
        contexts_url: string & tags.Format<"uri">;
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
    /**
     * Branch Restriction Policy
     *
     * @title Branch Restriction Policy
    */
    export interface branch_restriction_policy {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.protected_branch;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { 
    required_status_checks: statusChecks,
    required_pull_request_reviews: prReviews,
    required_signatures: signatures,
    enforce_admins: admins,
    required_linear_history: linearHistory,
    allow_force_pushes: forcePushes,
    allow_deletions: deletions,
    restrictions,
    required_conversation_resolution: convResolution,
    block_creations: blockCreations,
    lock_branch: lockBranch,
    allow_fork_syncing: forkSync
  } = value;

  const renderToggle = (enabled?: boolean) =>
    enabled
      ? <LucideReact.CheckCircle className="text-green-500" size={16} />
      : <LucideReact.XCircle className="text-red-500" size={16} />;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-lg mx-auto space-y-4">
      <h2 className="text-xl font-semibold flex items-center">
        <LucideReact.ShieldUser className="text-blue-500 mr-2" size={24} />
        Branch Protection
      </h2>

      {/* Required Status Checks */}
      {statusChecks && (
        <div className="flex items-start space-x-3">
          <LucideReact.CheckSquare className="mt-1 text-green-500" size={20} />
          <div>
            <p className="font-medium">Required Status Checks</p>
            <p className="text-sm text-gray-600">
              Mode: <span className="font-semibold">{statusChecks.strict ? 'Strict' : 'Non-strict'}</span> •{' '}
              {statusChecks.contexts.length} check{statusChecks.contexts.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      )}

      {/* Pull Request Reviews */}
      {prReviews && (
        <div className="flex items-start space-x-3">
          <LucideReact.Users className="mt-1 text-indigo-500" size={20} />
          <div>
            <p className="font-medium">Pull Request Reviews</p>
            <p className="text-sm text-gray-600">
              {prReviews.required_approving_review_count ?? 0} approval
              {prReviews.required_approving_review_count === 1 ? '' : 's'}
              {prReviews.require_code_owner_reviews ? ', code owner reviews' : ''}
              {prReviews.dismiss_stale_reviews ? ', dismiss stale reviews' : ''}
              {prReviews.require_last_push_approval ? ', last-push approval' : ''}
            </p>
          </div>
        </div>
      )}

      {/* Required Signatures */}
      {signatures && (
        <div className="flex items-center space-x-2">
          <LucideReact.PenTool className="text-purple-500" size={20} />
          <span className="font-medium">Signatures Required:</span>
          {renderToggle(signatures.enabled)}
        </div>
      )}

      {/* Enforce Admins */}
      {admins && (
        <div className="flex items-center space-x-2">
          <LucideReact.UserCheck className="text-green-600" size={20} />
          <span className="font-medium">Enforce for Admins:</span>
          {renderToggle(admins.enabled)}
        </div>
      )}

      {/* Linear History */}
      {linearHistory && (
        <div className="flex items-center space-x-2">
          <LucideReact.SplitSquareVertical className="text-gray-700" size={20} />
          <span className="font-medium">Linear History:</span>
          {renderToggle(linearHistory.enabled)}
        </div>
      )}

      {/* Force Pushes */}
      {forcePushes && (
        <div className="flex items-center space-x-2">
          <LucideReact.XOctagon className="text-red-500" size={20} />
          <span className="font-medium">Force Pushes Allowed:</span>
          {renderToggle(forcePushes.enabled)}
        </div>
      )}

      {/* Deletions */}
      {deletions && (
        <div className="flex items-center space-x-2">
          <LucideReact.Trash2 className="text-red-500" size={20} />
          <span className="font-medium">Deletions Allowed:</span>
          {renderToggle(deletions.enabled)}
        </div>
      )}

      {/* Conversation Resolution */}
      {convResolution && (
        <div className="flex items-center space-x-2">
          <LucideReact.MessageSquare className="text-yellow-600" size={20} />
          <span className="font-medium">Conversation Resolution:</span>
          {renderToggle(convResolution.enabled ?? false)}
        </div>
      )}

      {/* Block Creations */}
      {blockCreations && (
        <div className="flex items-center space-x-2">
          <LucideReact.Ban className="text-red-600" size={20} />
          <span className="font-medium">Block Branch Creations:</span>
          {renderToggle(blockCreations.enabled)}
        </div>
      )}

      {/* Lock Branch */}
      {lockBranch && (
        <div className="flex items-center space-x-2">
          <LucideReact.Lock className="text-gray-800" size={20} />
          <span className="font-medium">Branch Locked:</span>
          {renderToggle(lockBranch.enabled ?? false)}
        </div>
      )}

      {/* Fork Sync */}
      {forkSync && (
        <div className="flex items-center space-x-2">
          <LucideReact.RefreshCcw className="text-blue-600" size={20} />
          <span className="font-medium">Allow Fork Syncing:</span>
          {renderToggle(forkSync.enabled ?? false)}
        </div>
      )}

      {/* Restrictions */}
      {restrictions && (
        <div className="flex items-start space-x-3">
          <LucideReact.Lock className="mt-1 text-red-500" size={20} />
          <div>
            <p className="font-medium">Restrictions</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-1">
              <div className="flex items-center space-x-1">
                <LucideReact.User className="text-gray-500" size={16}/>
                <span>{restrictions.users.length} user{restrictions.users.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center space-x-1">
                <LucideReact.Users className="text-gray-500" size={16}/>
                <span>{restrictions.teams.length} team{restrictions.teams.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center space-x-1">
                <LucideReact.Box className="text-gray-500" size={16}/>
                <span>{restrictions.apps.length} app{restrictions.apps.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
