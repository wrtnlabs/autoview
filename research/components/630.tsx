import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
    required_approving_review_count?: number &
      tags.Type<"uint32"> &
      tags.Maximum<6>;
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
  export type enterprise = {
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
  };
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
  const branchName = value.name ?? "Unnamed branch";
  const isEnabled = !!value.enabled;

  const statusChecks = value.required_status_checks;
  const statusChecksSummary = statusChecks
    ? `${statusChecks.contexts.length} check${statusChecks.contexts.length !== 1 ? "s" : ""}` +
      (statusChecks.strict ? " (strict)" : "")
    : "None";

  const enforceAdmins = value.enforce_admins?.enabled ?? false;

  const prReviews = value.required_pull_request_reviews;
  const prReviewsSummary = prReviews
    ? [
        prReviews.dismiss_stale_reviews ? "Dismiss stale reviews" : null,
        prReviews.require_code_owner_reviews
          ? "Require code owner reviews"
          : null,
        prReviews.required_approving_review_count
          ? `${prReviews.required_approving_review_count} approval${
              prReviews.required_approving_review_count !== 1 ? "s" : ""
            }`
          : null,
      ]
        .filter(Boolean)
        .join(", ") || "None"
    : "None";

  const restrictions = value.restrictions;
  const restrictionsSummary = restrictions
    ? `${restrictions.users.length} user${restrictions.users.length !== 1 ? "s" : ""}, ` +
      `${restrictions.teams.length} team${restrictions.teams.length !== 1 ? "s" : ""}, ` +
      `${restrictions.apps.length} app${restrictions.apps.length !== 1 ? "s" : ""}`
    : "None";

  const hasLinearHistory = value.required_linear_history?.enabled ?? false;
  const allowForcePush = value.allow_force_pushes?.enabled ?? false;
  const allowDeletions = value.allow_deletions?.enabled ?? false;
  const blockCreations = value.block_creations?.enabled ?? false;
  const convoResolution =
    value.required_conversation_resolution?.enabled ?? false;
  const requiredSignatures = value.required_signatures?.enabled ?? false;
  const lockBranch = value.lock_branch?.enabled ?? false;
  const allowForkSync = value.allow_fork_syncing?.enabled ?? false;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm text-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900 flex items-center">
          <LucideReact.GitBranch className="text-blue-500 mr-2" size={20} />
          {branchName}
        </h2>
        {isEnabled ? (
          <LucideReact.CheckCircle className="text-green-500" size={20} />
        ) : (
          <LucideReact.XCircle className="text-red-500" size={20} />
        )}
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex items-center">
          <LucideReact.Clock className="text-gray-500 mr-2" size={16} />
          <span>Status Checks: {statusChecksSummary}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.ShieldOff className="text-gray-500 mr-2" size={16} />
          <span>Enforce Admins: {enforceAdmins ? "Yes" : "No"}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.GitPullRequest
            className="text-gray-500 mr-2"
            size={16}
          />
          <span>PR Reviews: {prReviewsSummary}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Lock className="text-gray-500 mr-2" size={16} />
          <span>Branch Locked: {lockBranch ? "Yes" : "No"}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Users className="text-gray-500 mr-2" size={16} />
          <span>Restrictions: {restrictionsSummary}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.History className="text-gray-500 mr-2" size={16} />
          <span>
            Linear History: {hasLinearHistory ? "Required" : "Not required"}
          </span>
        </div>
        <div className="flex items-center">
          <LucideReact.ArrowRightCircle
            className="text-gray-500 mr-2"
            size={16}
          />
          <span>Force Pushes: {allowForcePush ? "Allowed" : "Disallowed"}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Trash2 className="text-gray-500 mr-2" size={16} />
          <span>Deletions: {allowDeletions ? "Allowed" : "Disallowed"}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Slash className="text-gray-500 mr-2" size={16} />
          <span>Block Creations: {blockCreations ? "Yes" : "No"}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.MessageSquare className="text-gray-500 mr-2" size={16} />
          <span>
            Conversation Resolution:{" "}
            {convoResolution ? "Required" : "Not required"}
          </span>
        </div>
        <div className="flex items-center">
          <LucideReact.FileSignature className="text-gray-500 mr-2" size={16} />
          <span>
            Signatures: {requiredSignatures ? "Required" : "Not required"}
          </span>
        </div>
        <div className="flex items-center">
          <LucideReact.RefreshCw className="text-gray-500 mr-2" size={16} />
          <span>Fork Syncing: {allowForkSync ? "Allowed" : "Disallowed"}</span>
        </div>
      </div>

      {/* Protection URL */}
      {value.protection_url && (
        <div className="flex items-center text-xs text-gray-600">
          <LucideReact.Link className="mr-2" size={14} />
          <span className="truncate">{value.protection_url}</span>
        </div>
      )}
    </div>
  );
}
