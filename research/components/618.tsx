import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.workflow;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedCreatedAt = new Date(value.created_at).toLocaleString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );
  const formattedUpdatedAt = new Date(value.updated_at).toLocaleString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  const stateConfig: Record<
    AutoViewInput["state"],
    {
      icon: typeof LucideReact.CheckCircle;
      color: string;
      label: string;
    }
  > = {
    active: {
      icon: LucideReact.CheckCircle,
      color: "text-green-500",
      label: "Active",
    },
    deleted: {
      icon: LucideReact.XCircle,
      color: "text-red-500",
      label: "Deleted",
    },
    disabled_fork: {
      icon: LucideReact.AlertTriangle,
      color: "text-amber-500",
      label: "Disabled (Fork)",
    },
    disabled_inactivity: {
      icon: LucideReact.AlertTriangle,
      color: "text-amber-500",
      label: "Disabled (Inactivity)",
    },
    disabled_manually: {
      icon: LucideReact.AlertTriangle,
      color: "text-amber-500",
      label: "Disabled (Manual)",
    },
  };

  const {
    icon: StateIcon,
    color: stateColor,
    label: stateLabel,
  } = stateConfig[value.state];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header: badge, name, path, state */}
      <div className="flex items-center space-x-3">
        <img
          src={value.badge_url}
          alt={`${value.name} badge`}
          className="w-20 h-auto object-contain"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src =
              "https://placehold.co/80x20/e2e8f0/1e293b?text=Badge";
          }}
        />
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {value.name}
          </h2>
          <p className="text-sm text-gray-500 truncate">{value.path}</p>
        </div>
        <div className="flex items-center space-x-1">
          <StateIcon
            size={16}
            className={stateColor}
            strokeWidth={2}
            aria-label={stateLabel}
          />
          <span className={`text-sm font-medium ${stateColor}`}>
            {stateLabel}
          </span>
        </div>
      </div>

      {/* Timestamps */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Created:</span>
          <span className="ml-1 font-medium text-gray-700">
            {formattedCreatedAt}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Updated:</span>
          <span className="ml-1 font-medium text-gray-700">
            {formattedUpdatedAt}
          </span>
        </div>
      </div>

      {/* Link display */}
      <div className="mt-4 text-sm text-gray-500">
        <div className="flex items-center space-x-1 overflow-hidden">
          <LucideReact.Link size={16} className="text-gray-400 flex-shrink-0" />
          <span className="truncate">{value.html_url}</span>
        </div>
      </div>
    </div>
  );
}
