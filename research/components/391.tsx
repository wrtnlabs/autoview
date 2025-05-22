import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.actions_get_default_workflow_permissions;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { default_workflow_permissions, can_approve_pull_request_reviews } = value;

  // Capitalize permission label
  const permissionLabel =
    default_workflow_permissions.charAt(0).toUpperCase() +
    default_workflow_permissions.slice(1);

  // Badge style mapping for permissions
  const permissionStyles: Record<
    AutoViewInputSubTypes.actions_default_workflow_permissions,
    { bg: string; text: string }
  > = {
    read: { bg: "bg-blue-100", text: "text-blue-800" },
    write: { bg: "bg-green-100", text: "text-green-800" },
  };

  // Approval status label, icon, and styles
  const approvalLabel = can_approve_pull_request_reviews
    ? "Allowed"
    : "Not Allowed";
  const approvalIcon = can_approve_pull_request_reviews ? "✓" : "✕";
  const approvalStyles = can_approve_pull_request_reviews
    ? { bg: "bg-green-100", text: "text-green-800" }
    : { bg: "bg-red-100", text: "text-red-800" };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-sm mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Workflow Permissions
      </h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
        <div className="flex items-center justify-between">
          <dt className="text-sm font-medium text-gray-500">
            Default Permissions
          </dt>
          <dd
            className={`
              ${permissionStyles[default_workflow_permissions].bg}
              ${permissionStyles[default_workflow_permissions].text}
              px-2 py-0.5 rounded-full text-sm font-semibold
            `}
          >
            {permissionLabel}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-sm font-medium text-gray-500">
            PR Approval
          </dt>
          <dd
            className={`
              ${approvalStyles.bg}
              ${approvalStyles.text}
              px-2 py-0.5 rounded-full text-sm font-semibold flex items-center
            `}
          >
            <span>{approvalIcon}</span>
            <span className="ml-1">{approvalLabel}</span>
          </dd>
        </div>
      </dl>
    </div>
  );
}
