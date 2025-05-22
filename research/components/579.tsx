import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Actions OIDC subject customization for a repository
     *
     * @title Actions OIDC subject customization for a repository
    */
    export type oidc_custom_sub_repo = {
        /**
         * Whether to use the default template or not. If `true`, the `include_claim_keys` field is ignored.
        */
        use_default: boolean;
        /**
         * Array of unique strings. Each claim key can only contain alphanumeric characters and underscores.
        */
        include_claim_keys?: string[];
    };
}
export type AutoViewInput = AutoViewInputSubTypes.oidc_custom_sub_repo;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { use_default, include_claim_keys } = value;
  const templateType = use_default ? "Default OIDC Subject Template" : "Custom OIDC Subject Template";
  const badgeStyles = use_default
    ? "bg-green-100 text-green-800"
    : "bg-blue-100 text-blue-800";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full mx-auto p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">OIDC Subject Configuration</h3>
      <span
        className={`inline-block px-2 py-1 text-xs font-medium rounded ${badgeStyles}`}
      >
        {templateType}
      </span>

      {!use_default && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Included Claim Keys</h4>
          {include_claim_keys && include_claim_keys.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {include_claim_keys.map((key) => (
                <li
                  key={key}
                  className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded truncate"
                  title={key}
                >
                  {key}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No claim keys specified.</p>
          )}
        </div>
      )}
    </div>
  );
}
