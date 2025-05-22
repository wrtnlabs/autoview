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
  const visibilityLabel =
    value.visibility.charAt(0).toUpperCase() + value.visibility.slice(1);
  const publicReposLabel = value.allows_public_repositories
    ? "Public Repos Allowed"
    : "Public Repos Not Allowed";
  const isDefault = value["default"];
  const isInherited = value.inherited;
  const restrictedWorkflows = value.restricted_to_workflows ?? false;
  const workflowReadOnly = value.workflow_restrictions_read_only ?? false;
  const workflowCount = value.selected_workflows?.length ?? 0;
  const displayedWorkflows = value.selected_workflows?.slice(0, 3) ?? [];
  const moreWorkflows = workflowCount - displayedWorkflows.length;
  const networkConfig = value.network_configuration_id;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-800 truncate">{value.name}</h2>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-2">
        {isDefault && (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
            Default Group
          </span>
        )}
        {isInherited && (
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded">
            Inherited
          </span>
        )}
        {restrictedWorkflows && (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">
            Restricted Workflows
          </span>
        )}
        {workflowReadOnly && (
          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded">
            Workflow Read-Only
          </span>
        )}
      </div>

      {/* Key Details */}
      <div className="mt-4 space-y-2 text-sm text-gray-700">
        <div>
          <span className="font-medium">Visibility:</span> {visibilityLabel}
        </div>
        <div>
          <span className="font-medium">Repositories:</span> {publicReposLabel}
        </div>
        {networkConfig && (
          <div>
            <span className="font-medium">Network Config:</span>{" "}
            <span className="truncate inline-block max-w-xs">{networkConfig}</span>
          </div>
        )}
      </div>

      {/* Selected Workflows */}
      {restrictedWorkflows && workflowCount > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-800">
            Selected Workflows ({workflowCount})
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {displayedWorkflows.map((wf, idx) => (
              <span
                key={idx}
                className="bg-blue-50 text-blue-800 text-xs font-medium px-2 py-0.5 rounded truncate max-w-xs"
              >
                {wf}
              </span>
            ))}
            {moreWorkflows > 0 && (
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded">
                +{moreWorkflows} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
