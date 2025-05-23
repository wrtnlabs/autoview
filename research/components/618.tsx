import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.workflow;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants
  const stateConfig: Record<AutoViewInput['state'], { label: string; icon: JSX.Element }> = {
    active: {
      label: 'Active',
      icon: <LucideReact.CheckCircle size={16} className="text-green-500" />
    },
    deleted: {
      label: 'Deleted',
      icon: <LucideReact.XCircle size={16} className="text-red-500" />
    },
    disabled_fork: {
      label: 'Disabled (Fork)',
      icon: <LucideReact.AlertTriangle size={16} className="text-yellow-500" />
    },
    disabled_inactivity: {
      label: 'Disabled (Inactivity)',
      icon: <LucideReact.AlertTriangle size={16} className="text-yellow-500" />
    },
    disabled_manually: {
      label: 'Disabled (Manual)',
      icon: <LucideReact.AlertTriangle size={16} className="text-yellow-500" />
    }
  };
  const { label: stateLabel, icon: stateIcon } = stateConfig[value.state];

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  const createdAt = new Date(value.created_at).toLocaleString(undefined, dateOptions);
  const updatedAt = new Date(value.updated_at).toLocaleString(undefined, dateOptions);
  const deletedAt = value.deleted_at
    ? new Date(value.deleted_at).toLocaleString(undefined, dateOptions)
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="max-w-md w-full bg-white p-4 rounded-lg shadow-md mx-auto">
      {/* Header: Name and Status Icon */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
        {stateIcon}
      </div>

      {/* Path */}
      <p className="mt-1 text-sm text-gray-500 break-all">
        <code>{value.path}</code>
      </p>

      {/* Status Label */}
      <div className="mt-3 flex items-center text-sm font-medium text-gray-700 gap-1">
        {stateIcon}
        <span>{stateLabel}</span>
      </div>

      {/* Timestamps */}
      <div className="mt-2 space-y-1 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Created: {createdAt}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Updated: {updatedAt}</span>
        </div>
        {deletedAt && (
          <div className="flex items-center gap-1">
            <LucideReact.XCircle size={16} className="text-red-400" />
            <span>Deleted: {deletedAt}</span>
          </div>
        )}
      </div>

      {/* URLs */}
      <div className="mt-3 flex flex-col space-y-1 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <LucideReact.Link size={16} className="text-gray-400" />
          <span className="truncate">{value.html_url}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Link size={16} className="text-gray-400" />
          <span className="truncate">{value.url}</span>
        </div>
      </div>

      {/* Badge Image */}
      <div className="mt-4">
        <img
          src={value.badge_url}
          alt={`${value.name} status badge`}
          className="h-6"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://placehold.co/80x20?text=Badge';
          }}
        />
      </div>
    </div>
  );
}
