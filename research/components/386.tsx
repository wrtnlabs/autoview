import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

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
  const { include_claim_keys: claimKeys } = value;
  const count = claimKeys.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <div className="flex items-center">
        <LucideReact.Tag className="text-gray-600" size={20} />
        <h2 className="ml-2 text-lg font-semibold text-gray-800">
          Included Claim Keys
        </h2>
        <span className="ml-auto text-sm text-gray-500">{count}</span>
      </div>

      {count > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {claimKeys.map((key) => (
            <span
              key={key}
              className="px-2 py-1 bg-gray-100 text-sm text-gray-800 rounded-md truncate"
              title={key}
            >
              {key}
            </span>
          ))}
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center text-gray-400">
          <LucideReact.AlertCircle size={24} />
          <p className="mt-2 text-sm">No claim keys included</p>
        </div>
      )}
    </div>
  );
}
