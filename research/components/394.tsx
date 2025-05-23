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



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derive display values
  const visibilityLabel =
    value.visibility.charAt(0).toUpperCase() + value.visibility.slice(1);
  const selectedCount = value.selected_workflows?.length ?? 0;
  const showWorkflows = value.restricted_to_workflows && selectedCount > 0;

  // 2. Compose the visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm w-full max-w-md">
      {/* Header: Name and default indicator */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.name}
        </h2>
        {value.default && (
          <span
            className="flex items-center text-green-600"
            title="Default runner group"
          >
            <LucideReact.CheckCircle size={18} />
          </span>
        )}
      </div>

      {/* Visibility */}
      <div className="mt-2 flex items-center text-gray-500 text-sm gap-1">
        <LucideReact.Tag size={16} />
        <span>{visibilityLabel}</span>
      </div>

      {/* Status badges */}
      <div className="mt-3 flex flex-wrap gap-2">
        {value.inherited && (
          <span className="inline-flex items-center bg-blue-50 text-blue-600 text-xs font-medium px-2 py-0.5 rounded">
            <LucideReact.ArrowUpRight size={14} className="mr-1" />
            Inherited
          </span>
        )}
        {value.allows_public_repositories && (
          <span className="inline-flex items-center bg-green-50 text-green-600 text-xs font-medium px-2 py-0.5 rounded">
            <LucideReact.Globe size={14} className="mr-1" />
            Public repos
          </span>
        )}
        {value.workflow_restrictions_read_only && (
          <span className="inline-flex items-center bg-yellow-50 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">
            <LucideReact.Lock size={14} className="mr-1" />
            Workflows read-only
          </span>
        )}
        {value.restricted_to_workflows && (
          <span className="inline-flex items-center bg-indigo-50 text-indigo-600 text-xs font-medium px-2 py-0.5 rounded">
            <LucideReact.Tag size={14} className="mr-1" />
            {selectedCount} workflows
          </span>
        )}
      </div>

      {/* List of selected workflows when restricted */}
      {showWorkflows && (
        <ul className="mt-3 text-sm text-gray-700 list-disc list-inside line-clamp-3">
          {value.selected_workflows!.map((wf, idx) => (
            <li key={idx}>{wf}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
