import React from "react";
export namespace AutoViewInputSubTypes {
    export type actions_repository_permissions = {
        enabled: AutoViewInputSubTypes.actions_enabled;
        allowed_actions?: AutoViewInputSubTypes.allowed_actions;
        selected_actions_url?: AutoViewInputSubTypes.selected_actions_url;
    };
    /**
     * Whether GitHub Actions is enabled on the repository.
    */
    export type actions_enabled = boolean;
    /**
     * The permissions policy that controls the actions and reusable workflows that are allowed to run.
    */
    export type allowed_actions = "all" | "local_only" | "selected";
    /**
     * The API URL to use to get or set the actions and reusable workflows that are allowed to run, when `allowed_actions` is set to `selected`.
    */
    export type selected_actions_url = string;
}
export type AutoViewInput = AutoViewInputSubTypes.actions_repository_permissions;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const enabledLabel = value.enabled ? 'Enabled' : 'Disabled';

  const allowedActionLabels: Record<AutoViewInputSubTypes.allowed_actions, string> = {
    all: 'All actions',
    local_only: 'Local only',
    selected: 'Selected actions'
  };
  const allowedKey = value.allowed_actions ?? 'all';
  const allowedActionsLabel = allowedActionLabels[allowedKey];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Repository Actions Permissions</h2>
      <dl className="space-y-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <dt>Status:</dt>
          <dd className={`font-medium ${value.enabled ? 'text-green-600' : 'text-red-600'}`}>
            {enabledLabel}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt>Allowed Actions:</dt>
          <dd className="font-medium text-gray-800">{allowedActionsLabel}</dd>
        </div>
        {value.allowed_actions === 'selected' && value.selected_actions_url && (
          <div className="flex flex-col">
            <dt className="text-xs text-gray-500">Selected Actions URL</dt>
            <dd className="text-xs text-blue-600 truncate">{value.selected_actions_url}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
