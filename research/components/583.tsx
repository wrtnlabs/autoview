import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

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
export type AutoViewInput =
  AutoViewInputSubTypes.actions_repository_permissions;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isEnabled = value.enabled;
  const allowed = value.allowed_actions ?? "all";
  const allowedActionsLabel =
    allowed === "all"
      ? "All actions"
      : allowed === "local_only"
        ? "Local only"
        : "Selected actions";
  const allowedActionsColor =
    allowed === "all"
      ? "text-green-500"
      : allowed === "local_only"
        ? "text-amber-500"
        : "text-blue-500";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Actions Permissions
      </h3>
      <div className="flex items-center justify-between py-2">
        <span className="text-sm text-gray-600">Enabled</span>
        {isEnabled ? (
          <div className="flex items-center gap-1">
            <LucideReact.CheckCircle
              className="text-green-500"
              size={16}
              aria-label="Enabled"
            />
            <span className="text-sm font-medium text-green-600">Yes</span>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <LucideReact.XCircle
              className="text-red-500"
              size={16}
              aria-label="Disabled"
            />
            <span className="text-sm font-medium text-red-600">No</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between py-2">
        <span className="text-sm text-gray-600">Allowed Actions</span>
        <div className={`flex items-center gap-1 ${allowedActionsColor}`}>
          <LucideReact.Tag size={16} />
          <span className="text-sm font-medium">{allowedActionsLabel}</span>
        </div>
      </div>
      {allowed === "selected" && value.selected_actions_url && (
        <div className="flex items-start justify-between py-2">
          <span className="text-sm text-gray-600">Details URL</span>
          <div className="flex items-center gap-1 max-w-[150px]">
            <LucideReact.Link
              size={16}
              className="text-gray-500 flex-shrink-0"
              aria-label="Selected actions URL"
            />
            <span
              className="text-sm text-gray-700 truncate"
              title={value.selected_actions_url}
            >
              {value.selected_actions_url}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
