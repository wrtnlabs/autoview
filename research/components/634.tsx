import * as LucideReact from "lucide-react";
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
  // 1. Data aggregation and derived values
  const requiredCount = value.required_approving_review_count ?? 0;

  const bypass = value.bypass_pull_request_allowances ?? {};
  const dismissal = value.dismissal_restrictions ?? {};

  const bypassUsers = bypass.users?.length ?? 0;
  const bypassTeams = bypass.teams?.length ?? 0;
  const bypassApps = bypass.apps?.length ?? 0;
  const hasBypass = bypassUsers + bypassTeams + bypassApps > 0;

  const dismissalUsers = dismissal.users?.length ?? 0;
  const dismissalTeams = dismissal.teams?.length ?? 0;
  const dismissalApps = dismissal.apps?.length ?? 0;
  const hasDismissal = dismissalUsers + dismissalTeams + dismissalApps > 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Pull Request Review Settings
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Review Requirements */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Review Requirements
          </h3>
          <div className="space-y-2">
            <div className="flex items-center text-gray-700">
              {value.require_code_owner_reviews ? (
                <LucideReact.CheckCircle className="text-green-500" size={16} />
              ) : (
                <LucideReact.XCircle className="text-red-500" size={16} />
              )}
              <span className="ml-2">Require code owner reviews</span>
            </div>
            <div className="flex items-center text-gray-700">
              {value.dismiss_stale_reviews ? (
                <LucideReact.CheckCircle className="text-green-500" size={16} />
              ) : (
                <LucideReact.XCircle className="text-red-500" size={16} />
              )}
              <span className="ml-2">Dismiss stale reviews</span>
            </div>
            {"require_last_push_approval" in value && (
              <div className="flex items-center text-gray-700">
                {value.require_last_push_approval ? (
                  <LucideReact.CheckCircle
                    className="text-green-500"
                    size={16}
                  />
                ) : (
                  <LucideReact.XCircle className="text-red-500" size={16} />
                )}
                <span className="ml-2">Require last push approval</span>
              </div>
            )}
            <div className="flex items-center text-gray-700">
              <LucideReact.User className="text-gray-500" size={16} />
              <span className="ml-2">
                Required approving reviews: {requiredCount}
              </span>
            </div>
          </div>
        </div>

        {/* Bypass & Dismissal Settings */}
        <div className="space-y-4">
          {/* Bypass Pull Request Allowances */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Bypass Allowances
            </h3>
            {hasBypass ? (
              <div className="flex items-center flex-wrap gap-4 text-gray-600">
                {bypassUsers > 0 && (
                  <div className="flex items-center">
                    <LucideReact.User size={16} className="text-gray-500" />
                    <span className="ml-1">{bypassUsers} users</span>
                  </div>
                )}
                {bypassTeams > 0 && (
                  <div className="flex items-center">
                    <LucideReact.Users size={16} className="text-gray-500" />
                    <span className="ml-1">{bypassTeams} teams</span>
                  </div>
                )}
                {bypassApps > 0 && (
                  <div className="flex items-center">
                    <LucideReact.Box size={16} className="text-gray-500" />
                    <span className="ml-1">{bypassApps} apps</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-gray-500">No bypass allowances</div>
            )}
          </div>

          {/* Dismissal Restrictions */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Dismissal Restrictions
            </h3>
            {hasDismissal ? (
              <div className="flex items-center flex-wrap gap-4 text-gray-600">
                {dismissalUsers > 0 && (
                  <div className="flex items-center">
                    <LucideReact.User size={16} className="text-gray-500" />
                    <span className="ml-1">{dismissalUsers} users</span>
                  </div>
                )}
                {dismissalTeams > 0 && (
                  <div className="flex items-center">
                    <LucideReact.Users size={16} className="text-gray-500" />
                    <span className="ml-1">{dismissalTeams} teams</span>
                  </div>
                )}
                {dismissalApps > 0 && (
                  <div className="flex items-center">
                    <LucideReact.Box size={16} className="text-gray-500" />
                    <span className="ml-1">{dismissalApps} apps</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-gray-500">No dismissal restrictions</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
