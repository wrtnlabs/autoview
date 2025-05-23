import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Details of a deployment environment
     *
     * @title Environment
    */
    export interface environment {
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
        protection_rules?: ({
            id: number & tags.Type<"int32">;
            node_id: string;
            type: string;
            wait_timer?: AutoViewInputSubTypes.wait_timer;
        } | {
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
                reviewer?: AutoViewInputSubTypes.simple_user | AutoViewInputSubTypes.team;
            }[];
        } | {
            id: number & tags.Type<"int32">;
            node_id: string;
            type: string;
        })[];
        deployment_branch_policy?: AutoViewInputSubTypes.deployment_branch_policy_settings;
    }
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
  const createdDate = new Date(value.created_at).toLocaleString();
  const updatedDate = new Date(value.updated_at).toLocaleString();
  const ruleCount = value.protection_rules?.length ?? 0;
  const branchPolicyDescription = value.deployment_branch_policy
    ? value.deployment_branch_policy.protected_branches
      ? "Only protected branches can deploy"
      : "Only custom branch patterns can deploy"
    : "All branches are allowed to deploy";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full mx-auto">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 truncate">{value.name}</h2>
      </div>

      {/* URLs and Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center text-gray-700">
          <LucideReact.Calendar size={16} className="mr-2 text-gray-500" />
          <span>
            Created: <time dateTime={value.created_at}>{createdDate}</time>
          </span>
        </div>
        <div className="flex items-center text-gray-700">
          <LucideReact.Calendar size={16} className="mr-2 text-gray-500" />
          <span>
            Updated: <time dateTime={value.updated_at}>{updatedDate}</time>
          </span>
        </div>
        <div className="flex items-center text-gray-700">
          <LucideReact.Link size={16} className="mr-2 text-gray-500" />
          <a
            href={value.url}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate text-blue-600 hover:underline"
            title={value.url}
          >
            {value.url}
          </a>
        </div>
        <div className="flex items-center text-gray-700">
          <LucideReact.Link size={16} className="mr-2 text-gray-500" />
          <a
            href={value.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate text-blue-600 hover:underline"
            title={value.html_url}
          >
            {value.html_url}
          </a>
        </div>
      </div>

      {/* Protection Rules */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800">
          Protection Rules ({ruleCount})
        </h3>
        {ruleCount > 0 ? (
          <ul className="mt-3 space-y-2 text-gray-700">
            {value.protection_rules!.map((rule, idx) => {
              let detail: React.ReactNode;
              if ("wait_timer" in rule && rule.wait_timer !== undefined) {
                detail = (
                  <span className="flex items-center">
                    <LucideReact.Clock size={14} className="mr-1 text-gray-500" />
                    Wait {rule.wait_timer} min
                  </span>
                );
              } else if (
                "prevent_self_review" in rule &&
                rule.prevent_self_review !== undefined
              ) {
                const reviewersCount = rule.reviewers?.length ?? 0;
                detail = (
                  <span className="flex items-center space-x-1">
                    <span>
                      Prevent Self-Review:{" "}
                      {rule.prevent_self_review ? "Yes" : "No"}
                    </span>
                    {reviewersCount > 0 && (
                      <span className="flex items-center">
                        <LucideReact.Users
                          size={14}
                          className="mr-1 text-gray-500"
                        />
                        {reviewersCount} reviewer
                        {reviewersCount > 1 ? "s" : ""}
                      </span>
                    )}
                  </span>
                );
              } else {
                detail = <span>No additional settings</span>;
              }
              return (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="font-semibold">{rule.type}:</span>
                  {detail}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="flex items-center text-gray-500">
            <LucideReact.AlertCircle size={18} className="mr-2" />
            <span>No protection rules defined</span>
          </div>
        )}
      </div>

      {/* Branch Policy */}
      <div>
        <h3 className="text-lg font-medium text-gray-800">Branch Policy</h3>
        <p className="mt-2 text-gray-700">{branchPolicyDescription}</p>
      </div>
    </div>
  );
}
