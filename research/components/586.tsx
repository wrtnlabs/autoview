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
  const defaultPermLabel = value.default_workflow_permissions === 'write' ? 'Write' : 'Read';
  const defaultPermClasses = value.default_workflow_permissions === 'write'
    ? 'bg-blue-100 text-blue-800'
    : 'bg-gray-100 text-gray-800';

  const canApproveLabel = value.can_approve_pull_request_reviews ? 'Enabled' : 'Disabled';
  const canApproveClasses = value.can_approve_pull_request_reviews
    ? 'bg-red-100 text-red-800'
    : 'bg-green-100 text-green-800';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-sm mx-auto">
      <h2 className="text-lg font-semibold text-gray-900">
        GitHub Actions Permissions
      </h2>
      <dl className="mt-4 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-sm text-gray-600">Default Workflow Permissions</dt>
          <dd>
            <span
              className={`inline-block px-2 py-1 text-xs font-semibold rounded ${defaultPermClasses}`}
            >
              {defaultPermLabel}
            </span>
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-sm text-gray-600">PR Review Approval</dt>
          <dd>
            <span
              className={`inline-block px-2 py-1 text-xs font-semibold rounded ${canApproveClasses}`}
            >
              {canApproveLabel}
            </span>
          </dd>
        </div>
      </dl>
    </div>
  );
}
