import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
}
export type AutoViewInput =
  AutoViewInputSubTypes.protected_branch_pull_request_review;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const dr = value.dismissal_restrictions;
  const drUsers = dr?.users?.length ?? 0;
  const drTeams = dr?.teams?.length ?? 0;
  const drApps = dr?.apps?.length ?? 0;

  const bp = value.bypass_pull_request_allowances;
  const bpUsers = bp?.users?.length ?? 0;
  const bpTeams = bp?.teams?.length ?? 0;
  const bpApps = bp?.apps?.length ?? 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <section className="p-4 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <LucideReact.GitPullRequest size={20} className="text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800">
          Pull Request Review Settings
        </h2>
      </div>

      <ul className="space-y-2">
        <li className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-gray-700">
            <LucideReact.Clock size={16} className="text-gray-500" />
            <span>Dismiss stale reviews</span>
          </span>
          {value.dismiss_stale_reviews ? (
            <LucideReact.CheckCircle size={16} className="text-green-500" />
          ) : (
            <LucideReact.XCircle size={16} className="text-red-500" />
          )}
        </li>

        <li className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-gray-700">
            <LucideReact.ShieldCheck size={16} className="text-gray-500" />
            <span>Require code owner reviews</span>
          </span>
          {value.require_code_owner_reviews ? (
            <LucideReact.CheckCircle size={16} className="text-green-500" />
          ) : (
            <LucideReact.XCircle size={16} className="text-red-500" />
          )}
        </li>

        {typeof value.required_approving_review_count === "number" && (
          <li className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-gray-700">
              <LucideReact.CheckSquare size={16} className="text-gray-500" />
              <span>Required approving reviews</span>
            </span>
            <span className="text-gray-800 font-medium">
              {value.required_approving_review_count}
            </span>
          </li>
        )}

        {value.require_last_push_approval && (
          <li className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-gray-700">
              <LucideReact.UserCheck size={16} className="text-gray-500" />
              <span>Require last push approval</span>
            </span>
            <LucideReact.CheckCircle size={16} className="text-green-500" />
          </li>
        )}
      </ul>

      {drUsers + drTeams + drApps > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-800 mb-2">
            Dismissal Restrictions
          </h3>
          <div className="flex flex-wrap items-center gap-4 text-gray-700">
            {drUsers > 0 && (
              <div className="flex items-center gap-1">
                <LucideReact.User size={16} className="text-gray-500" />
                <span>
                  {drUsers} user{drUsers > 1 ? "s" : ""}
                </span>
              </div>
            )}
            {drTeams > 0 && (
              <div className="flex items-center gap-1">
                <LucideReact.Users size={16} className="text-gray-500" />
                <span>
                  {drTeams} team{drTeams > 1 ? "s" : ""}
                </span>
              </div>
            )}
            {drApps > 0 && (
              <div className="flex items-center gap-1">
                <LucideReact.Box size={16} className="text-gray-500" />
                <span>
                  {drApps} app{drApps > 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {bpUsers + bpTeams + bpApps > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-800 mb-2">
            Bypass PR Allowances
          </h3>
          <div className="flex flex-wrap items-center gap-4 text-gray-700">
            {bpUsers > 0 && (
              <div className="flex items-center gap-1">
                <LucideReact.User size={16} className="text-gray-500" />
                <span>
                  {bpUsers} user{bpUsers > 1 ? "s" : ""}
                </span>
              </div>
            )}
            {bpTeams > 0 && (
              <div className="flex items-center gap-1">
                <LucideReact.Users size={16} className="text-gray-500" />
                <span>
                  {bpTeams} team{bpTeams > 1 ? "s" : ""}
                </span>
              </div>
            )}
            {bpApps > 0 && (
              <div className="flex items-center gap-1">
                <LucideReact.Box size={16} className="text-gray-500" />
                <span>
                  {bpApps} app{bpApps > 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
