import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsSettingsNetworkConfigurations {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            network_configurations: AutoViewInputSubTypes.network_configuration[];
        }
    }
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsSettingsNetworkConfigurations.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation and derived constants
  const { total_count, network_configurations } = value;
  const serviceMeta: Record<"none" | "actions" | "codespaces", { label: string; icon: JSX.Element }> = {
    none: {
      label: "None",
      icon: <LucideReact.Slash className="text-gray-400" size={16} />
    },
    actions: {
      label: "Actions",
      icon: <LucideReact.Activity className="text-blue-500" size={16} />
    },
    codespaces: {
      label: "Codespaces",
      icon: <LucideReact.Code className="text-purple-500" size={16} />
    }
  };

  const formatDate = (iso: string | null): string => {
    if (!iso) return "Unknown";
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // 2. Compose the visual structure
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Network Configurations
        </h2>
        <div className="flex items-center text-sm text-gray-500">
          <LucideReact.Server size={16} className="mr-1" />
          <span>{total_count}</span>
        </div>
      </div>

      {network_configurations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <p className="mt-2">No configurations available</p>
        </div>
      ) : (
        <ul className="mt-4 space-y-4">
          {network_configurations.map((cfg) => {
            const meta = serviceMeta[cfg.compute_service ?? "none"];
            const settingsCount = cfg.network_settings_ids?.length ?? 0;
            return (
              <li
                key={cfg.id}
                className="flex flex-col md:flex-row md:justify-between p-4 border border-gray-200 rounded-lg hover:shadow transition-shadow"
              >
                <div className="min-w-0">
                  <h3 className="text-md font-medium text-gray-900 truncate">
                    {cfg.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1 space-x-1">
                    {meta.icon}
                    <span>{meta.label}</span>
                  </div>
                </div>
                <div className="mt-3 md:mt-0 flex items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <LucideReact.Calendar size={16} className="text-gray-400" />
                    <span className="ml-1">
                      {formatDate(cfg.created_on)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <LucideReact.List size={16} className="text-gray-400" />
                    <span className="ml-1">
                      {settingsCount} setting{settingsCount !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
