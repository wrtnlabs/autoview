import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiOrgsSettingsNetworkConfigurations {
    export type GetResponse = {
      total_count: number & tags.Type<"int32">;
      network_configurations: AutoViewInputSubTypes.network_configuration[];
    };
  }
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
export type AutoViewInput =
  AutoViewInputSubTypes.IApiOrgsSettingsNetworkConfigurations.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const sortedConfigs = [...value.network_configurations].sort((a, b) => {
    const ta = a.created_on ? new Date(a.created_on).getTime() : 0;
    const tb = b.created_on ? new Date(b.created_on).getTime() : 0;
    return tb - ta;
  });

  const formatDate = (iso: string | null): string =>
    iso
      ? new Date(iso).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "N/A";

  const mapComputeService = (svc?: string): string => {
    switch (svc) {
      case "actions":
        return "Actions";
      case "codespaces":
        return "Codespaces";
      case "none":
        return "None";
      default:
        return "Not specified";
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center mb-4">
        <LucideReact.Database size={20} className="text-gray-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">
          Network Configurations ({value.total_count})
        </h2>
      </div>

      {sortedConfigs.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedConfigs.map((cfg) => {
            const settingsCount = cfg.network_settings_ids?.length ?? 0;
            const createdOn = formatDate(cfg.created_on);
            const computeLabel = mapComputeService(cfg.compute_service);
            return (
              <div
                key={cfg.id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
              >
                <h3 className="text-md font-medium text-gray-800 truncate">
                  {cfg.name}
                </h3>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <div className="flex items-center">
                    <LucideReact.Cpu size={16} className="mr-1 text-gray-500" />
                    <span>Compute: {computeLabel}</span>
                  </div>
                  <div className="flex items-center">
                    <LucideReact.List
                      size={16}
                      className="mr-1 text-gray-500"
                    />
                    <span>Settings: {settingsCount}</span>
                  </div>
                  <div className="flex items-center">
                    <LucideReact.Calendar
                      size={16}
                      className="mr-1 text-gray-500"
                    />
                    <span>Created: {createdOn}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center text-gray-500">
          <LucideReact.AlertCircle size={24} className="mr-2" />
          <span>No network configurations available</span>
        </div>
      )}
    </div>
  );
}
