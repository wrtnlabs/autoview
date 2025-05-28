import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsActionsRunnerGroups {
        export interface GetResponse {
            total_count: number;
            runner_groups: AutoViewInputSubTypes.runner_groups_org[];
        }
    }
    export interface runner_groups_org {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsRunnerGroups.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalGroups = value.total_count;
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center mb-4">
        <LucideReact.Users size={20} className="text-gray-600 mr-2" aria-label="Groups" />
        <h2 className="text-lg font-semibold text-gray-800">
          Runner Groups <span className="text-gray-500">({totalGroups})</span>
        </h2>
      </div>

      {/* Runner Groups List */}
      <div className="space-y-4">
        {value.runner_groups.map(group => {
          // Derived labels and counts
          const visibilityLabel = capitalize(group.visibility);
          const selectedWorkflowsCount = group.selected_workflows?.length ?? 0;
          const visibilityStyles =
            group.visibility === "all"
              ? "bg-green-100 text-green-800"
              : group.visibility === "selected"
              ? "bg-amber-100 text-amber-800"
              : "bg-gray-100 text-gray-800";

          return (
            <div
              key={group.id}
              className="border border-gray-200 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4"
            >
              {/* Group Name & Default Indicator */}
              <div className="flex items-center space-x-2">
                <LucideReact.Server size={16} className="text-gray-500" aria-label="Group icon" />
                <span className="font-medium text-gray-800 truncate">
                  {group.name}
                </span>
                {group.default && (
                  <LucideReact.CheckCircle
                    size={16}
                    className="text-green-500"
                    aria-label="Default group"
                  />
                )}
              </div>

              {/* Details Panel */}
              <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4">
                {/* Visibility Badge */}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${visibilityStyles}`}
                >
                  {visibilityLabel}
                </span>

                {/* Inheritance */}
                <div className="flex items-center space-x-1">
                  {group.inherited ? (
                    <LucideReact.ArrowUpRight
                      size={16}
                      className="text-blue-500"
                      aria-label="Inherited"
                    />
                  ) : (
                    <LucideReact.ShieldOff
                      size={16}
                      className="text-gray-400"
                      aria-label="Local"
                    />
                  )}
                  <span>{group.inherited ? "Inherited" : "Local"}</span>
                </div>

                {/* Public Repositories */}
                <div className="flex items-center space-x-1">
                  {group.allows_public_repositories ? (
                    <LucideReact.Globe
                      size={16}
                      className="text-green-500"
                      aria-label="Public repos allowed"
                    />
                  ) : (
                    <LucideReact.Lock
                      size={16}
                      className="text-red-500"
                      aria-label="Public repos restricted"
                    />
                  )}
                  <span>
                    {group.allows_public_repositories
                      ? "Public repos allowed"
                      : "Public repos restricted"}
                  </span>
                </div>

                {/* Workflow Restrictions */}
                {group.restricted_to_workflows && (
                  <div className="flex items-center space-x-1">
                    <LucideReact.Activity
                      size={16}
                      className="text-amber-500"
                      aria-label="Workflow restrictions"
                    />
                    <span>{selectedWorkflowsCount} workflows</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
