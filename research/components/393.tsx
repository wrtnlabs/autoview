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
  const visibilityLabel =
    value.visibility === "all"
      ? "All repositories"
      : value.visibility === "selected"
      ? "Selected repositories"
      : value.visibility;
  const inheritedLabel = value.inherited ? "Yes" : "No";
  const publicReposLabel = value.allows_public_repositories
    ? "Allowed"
    : "Not allowed";
  const workflowRestrictionLabel = value.restricted_to_workflows
    ? "Restricted"
    : "None";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.name}
        </h2>
        {value.default && (
          <span className="flex items-center text-green-600 text-sm font-medium">
            <LucideReact.CheckCircle size={16} className="mr-1" />
            Default
          </span>
        )}
      </div>

      <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-sm text-gray-700">
        <div className="flex items-center col-span-1 sm:col-span-2">
          {value.visibility === "all" ? (
            <LucideReact.Users
              size={16}
              className="text-gray-400 mr-1"
              aria-hidden="true"
            />
          ) : (
            <LucideReact.Lock
              size={16}
              className="text-gray-400 mr-1"
              aria-hidden="true"
            />
          )}
          <dt className="font-medium">Visibility:</dt>
          <dd className="ml-1">{visibilityLabel}</dd>
        </div>

        <div className="flex items-center">
          <LucideReact.ArrowUpRight
            size={16}
            className="text-gray-400 mr-1"
            aria-hidden="true"
          />
          <dt className="font-medium">Inherited:</dt>
          <dd className="ml-1">{inheritedLabel}</dd>
        </div>

        <div className="flex items-center">
          {value.allows_public_repositories ? (
            <LucideReact.CheckCircle
              size={16}
              className="text-green-500 mr-1"
              aria-hidden="true"
            />
          ) : (
            <LucideReact.XCircle
              size={16}
              className="text-red-500 mr-1"
              aria-hidden="true"
            />
          )}
          <dt className="font-medium">Public repos:</dt>
          <dd className="ml-1">{publicReposLabel}</dd>
        </div>

        {value.network_configuration_id && (
          <div className="flex items-center">
            <LucideReact.Server
              size={16}
              className="text-gray-400 mr-1"
              aria-hidden="true"
            />
            <dt className="font-medium">Network config:</dt>
            <dd className="ml-1">{value.network_configuration_id}</dd>
          </div>
        )}

        <div className="flex items-center">
          <LucideReact.GitPullRequest
            size={16}
            className="text-gray-400 mr-1"
            aria-hidden="true"
          />
          <dt className="font-medium">Workflow restrictions:</dt>
          <dd className="ml-1">{workflowRestrictionLabel}</dd>
        </div>

        {value.restricted_to_workflows && value.selected_workflows && (
          <div className="col-span-1 sm:col-span-2">
            <dt className="font-medium">Selected workflows:</dt>
            <dd className="mt-1 flex flex-wrap gap-1">
              {value.selected_workflows.map((wf, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full text-xs truncate"
                >
                  {wf}
                </span>
              ))}
            </dd>
          </div>
        )}

        {value.workflow_restrictions_read_only && (
          <div className="flex items-center col-span-1 sm:col-span-2">
            <LucideReact.Lock
              size={16}
              className="text-gray-400 mr-1"
              aria-hidden="true"
            />
            <dt className="font-medium">Read-only:</dt>
            <dd className="ml-1">Workflow restrictions read-only</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
