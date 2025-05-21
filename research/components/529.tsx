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
  const formattedDate = value.created_on
    ? new Date(value.created_on).toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Unknown';

  const settingsCount = value.network_settings_ids?.length ?? 0;

  const serviceMap: Record<NonNullable<AutoViewInput['compute_service']> | 'none', { label: string; classes: string }> = {
    none: { label: 'None', classes: 'bg-gray-100 text-gray-800' },
    actions: { label: 'GitHub Actions', classes: 'bg-green-100 text-green-800' },
    codespaces: { label: 'Codespaces', classes: 'bg-purple-100 text-purple-800' },
  };

  const serviceKey = value.compute_service ?? 'none';
  const { label: serviceLabel, classes: serviceClasses } = serviceMap[serviceKey];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm w-full">
      {/* Name */}
      <h2 className="text-lg font-semibold text-gray-900 truncate">{value.name}</h2>

      <div className="mt-2 flex flex-wrap items-center space-x-2">
        {/* Compute Service Badge */}
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${serviceClasses}`}>
          {serviceLabel}
        </span>

        {/* Network Settings Count */}
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
          {settingsCount} {settingsCount === 1 ? 'Setting' : 'Settings'}
        </span>
      </div>

      {/* Created On */}
      <p className="mt-3 text-sm text-gray-500">
        Created:{' '}
        <time dateTime={value.created_on ?? undefined} className="font-medium text-gray-700">
          {formattedDate}
        </time>
      </p>
    </div>
  );
}
