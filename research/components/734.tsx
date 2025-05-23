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



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { name, type } = value;
  const displayName = name?.trim() || "Untitled policy";
  const typeLabel = type === "branch" ? "Branch" : type === "tag" ? "Tag" : "Unknown";
  // Choose icon based on type; fallback if unknown
  const TypeIcon = type === "branch" ? LucideReact.GitBranch : LucideReact.Tag;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Policy Type */}
      <div className="flex items-center mb-2">
        {type === "branch" || type === "tag" ? (
          <TypeIcon
            className={`mr-2 ${type === "branch" ? "text-blue-500" : "text-green-500"}`}
            size={16}
            aria-label={typeLabel}
          />
        ) : (
          <LucideReact.AlertCircle className="mr-2 text-gray-400" size={16} aria-label="Unknown type" />
        )}
        <span className="text-sm font-medium text-gray-600 uppercase truncate">
          {typeLabel}
        </span>
      </div>

      {/* Policy Name Pattern */}
      <div className="flex items-center">
        <LucideReact.FileText className="mr-2 text-gray-400" size={16} aria-label="Policy pattern" />
        <span className="text-lg font-semibold text-gray-900 truncate">
          {displayName}
        </span>
      </div>
    </div>
  );
}
