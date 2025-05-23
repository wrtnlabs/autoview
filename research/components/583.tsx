import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface actions_repository_permissions {
        enabled: AutoViewInputSubTypes.actions_enabled;
        allowed_actions?: AutoViewInputSubTypes.allowed_actions;
        selected_actions_url?: AutoViewInputSubTypes.selected_actions_url;
    }
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
  // 1. Data transformation & derived constants
  const isEnabled = value.enabled;
  const policy = value.allowed_actions;
  const policyLabels: Record<AutoViewInputSubTypes.allowed_actions, string> = {
    all: "All Actions",
    local_only: "Local Only",
    selected: "Selected Actions",
  };

  // 2. JSX composition
  return (
    <div className="w-full max-w-sm bg-white p-4 rounded-lg shadow-md">
      {/* Enabled / Disabled Status */}
      <div className="flex items-center">
        {isEnabled ? (
          <LucideReact.CheckCircle
            aria-label="Actions enabled"
            className="text-green-500"
            size={20}
          />
        ) : (
          <LucideReact.XCircle
            aria-label="Actions disabled"
            className="text-red-500"
            size={20}
          />
        )}
        <span
          className={`ml-2 font-medium ${
            isEnabled ? "text-gray-900" : "text-gray-500"
          }`}
        >
          Actions {isEnabled ? "Enabled" : "Disabled"}
        </span>
      </div>

      {/* Allowed Actions Policy */}
      {isEnabled && policy && (
        <div className="mt-4 flex items-center">
          {policy === "all" && (
            <LucideReact.ShieldCheck
              aria-label="All actions allowed"
              className="text-green-500"
              size={16}
            />
          )}
          {policy === "local_only" && (
            <LucideReact.Shield
              aria-label="Local-only actions allowed"
              className="text-amber-500"
              size={16}
            />
          )}
          {policy === "selected" && (
            <LucideReact.Shield
              aria-label="Selected actions allowed"
              className="text-blue-500"
              size={16}
            />
          )}
          <span className="ml-2 text-sm font-medium text-gray-800">
            {policyLabels[policy]}
          </span>
        </div>
      )}

      {/* Selected Actions URL (when policy is 'selected') */}
      {isEnabled && policy === "selected" && value.selected_actions_url && (
        <div className="mt-2 flex items-start">
          <LucideReact.Link
            aria-label="Configuration URL"
            className="text-gray-400 mt-0.5"
            size={16}
          />
          <span className="ml-2 text-xs text-gray-500 truncate">
            {value.selected_actions_url}
          </span>
        </div>
      )}
    </div>
  );
}
