import React from "react";
export namespace AutoViewInputSubTypes {
    export type runner_groups_org = {
        id: number;
        name: string;
        visibility: string;
        "default": boolean;
        /**
         * Link to the selected repositories resource for this runner group. Not present unless visibility was set to `selected`
        */
        selected_repositories_url?: string;
        runners_url: string;
        hosted_runners_url?: string;
        /**
         * The identifier of a hosted compute network configuration.
        */
        network_configuration_id?: string;
        inherited: boolean;
        inherited_allows_public_repositories?: boolean;
        allows_public_repositories: boolean;
        /**
         * If `true`, the `restricted_to_workflows` and `selected_workflows` fields cannot be modified.
        */
        workflow_restrictions_read_only?: boolean;
        /**
         * If `true`, the runner group will be restricted to running only the workflows specified in the `selected_workflows` array.
        */
        restricted_to_workflows?: boolean;
        /**
         * List of workflows the runner group should be allowed to run. This setting will be ignored unless `restricted_to_workflows` is set to `true`.
        */
        selected_workflows?: string[];
    };
}
export type AutoViewInput = AutoViewInputSubTypes.runner_groups_org;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  // Visibility badge info
  let visibilityLabel = capitalize(value.visibility);
  let visibilityClass = "bg-gray-100 text-gray-800";
  if (value.visibility === "public") {
    visibilityClass = "bg-green-100 text-green-800";
    visibilityLabel = "Public";
  } else if (value.visibility === "private") {
    visibilityClass = "bg-red-100 text-red-800";
    visibilityLabel = "Private";
  } else if (value.visibility === "selected") {
    visibilityClass = "bg-yellow-100 text-yellow-800";
    visibilityLabel = "Selected";
  }

  // Default badge
  const defaultBadge =
    value.default ? (
      <span
        key="default"
        className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
      >
        Default
      </span>
    ) : null;

  // Inherited badge
  const inheritedBadge =
    value.inherited ? (
      <span
        key="inherited"
        className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded"
      >
        Inherited
      </span>
    ) : null;

  // Public repositories badge
  const publicReposBadge = (
    <span
      key="allowsPublic"
      className={`text-xs font-medium px-2.5 py-0.5 rounded ${
        value.allows_public_repositories
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      {value.allows_public_repositories
        ? "Public Repos Allowed"
        : "Public Repos Restricted"}
    </span>
  );

  // Workflow restrictions badge
  const restrictedBadge = value.restricted_to_workflows ? (
    <span
      key="restricted"
      className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded"
    >
      Restricted to Workflows ({value.selected_workflows?.length ?? 0})
    </span>
  ) : null;

  // Read-only workflow restrictions badge
  const readOnlyBadge = value.workflow_restrictions_read_only ? (
    <span
      key="readonly"
      className="bg-gray-200 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded flex items-center"
    >
      🔒 Read-only
    </span>
  ) : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-sm mx-auto">
      {/* Group Name */}
      <h2 className="text-lg font-semibold text-gray-900 truncate">
        {value.name}
      </h2>

      {/* Badges */}
      <div className="mt-2 flex flex-wrap gap-2">
        <span
          key="visibility"
          className={`${visibilityClass} text-xs font-medium px-2.5 py-0.5 rounded`}
        >
          {visibilityLabel}
        </span>
        {defaultBadge}
        {inheritedBadge}
        {publicReposBadge}
        {restrictedBadge}
        {readOnlyBadge}
      </div>

      {/* Selected workflows list */}
      {value.selected_workflows && value.selected_workflows.length > 0 && (
        <div className="mt-3">
          <h3 className="text-sm font-medium text-gray-700 mb-1">
            Selected Workflows
          </h3>
          <div className="flex flex-wrap gap-2">
            {value.selected_workflows.slice(0, 3).map((w, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded truncate"
              >
                {w}
              </span>
            ))}
            {value.selected_workflows.length > 3 && (
              <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded">
                +{value.selected_workflows.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
