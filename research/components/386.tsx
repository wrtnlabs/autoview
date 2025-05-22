import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Actions OIDC Subject customization
     *
     * @title Actions OIDC Subject customization
    */
    export type oidc_custom_sub = {
        /**
         * Array of unique strings. Each claim key can only contain alphanumeric characters and underscores.
        */
        include_claim_keys: string[];
    };
}
export type AutoViewInput = AutoViewInputSubTypes.oidc_custom_sub;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const claimKeys = value.include_claim_keys || [];
  const count = claimKeys.length;
  const headerLabel = "OIDC Custom Subject";
  const formattedCount = `${count} ${count === 1 ? "claim key" : "claim keys"}`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{headerLabel}</h3>
        <span className="text-sm font-medium text-gray-500">{formattedCount}</span>
      </div>

      {count > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {claimKeys.map((key, idx) => (
            <li
              key={idx}
              className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-md"
            >
              <span className="block max-w-xs truncate">{key}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No claim keys included.</p>
      )}
    </div>
  );
}
