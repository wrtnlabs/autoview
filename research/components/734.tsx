import LucideReact from "lucide-react";
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
  // 1. Derive display values
  const policyType = value.type ?? "branch";
  const typeLabel = policyType === "branch" ? "Branch Policy" : "Tag Policy";
  const IconComponent =
    policyType === "branch" ? LucideReact.GitBranch : LucideReact.Tag;

  // 2. Compose the visual structure
  return (
    <div className="max-w-sm w-full p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <IconComponent
          size={20}
          strokeWidth={1.5}
          className="text-gray-600"
          aria-label={typeLabel}
        />
        <h3 className="text-lg font-semibold text-gray-800">{typeLabel}</h3>
      </div>

      <div className="mt-4">
        <div className="text-sm font-medium text-gray-500">Name Pattern</div>
        <div className="mt-1 text-gray-900 font-medium truncate">
          {value.name ?? "—"}
        </div>
      </div>

      {value.id != null && (
        <div className="mt-4 text-xs text-gray-400">
          Policy ID: <span className="font-mono">{value.id}</span>
        </div>
      )}
    </div>
  );
}
