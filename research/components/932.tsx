import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * The public key used for setting user Codespaces' Secrets.
     *
     * @title CodespacesUserPublicKey
    */
    export interface codespaces_user_public_key {
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
export type AutoViewInput = AutoViewInputSubTypes.codespaces_user_public_key;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Destructure the input value for clarity
  const { key_id, key } = value;

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Key ID Section */}
      <div className="flex items-center mb-2 text-gray-700">
        <LucideReact.Key size={16} className="mr-2 text-gray-500" />
        <span className="font-medium">Key ID:</span>
        <span className="ml-1 font-mono break-all">{key_id}</span>
      </div>

      {/* Public Key Section */}
      <div className="flex items-center mb-1 text-gray-700">
        <LucideReact.Code size={16} className="mr-2 text-gray-500" />
        <span className="font-medium">Public Key</span>
      </div>
      <pre className="font-mono text-xs bg-gray-100 p-2 rounded break-all overflow-x-auto">
        {key}
      </pre>
    </div>
  );
}
