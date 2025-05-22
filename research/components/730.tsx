import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Details of a deployment environment
   *
   * @title Environment
   */
  export type environment = {
    /**
     * The id of the environment.
     */
    id: number & tags.Type<"int32">;
    node_id: string;
    /**
     * The name of the environment.
     */
    name: string;
    url: string;
    html_url: string;
    /**
     * The time that the environment was created, in ISO 8601 format.
     */
    created_at: string;
    /**
     * The time that the environment was last updated, in ISO 8601 format.
     */
    updated_at: string;
    /**
     * Built-in deployment protection rules for the environment.
     */
    protection_rules?: (
      | {
          id: number & tags.Type<"int32">;
          node_id: string;
          type: string;
          wait_timer?: AutoViewInputSubTypes.wait_timer;
        }
      | {
          id: number & tags.Type<"int32">;
          node_id: string;
          /**
           * Whether deployments to this environment can be approved by the user who created the deployment.
           */
          prevent_self_review?: boolean;
          type: string;
          /**
           * The people or teams that may approve jobs that reference the environment. You can list up to six users or teams as reviewers. The reviewers must have at least read access to the repository. Only one of the required reviewers needs to approve the job for it to proceed.
           */
          reviewers?: {
            type?: AutoViewInputSubTypes.deployment_reviewer_type;
            reviewer?:
              | AutoViewInputSubTypes.simple_user
              | AutoViewInputSubTypes.team;
          }[];
        }
      | {
          id: number & tags.Type<"int32">;
          node_id: string;
          type: string;
        }
    )[];
    deployment_branch_policy?: AutoViewInputSubTypes.deployment_branch_policy_settings;
  };
  /**
   * The amount of time to delay a job after the job is initially triggered. The time (in minutes) must be an integer between 0 and 43,200 (30 days).
   */
  export type wait_timer = number & tags.Type<"int32">;
  /**
   * The type of reviewer.
   */
  export type deployment_reviewer_type = "User" | "Team";
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
   * The type of deployment branch policy for this environment. To allow all branches to deploy, set to `null`.
   */
  export type deployment_branch_policy_settings = {
    /**
     * Whether only branches with branch protection rules can deploy to this environment. If `protected_branches` is `true`, `custom_branch_policies` must be `false`; if `protected_branches` is `false`, `custom_branch_policies` must be `true`.
     */
    protected_branches: boolean;
    /**
     * Whether only branches that match the specified name patterns can deploy to this environment.  If `custom_branch_policies` is `true`, `protected_branches` must be `false`; if `custom_branch_policies` is `false`, `protected_branches` must be `true`.
     */
    custom_branch_policies: boolean;
  } | null;
}
export type AutoViewInput = AutoViewInputSubTypes.environment;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedCreatedAt = new Date(value.created_at).toLocaleString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );
  const formattedUpdatedAt = new Date(value.updated_at).toLocaleString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );
  const rules = value.protection_rules ?? [];
  const branchPolicy = value.deployment_branch_policy;
  let branchPolicyLabel = "All Branches Allowed";
  if (branchPolicy) {
    if (branchPolicy.protected_branches) {
      branchPolicyLabel = "Protected Branches Only";
    } else if (branchPolicy.custom_branch_policies) {
      branchPolicyLabel = "Custom Branch Policies";
    }
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4 max-w-md mx-auto">
      {/* Environment Name */}
      <div className="flex items-center space-x-2">
        <LucideReact.GitBranch size={20} className="text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
      </div>

      {/* Environment URL */}
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <LucideReact.Link size={16} className="flex-shrink-0" />
        <a
          href={value.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline truncate"
        >
          {value.html_url}
        </a>
      </div>

      {/* Timestamps */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} />
          <span>Created: {formattedCreatedAt}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} />
          <span>Updated: {formattedUpdatedAt}</span>
        </div>
      </div>

      {/* Branch Policy */}
      <div className="flex items-center text-sm text-gray-700">
        <LucideReact.GitBranch size={16} className="mr-1 text-gray-500" />
        <span>Branch Policy: {branchPolicyLabel}</span>
      </div>

      {/* Protection Rules */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Protection Rules
        </h3>
        {rules.length === 0 ? (
          <div className="flex items-center text-sm text-gray-500">
            <LucideReact.ShieldOff size={16} />
            <span className="ml-1">None</span>
          </div>
        ) : (
          <ul className="space-y-2">
            {rules.map((rule) => (
              <li
                key={rule.node_id}
                className="flex items-start space-x-2 text-sm text-gray-600"
              >
                <LucideReact.Shield
                  size={16}
                  className="text-gray-500 mt-0.5 flex-shrink-0"
                />
                <div className="flex-1">
                  <span className="font-medium">{rule.type}</span>
                  <div className="text-gray-500">
                    {"wait_timer" in rule && rule.wait_timer != null
                      ? `Delay: ${rule.wait_timer} min`
                      : "reviewers" in rule && Array.isArray(rule.reviewers)
                        ? `Reviewers: ${rule.reviewers.length}`
                        : "prevent_self_review" in rule &&
                            rule.prevent_self_review != null
                          ? `Prevent Self Review: ${rule.prevent_self_review ? "Yes" : "No"}`
                          : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
