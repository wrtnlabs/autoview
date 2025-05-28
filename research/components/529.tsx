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
  // 1. Data aggregation/transformation
  const settingsCount = value.network_settings_ids?.length ?? 0;
  const formattedDate = value.created_on
    ? new Date(value.created_on).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : 'Unknown';

  const serviceMap = {
    none: {
      label: 'No Hosted Service',
      icon: LucideReact.XCircle,
      color: 'text-gray-400',
    },
    actions: {
      label: 'GitHub Actions',
      icon: LucideReact.Activity,
      color: 'text-blue-500',
    },
    codespaces: {
      label: 'Codespaces',
      icon: LucideReact.Code,
      color: 'text-purple-500',
    },
  } as const;
  type ServiceKey = keyof typeof serviceMap;
  const serviceKey = (value.compute_service ?? 'none') as ServiceKey;
  const { label: serviceLabel, icon: ServiceIcon, color: serviceColor } =
    serviceMap[serviceKey];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full bg-white p-4 rounded-lg shadow-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 truncate">{value.name}</h2>
      <div className="mt-3 flex flex-col space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <ServiceIcon className={serviceColor} size={16} strokeWidth={2} />
          <span className="text-gray-700">{serviceLabel}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <LucideReact.List className="text-gray-500" size={16} strokeWidth={2} />
          <span className="text-gray-700">
            {settingsCount > 0
              ? `${settingsCount} setting${settingsCount > 1 ? 's' : ''}`
              : 'No settings'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <LucideReact.Calendar className="text-gray-500" size={16} strokeWidth={2} />
          <span className="text-gray-700">Created on {formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
