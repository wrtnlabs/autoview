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
  const isSelectedVisibility = value.visibility === "selected";
  const visibilityLabel = (() => {
    switch (value.visibility) {
      case "all":
        return "All repositories";
      case "selected":
        return "Selected repositories";
      default:
        return (
          value.visibility.charAt(0).toUpperCase() + value.visibility.slice(1)
        );
    }
  })();
  const selectedWorkflowsCount = value.selected_workflows?.length ?? 0;
  const workflowInfo = value.workflow_restrictions_read_only
    ? {
        icon: <LucideReact.Lock size={16} className="text-amber-500" />,
        label: "Restrictions locked",
      }
    : value.restricted_to_workflows
      ? {
          icon: (
            <LucideReact.CheckCircle size={16} className="text-green-500" />
          ),
          label: `Restricted to ${selectedWorkflowsCount} workflow${selectedWorkflowsCount !== 1 ? "s" : ""}`,
        }
      : {
          icon: <LucideReact.XCircle size={16} className="text-gray-400" />,
          label: "No workflow restrictions",
        };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-sm p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.name}
        </h2>
        {value.default && (
          <div className="flex items-center text-blue-600 text-sm font-medium">
            <LucideReact.Star size={16} className="mr-1" /> Default
          </div>
        )}
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
        {/* Visibility */}
        <div className="flex items-center gap-2">
          {isSelectedVisibility ? (
            <LucideReact.Lock size={16} className="text-gray-500" />
          ) : (
            <LucideReact.Globe2 size={16} className="text-gray-500" />
          )}
          <span className="font-medium">{visibilityLabel}</span>
        </div>

        {/* Inherited */}
        <div className="flex items-center gap-2">
          {value.inherited ? (
            <LucideReact.CheckCircle size={16} className="text-green-500" />
          ) : (
            <LucideReact.XCircle size={16} className="text-red-400" />
          )}
          <span>{value.inherited ? "Inherited" : "Custom"}</span>
        </div>

        {/* Public Repos */}
        <div className="flex items-center gap-2">
          {value.allows_public_repositories ? (
            <LucideReact.CheckCircle size={16} className="text-green-500" />
          ) : (
            <LucideReact.XCircle size={16} className="text-red-400" />
          )}
          <span>Public repos allowed</span>
        </div>

        {/* Workflow Restrictions */}
        <div className="flex items-center gap-2">
          {workflowInfo.icon}
          <span>{workflowInfo.label}</span>
        </div>

        {/* Selected Workflows (if any) */}
        {value.restricted_to_workflows && selectedWorkflowsCount > 0 && (
          <div className="col-span-full flex items-center gap-2 text-gray-600">
            <LucideReact.ListChecks size={16} className="text-gray-500" />
            <span className="line-clamp-2">
              {value.selected_workflows!.join(", ")}
            </span>
          </div>
        )}

        {/* Network Configuration */}
        {value.network_configuration_id && (
          <div className="col-span-full flex items-center gap-2">
            <LucideReact.Settings size={16} className="text-gray-500" />
            <span>
              Net config ID:{" "}
              <span className="font-medium">
                {value.network_configuration_id}
              </span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
