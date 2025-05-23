import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Actions OIDC Subject customization
     *
     * @title Actions OIDC Subject customization
    */
    export interface oidc_custom_sub {
        /**
         * Array of unique strings. Each claim key can only contain alphanumeric characters and underscores.
        */
        include_claim_keys: string[];
    }
}
export type AutoViewInput = AutoViewInputSubTypes.oidc_custom_sub;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    - Sort claim keys alphabetically for consistent display
  //    - Count total claim keys
  const keys: string[] = Array.isArray(value.include_claim_keys)
    ? [...value.include_claim_keys].sort((a, b) => a.localeCompare(b))
    : [];
  const count = keys.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    - Display a header with an icon and the total count of keys
  //    - Render badges for each claim key, or a placeholder if none exist
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.Tag
          className="text-blue-500 mr-2 flex-shrink-0"
          size={20}
          aria-hidden="true"
        />
        <h2 className="text-lg font-semibold text-gray-900">
          Included Claim Keys
          <span className="ml-1 text-gray-500">({count})</span>
        </h2>
      </div>
      {count > 0 ? (
        <div className="flex flex-wrap gap-2">
          {keys.map((key) => (
            <span
              key={key}
              className="inline-block bg-blue-50 text-blue-700 text-sm font-medium px-2.5 py-1 rounded"
            >
              {key}
            </span>
          ))}
        </div>
      ) : (
        <div className="flex items-center text-gray-500">
          <LucideReact.AlertCircle
            className="mr-2 flex-shrink-0"
            size={20}
            aria-hidden="true"
          />
          <span>No claim keys included</span>
        </div>
      )}
    </div>
  );
}
