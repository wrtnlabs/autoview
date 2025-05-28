import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface actions_get_default_workflow_permissions {
        default_workflow_permissions: AutoViewInputSubTypes.actions_default_workflow_permissions;
        can_approve_pull_request_reviews: AutoViewInputSubTypes.actions_can_approve_pull_request_reviews;
    }
    /**
     * The default workflow permissions granted to the GITHUB_TOKEN when running workflows.
    */
    export type actions_default_workflow_permissions = "read" | "write";
    /**
     * Whether GitHub Actions can approve pull requests. Enabling this can be a security risk.
    */
    export type actions_can_approve_pull_request_reviews = boolean;
}
export type AutoViewInput = AutoViewInputSubTypes.actions_get_default_workflow_permissions;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation: derive labels and select appropriate icons/colors
  const {
    default_workflow_permissions,
    can_approve_pull_request_reviews,
  } = value;

  const permissionLabel =
    default_workflow_permissions === "read" ? "Read" : "Write";
  const PermissionIcon =
    default_workflow_permissions === "read"
      ? LucideReact.Eye
      : LucideReact.Edit2;

  const approvalLabel = can_approve_pull_request_reviews
    ? "Can approve pull request reviews"
    : "Cannot approve pull request reviews";
  const ApprovalIcon = can_approve_pull_request_reviews
    ? LucideReact.CheckCircle
    : LucideReact.XCircle;
  const approvalColor = can_approve_pull_request_reviews
    ? "text-green-500"
    : "text-red-500";

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
        <LucideReact.GitPullRequest
          aria-hidden="true"
          className="text-indigo-500 mr-2"
          size={20}
        />
        Workflow Permissions
      </h2>
      <ul className="space-y-3">
        <li className="flex items-center">
          <PermissionIcon
            aria-hidden="true"
            className="text-blue-500 mr-2"
            size={16}
          />
          <span className="text-gray-700">
            {permissionLabel} permission to GITHUB_TOKEN
          </span>
        </li>
        <li className="flex items-center">
          <ApprovalIcon
            aria-hidden="true"
            className={`${approvalColor} mr-2`}
            size={16}
          />
          <span className="text-gray-700">{approvalLabel}</span>
        </li>
      </ul>
    </div>
  );
}
