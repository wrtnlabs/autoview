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
  const displayName = value.name?.trim() || "Unnamed Policy";
  const policyType = value.type;
  const typeLabel =
    policyType === "branch"
      ? "Branch Policy"
      : policyType === "tag"
      ? "Tag Policy"
      : "Unknown Policy";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  const TypeIcon = () => {
    if (policyType === "branch") {
      return (
        <LucideReact.GitBranch
          size={20}
          className="text-blue-500"
          aria-label="Branch policy"
        />
      );
    }
    if (policyType === "tag") {
      return (
        <LucideReact.Tag
          size={20}
          className="text-purple-500"
          aria-label="Tag policy"
        />
      );
    }
    return (
      <LucideReact.AlertCircle
        size={20}
        className="text-gray-400"
        aria-label="Unknown policy type"
      />
    );
  };

  // 3. Return the React element.
  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-3">
        <TypeIcon />
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {displayName}
        </h3>
      </div>
      <div className="mt-2 flex items-center text-sm text-gray-600">
        {policyType ? (
          <span className="uppercase font-medium">{typeLabel}</span>
        ) : (
          <span className="italic text-gray-400">Type not specified</span>
        )}
      </div>
    </div>
  );
}
