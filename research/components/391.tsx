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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const {
    default_workflow_permissions: perm,
    can_approve_pull_request_reviews: canApprove,
  } = value;

  // Human-readable labels
  const permLabel = perm === "read" ? "Read" : "Write";
  const approveLabel = canApprove ? "Enabled" : "Disabled";

  // Icons for each setting
  const permIcon = perm === "read"
    ? <LucideReact.Eye className="text-gray-500" size={16} aria-label="Read permission" />
    : <LucideReact.Edit2 className="text-blue-500" size={16} aria-label="Write permission" />;

  const approveIcon = canApprove
    ? <LucideReact.CheckCircle className="text-green-500" size={16} aria-label="Approve PR reviews enabled" />
    : <LucideReact.XCircle className="text-red-500" size={16} aria-label="Approve PR reviews disabled" />;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Workflow Permissions</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Default workflow permissions</span>
          <div className="flex items-center gap-1">
            {permIcon}
            <span className="text-gray-900">{permLabel}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Approve pull request reviews</span>
          <div className="flex items-center gap-1">
            {approveIcon}
            <span className="text-gray-900">{approveLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
