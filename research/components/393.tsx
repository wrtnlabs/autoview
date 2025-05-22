import LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.runner_groups_org;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const visibilityLabel =
    value.visibility.charAt(0).toUpperCase() + value.visibility.slice(1);
  const allowsPublic = value.allows_public_repositories;
  const inheritedAllowsPublic = value.inherited_allows_public_repositories;
  const workflows = value.selected_workflows ?? [];
  const workflowsCount = workflows.length;
  const showWorkflows = value.restricted_to_workflows && workflowsCount > 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-sm">
      {/* Header: Name */}
      <h2 className="text-lg font-semibold text-gray-900 mb-3 truncate">
        {value.name}
      </h2>

      {/* Badges for visibility, default, inherited */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs font-medium bg-gray-100 text-gray-800 px-2 py-1 rounded">
          {visibilityLabel}
        </span>
        {value.default && (
          <span className="flex items-center text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
            <LucideReact.Star size={14} className="mr-1" />
            Default
          </span>
        )}
        {value.inherited && (
          <span className="flex items-center text-xs font-medium bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
            <LucideReact.ArrowUpLeft size={14} className="mr-1" />
            Inherited
          </span>
        )}
      </div>

      {/* Key properties */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-700">
        <div className="flex items-center">
          {allowsPublic ? (
            <LucideReact.CheckCircle size={16} className="text-green-500" />
          ) : (
            <LucideReact.XCircle size={16} className="text-red-500" />
          )}
          <span className="ml-2">
            Public repos {allowsPublic ? "allowed" : "disallowed"}
          </span>
        </div>

        <div className="flex items-center">
          <LucideReact.Server size={16} className="text-gray-500" />
          <span className="ml-2">
            Network cfg:{" "}
            {value.network_configuration_id ?? (
              <span className="italic">none</span>
            )}
          </span>
        </div>

        {value.hosted_runners_url && (
          <div className="flex items-center">
            <LucideReact.Cpu size={16} className="text-gray-500" />
            <span className="ml-2 truncate">Hosted runners</span>
          </div>
        )}

        {value.selected_repositories_url && (
          <div className="flex items-center">
            <LucideReact.GitBranch size={16} className="text-gray-500" />
            <span className="ml-2 truncate">Custom repos</span>
          </div>
        )}
      </div>

      {/* Workflow restrictions */}
      {(value.restricted_to_workflows !== undefined ||
        value.workflow_restrictions_read_only) && (
        <div className="mt-4 border-t pt-3">
          <h3 className="flex items-center text-sm font-medium text-gray-900 mb-2">
            <LucideReact.Lock size={16} className="text-gray-500 mr-1" />
            Workflow restrictions
            {value.workflow_restrictions_read_only && (
              <span className="ml-2 text-xs text-gray-500 italic">
                read-only
              </span>
            )}
          </h3>

          <div className="text-sm text-gray-700 mb-2">
            {value.restricted_to_workflows
              ? "Restricted to selected workflows"
              : "Not restricted"}
          </div>

          {showWorkflows && (
            <div className="flex flex-wrap gap-2">
              {workflows.slice(0, 3).map((wf) => (
                <span
                  key={wf}
                  className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                >
                  {wf}
                </span>
              ))}
              {workflowsCount > 3 && (
                <span className="text-xs text-gray-500">
                  +{workflowsCount - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
