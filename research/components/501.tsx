import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsPrivateRegistriesPublicKey {
        export interface GetResponse {
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
}
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsPrivateRegistriesPublicKey.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { key_id, key } = value;
  const chunkSize = 64;
  // Format the base64 key into 64-character lines for readability
  const formattedKey =
    key.match(new RegExp(`.{1,${chunkSize}}`, 'g'))?.join('\n') ?? key;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-3">
        <LucideReact.Key size={20} className="text-gray-500 mr-2" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-gray-800">Public Key</h2>
      </div>
      <div className="flex items-center mb-2 text-gray-600">
        <LucideReact.Hash size={16} className="mr-1" aria-hidden="true" />
        <span className="text-sm font-medium truncate">{key_id}</span>
      </div>
      <pre
        className="bg-gray-100 p-3 rounded text-sm font-mono text-gray-700 overflow-x-auto max-h-40"
        aria-label="Base64 encoded public key"
      >
        {formattedKey}
      </pre>
    </div>
  );
}
