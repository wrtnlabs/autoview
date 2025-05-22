import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  /**
   * The public key used for setting Dependabot Secrets.
   *
   * @title DependabotPublicKey
   */
  export type dependabot_public_key = {
    /**
     * The identifier for the key.
     */
    key_id: string;
    /**
     * The Base64 encoded public key.
     */
    key: string;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.dependabot_public_key;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    For this simple schema, we directly use the provided fields.
  const { key_id, key } = value;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center mb-4">
        <LucideReact.Key size={20} className="text-blue-500 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">
          Dependabot Public Key
        </h2>
      </div>

      {/* Key ID */}
      <div className="flex items-center mb-3 text-sm text-gray-600">
        <LucideReact.Hash size={16} className="text-gray-400 mr-1" />
        <span className="font-medium">Key ID:</span>
        <span className="ml-1 truncate">{key_id}</span>
      </div>

      {/* Public Key */}
      <div>
        <div className="flex items-center text-sm font-medium text-gray-600 mb-1">
          <LucideReact.FileText size={16} className="text-gray-400 mr-1" />
          <span>Public Key:</span>
        </div>
        <pre className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 text-xs font-mono text-gray-700 overflow-x-auto">
          {key}
        </pre>
      </div>
    </div>
  );
}
