import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.actions_organization_permissions;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const enabledReposMap: Record<AutoViewInputSubTypes.enabled_repositories, string> = {
    all: "All repositories",
    none: "No repositories",
    selected: "Selected repositories"
  };
  const allowedActionsMap: Record<AutoViewInputSubTypes.allowed_actions, string> = {
    all: "All actions and reusable workflows",
    local_only: "Local actions and reusable workflows only",
    selected: "Selected actions and reusable workflows"
  };

  const enabledReposLabel = enabledReposMap[value.enabled_repositories];
  const allowedActionsLabel =
    value.allowed_actions !== undefined
      ? allowedActionsMap[value.allowed_actions]
      : "Not specified";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        GitHub Actions Permissions
      </h2>
      <div className="space-y-6">
        {/* Enabled Repositories Section */}
        <section>
          <h3 className="text-sm font-medium text-gray-700">
            Enabled Repositories
          </h3>
          <p className="mt-1 text-gray-800">{enabledReposLabel}</p>
          {value.enabled_repositories === "selected" && value.selected_repositories_url && (
            <div className="mt-2">
              <h4 className="text-xs font-medium text-gray-600">
                Management URL
              </h4>
              <code className="block mt-1 text-sm text-blue-600 break-all">
                {value.selected_repositories_url}
              </code>
            </div>
          )}
        </section>

        {/* Allowed Actions Section */}
        <section>
          <h3 className="text-sm font-medium text-gray-700">
            Allowed Actions
          </h3>
          <p className="mt-1 text-gray-800">{allowedActionsLabel}</p>
          {value.allowed_actions === "selected" && value.selected_actions_url && (
            <div className="mt-2">
              <h4 className="text-xs font-medium text-gray-600">
                Management URL
              </h4>
              <code className="block mt-1 text-sm text-blue-600 break-all">
                {value.selected_actions_url}
              </code>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
