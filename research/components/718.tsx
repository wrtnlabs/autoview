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
  const keyLength = value.key.length;
  const truncatedKey =
    value.key.length > 48
      ? `${value.key.slice(0, 24)}…${value.key.slice(-24)}`
      : value.key;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Dependabot Public Key
      </h2>
      <dl className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <dt className="text-sm font-medium text-gray-500 sm:w-1/3">
            Key ID
          </dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:flex-1 truncate">
            {value.key_id}
          </dd>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center">
          <dt className="text-sm font-medium text-gray-500 sm:w-1/3">
            Key Length
          </dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:flex-1">
            {keyLength} characters
          </dd>
        </div>
        <div className="flex flex-col">
          <dt className="text-sm font-medium text-gray-500">Public Key</dt>
          <dd className="mt-1">
            <code className="block w-full overflow-x-auto bg-gray-100 p-2 rounded text-xs font-mono whitespace-nowrap">
              {value.key}
            </code>
            {value.key.length > truncatedKey.length && (
              <p className="mt-1 text-xs text-gray-500">
                Preview: <span className="font-mono">{truncatedKey}</span>
              </p>
            )}
          </dd>
        </div>
      </dl>
    </div>
  );
}
