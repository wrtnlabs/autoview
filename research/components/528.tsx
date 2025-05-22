import LucideReact from "lucide-react";
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
  const createdDate = value.created_on ? new Date(value.created_on) : null;
  const formattedDate = createdDate
    ? createdDate.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  const computeServiceKey = value.compute_service ?? "none";
  const serviceInfo: Record<string, { label: string; icon: JSX.Element }> = {
    none: {
      label: "None",
      icon: <LucideReact.XCircle className="text-gray-400" size={16} />,
    },
    actions: {
      label: "GitHub Actions",
      icon: <LucideReact.GitBranch className="text-blue-500" size={16} />,
    },
    codespaces: {
      label: "Codespaces",
      icon: <LucideReact.Code className="text-purple-500" size={16} />,
    },
  };
  const { label: serviceLabel, icon: serviceIcon } =
    serviceInfo[computeServiceKey] || serviceInfo.none;

  const settingsCount = value.network_settings_ids?.length ?? 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm sm:p-6">
      <div className="flex items-center mb-4">
        <LucideReact.Network className="text-gray-600" size={20} />
        <h2 className="ml-2 text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
      </div>
      <dl className="grid grid-cols-1 gap-3 text-sm text-gray-600">
        <div className="flex items-center">
          {serviceIcon}
          <span className="ml-2">
            Compute service:
            <span className="font-medium ml-1">{serviceLabel}</span>
          </span>
        </div>
        <div className="flex items-center">
          <LucideReact.Server className="text-gray-500" size={16} />
          <span className="ml-2">
            Network settings:
            <span className="font-medium ml-1">{settingsCount}</span>
          </span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar className="text-gray-500" size={16} />
          <span className="ml-2">
            Created on:
            <time className="font-medium ml-1">{formattedDate}</time>
          </span>
        </div>
      </dl>
    </div>
  );
}
