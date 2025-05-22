import * as LucideReact from "lucide-react";
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
    value.default_workflow_permissions === "read" ? "Read" : "Write";
  const PermissionIcon =
    value.default_workflow_permissions === "read"
      ? LucideReact.Eye
      : LucideReact.Edit;

  const canApprove = value.can_approve_pull_request_reviews;
  const approveLabel = canApprove
    ? "Can approve pull request reviews"
    : "Cannot approve pull request reviews";
  const ApproveIcon = canApprove
    ? LucideReact.CheckCircle
    : LucideReact.XCircle;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Workflow Permissions
      </h3>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <PermissionIcon className="text-blue-500" size={20} />
          <span className="text-gray-700">
            Default permissions:{" "}
            <span className="font-medium text-gray-900">{permissionLabel}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ApproveIcon
            className={canApprove ? "text-green-500" : "text-red-500"}
            size={20}
          />
          <span className="text-gray-700">{approveLabel}</span>
        </div>
      </div>
    </div>
  );
}
