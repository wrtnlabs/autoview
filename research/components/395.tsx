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
  const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

  const visibilityLabel: string =
    value.visibility === 'selected'
      ? 'Selected Repositories'
      : capitalize(value.visibility);

  const defaultBadge = value.default ? (
    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
      Default
    </span>
  ) : null;

  const inheritedBadge = value.inherited ? (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
      Inherited
    </span>
  ) : null;

  const publicReposBadge = value.allows_public_repositories ? (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
      Public Allowed
    </span>
  ) : (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
      Public Disallowed
    </span>
  );

  const workflowRestrictionBadge: React.ReactNode = value.restricted_to_workflows ? (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
      Restricted ({value.selected_workflows?.length ?? 0})
    </span>
  ) : (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
      All Workflows
    </span>
  );

  const networkConfigLine = value.network_configuration_id ? (
    <div className="mt-2 text-sm text-gray-600">
      Network Config: <span className="font-medium text-gray-800">{value.network_configuration_id}</span>
    </div>
  ) : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-2">
        <h3 className="flex-1 text-lg font-semibold text-gray-900 truncate">
          {value.name}
        </h3>
        {defaultBadge}
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {inheritedBadge}
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
          {visibilityLabel}
        </span>
        {publicReposBadge}
        {workflowRestrictionBadge}
      </div>
      {networkConfigLine}
    </div>
  );
}
