import LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  export type actions_get_default_workflow_permissions = {
    default_workflow_permissions: AutoViewInputSubTypes.actions_default_workflow_permissions;
    can_approve_pull_request_reviews: AutoViewInputSubTypes.actions_can_approve_pull_request_reviews;
  };
  /**
   * The default workflow permissions granted to the GITHUB_TOKEN when running workflows.
   */
  export type actions_default_workflow_permissions = "read" | "write";
  /**
   * Whether GitHub Actions can approve pull requests. Enabling this can be a security risk.
   */
  export type actions_can_approve_pull_request_reviews = boolean;
}
export type AutoViewInput =
  AutoViewInputSubTypes.actions_get_default_workflow_permissions;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const permissionLabel =
    value.default_workflow_permissions === "read"
      ? "Read Only"
      : "Read & Write";
  const canApprove = value.can_approve_pull_request_reviews;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800">
        Default Workflow Permissions
      </h2>
      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-2">
          {value.default_workflow_permissions === "read" ? (
            <LucideReact.Lock
              size={16}
              className="text-gray-500"
              aria-hidden="true"
            />
          ) : (
            <LucideReact.Unlock
              size={16}
              className="text-gray-500"
              aria-hidden="true"
            />
          )}
          <span className="text-gray-700">{permissionLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          {canApprove ? (
            <LucideReact.CheckCircle
              size={16}
              className="text-green-500"
              aria-hidden="true"
            />
          ) : (
            <LucideReact.XCircle
              size={16}
              className="text-red-500"
              aria-hidden="true"
            />
          )}
          <span className="text-gray-700">
            {canApprove
              ? "Can Approve Pull Request Reviews"
              : "Cannot Approve Pull Request Reviews"}
          </span>
        </div>
      </div>
    </div>
  );
}
