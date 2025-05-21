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
  const displayType = value.type
    ? value.type.charAt(0).toUpperCase() + value.type.slice(1)
    : "Unknown";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="max-w-sm w-full p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {policyName}
        </h2>
        <span
          className={`px-2 py-1 text-xs font-medium uppercase rounded ${
            value.type === "branch"
              ? "bg-green-100 text-green-800"
              : value.type === "tag"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {displayType}
        </span>
      </div>
    </div>
  );
}
