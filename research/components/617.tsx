import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposActionsWorkflows {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            workflows: AutoViewInputSubTypes.workflow[];
        }
    }
    /**
     * A GitHub Actions workflow
     *
     * @title Workflow
    */
    export interface workflow {
        id: number & tags.Type<"int32">;
        node_id: string;
        name: string;
        path: string;
        state: "active" | "deleted" | "disabled_fork" | "disabled_inactivity" | "disabled_manually";
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        url: string;
        html_url: string;
        badge_url: string;
        deleted_at?: string & tags.Format<"date-time">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiReposActionsWorkflows.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const { total_count, workflows } = value;

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

  const getStateIcon = (state: AutoViewInputSubTypes.workflow['state']): JSX.Element => {
    switch (state) {
      case "active":
        return <LucideReact.CheckCircle className="text-green-500" size={16} strokeWidth={2} />;
      case "deleted":
        return <LucideReact.Trash2 className="text-red-500" size={16} strokeWidth={2} />;
      case "disabled_fork":
        return <LucideReact.GitFork className="text-amber-500" size={16} strokeWidth={2} />;
      case "disabled_inactivity":
        return <LucideReact.Pause className="text-amber-500" size={16} strokeWidth={2} />;
      case "disabled_manually":
        return <LucideReact.XCircle className="text-amber-500" size={16} strokeWidth={2} />;
      default:
        return <LucideReact.HelpCircle className="text-gray-400" size={16} strokeWidth={2} />;
    }
  };

  if (workflows.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center">
        <LucideReact.AlertCircle className="text-gray-400 mb-2" size={24} strokeWidth={2} />
        <span className="text-gray-500">No workflows available</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4 text-gray-700">
        <LucideReact.List className="mr-2" size={20} strokeWidth={2} />
        <span className="font-semibold text-lg">Workflows ({total_count})</span>
      </div>
      <div className="divide-y divide-gray-200">
        {workflows.map((wf) => (
          <div key={wf.id} className="py-3 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <div className="flex items-center">
                {getStateIcon(wf.state)}
                <span className="ml-2 font-medium text-gray-900">{wf.name}</span>
              </div>
              <div className="text-sm text-gray-500 truncate">{wf.path}</div>
            </div>
            <div className="mt-2 md:mt-0 flex items-center text-sm text-gray-500 space-x-4">
              <div className="flex items-center">
                <LucideReact.Calendar className="mr-1" size={16} strokeWidth={2} />
                <span>{formatDate(wf.created_at)}</span>
              </div>
              <div className="flex items-center">
                <LucideReact.Clock className="mr-1" size={16} strokeWidth={2} />
                <span>{formatDate(wf.updated_at)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
