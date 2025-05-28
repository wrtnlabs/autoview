import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface actions_organization_permissions {
        enabled_repositories: AutoViewInputSubTypes.enabled_repositories;
        /**
         * The API URL to use to get or set the selected repositories that are allowed to run GitHub Actions, when `enabled_repositories` is set to `selected`.
        */
        selected_repositories_url?: string;
        allowed_actions?: AutoViewInputSubTypes.allowed_actions;
        selected_actions_url?: AutoViewInputSubTypes.selected_actions_url;
    }
    /**
     * The policy that controls the repositories in the organization that are allowed to run GitHub Actions.
    */
    export type enabled_repositories = "all" | "none" | "selected";
    /**
     * The permissions policy that controls the actions and reusable workflows that are allowed to run.
    */
    export type allowed_actions = "all" | "local_only" | "selected";
    /**
     * The API URL to use to get or set the actions and reusable workflows that are allowed to run, when `allowed_actions` is set to `selected`.
    */
    export type selected_actions_url = string;
}
export type AutoViewInput = AutoViewInputSubTypes.actions_organization_permissions;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const truncate = (str: string, max = 40): string =>
    str.length > max ? `${str.slice(0, max)}…` : str;

  const repoPolicyMap: Record<
    AutoViewInputSubTypes.enabled_repositories,
    { icon: JSX.Element; text: string }
  > = {
    all: {
      icon: <LucideReact.CheckCircle size={16} className="text-green-500" />,
      text: "All repositories",
    },
    none: {
      icon: <LucideReact.XCircle size={16} className="text-red-500" />,
      text: "No repositories",
    },
    selected: {
      icon: <LucideReact.ListChecks size={16} className="text-amber-500" />,
      text: "Selected repositories",
    },
  };
  const enabledPolicy = repoPolicyMap[value.enabled_repositories];

  const allowed = value.allowed_actions ?? "all";
  const actionPolicyMap: Record<
    AutoViewInputSubTypes.allowed_actions,
    { icon: JSX.Element; text: string }
  > = {
    all: {
      icon: <LucideReact.CheckCircle size={16} className="text-green-500" />,
      text: "All actions",
    },
    local_only: {
      icon: <LucideReact.Lock size={16} className="text-amber-500" />,
      text: "Local only actions",
    },
    selected: {
      icon: <LucideReact.ListChecks size={16} className="text-blue-500" />,
      text: "Selected actions",
    },
  };
  const actionsPolicy = actionPolicyMap[allowed];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
        <LucideReact.Zap size={20} className="text-blue-500" />
        <span>Actions Organization Permissions</span>
      </h2>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          {enabledPolicy.icon}
          <span className="text-sm font-medium">{enabledPolicy.text}</span>
        </div>
        {value.enabled_repositories === "selected" && value.selected_repositories_url && (
          <div className="ml-6 text-sm text-gray-600 break-all truncate">
            {truncate(value.selected_repositories_url)}
          </div>
        )}
        <div className="flex items-center gap-2">
          {actionsPolicy.icon}
          <span className="text-sm font-medium">{actionsPolicy.text}</span>
        </div>
        {allowed === "selected" && value.selected_actions_url && (
          <div className="ml-6 text-sm text-gray-600 break-all truncate">
            {truncate(value.selected_actions_url)}
          </div>
        )}
      </div>
    </div>
  );
}
