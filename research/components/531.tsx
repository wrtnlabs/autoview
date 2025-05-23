import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A hosted compute network settings resource.
     *
     * @title Hosted compute network settings resource
    */
    export interface network_settings {
        /**
         * The unique identifier of the network settings resource.
        */
        id: string;
        /**
         * The identifier of the network configuration that is using this settings resource.
        */
        network_configuration_id?: string;
        /**
         * The name of the network settings resource.
        */
        name: string;
        /**
         * The subnet this network settings resource is configured for.
        */
        subnet_id: string;
        /**
         * The location of the subnet this network settings resource is configured for.
        */
        region: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.network_settings;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const mask = (id: string): string =>
    id.length > 12 ? `${id.slice(0, 8)}…${id.slice(-4)}` : id;

  const formattedRegion = value.region
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

  const maskedSubnet = mask(value.subnet_id);
  const maskedConfigId = value.network_configuration_id
    ? mask(value.network_configuration_id)
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.Cloud
          className="text-indigo-500"
          size={20}
          aria-hidden="true"
        />
        <h2 className="ml-2 text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
      </div>
      <dl className="space-y-3 text-sm">
        <div className="flex items-center">
          <LucideReact.MapPin
            className="text-gray-400"
            size={16}
            aria-hidden="true"
          />
          <dt className="ml-2 font-medium text-gray-500">Region:</dt>
          <dd className="ml-1 text-gray-900">{formattedRegion}</dd>
        </div>
        <div className="flex items-center">
          <LucideReact.Hash
            className="text-gray-400"
            size={16}
            aria-hidden="true"
          />
          <dt className="ml-2 font-medium text-gray-500">Subnet ID:</dt>
          <dd
            className="ml-1 text-gray-900 truncate"
            title={value.subnet_id}
          >
            {maskedSubnet}
          </dd>
        </div>
        {maskedConfigId && (
          <div className="flex items-center">
            <LucideReact.Settings
              className="text-gray-400"
              size={16}
              aria-hidden="true"
            />
            <dt className="ml-2 font-medium text-gray-500">Config ID:</dt>
            <dd
              className="ml-1 text-gray-900 truncate"
              title={value.network_configuration_id!}
            >
              {maskedConfigId}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
