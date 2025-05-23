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
  // Shorten the key_id for compact display, but preserve full value in the title attribute.
  const shortKeyId =
    value.key_id.length > 16
      ? `${value.key_id.slice(0, 8)}...${value.key_id.slice(-8)}`
      : value.key_id;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-full">
      {/* Key ID Section */}
      <div className="flex items-center mb-3">
        <LucideReact.Key className="text-gray-500 mr-2" size={20} />
        <span className="text-gray-700 font-medium">Key ID:</span>
        <code
          className="ml-2 font-mono text-sm text-gray-800 truncate"
          title={value.key_id}
        >
          {shortKeyId}
        </code>
      </div>

      {/* Public Key Display */}
      <div>
        <div className="flex items-center mb-1">
          <LucideReact.Code className="text-gray-500 mr-2" size={20} />
          <span className="text-gray-700 font-medium">Public Key</span>
        </div>
        <pre className="bg-gray-100 p-3 rounded-lg overflow-x-auto text-sm font-mono text-gray-800">
          {value.key}
        </pre>
      </div>
    </div>
  );
}
