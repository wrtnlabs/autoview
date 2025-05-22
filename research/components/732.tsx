import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput =
  AutoViewInputSubTypes.IApiReposEnvironmentsDeploymentBranchPolicies.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const total = value.total_count;
  const policies = value.branch_policies ?? [];
  const label = total === 1 ? "Policy" : "Policies";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header with title and count */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Deployment Branch Policies
        </h2>
        <span className="inline-flex items-center px-2 py-1 text-sm font-medium bg-gray-100 text-gray-700 rounded">
          {total} {label}
        </span>
      </div>

      {/* Empty state */}
      {policies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <p className="mt-2 text-sm">No branch or tag policies found.</p>
        </div>
      ) : (
        // List of policies
        <ul className="space-y-3">
          {policies.map((policy, idx) => {
            const key =
              policy.id?.toString() ?? policy.node_id ?? `policy-${idx}`;
            const name = policy.name?.trim() || "Unnamed policy";
            const type = policy.type;
            // Choose icon and color based on type
            let Icon: JSX.Element;
            if (type === "branch") {
              Icon = (
                <LucideReact.GitBranch
                  size={16}
                  className="text-blue-500 flex-shrink-0"
                  aria-label="Branch policy"
                />
              );
            } else if (type === "tag") {
              Icon = (
                <LucideReact.Tag
                  size={16}
                  className="text-indigo-500 flex-shrink-0"
                  aria-label="Tag policy"
                />
              );
            } else {
              Icon = (
                <LucideReact.Circle
                  size={16}
                  className="text-gray-400 flex-shrink-0"
                  aria-label="Policy"
                />
              );
            }

            return (
              <li
                key={key}
                className="flex items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
              >
                {Icon}
                <span className="ml-2 text-gray-700 truncate">{name}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
