import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  export namespace IApiOrgsPrivateRegistriesPublicKey {
    export type GetResponse = {
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
}
export type AutoViewInput =
  AutoViewInputSubTypes.IApiOrgsPrivateRegistriesPublicKey.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Split the Base64 key into 64-character lines for readability.
  const formattedKey = value.key.match(/.{1,64}/g)?.join("\n") ?? value.key;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Display the key ID and the public key in a styled, read-only block.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Key ID */}
      <div className="flex items-center text-gray-700 text-sm">
        <LucideReact.Key size={16} className="text-gray-500 mr-2" />
        <span className="font-medium">Key ID:</span>
        <span className="ml-1 font-mono break-all">{value.key_id}</span>
      </div>

      {/* Public Key */}
      <div className="mt-4">
        <div className="flex items-center text-gray-700 text-sm mb-1">
          <LucideReact.Code size={16} className="text-gray-500 mr-2" />
          <span className="font-medium">Public Key:</span>
        </div>
        <pre className="bg-gray-100 text-gray-800 text-xs font-mono p-3 rounded overflow-auto max-h-48 whitespace-pre-wrap">
          {formattedKey}
        </pre>
      </div>
    </div>
  );
}
