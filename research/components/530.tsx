import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A hosted compute network configuration.
   *
   * @title Hosted compute network configuration
   */
  export type network_configuration = {
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
  };
}
export type AutoViewInput = AutoViewInputSubTypes.network_configuration;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const serviceMap = {
    none: "None",
    actions: "GitHub Actions",
    codespaces: "GitHub Codespaces",
  } as const;
  const computeServiceLabel = serviceMap[value.compute_service ?? "none"];
  const networkSettingsCount = value.network_settings_ids?.length ?? 0;
  const formattedDate = value.created_on
    ? new Date(value.created_on).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Unknown";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-sm w-full">
      <h2 className="text-lg font-semibold text-gray-900 truncate">
        {value.name}
      </h2>
      <div className="mt-3 space-y-2 text-gray-700">
        <div className="flex items-center gap-2">
          <LucideReact.Cpu className="text-gray-500" size={16} />
          <span className="font-medium">Compute Service:</span>
          <span>{computeServiceLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.Settings className="text-gray-500" size={16} />
          <span className="font-medium">Network Settings:</span>
          <span>{networkSettingsCount}</span>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.Calendar className="text-gray-500" size={16} />
          <span className="font-medium">Created on:</span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
