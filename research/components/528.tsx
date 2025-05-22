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
  // 1. Derived constants for display
  const computeServiceMap: { none: string; actions: string; codespaces: string } = {
    none: 'None',
    actions: 'GitHub Actions',
    codespaces: 'GitHub Codespaces',
  };
  const serviceLabel = computeServiceMap[value.compute_service ?? 'none'];
  const settingsCount = value.network_settings_ids?.length ?? 0;
  const createdOnFormatted = value.created_on
    ? new Date(value.created_on).toLocaleString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Unknown';

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm w-full mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 truncate">{value.name}</h2>
      <dl className="mt-4 space-y-2">
        <div className="flex justify-between">
          <dt className="text-sm font-medium text-gray-500">Compute Service</dt>
          <dd className="text-sm text-gray-900">{serviceLabel}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-sm font-medium text-gray-500">Network Settings</dt>
          <dd className="text-sm text-gray-900">{settingsCount}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-sm font-medium text-gray-500">Created On</dt>
          <dd className="text-sm text-gray-900 whitespace-nowrap">{createdOnFormatted}</dd>
        </div>
      </dl>
    </div>
  );
}
