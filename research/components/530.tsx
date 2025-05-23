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
  const formattedDate = value.created_on
    ? new Date(value.created_on).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'N/A';

  const computeServiceMap: Record<
    NonNullable<AutoViewInputSubTypes.network_configuration['compute_service']>,
    { label: string; icon: JSX.Element }
  > = {
    none: {
      label: 'None',
      icon: <LucideReact.XCircle className="text-gray-400" size={16} strokeWidth={1.5} />,
    },
    actions: {
      label: 'Actions',
      icon: <LucideReact.GitBranch className="text-blue-500" size={16} strokeWidth={1.5} />,
    },
    codespaces: {
      label: 'Codespaces',
      icon: <LucideReact.Code className="text-purple-500" size={16} strokeWidth={1.5} />,
    },
  };

  const serviceInfo = value.compute_service
    ? computeServiceMap[value.compute_service]
    : null;
  const settingsCount = value.network_settings_ids?.length ?? 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 truncate">{value.name}</h2>

      {serviceInfo && (
        <div className="flex items-center mt-3 text-gray-700">
          {serviceInfo.icon}
          <span className="ml-2 text-sm">
            Compute Service: {serviceInfo.label}
          </span>
        </div>
      )}

      {settingsCount > 0 && (
        <div className="flex items-center mt-3 text-gray-700">
          <LucideReact.ListChecks className="text-gray-500" size={16} strokeWidth={1.5} />
          <span className="ml-2 text-sm">Network Settings: {settingsCount}</span>
        </div>
      )}

      <div className="flex items-center mt-3 text-gray-700">
        <LucideReact.Calendar className="text-gray-400" size={16} strokeWidth={1.5} />
        <span className="ml-2 text-sm">Created On: {formattedDate}</span>
      </div>
    </div>
  );
}
