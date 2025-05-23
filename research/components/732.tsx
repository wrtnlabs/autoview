import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposEnvironmentsDeploymentBranchPolicies {
        export interface GetResponse {
            /**
             * The number of deployment branch policies for the environment.
            */
            total_count: number & tags.Type<"int32">;
            branch_policies: AutoViewInputSubTypes.deployment_branch_policy[];
        }
    }
    /**
     * Details of a deployment branch or tag policy.
     *
     * @title Deployment branch policy
    */
    export interface deployment_branch_policy {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiReposEnvironmentsDeploymentBranchPolicies.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const policies = value.branch_policies || [];
  const branchCount = policies.filter((p) => p.type === "branch").length;
  const tagCount = policies.filter((p) => p.type === "tag").length;
  const hasPolicies = policies.length > 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          Deployment Policies ({value.total_count})
        </h2>
      </div>

      {!hasPolicies ? (
        <div className="flex flex-col items-center justify-center py-8 text-gray-500">
          <LucideReact.AlertCircle
            size={48}
            className="text-gray-400"
            aria-hidden="true"
          />
          <p className="mt-2">No deployment branch/tag policies available.</p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <LucideReact.GitBranch
                size={16}
                className="text-teal-500"
                aria-hidden="true"
              />
              <span>
                {branchCount} {branchCount === 1 ? "Branch" : "Branches"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <LucideReact.Tag
                size={16}
                className="text-blue-500"
                aria-hidden="true"
              />
              <span>
                {tagCount} {tagCount === 1 ? "Tag" : "Tags"}
              </span>
            </div>
          </div>

          <ul className="mt-4 space-y-2">
            {policies.map((policy, idx) => (
              <li
                key={policy.id ?? idx}
                className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded truncate"
              >
                {policy.type === "branch" ? (
                  <LucideReact.GitBranch
                    size={16}
                    className="text-teal-500"
                    aria-hidden="true"
                  />
                ) : (
                  <LucideReact.Tag
                    size={16}
                    className="text-blue-500"
                    aria-hidden="true"
                  />
                )}
                <span className="text-sm text-gray-700 truncate">
                  {policy.name ?? "<Unnamed policy>"}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
