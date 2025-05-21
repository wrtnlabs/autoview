import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.deployment_branch_policy;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const policyName = value.name?.trim() || "Unnamed Policy";
  const rawType = value.type || "branch";
  const typeLabels: Record<string, string> = {
    branch: "Branch",
    tag: "Tag",
  };
  const displayType = typeLabels[rawType] ?? "Unknown";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <h3
          className="text-gray-900 text-lg font-semibold truncate"
          title={policyName}
        >
          {policyName}
        </h3>
        <span
          className={
            "mt-2 sm:mt-0 inline-flex items-center px-2 py-1 text-xs font-medium rounded-full " +
            (rawType === "branch"
              ? "bg-green-100 text-green-800"
              : "bg-purple-100 text-purple-800")
          }
        >
          {displayType}
        </span>
      </div>
    </div>
  );
}
