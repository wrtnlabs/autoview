import React from "react";
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
  // Mask the Base64 key for a concise summary (first 8 and last 8 characters)
  const maskedKey = `${value.key.slice(0, 8)}…${value.key.slice(-8)}`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Dependabot Public Key</h2>

      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-600">Key ID</h3>
        <p className="text-sm text-gray-900 break-all">{value.key_id}</p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-600">Key (Preview)</h3>
        <p className="text-sm text-gray-900 mb-2 font-mono">{maskedKey}</p>
        <div className="bg-gray-50 border border-gray-200 rounded-md p-2 overflow-x-auto">
          <pre className="text-sm font-mono text-gray-800 whitespace-pre-wrap">
            {value.key}
          </pre>
        </div>
      </div>
    </div>
  );
}
