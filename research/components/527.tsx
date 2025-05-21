import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsSettingsNetworkConfigurations.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalCount = value.total_count;
  const configurations = value.network_configurations;

  const serviceLabels: Record<string, string> = {
    none: "None",
    actions: "Actions",
    codespaces: "Codespaces",
  };

  const formatDate = (date: string | null): string =>
    date
      ? new Date(date).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "N/A";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Network Configurations ({totalCount})
      </h2>

      {configurations.length === 0 ? (
        <p className="text-gray-600">No network configurations available.</p>
      ) : (
        <ul className="space-y-4">
          {configurations.map((config) => {
            const created = formatDate(config.created_on);
            const service = config.compute_service
              ? serviceLabels[config.compute_service]
              : "N/A";
            const settingsCount = config.network_settings_ids?.length ?? 0;
            const settingsLabel =
              settingsCount > 0
                ? `${settingsCount} setting${settingsCount === 1 ? "" : "s"}`
                : "No settings";

            return (
              <li key={config.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="text-md font-medium text-gray-900 truncate">
                    {config.name}
                  </h3>
                  <span className="text-sm text-gray-500">{service}</span>
                </div>
                <div className="mt-2 flex text-sm text-gray-600 space-x-4">
                  <span>{settingsLabel}</span>
                  <span>{created}</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
