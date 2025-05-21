import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsPrivateRegistriesPublicKey.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { key_id, key } = value;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <section className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Public Key Details</h2>
      </header>

      <dl className="space-y-4">
        <div>
          <dt className="text-sm font-medium text-gray-600">Key ID</dt>
          <dd className="mt-1 text-sm text-gray-800 break-all">{key_id}</dd>
        </div>

        <div>
          <dt className="text-sm font-medium text-gray-600">Key</dt>
          <dd className="mt-1">
            <div className="overflow-x-auto bg-gray-50 rounded-md p-3">
              <pre className="font-mono text-xs text-gray-800 whitespace-pre-wrap break-all">
                {key}
              </pre>
            </div>
          </dd>
        </div>
      </dl>
    </section>
  );
}
