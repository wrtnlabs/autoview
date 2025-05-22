import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Branch With Protection
   *
   * @title Branch With Protection
   */
  export type branch_with_protection = {
    name: string;
    commit: AutoViewInputSubTypes.commit;
    _links: {
      html: string;
      self: string & tags.Format<"uri">;
    };
    protected: boolean;
    protection: AutoViewInputSubTypes.branch_protection;
    protection_url: string & tags.Format<"uri">;
    pattern?: string;
    required_approving_review_count?: number & tags.Type<"int32">;
  };
  /**
   * Commit
   *
   * @title Commit
   */
  export type commit = {
    url: string & tags.Format<"uri">;
    sha: string;
    node_id: string;
    html_url: string & tags.Format<"uri">;
    comments_url: string & tags.Format<"uri">;
    commit: {
      url: string & tags.Format<"uri">;
      author: AutoViewInputSubTypes.nullable_git_user;
      committer: AutoViewInputSubTypes.nullable_git_user;
      message: string;
      comment_count: number & tags.Type<"int32">;
      tree: {
        sha: string;
        url: string & tags.Format<"uri">;
      };
      verification?: AutoViewInputSubTypes.verification;
    };
    author:
      | AutoViewInputSubTypes.simple_user
      | AutoViewInputSubTypes.empty_object
      | null;
    committer:
      | AutoViewInputSubTypes.simple_user
      | AutoViewInputSubTypes.empty_object
      | null;
    parents: {
      sha: string;
      url: string & tags.Format<"uri">;
      html_url?: string & tags.Format<"uri">;
    }[];
    stats?: {
      additions?: number & tags.Type<"int32">;
      deletions?: number & tags.Type<"int32">;
      total?: number & tags.Type<"int32">;
    };
    files?: AutoViewInputSubTypes.diff_entry[];
  };
  /**
   * Metaproperties for Git author/committer information.
   *
   * @title Git User
   */
  export type nullable_git_user = {
    name?: string;
    email?: string;
    date?: string;
  } | null;
  /**
   * @title Verification
   */
  export type verification = {
    verified: boolean;
    reason: string;
    payload: string | null;
    signature: string | null;
    verified_at: string | null;
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
   * An object without any properties.
   *
   * @title Empty Object
   */
  export type empty_object = {};
  /**
   * Diff Entry
   *
   * @title Diff Entry
   */
  export type diff_entry = {
    sha: string;
    filename: string;
    status:
      | "added"
      | "removed"
      | "modified"
      | "renamed"
      | "copied"
      | "changed"
      | "unchanged";
    additions: number & tags.Type<"int32">;
    deletions: number & tags.Type<"int32">;
    changes: number & tags.Type<"int32">;
    blob_url: string & tags.Format<"uri">;
    raw_url: string & tags.Format<"uri">;
    contents_url: string & tags.Format<"uri">;
    patch?: string;
    previous_filename?: string;
  };
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
export type AutoViewInput = AutoViewInputSubTypes.branch_with_protection;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived constants and formatting
  const isProtected = value.protected;
  const branchUrl = value._links.html;
  const protectionUrl = value.protection_url;
  const commitData = value.commit.commit;
  const shortSha = value.commit.sha.slice(0, 7);
  const authorName = commitData.author?.name ?? "Unknown";
  const commitDateRaw = commitData.author?.date;
  const commitDate = commitDateRaw
    ? new Date(commitDateRaw).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;
  const commitMessage = commitData.message.split("\n")[0];

  //  Protection details aggregation
  const details: string[] = [];
  const statusChecks = value.protection.required_status_checks;
  if (statusChecks?.contexts?.length) {
    details.push(`Status checks: ${statusChecks.contexts.join(", ")}`);
  }
  const prReviews = value.protection.required_pull_request_reviews;
  if (prReviews) {
    details.push(
      `Require code owner reviews: ${prReviews.require_code_owner_reviews ? "Yes" : "No"}`,
    );
    if (typeof prReviews.required_approving_review_count === "number") {
      details.push(
        `${prReviews.required_approving_review_count} approving review(s)`,
      );
    }
  }
  const restrictions = value.protection.restrictions;
  if (restrictions) {
    const u = restrictions.users?.length ?? 0;
    const t = restrictions.teams?.length ?? 0;
    const a = restrictions.apps?.length ?? 0;
    if (u + t + a > 0) {
      details.push(`Restrictions: ${u} users, ${t} teams, ${a} apps`);
    }
  }
  if (value.protection.allow_force_pushes?.enabled) {
    details.push("Allow force pushes");
  }
  if (value.protection.allow_deletions?.enabled) {
    details.push("Allow deletions");
  }
  if (value.pattern) {
    details.push(`Pattern: ${value.pattern}`);
  }
  if (typeof value.required_approving_review_count === "number") {
    details.push(
      `${value.required_approving_review_count} required approving reviews`,
    );
  }

  // 2. JSX structure with Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header: Branch name & protected status */}
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 truncate">
          {isProtected ? (
            <LucideReact.Lock className="text-green-500" size={20} />
          ) : (
            <LucideReact.Unlock className="text-red-500" size={20} />
          )}
          {value.name}
        </h2>
        <a
          href={branchUrl}
          className="flex items-center gap-1 text-blue-500 hover:underline"
          aria-label="View branch on GitHub"
        >
          <LucideReact.Link size={16} />
        </a>
      </div>

      {/* Commit info: SHA, author, date */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1 truncate">
          <LucideReact.GitCommit size={16} />
          <span>{shortSha}</span>
        </div>
        <div className="flex items-center gap-1 truncate">
          <LucideReact.User size={16} />
          <span>{authorName}</span>
        </div>
        {commitDate && (
          <div className="flex items-center gap-1 truncate">
            <LucideReact.Calendar size={16} />
            <time dateTime={commitDateRaw}>{commitDate}</time>
          </div>
        )}
      </div>

      {/* Commit message (first line) */}
      <div className="px-3 py-2 bg-gray-50 rounded text-sm text-gray-700 line-clamp-2">
        {commitMessage}
      </div>

      {/* Protection details list */}
      {details.length > 0 && (
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          {details.map((detail, idx) => (
            <li key={idx}>{detail}</li>
          ))}
        </ul>
      )}

      {/* Link to full protection settings */}
      {protectionUrl && (
        <div className="mt-2 text-sm">
          <a
            href={protectionUrl}
            className="flex items-center gap-1 text-blue-500 hover:underline"
            aria-label="View protection settings"
          >
            <LucideReact.Link size={16} />
            <span>Protection settings</span>
          </a>
        </div>
      )}
    </div>
  );
}
