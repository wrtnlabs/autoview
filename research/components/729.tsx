import { tags } from "typia";
import React from "react";
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
        protection_rules?: ({
            id: number & tags.Type<"int32">;
            node_id: string;
            type: string;
            wait_timer?: any;
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
                type?: any;
                reviewer?: any | any;
            }[];
        } | {
            id: number & tags.Type<"int32">;
            node_id: string;
            type: string;
        })[];
        deployment_branch_policy?: AutoViewInputSubTypes.deployment_branch_policy_settings;
    };
    export type wait_timer = any;
    export type deployment_reviewer_type = any;
    export type simple_user = any;
    export type team = any;
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposEnvironments.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation and derived values
  const environments = value.environments ?? [];
  const totalEnvironments = value.total_count ?? environments.length;

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const getBranchPolicy = (
    policy: AutoViewInputSubTypes.deployment_branch_policy_settings | null | undefined,
  ): string => {
    if (policy === null || policy === undefined) return "All branches";
    if (policy.protected_branches) return "Protected branches only";
    if (policy.custom_branch_policies) return "Custom branch policies";
    return "All branches";
  };

  const getProtectionRuleSummary = (
    rules: NonNullable<AutoViewInputSubTypes.environment["protection_rules"]>,
  ): string => {
    const types = Array.from(new Set(rules.map((r) => r.type)));
    if (types.length <= 3) return types.join(", ");
    return types.slice(0, 3).join(", ") + ` +${types.length - 3} more`;
  };

  // 2. Visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-bold text-gray-800">
        Environments ({totalEnvironments})
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {environments.map((env) => (
          <div key={env.id} className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {env.name}
              </h3>
              <span className="text-sm text-gray-500">
                {formatDate(env.updated_at)}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Created: {formatDate(env.created_at)}
            </p>
            <div className="flex flex-wrap items-center mt-2 space-x-2">
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                {getBranchPolicy(env.deployment_branch_policy)}
              </span>
              {env.protection_rules && env.protection_rules.length > 0 ? (
                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                  {env.protection_rules.length} rule
                  {env.protection_rules.length > 1 ? "s" : ""}:{" "}
                  {getProtectionRuleSummary(env.protection_rules)}
                </span>
              ) : (
                <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">
                  No protection rules
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
