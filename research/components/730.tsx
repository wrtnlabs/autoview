import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.environment;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdAt = new Date(value.created_at).toLocaleString();
  const updatedAt = new Date(value.updated_at).toLocaleString();
  const protectionRules = value.protection_rules ?? [];
  const ruleCount = protectionRules.length;
  const ruleTypes = Array.from(new Set(protectionRules.map(r => r.type))).join(', ');
  let branchPolicy = 'All branches allowed';
  if (value.deployment_branch_policy != null) {
    const policy = value.deployment_branch_policy;
    if (policy.protected_branches) {
      branchPolicy = 'Only protected branches';
    } else if (policy.custom_branch_policies) {
      branchPolicy = 'Custom branch policies';
    }
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 truncate">{value.name}</h2>
      <dl className="mt-3 space-y-2 text-gray-600 text-sm">
        <div className="flex">
          <dt className="font-medium w-32">URL:</dt>
          <dd className="flex-1 text-blue-600 break-all">{value.html_url}</dd>
        </div>
        <div className="flex">
          <dt className="font-medium w-32">Created:</dt>
          <dd className="flex-1">{createdAt}</dd>
        </div>
        <div className="flex">
          <dt className="font-medium w-32">Updated:</dt>
          <dd className="flex-1">{updatedAt}</dd>
        </div>
        <div className="flex">
          <dt className="font-medium w-32">Protection Rules:</dt>
          <dd className="flex-1">
            {ruleCount} {ruleCount === 1 ? 'rule' : 'rules'}
            {ruleCount > 0 && ruleTypes ? `: ${ruleTypes}` : ''}
          </dd>
        </div>
        <div className="flex">
          <dt className="font-medium w-32">Branch Policy:</dt>
          <dd className="flex-1">{branchPolicy}</dd>
        </div>
      </dl>
    </div>
  );
}
