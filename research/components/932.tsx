import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * The public key used for setting user Codespaces' Secrets.
     *
     * @title CodespacesUserPublicKey
    */
    export type codespaces_user_public_key = {
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
export type AutoViewInput = AutoViewInputSubTypes.codespaces_user_public_key;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Split the Base64 key into 64-character segments for improved readability.
  const segmentedKey: string[] = value.key.match(/.{1,64}/g) ?? [value.key];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    A simple card layout displaying the Key ID and the Public Key in a scrollable code block.
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Codespaces User Public Key
      </h2>
      <div className="mb-4">
        <span className="text-sm font-medium text-gray-600">Key ID:</span>
        <p className="mt-1 text-sm text-gray-900 break-all">{value.key_id}</p>
      </div>
      <div>
        <span className="text-sm font-medium text-gray-600">Public Key:</span>
        <pre className="mt-1 p-3 bg-gray-100 text-xs font-mono text-gray-800 rounded border border-gray-200 overflow-x-auto whitespace-pre-wrap">
          {segmentedKey.join("\n")}
        </pre>
      </div>
    </div>
  );
}
