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
  const rawType = value.type || "unknown";
  const policyTypeLabel = rawType.charAt(0).toUpperCase() + rawType.slice(1);
  const typeStyles: Record<string, { bg: string; text: string }> = {
    branch: { bg: "bg-blue-100", text: "text-blue-800" },
    tag:    { bg: "bg-green-100", text: "text-green-800" },
    unknown:{ bg: "bg-gray-100", text: "text-gray-800" },
  };
  const { bg, text } = typeStyles[rawType] || typeStyles.unknown;
  const displayId = value.id != null ? `#${value.id}` : "";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {policyName}
        </h3>
      </div>
      <div className="flex items-center space-x-2">
        <span className={`inline-block px-3 py-1 text-sm font-medium rounded ${bg} ${text}`}>
          {policyTypeLabel}
        </span>
        {displayId && (
          <span className="text-xs text-gray-500 whitespace-nowrap">
            ID: {displayId}
          </span>
        )}
      </div>
    </div>
  );
  // 3. Return the React element.
  //    All displayed data is filtered (omitting node_id), transformed, and formatted.
}
