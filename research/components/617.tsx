import { tags } from "typia";
import React from "react";
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
        state: "active" | "deleted" | "disabled_fork" | "disabled_inactivity" | "disabled_manually";
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        url: string;
        html_url: string;
        badge_url: string;
        deleted_at?: string & tags.Format<"date-time">;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.IApiReposActionsWorkflows.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalWorkflows = value.total_count;
  const stateCounts = value.workflows.reduce((acc: Record<AutoViewInputSubTypes.workflow["state"], number>, w) => {
    acc[w.state] = (acc[w.state] || 0) + 1;
    return acc;
  }, {} as Record<AutoViewInputSubTypes.workflow["state"], number>);

  const formatDateTime = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

  const stateStyles: Record<AutoViewInputSubTypes.workflow["state"], string> = {
    active: "bg-green-100 text-green-800",
    deleted: "bg-red-100 text-red-800",
    disabled_fork: "bg-yellow-100 text-yellow-800",
    disabled_inactivity: "bg-yellow-100 text-yellow-800",
    disabled_manually: "bg-yellow-100 text-yellow-800",
  };

  const formatStateLabel = (s: AutoViewInputSubTypes.workflow["state"]) => {
    switch (s) {
      case "active":
        return "Active";
      case "deleted":
        return "Deleted";
      case "disabled_fork":
        return "Disabled (Fork)";
      case "disabled_inactivity":
        return "Disabled (Inactivity)";
      case "disabled_manually":
        return "Disabled (Manual)";
      default:
        return s;
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Workflows ({totalWorkflows.toLocaleString()})
      </h2>

      {/* Summary of states */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(stateCounts).map(([state, count]) => (
          <span
            key={state}
            className={`px-2 py-1 text-sm font-medium rounded ${stateStyles[state as AutoViewInputSubTypes.workflow["state"]]}`}
          >
            {formatStateLabel(state as AutoViewInputSubTypes.workflow["state"])}: {count}
          </span>
        ))}
      </div>

      {/* Workflow list */}
      <div className="space-y-4">
        {value.workflows.map((w) => (
          <div
            key={w.id}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-medium text-gray-900 truncate">{w.name}</h3>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded ${stateStyles[w.state]}`}
              >
                {formatStateLabel(w.state)}
              </span>
            </div>
            <p className="text-sm text-gray-500 truncate">{w.path}</p>
            <div className="mt-2 text-xs text-gray-600 flex flex-wrap gap-4">
              <time dateTime={w.created_at}>
                Created: {formatDateTime(w.created_at)}
              </time>
              <time dateTime={w.updated_at}>
                Updated: {formatDateTime(w.updated_at)}
              </time>
            </div>
            {w.deleted_at && (
              <p className="mt-2 text-xs text-red-600">
                Deleted: {formatDateTime(w.deleted_at)}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
