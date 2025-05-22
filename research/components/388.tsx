import LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  export type actions_organization_permissions = {
    enabled_repositories: AutoViewInputSubTypes.enabled_repositories;
    /**
     * The API URL to use to get or set the selected repositories that are allowed to run GitHub Actions, when `enabled_repositories` is set to `selected`.
     */
    selected_repositories_url?: string;
    allowed_actions?: AutoViewInputSubTypes.allowed_actions;
    selected_actions_url?: AutoViewInputSubTypes.selected_actions_url;
  };
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
export type AutoViewInput =
  AutoViewInputSubTypes.actions_organization_permissions;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const repoLabels: Record<AutoViewInputSubTypes.enabled_repositories, string> =
    {
      all: "All repositories",
      none: "No repositories",
      selected: "Selected repositories",
    };
  const actionsKey = (value.allowed_actions ??
    "all") as NonNullable<AutoViewInputSubTypes.allowed_actions>;
  const actionsLabels: Record<
    NonNullable<AutoViewInputSubTypes.allowed_actions>,
    string
  > = {
    all: "All actions and reusable workflows",
    local_only: "Local actions and reusable workflows only",
    selected: "Selected actions and reusable workflows",
  };
  const truncate = (str: string, max = 50) =>
    str.length > max ? str.slice(0, max) + "…" : str;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        GitHub Actions Policy
      </h2>
      <div className="space-y-6">
        {/* Enabled Repositories Section */}
        <div>
          <div className="flex items-center text-gray-700">
            <LucideReact.GitBranch
              size={18}
              className="mr-2 text-gray-500"
              aria-hidden
            />
            <span className="font-medium">Allowed Repositories:</span>
          </div>
          <div className="ml-6 mt-1 text-gray-900">
            {repoLabels[value.enabled_repositories]}
          </div>
          {value.enabled_repositories === "selected" &&
            value.selected_repositories_url && (
              <div className="ml-6 mt-2 flex items-start">
                <LucideReact.Link
                  size={16}
                  className="mt-1 mr-1 text-gray-500"
                  aria-hidden
                />
                <code className="text-sm text-blue-600 break-words">
                  {truncate(value.selected_repositories_url)}
                </code>
              </div>
            )}
        </div>

        {/* Allowed Actions Section */}
        <div>
          <div className="flex items-center text-gray-700">
            <LucideReact.PlayCircle
              size={18}
              className="mr-2 text-gray-500"
              aria-hidden
            />
            <span className="font-medium">Allowed Actions:</span>
          </div>
          <div className="ml-6 mt-1 text-gray-900">
            {actionsLabels[actionsKey]}
          </div>
          {actionsKey === "selected" && value.selected_actions_url && (
            <div className="ml-6 mt-2 flex items-start">
              <LucideReact.Link
                size={16}
                className="mt-1 mr-1 text-gray-500"
                aria-hidden
              />
              <code className="text-sm text-blue-600 break-words">
                {truncate(value.selected_actions_url)}
              </code>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
