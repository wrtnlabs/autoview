import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * The public key used for setting Dependabot Secrets.
     *
     * @title DependabotPublicKey
    */
    export interface dependabot_public_key {
        /**
         * The identifier for the key.
        */
        key_id: string;
        /**
         * The Base64 encoded public key.
        */
        key: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.dependabot_public_key;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { key_id, key } = value;
  // Truncate the public key for compact display; full key is available on hover (title attribute)
  const truncatedKey =
    key.length > 64 ? `${key.slice(0, 32)}…${key.slice(-32)}` : key;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-full p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <LucideReact.Key size={20} className="text-gray-500" />
        <h2 className="text-lg font-semibold text-gray-800">
          Dependabot Public Key
        </h2>
      </div>

      {/* Content Rows */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:gap-6">
        {/* Key ID */}
        <div className="flex items-center gap-2 mb-4 sm:mb-0">
          <LucideReact.Hash size={16} className="text-gray-400" />
          <span className="font-medium text-gray-700 break-all">
            {key_id}
          </span>
        </div>

        {/* Public Key Block */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <LucideReact.Code size={16} className="text-gray-400" />
            <span className="font-medium text-gray-700">Public Key</span>
          </div>
          <pre
            className="p-3 bg-gray-50 rounded overflow-x-auto text-sm font-mono text-gray-800"
            title={key}
          >
            {truncatedKey}
          </pre>
        </div>
      </div>
    </div>
  );
}
