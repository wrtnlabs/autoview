import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * A hosted compute network settings resource.
     *
     * @title Hosted compute network settings resource
    */
    export type network_settings = {
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
    };
}
export type AutoViewInput = AutoViewInputSubTypes.network_settings;



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Determine assignment status based on presence of network_configuration_id
  const isAssigned = Boolean(value.network_configuration_id);
  const statusText = isAssigned ? 'Assigned' : 'Unassigned';
  const statusClasses = isAssigned
    ? 'bg-green-100 text-green-800'
    : 'bg-gray-100 text-gray-800';

  return (
    <div className="max-w-sm w-full p-4 bg-white rounded-lg shadow-md">
      {/* Header: Name and Status */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.name}
        </h2>
        <span className={`px-2 py-1 text-sm font-medium rounded ${statusClasses}`}>
          {statusText}
        </span>
      </div>

      {/* Details */}
      <dl className="space-y-2">
        <div className="flex">
          <dt className="w-28 font-medium text-gray-500">Region:</dt>
          <dd className="text-gray-900">{value.region}</dd>
        </div>

        <div className="flex">
          <dt className="w-28 font-medium text-gray-500">Subnet ID:</dt>
          <dd className="text-gray-900 truncate">{value.subnet_id}</dd>
        </div>

        {value.network_configuration_id && (
          <div className="flex">
            <dt className="w-28 font-medium text-gray-500">Config ID:</dt>
            <dd className="text-gray-900 truncate">
              {value.network_configuration_id}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
