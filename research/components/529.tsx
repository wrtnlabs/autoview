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
  const computeServiceLabel: string = value.compute_service
    ? value.compute_service.charAt(0).toUpperCase() +
      value.compute_service.slice(1)
    : "None";
  const networkSettingsCount: number = value.network_settings_ids?.length ?? 0;
  const createdOnDisplay: string = value.created_on
    ? new Date(value.created_on).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Unknown";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  const containerClasses =
    "p-4 bg-white rounded-lg shadow-md text-gray-800 max-w-sm w-full mx-auto space-y-4";
  const rowClasses = "flex items-center text-sm";
  const iconClasses = "text-gray-500 mr-2 flex-shrink-0";

  // 3. Return the React element.
  return (
    <div className={containerClasses}>
      <div className="text-xl font-semibold truncate">{value.name}</div>

      <div className={rowClasses}>
        <LucideReact.Code size={16} className={iconClasses} />
        <span className="font-medium">Compute Service:</span>
        <span className="ml-1">{computeServiceLabel}</span>
      </div>

      <div className={rowClasses}>
        <LucideReact.Settings size={16} className={iconClasses} />
        <span className="font-medium">Network Settings:</span>
        <span className="ml-1">{networkSettingsCount}</span>
      </div>

      <div className={rowClasses}>
        <LucideReact.Calendar size={16} className={iconClasses} />
        <span className="font-medium">Created On:</span>
        <span className="ml-1">{createdOnDisplay}</span>
      </div>
    </div>
  );
}
