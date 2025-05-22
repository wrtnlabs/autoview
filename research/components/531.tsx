import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

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

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Determine if a network configuration ID is provided.
  const hasConfig = Boolean(value.network_configuration_id);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  //    Display only the relevant fields: name, region, subnet, and optional network configuration ID.
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4 flex flex-col">
      {/* Resource title */}
      <div className="flex items-center mb-3">
        <LucideReact.Server
          size={20}
          className="text-blue-500 mr-2"
          aria-hidden="true"
        />
        <h2 className="text-xl font-semibold text-gray-900 truncate">
          {value.name}
        </h2>
      </div>
      {/* Key properties */}
      <div className="flex flex-col space-y-2 text-gray-700">
        <div className="flex items-center">
          <LucideReact.Globe
            size={16}
            className="text-gray-500 mr-2"
            aria-hidden="true"
          />
          <span className="truncate">{value.region}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Link
            size={16}
            className="text-gray-500 mr-2"
            aria-hidden="true"
          />
          <span className="truncate">{value.subnet_id}</span>
        </div>
        {hasConfig && (
          <div className="flex items-center">
            <LucideReact.GitBranch
              size={16}
              className="text-gray-500 mr-2"
              aria-hidden="true"
            />
            <span className="truncate">{value.network_configuration_id}</span>
          </div>
        )}
      </div>
    </div>
  );
}
