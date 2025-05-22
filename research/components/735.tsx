import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  const displayName = value.name?.trim() || "Unnamed Policy";
  const policyType = value.type === "tag" ? "tag" : "branch";
  const typeLabel = policyType.charAt(0).toUpperCase() + policyType.slice(1);
  const TypeIcon =
    policyType === "branch" ? LucideReact.GitBranch : LucideReact.Tag;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h2
          className="text-lg font-semibold text-gray-800 truncate"
          title={displayName}
        >
          {displayName}
        </h2>
        <div className="flex items-center space-x-1 text-gray-500">
          <TypeIcon
            size={18}
            strokeWidth={1.5}
            aria-label={`Policy type: ${typeLabel}`}
            role="img"
          />
          <span className="capitalize text-sm">{typeLabel}</span>
        </div>
      </div>
      {value.id != null && (
        <div className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Policy ID:</span> {value.id}
        </div>
      )}
      {!value.id && (
        <div className="flex items-center text-gray-400 text-sm">
          <LucideReact.AlertCircle size={16} className="mr-1" />
          <span>No numeric ID assigned</span>
        </div>
      )}
    </div>
  );
}
