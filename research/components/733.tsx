import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.deployment_branch_policy;



// The component name is always "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation and derived constants
  const policyType = value.type ?? "branch";
  const isBranch = policyType === "branch";
  const typeLabel = isBranch ? "Branch Policy" : "Tag Policy";
  const PatternIcon = isBranch ? LucideReact.GitBranch : LucideReact.Tag;
  const patternText = value.name && value.name.trim() !== "" ? value.name : "—";

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="max-w-sm bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <PatternIcon
          size={20}
          className="text-gray-500"
          aria-label={typeLabel}
        />
        <h2 className="text-gray-800 font-semibold">{typeLabel}</h2>
      </div>
      <div className="mt-3">
        <h3 className="text-sm text-gray-500">Pattern</h3>
        <div className="mt-1 px-2 py-1 bg-gray-50 rounded font-mono text-gray-800 truncate">
          {patternText}
        </div>
      </div>
    </div>
  );
}
