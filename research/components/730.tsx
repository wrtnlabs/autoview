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
  // 1. Define data aggregation/transformation functions or derived constants
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  const createdAt = formatDate(value.created_at);
  const updatedAt = formatDate(value.updated_at);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 max-w-md mx-auto">
      {/* Header: Environment Name */}
      <div className="flex items-center mb-4">
        <LucideReact.Layers className="text-blue-500" size={20} />
        <h2 className="ml-2 text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
      </div>

      <div className="space-y-3 text-gray-600 text-sm">
        {/* HTML URL */}
        <div className="flex items-center">
          <LucideReact.Link size={16} className="text-gray-400" />
          <a
            href={value.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-blue-600 hover:underline break-all"
          >
            {value.html_url}
          </a>
        </div>

        {/* Creation Date */}
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span className="ml-1">Created: {createdAt}</span>
        </div>

        {/* Update Date */}
        <div className="flex items-center">
          <LucideReact.RefreshCw size={16} className="text-gray-400" />
          <span className="ml-1">Updated: {updatedAt}</span>
        </div>

        {/* Branch Policy */}
        {value.deployment_branch_policy && (
          <div className="flex items-center">
            <LucideReact.GitBranch size={16} className="text-gray-400" />
            <span className="ml-1">
              Branch Policy:{" "}
              {value.deployment_branch_policy.protected_branches
                ? "Protected branches only"
                : "Custom branch patterns"}
            </span>
          </div>
        )}

        {/* Protection Rules */}
        {value.protection_rules && value.protection_rules.length > 0 && (
          <div>
            <div className="flex items-center">
              <LucideReact.Shield size={16} className="text-gray-400" />
              <span className="ml-1 font-medium text-gray-700">
                Protection Rules ({value.protection_rules.length})
              </span>
            </div>
            <ul className="mt-2 ml-6 list-disc space-y-1 text-gray-600">
              {value.protection_rules.map((rule, idx) => {
                let detail: React.ReactNode;
                // Wait-timer rule
                if ("wait_timer" in rule && rule.wait_timer != null) {
                  detail = (
                    <>
                      <span className="font-medium">{rule.type}</span>: Wait{" "}
                      {rule.wait_timer} mins
                    </>
                  );
                }
                // Reviewer-based rule
                else if (
                  "reviewers" in rule &&
                  Array.isArray(rule.reviewers) &&
                  rule.reviewers.length > 0
                ) {
                  const names = rule.reviewers
                    .map((r) => {
                      const rev = r.reviewer;
                      if (rev) {
                        if ("login" in rev) return rev.login;
                        if ("slug" in rev) return rev.slug;
                      }
                      return "";
                    })
                    .filter(Boolean)
                    .join(", ");
                  detail = (
                    <>
                      <span className="font-medium">{rule.type}</span>:{" "}
                      {names || rule.prevent_self_review
                        ? names
                        : "No reviewers"}
                    </>
                  );
                }
                // Self-review flag
                else if ("prevent_self_review" in rule && rule.prevent_self_review) {
                  detail = (
                    <>
                      <span className="font-medium">{rule.type}</span>: Self-review
                      allowed
                    </>
                  );
                }
                // Fallback: just show type
                else {
                  detail = <span className="font-medium">{rule.type}</span>;
                }
                return <li key={idx}>{detail}</li>;
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
