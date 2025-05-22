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
  // No complex transformations needed for dependabot_public_key; destructure for clarity.
  const { key_id, key } = value;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-full p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Key ID Section */}
      <div className="flex items-center text-gray-700 mb-1">
        <LucideReact.Key size={18} className="mr-2 text-indigo-500" />
        <span className="font-medium">Key ID</span>
      </div>
      <div className="text-gray-800 mb-4 truncate">{key_id}</div>

      {/* Public Key Section */}
      <div className="flex items-center text-gray-700 mb-1">
        <LucideReact.Code size={18} className="mr-2 text-gray-500" />
        <span className="font-medium">Public Key</span>
      </div>
      <pre
        className="bg-gray-50 text-sm font-mono text-gray-800 p-3 rounded overflow-x-auto"
        aria-label="Dependabot public key"
      >
        {key}
      </pre>
    </div>
  );
}
