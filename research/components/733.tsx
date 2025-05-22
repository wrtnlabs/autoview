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
  const policyType = value.type ?? "branch";
  const typeLabel = policyType === "branch" ? "Branch Policy" : "Tag Policy";
  const TypeIcon =
    policyType === "branch" ? LucideReact.GitBranch : LucideReact.Tag;
  const pattern = value.name?.trim() || "—";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm max-w-sm w-full">
      <div className="flex items-center mb-3">
        <TypeIcon
          size={20}
          className={
            policyType === "branch" ? "text-blue-500" : "text-indigo-500"
          }
          aria-label={typeLabel}
        />
        <span className="ml-2 text-lg font-semibold text-gray-800">
          {typeLabel}
        </span>
      </div>
      <div className="text-gray-700">
        <span className="font-medium">Pattern:</span>
        <span className="ml-1 break-all">{pattern}</span>
      </div>
    </div>
  );
}
