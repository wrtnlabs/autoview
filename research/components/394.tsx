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
  const isDefault = value["default"];
  const isInherited = value.inherited;
  const visibility = value.visibility;
  const visibilityLabel =
    visibility.charAt(0).toUpperCase() + visibility.slice(1);

  // Determine badge colors for visibility
  let visBg = "bg-green-100";
  let visText = "text-green-800";
  if (visibility === "selected") {
    visBg = "bg-amber-100";
    visText = "text-amber-800";
  } else if (visibility === "private") {
    visBg = "bg-red-100";
    visText = "text-red-800";
  }

  const allowsPublic = value.allows_public_repositories;
  const restrictedToWorkflows = Boolean(value.restricted_to_workflows);
  const workflowsReadOnly = Boolean(value.workflow_restrictions_read_only);
  const selectedWorkflows = value.selected_workflows || [];
  const displayedWorkflows = selectedWorkflows.slice(0, 3);
  const moreWorkflowsCount =
    selectedWorkflows.length - displayedWorkflows.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {/* Header: Name and badges */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-lg font-medium text-gray-900 truncate">
          {value.name}
        </h2>
        <div className="mt-2 sm:mt-0 flex flex-wrap gap-2">
          {isDefault && (
            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
              Default
            </span>
          )}
          {isInherited && (
            <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full">
              Inherited
            </span>
          )}
          <span
            className={`px-2 py-0.5 ${visBg} ${visText} text-xs font-semibold rounded-full`}
          >
            {visibilityLabel}
          </span>
        </div>
      </div>

      {/* Status grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
        <div className="flex items-center">
          {allowsPublic ? (
            <LucideReact.CheckCircle
              className="text-green-500 mr-2"
              size={16}
            />
          ) : (
            <LucideReact.XCircle className="text-red-500 mr-2" size={16} />
          )}
          <span>Allows public repositories</span>
        </div>

        <div className="flex items-center">
          {workflowsReadOnly ? (
            <>
              <LucideReact.Lock className="text-gray-500 mr-2" size={16} />
              <span>Workflow restrictions read-only</span>
            </>
          ) : restrictedToWorkflows ? (
            <>
              <LucideReact.CheckCircle
                className="text-green-500 mr-2"
                size={16}
              />
              <span>Restricted to workflows</span>
            </>
          ) : (
            <>
              <LucideReact.XCircle className="text-red-500 mr-2" size={16} />
              <span>No workflow restrictions</span>
            </>
          )}
        </div>

        {/* Selected workflows list */}
        {restrictedToWorkflows && selectedWorkflows.length > 0 && (
          <div className="col-span-1 sm:col-span-2">
            <div className="mt-2 flex flex-wrap gap-2">
              {displayedWorkflows.map((wf) => (
                <span
                  key={wf}
                  className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded"
                >
                  {wf}
                </span>
              ))}
              {moreWorkflowsCount > 0 && (
                <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                  +{moreWorkflowsCount} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
