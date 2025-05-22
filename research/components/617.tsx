import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiReposActionsWorkflows {
    export type GetResponse = {
      total_count: number & tags.Type<"int32">;
      workflows: AutoViewInputSubTypes.workflow[];
    };
  }
  /**
   * A GitHub Actions workflow
   *
   * @title Workflow
   */
  export type workflow = {
    id: number & tags.Type<"int32">;
    node_id: string;
    name: string;
    path: string;
    state:
      | "active"
      | "deleted"
      | "disabled_fork"
      | "disabled_inactivity"
      | "disabled_manually";
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
    url: string;
    html_url: string;
    badge_url: string;
    deleted_at?: string & tags.Format<"date-time">;
  };
}
export type AutoViewInput =
  AutoViewInputSubTypes.IApiReposActionsWorkflows.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation functions and derived constants
  const formatDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  function getStateIcon(state: AutoViewInputSubTypes.workflow["state"]): {
    icon: JSX.Element;
    label: string;
  } {
    switch (state) {
      case "active":
        return {
          icon: (
            <LucideReact.CheckCircle size={16} className="text-green-500" />
          ),
          label: "Active",
        };
      case "deleted":
        return {
          icon: <LucideReact.XCircle size={16} className="text-red-500" />,
          label: "Deleted",
        };
      case "disabled_fork":
        return {
          icon: (
            <LucideReact.AlertTriangle size={16} className="text-yellow-500" />
          ),
          label: "Disabled (Fork)",
        };
      case "disabled_inactivity":
        return {
          icon: (
            <LucideReact.AlertTriangle size={16} className="text-yellow-500" />
          ),
          label: "Disabled (Inactivity)",
        };
      case "disabled_manually":
        return {
          icon: (
            <LucideReact.AlertTriangle size={16} className="text-yellow-500" />
          ),
          label: "Disabled (Manual)",
        };
      default:
        return {
          icon: <LucideReact.HelpCircle size={16} className="text-gray-500" />,
          label: state,
        };
    }
  }

  const { total_count, workflows } = value;

  // 2. Compose the visual structure using JSX and Tailwind CSS
  if (workflows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-2 text-lg">No workflows found</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      {/* Header */}
      <div className="flex items-center text-gray-700">
        <LucideReact.List size={20} className="mr-2" />
        <span className="font-semibold text-lg">{total_count} Workflows</span>
      </div>

      {/* Workflow List */}
      <div className="space-y-4">
        {workflows.map((wf) => {
          const { icon, label } = getStateIcon(wf.state);
          return (
            <div
              key={wf.id}
              className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center"
            >
              <div className="flex-1">
                {/* Name and State */}
                <div className="flex items-center mb-1">
                  {icon}
                  <span className="ml-2 text-lg font-medium text-gray-800 truncate">
                    {wf.name}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mb-2">{label}</div>

                {/* Path */}
                <div className="text-sm text-gray-500 truncate">{wf.path}</div>

                {/* Timestamps */}
                <div className="flex flex-wrap items-center mt-3 space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <LucideReact.Calendar size={16} className="mr-1" />
                    <span>Created: {formatDate(wf.created_at)}</span>
                  </div>
                  <div className="flex items-center">
                    <LucideReact.Edit2 size={16} className="mr-1" />
                    <span>Updated: {formatDate(wf.updated_at)}</span>
                  </div>
                </div>
              </div>

              {/* Badge and URL */}
              <div className="flex flex-col items-end mt-4 sm:mt-0 sm:ml-6 space-y-2">
                {wf.badge_url && (
                  <img
                    src={wf.badge_url}
                    alt={`${wf.name} badge`}
                    className="w-24 h-6 object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://placehold.co/100x20/e2e8f0/1e293b?text=Badge";
                    }}
                  />
                )}
                <div className="flex items-center text-sm text-blue-500 truncate max-w-xs">
                  <LucideReact.Link2 size={16} className="mr-1" />
                  <span className="truncate">{wf.html_url}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
