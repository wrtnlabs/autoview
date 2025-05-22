import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiReposEnvironments {
    export type GetResponse = {
      /**
       * The number of environments in this repository
       */
      total_count?: number & tags.Type<"int32">;
      environments?: AutoViewInputSubTypes.environment[];
    };
  }
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
export type AutoViewInput =
  AutoViewInputSubTypes.IApiReposEnvironments.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const total = value.total_count ?? value.environments?.length ?? 0;
  const envs = value.environments ?? [];

  const formatDate = (iso?: string): string =>
    iso
      ? new Date(iso).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "—";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center mb-4">
        <LucideReact.Layers size={20} className="text-gray-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">
          Environments ({total})
        </h2>
      </div>

      {/* Empty state */}
      {envs.length === 0 ? (
        <div className="flex items-center text-gray-500">
          <LucideReact.AlertCircle size={24} className="mr-2" />
          <span>No environments available</span>
        </div>
      ) : (
        <div className="space-y-4">
          {envs.map((env) => {
            const rulesCount = env.protection_rules?.length ?? 0;
            const policy = env.deployment_branch_policy;
            const policyLabel = policy
              ? policy.protected_branches
                ? "Protected branches"
                : policy.custom_branch_policies
                  ? "Custom policies"
                  : "None"
              : "None";

            return (
              <div
                key={env.id}
                className="p-4 bg-gray-50 rounded-md border border-gray-200"
              >
                {/* Name + timestamps */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center">
                    <LucideReact.Box
                      size={20}
                      className="text-indigo-500 mr-2"
                    />
                    <span className="text-md font-medium text-gray-900 truncate">
                      {env.name}
                    </span>
                  </div>
                  <div className="flex items-center mt-2 sm:mt-0 space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <LucideReact.Calendar size={16} className="mr-1" />
                      <span>{formatDate(env.created_at)}</span>
                    </div>
                    <div className="flex items-center">
                      <LucideReact.Edit3 size={16} className="mr-1" />
                      <span>{formatDate(env.updated_at)}</span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-3 flex flex-wrap items-center text-sm text-gray-700 space-x-4">
                  <div className="flex items-center">
                    <LucideReact.ShieldCheck
                      size={16}
                      className="mr-1 text-green-500"
                    />
                    <span>
                      {rulesCount} protection rule{rulesCount !== 1 && "s"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <LucideReact.GitBranch
                      size={16}
                      className="mr-1 text-gray-500"
                    />
                    <span>{policyLabel}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
