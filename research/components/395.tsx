import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.runner_groups_org;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
  const visibilityLabel = capitalize(value.visibility);
  const selectedWorkflows = value.selected_workflows ?? [];
  const workflowDisplay =
    value.restricted_to_workflows
      ? selectedWorkflows.length > 0
        ? selectedWorkflows.length <= 3
          ? selectedWorkflows
          : [...selectedWorkflows.slice(0, 3), `+${selectedWorkflows.length - 3} more`]
        : ['None']
      : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 max-w-md">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{value.name}</h2>
        {value.default && (
          <LucideReact.Star
            className="text-yellow-500"
            size={20}
            aria-label="Default group"
          />
        )}
      </div>

      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <LucideReact.Eye className="text-gray-500" size={16} aria-label="Visibility icon" />
          <span>Visibility: {visibilityLabel}</span>
        </div>

        <div className="flex items-center gap-2">
          {value.inherited ? (
            <LucideReact.Share2
              className="text-blue-500"
              size={16}
              aria-label="Inherited"
            />
          ) : (
            <LucideReact.UserMinus
              className="text-gray-400"
              size={16}
              aria-label="Not inherited"
            />
          )}
          <span>Inherited: {value.inherited ? 'Yes' : 'No'}</span>
        </div>

        <div className="flex items-center gap-2">
          {value.allows_public_repositories ? (
            <LucideReact.Unlock
              className="text-green-500"
              size={16}
              aria-label="Public repos allowed"
            />
          ) : (
            <LucideReact.Lock
              className="text-red-500"
              size={16}
              aria-label="Public repos disallowed"
            />
          )}
          <span>Public repos: {value.allows_public_repositories ? 'Allowed' : 'Disallowed'}</span>
        </div>

        {value.restricted_to_workflows !== undefined && (
          <div className="flex items-start gap-2">
            <LucideReact.ShieldCheck
              className="text-indigo-500 mt-0.5"
              size={16}
              aria-label="Workflow restrictions"
            />
            <div>
              <div>Workflow restrictions:</div>
              <div className="ml-5">
                {value.restricted_to_workflows ? 'Restricted' : 'Unrestricted'}
              </div>
            </div>
          </div>
        )}

        {value.restricted_to_workflows && workflowDisplay && (
          <div className="flex flex-col gap-1 col-span-full">
            <div className="flex items-center gap-2">
              <LucideReact.ListChecks
                className="text-gray-600"
                size={16}
                aria-label="Selected workflows"
              />
              <span>Selected workflows:</span>
            </div>
            <ul className="ml-6 list-disc text-gray-600">
              {workflowDisplay.map((wf, idx) => (
                <li key={idx} className="truncate">
                  {wf}
                </li>
              ))}
            </ul>
          </div>
        )}

        {value.network_configuration_id && (
          <div className="flex items-center gap-2 col-span-full">
            <LucideReact.Server
              className="text-gray-500"
              size={16}
              aria-label="Network configuration"
            />
            <span>Network config ID: {value.network_configuration_id}</span>
          </div>
        )}
      </div>
    </div>
  );
}
