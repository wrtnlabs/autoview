import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposEnvironmentsDeploymentBranchPolicies {
        export type GetResponse = {
            /**
             * The number of deployment branch policies for the environment.
            */
            total_count: number & tags.Type<"int32">;
            branch_policies: AutoViewInputSubTypes.deployment_branch_policy[];
        };
    }
    /**
     * Details of a deployment branch or tag policy.
     *
     * @title Deployment branch policy
    */
    export type deployment_branch_policy = {
        /**
         * The unique identifier of the branch or tag policy.
        */
        id?: number & tags.Type<"int32">;
        node_id?: string;
        /**
         * The name pattern that branches or tags must match in order to deploy to the environment.
        */
        name?: string;
        /**
         * Whether this rule targets a branch or tag.
        */
        type?: "branch" | "tag";
    };
}
export type AutoViewInput = AutoViewInputSubTypes.IApiReposEnvironmentsDeploymentBranchPolicies.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, branch_policies } = value;
  const policyLabel = total_count === 1 ? "Policy" : "Policies";
  const headerText = `${total_count} ${policyLabel}`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{headerText}</h2>
      {branch_policies && branch_policies.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {branch_policies.map((policy, idx) => {
            const name = policy.name?.trim() ? policy.name! : "Unnamed Policy";
            const typeKey = policy.type || "unknown";
            const typeLabel = typeKey.charAt(0).toUpperCase() + typeKey.slice(1);
            const badgeClasses =
              typeKey === "branch"
                ? "bg-blue-100 text-blue-800"
                : typeKey === "tag"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800";

            return (
              <div key={idx} className="flex justify-between items-center py-2">
                <span className="text-gray-700 truncate">{name}</span>
                <span
                  className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded ${badgeClasses}`}
                >
                  {typeLabel}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500">No branch or tag policies available.</p>
      )}
    </div>
  );
}
