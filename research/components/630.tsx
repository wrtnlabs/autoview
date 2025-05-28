import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Branch Protection
     *
     * @title Branch Protection
    */
    export interface branch_protection {
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
    }
    /**
     * Protected Branch Required Status Check
     *
     * @title Protected Branch Required Status Check
    */
    export interface protected_branch_required_status_check {
        url?: string;
        enforcement_level?: string;
        contexts: string[];
        checks: {
            context: string;
            app_id: (number & tags.Type<"int32">) | null;
        }[];
        contexts_url?: string;
        strict?: boolean;
    }
    /**
     * Protected Branch Admin Enforced
     *
     * @title Protected Branch Admin Enforced
    */
    export interface protected_branch_admin_enforced {
        url: string & tags.Format<"uri">;
        enabled: boolean;
    }
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
export type AutoViewInput = AutoViewInputSubTypes.branch_protection;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const branchName = value.name ?? "Unnamed branch";
  const isEnabled = value.enabled ?? false;
  const statusChecks = value.required_status_checks;
  const enforceAdmins = value.enforce_admins?.enabled ?? false;
  const prReviews = value.required_pull_request_reviews;
  const restrictions = value.restrictions;
  const reqLinear = value.required_linear_history?.enabled ?? false;
  const allowForce = value.allow_force_pushes?.enabled ?? false;
  const allowDeletions = value.allow_deletions?.enabled ?? false;
  const blockCreations = value.block_creations?.enabled ?? false;
  const reqConversation = value.required_conversation_resolution?.enabled ?? false;
  const reqSignatures = value.required_signatures?.enabled ?? false;
  const lockBranch = value.lock_branch?.enabled ?? false;
  const allowForkSync = value.allow_fork_syncing?.enabled ?? false;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LucideReact.ShieldCheck className="text-blue-500" size={20} />
          <h2 className="text-lg font-semibold text-gray-800 truncate">{branchName}</h2>
        </div>
        <div className="flex items-center gap-1">
          {isEnabled ? (
            <LucideReact.CheckCircle className="text-green-500" size={20} />
          ) : (
            <LucideReact.XCircle className="text-red-500" size={20} />
          )}
          <span className={`text-sm ${isEnabled ? "text-green-600" : "text-red-600"}`}>
            {isEnabled ? "Enabled" : "Disabled"}
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {statusChecks && (
          <div className="flex items-center gap-2">
            <LucideReact.CheckSquare className="text-gray-600" size={16} />
            <span className="text-sm text-gray-700">
              Required status checks ({statusChecks.contexts.length}
              {statusChecks.strict ? ", strict" : ""})
            </span>
          </div>
        )}

        <div className="flex items-center gap-2">
          {enforceAdmins ? (
            <LucideReact.UserCheck className="text-gray-600" size={16} />
          ) : (
            <LucideReact.UserX className="text-gray-400" size={16} />
          )}
          <span className={`text-sm ${enforceAdmins ? "text-gray-700" : "text-gray-500"}`}>
            Enforce for admins
          </span>
        </div>

        {prReviews && (
          <div className="col-span-1 sm:col-span-2 flex items-start gap-2">
            <LucideReact.MessageSquare className="text-gray-600 mt-1" size={16} />
            <div>
              <span className="text-sm font-medium text-gray-700">Pull Request Reviews:</span>
              <ul className="mt-1 space-y-1 text-sm text-gray-600 list-disc list-inside">
                <li>Dismiss stale reviews: {prReviews.dismiss_stale_reviews ? "Yes" : "No"}</li>
                <li>
                  Require code owner reviews: {prReviews.require_code_owner_reviews ? "Yes" : "No"}
                </li>
                {prReviews.required_approving_review_count != null && (
                  <li>Required approvals: {prReviews.required_approving_review_count}</li>
                )}
                {prReviews.bypass_pull_request_allowances && (
                  <li>
                    Bypass allowances: users{" "}
                    {prReviews.bypass_pull_request_allowances.users?.length ?? 0}, teams{" "}
                    {prReviews.bypass_pull_request_allowances.teams?.length ?? 0}, apps{" "}
                    {prReviews.bypass_pull_request_allowances.apps?.length ?? 0}
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}

        {restrictions && (
          <div className="col-span-1 sm:col-span-2 flex items-start gap-2">
            <LucideReact.Lock className="text-gray-600 mt-1" size={16} />
            <div>
              <span className="text-sm font-medium text-gray-700">Restrictions:</span>
              <div className="mt-1 text-sm text-gray-600">
                {restrictions.users.length} users, {restrictions.teams.length} teams,{" "}
                {restrictions.apps.length} apps
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          {reqLinear ? (
            <LucideReact.ArrowUp className="text-gray-600" size={16} />
          ) : (
            <LucideReact.ArrowDown className="text-gray-400" size={16} />
          )}
          <span className={`text-sm ${reqLinear ? "text-gray-700" : "text-gray-500"}`}>
            Linear history required
          </span>
        </div>

        <div className="flex items-center gap-2">
          {allowForce ? (
            <LucideReact.ArrowRightCircle className="text-gray-600" size={16} />
          ) : (
            <LucideReact.ArrowRightCircle className="text-gray-400" size={16} />
          )}
          <span className={`text-sm ${allowForce ? "text-gray-700" : "text-gray-500"}`}>
            Force pushes allowed
          </span>
        </div>

        <div className="flex items-center gap-2">
          {allowDeletions ? (
            <LucideReact.Trash2 className="text-gray-600" size={16} />
          ) : (
            <LucideReact.Trash2 className="text-gray-400" size={16} />
          )}
          <span className={`text-sm ${allowDeletions ? "text-gray-700" : "text-gray-500"}`}>
            Deletions allowed
          </span>
        </div>

        <div className="flex items-center gap-2">
          {blockCreations ? (
            <LucideReact.Lock className="text-gray-600" size={16} />
          ) : (
            <LucideReact.Unlock className="text-gray-400" size={16} />
          )}
          <span className={`text-sm ${blockCreations ? "text-gray-700" : "text-gray-500"}`}>
            Block branch creation
          </span>
        </div>

        <div className="flex items-center gap-2">
          {reqConversation ? (
            <LucideReact.MessageCircle className="text-gray-600" size={16} />
          ) : (
            <LucideReact.MessageCircle className="text-gray-400" size={16} />
          )}
          <span className={`text-sm ${reqConversation ? "text-gray-700" : "text-gray-500"}`}>
            Conversation resolution required
          </span>
        </div>

        <div className="flex items-center gap-2">
          {reqSignatures ? (
            <LucideReact.FileSignature className="text-gray-600" size={16} />
          ) : (
            <LucideReact.FileSignature className="text-gray-400" size={16} />
          )}
          <span className={`text-sm ${reqSignatures ? "text-gray-700" : "text-gray-500"}`}>
            Signatures required
          </span>
        </div>

        <div className="flex items-center gap-2">
          {lockBranch ? (
            <LucideReact.Lock className="text-gray-600" size={16} />
          ) : (
            <LucideReact.Unlock className="text-gray-400" size={16} />
          )}
          <span className={`text-sm ${lockBranch ? "text-gray-700" : "text-gray-500"}`}>
            Branch locked
          </span>
        </div>

        <div className="flex items-center gap-2">
          {allowForkSync ? (
            <LucideReact.GitBranchPlus className="text-gray-600" size={16} />
          ) : (
            <LucideReact.GitBranch className="text-gray-400" size={16} />
          )}
          <span className={`text-sm ${allowForkSync ? "text-gray-700" : "text-gray-500"}`}>
            Fork syncing allowed
          </span>
        </div>
      </div>
    </div>
  );
}
