import LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  export namespace IApiOrgsActionsRunnerGroups {
    export type GetResponse = {
      total_count: number;
      runner_groups: AutoViewInputSubTypes.runner_groups_org[];
    };
  }
  export type runner_groups_org = {
    id: number;
    name: string;
    visibility: string;
    default: boolean;
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
export type AutoViewInput =
  AutoViewInputSubTypes.IApiOrgsActionsRunnerGroups.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, runner_groups } = value;

  const getVisibilityLabel = (vis: string): string => {
    if (vis === "all") return "All repos";
    if (vis === "selected") return "Selected repos";
    return vis.charAt(0).toUpperCase() + vis.slice(1);
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      {/* Header */}
      <div className="flex items-center text-gray-700 mb-4">
        <LucideReact.Layers className="text-gray-500 mr-2" size={20} />
        <h2 className="text-lg font-medium">Runner Groups ({total_count})</h2>
      </div>

      {/* Empty State */}
      {runner_groups.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
          <LucideReact.AlertCircle
            size={32}
            className="mb-2"
            aria-label="No runner groups"
          />
          <span>No runner groups available.</span>
        </div>
      ) : (
        // Grid of runner group cards
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {runner_groups.map((group) => {
            const workflowCount = group.selected_workflows?.length ?? 0;
            return (
              <div
                key={group.id}
                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Name */}
                <h3 className="text-md font-semibold text-gray-800 truncate">
                  {group.name}
                </h3>

                {/* Badges */}
                <div className="mt-2 flex flex-wrap gap-2">
                  {/* Default */}
                  {group.default && (
                    <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
                      Default
                    </span>
                  )}

                  {/* Visibility */}
                  <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded capitalize">
                    {getVisibilityLabel(group.visibility)}
                  </span>

                  {/* Public repositories */}
                  {group.allows_public_repositories ? (
                    <span className="inline-flex items-center px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded">
                      Public repos
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded">
                      No public
                    </span>
                  )}

                  {/* Inherited */}
                  {group.inherited && (
                    <span className="inline-flex items-center px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded">
                      Inherited
                    </span>
                  )}

                  {/* Workflow restrictions */}
                  {group.restricted_to_workflows && (
                    <span className="inline-flex items-center px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded">
                      Workflows ({workflowCount})
                    </span>
                  )}
                </div>

                {/* Optional network configuration info */}
                {group.network_configuration_id && (
                  <div className="mt-2 text-xs text-gray-500">
                    Network Config ID: {group.network_configuration_id}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
