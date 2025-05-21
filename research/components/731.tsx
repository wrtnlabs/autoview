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
  const createdDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const updatedDate = new Date(value.updated_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const ruleTypes = Array.from(new Set(value.protection_rules?.map(r => r.type) ?? []));
  const hasPolicy = value.deployment_branch_policy !== null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Environment Name */}
      <h2 className="text-xl font-semibold text-gray-900 truncate">{value.name}</h2>
      {/* Environment URL */}
      <p className="mt-1 text-sm text-blue-600 truncate">{value.url}</p>

      {/* Creation & Update Dates */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <span className="font-medium">Created:</span>
          <div className="mt-0.5">{createdDate}</div>
        </div>
        <div>
          <span className="font-medium">Updated:</span>
          <div className="mt-0.5">{updatedDate}</div>
        </div>
      </div>

      {/* Protection Rules */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-800">Protection Rules</h3>
        {ruleTypes.length > 0 ? (
          <ul className="mt-2 flex flex-wrap gap-2">
            {ruleTypes.map((type, idx) => (
              <li
                key={idx}
                className="px-2 py-1 bg-gray-100 text-xs text-gray-800 rounded"
              >
                {type}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-gray-500">No protection rules.</p>
        )}
      </div>

      {/* Deployment Branch Policy */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-800">Branch Policy</h3>
        {hasPolicy ? (
          <div className="mt-2 space-y-1 text-sm text-gray-700">
            <div>
              <span className="font-medium">Protected Branches:</span>{" "}
              {value.deployment_branch_policy!.protected_branches ? "Yes" : "No"}
            </div>
            <div>
              <span className="font-medium">Custom Policies:</span>{" "}
              {value.deployment_branch_policy!.custom_branch_policies ? "Yes" : "No"}
            </div>
          </div>
        ) : (
          <p className="mt-2 text-sm text-gray-500">All branches allowed.</p>
        )}
      </div>
    </div>
  );
}
