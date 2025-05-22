import { tags } from "typia";
import React from "react";
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
  const settingsCount = value.network_settings_ids?.length ?? 0;

  const computeServiceMap: Record<string, { label: string; style: string }> = {
    none: { label: "None", style: "bg-gray-200 text-gray-800" },
    actions: { label: "Actions", style: "bg-blue-100 text-blue-800" },
    codespaces: { label: "Codespaces", style: "bg-purple-100 text-purple-800" },
  };
  const computeKey = value.compute_service ?? "none";
  const computeInfo = computeServiceMap[computeKey] || computeServiceMap.none;

  const formattedDate = value.created_on
    ? new Date(value.created_on).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "—";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.name}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">Created On</span>
          <span>{formattedDate}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">Compute Service</span>
          <span
            className={`inline-block px-2 py-1 text-xs font-semibold rounded ${computeInfo.style}`}
          >
            {computeInfo.label}
          </span>
        </div>
        <div className="flex flex-col sm:col-span-2">
          <span className="font-medium text-gray-800">Network Settings</span>
          <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-800">
            {settingsCount} {settingsCount === 1 ? "setting" : "settings"}
          </span>
        </div>
      </div>
    </div>
  );
}
