import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsRunnerGroups.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalGroups = value.total_count.toLocaleString();
  const groups = value.runner_groups;

  const capitalize = (s: string) =>
    s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  // Badge generator for consistent styling
  const Badge = ({
    text,
    colorClass,
  }: {
    text: string;
    colorClass: string;
  }): React.ReactNode => (
    <span
      className={`inline-block px-2 py-0.5 mr-2 mb-2 text-xs font-semibold uppercase rounded-full ${colorClass}`}
    >
      {text}
    </span>
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-full mx-auto p-4">
      <header className="mb-4">
        <h2 className="text-lg font-bold text-gray-800">
          Runner Groups ({totalGroups})
        </h2>
      </header>

      {groups.length === 0 ? (
        <p className="text-gray-600">No runner groups available.</p>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => (
            <div
              key={group.id}
              className="bg-white rounded-lg shadow p-4 space-y-2"
            >
              <h3 className="text-md font-semibold text-gray-900 truncate">
                {group.name}
              </h3>
              <div className="flex flex-wrap items-center">
                {/* Visibility */}
                <Badge
                  text={group.visibility === "selected" ? "Selected" : capitalize(group.visibility)}
                  colorClass={
                    group.visibility === "selected"
                      ? "bg-indigo-100 text-indigo-800"
                      : "bg-gray-100 text-gray-800"
                  }
                />

                {/* Default */}
                {group.default && (
                  <Badge text="Default" colorClass="bg-blue-100 text-blue-800" />
                )}

                {/* Inherited */}
                {group.inherited && (
                  <Badge
                    text="Inherited"
                    colorClass="bg-purple-100 text-purple-800"
                  />
                )}

                {/* Public repos */}
                <Badge
                  text={
                    group.allows_public_repositories
                      ? "Public Repos"
                      : "Private Only"
                  }
                  colorClass={
                    group.allows_public_repositories
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }
                />

                {/* Restricted to workflows */}
                {group.restricted_to_workflows && (
                  <Badge
                    text="Restricted Workflows"
                    colorClass="bg-yellow-100 text-yellow-800"
                  />
                )}

                {/* Read-only workflow restrictions */}
                {group.workflow_restrictions_read_only && (
                  <Badge
                    text="Workflows Locked"
                    colorClass="bg-red-100 text-red-800"
                  />
                )}

                {/* Network configuration */}
                {group.network_configuration_id && (
                  <Badge
                    text={`Network: ${group.network_configuration_id}`}
                    colorClass="bg-teal-100 text-teal-800"
                  />
                )}

                {/* Selected workflows count */}
                {group.selected_workflows && group.selected_workflows.length > 0 && (
                  <Badge
                    text={`Workflows: ${group.selected_workflows.length}`}
                    colorClass="bg-indigo-50 text-indigo-700"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
