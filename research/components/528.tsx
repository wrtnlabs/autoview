import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A hosted compute network configuration.
     *
     * @title Hosted compute network configuration
    */
    export interface network_configuration {
        /**
         * The unique identifier of the network configuration.
        */
        id: string;
        /**
         * The name of the network configuration.
        */
        name: string;
        /**
         * The hosted compute service the network configuration supports.
        */
        compute_service?: "none" | "actions" | "codespaces";
        /**
         * The unique identifier of each network settings in the configuration.
        */
        network_settings_ids?: string[];
        /**
         * The time at which the network configuration was created, in ISO 8601 format.
        */
        created_on: (string & tags.Format<"date-time">) | null;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.network_configuration;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const settingsCount = value.network_settings_ids?.length ?? 0;
  const formattedDate =
    value.created_on !== null
      ? new Date(value.created_on).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "N/A";

  const serviceLabels: Record<NonNullable<AutoViewInput["compute_service"]> | "none", string> = {
    none: "None",
    actions: "Actions",
    codespaces: "Codespaces",
  };

  const serviceIcons: Record<NonNullable<AutoViewInput["compute_service"]> | "none", JSX.Element> = {
    none: (
      <LucideReact.XCircle
        size={16}
        className="text-gray-400"
        strokeWidth={1.5}
        aria-label="No service"
      />
    ),
    actions: (
      <LucideReact.GitBranch
        size={16}
        className="text-blue-500"
        strokeWidth={1.5}
        aria-label="GitHub Actions"
      />
    ),
    codespaces: (
      <LucideReact.Code
        size={16}
        className="text-purple-500"
        strokeWidth={1.5}
        aria-label="GitHub Codespaces"
      />
    ),
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm p-4 bg-white rounded-lg shadow-sm space-y-3 text-gray-700">
      {/* Configuration Name */}
      <h2 className="text-lg font-semibold text-gray-800 truncate">{value.name}</h2>

      {/* Compute Service & Settings Count */}
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-1">
          {serviceIcons[value.compute_service ?? "none"]}
          <span className="font-medium">{serviceLabels[value.compute_service ?? "none"]}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-600">
          <LucideReact.List size={16} strokeWidth={1.5} aria-label="Network settings" />
          <span>
            {settingsCount} setting{settingsCount !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Creation Date */}
      <div className="flex items-center gap-1 text-sm text-gray-500">
        <LucideReact.Calendar size={16} strokeWidth={1.5} aria-label="Created on" />
        <span>{formattedDate}</span>
      </div>
    </div>
  );
}
