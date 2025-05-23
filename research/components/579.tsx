import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Actions OIDC subject customization for a repository
     *
     * @title Actions OIDC subject customization for a repository
    */
    export interface oidc_custom_sub_repo {
        /**
         * Whether to use the default template or not. If `true`, the `include_claim_keys` field is ignored.
        */
        use_default: boolean;
        /**
         * Array of unique strings. Each claim key can only contain alphanumeric characters and underscores.
        */
        include_claim_keys?: string[];
    }
}
export type AutoViewInput = AutoViewInputSubTypes.oidc_custom_sub_repo;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const usesDefault = value.use_default;
  const keys = value.include_claim_keys ?? [];
  const hasCustomKeys = !usesDefault && keys.length > 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <LucideReact.Shield className="text-blue-500" size={20} aria-hidden="true" />
        <h2 className="text-lg font-semibold text-gray-900">
          OIDC Subject Customization
        </h2>
      </div>

      {/* Default usage indicator */}
      <div className="flex items-center mb-2">
        <span className="font-medium text-gray-700">Use Default Template:</span>
        {usesDefault ? (
          <LucideReact.CheckCircle
            className="ml-2 text-green-500"
            size={16}
            aria-label="Yes"
          />
        ) : (
          <LucideReact.XCircle
            className="ml-2 text-red-500"
            size={16}
            aria-label="No"
          />
        )}
      </div>

      {/* Conditional details */}
      {usesDefault ? (
        <p className="text-sm text-gray-500">
          Default template is in use. Any custom claim keys are ignored.
        </p>
      ) : hasCustomKeys ? (
        <div className="mt-2">
          <span className="font-medium text-gray-700">Included Claim Keys:</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {keys.map((key) => (
              <span
                key={key}
                className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-sm"
              >
                {key}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <LucideReact.AlertTriangle
            className="mr-1 text-amber-500"
            size={16}
            aria-hidden="true"
          />
          <span>No custom claim keys specified.</span>
        </div>
      )}
    </div>
  );
}
