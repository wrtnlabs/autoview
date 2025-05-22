import * as LucideReact from "lucide-react";
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
  // 1. Data transformation / derived values
  const createdDate = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const updatedDate = new Date(value.updated_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const rules = value.protection_rules ?? [];
  const branchPolicy = value.deployment_branch_policy;

  // 2. Compose visual structure
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4 flex items-center">
        <LucideReact.Server className="text-gray-500 mr-2" size={20} />
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2 text-sm text-gray-600">
        <div className="flex items-center">
          <LucideReact.Calendar className="mr-1" size={16} />
          <span>Created: {createdDate}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar className="mr-1" size={16} />
          <span>Updated: {updatedDate}</span>
        </div>
        <div className="col-span-2 flex items-center truncate">
          <LucideReact.Link className="mr-1 flex-shrink-0" size={16} />
          <span className="truncate">{value.url}</span>
        </div>
        <div className="col-span-2 flex items-center truncate">
          <LucideReact.Globe className="mr-1 flex-shrink-0" size={16} />
          <span className="truncate">{value.html_url}</span>
        </div>
      </div>

      {rules.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700">
            Protection Rules ({rules.length})
          </h3>
          <ul className="mt-2 space-y-2">
            {rules.map((rule, i) => (
              <li key={i} className="p-2 bg-gray-50 rounded">
                <div className="font-semibold text-gray-800">{rule.type}</div>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-600">
                  {"wait_timer" in rule && rule.wait_timer != null && (
                    <div className="flex items-center gap-1">
                      <LucideReact.Clock size={14} />
                      <span>{rule.wait_timer} min delay</span>
                    </div>
                  )}
                  {"prevent_self_review" in rule &&
                    rule.prevent_self_review && (
                      <div className="flex items-center gap-1">
                        <LucideReact.UserCheck size={14} />
                        <span>Prevent Self Review</span>
                      </div>
                    )}
                  {"reviewers" in rule &&
                    Array.isArray(rule.reviewers) &&
                    rule.reviewers.length > 0 && (
                      <div className="flex items-center gap-1">
                        <LucideReact.Users size={14} />
                        <span>
                          {rule.reviewers.length} reviewer
                          {rule.reviewers.length > 1 ? "s" : ""}
                        </span>
                      </div>
                    )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center text-sm text-gray-700">
        <LucideReact.GitBranch className="mr-1" size={16} />
        <span>Branch Policy:</span>
        <span className="ml-1 font-medium">
          {branchPolicy == null
            ? "All Branches Allowed"
            : branchPolicy.protected_branches
              ? "Protected Branches Only"
              : "Custom Branch Policies"}
        </span>
      </div>
    </div>
  );
}
