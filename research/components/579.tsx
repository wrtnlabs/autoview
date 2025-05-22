import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

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

export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define derived constants for clarity
  const useDefault = value.use_default;
  const claimKeys = value.include_claim_keys ?? [];

  // 2. Render the visual structure
  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center mb-4">
        <LucideReact.Settings className="text-gray-600 mr-2" size={20} />
        <h2 className="text-lg font-semibold text-gray-800">
          OIDC Subject Customization
        </h2>
      </div>

      {/* Status */}
      <div className="flex items-center mb-4">
        {useDefault ? (
          <LucideReact.CheckCircle className="text-green-500 mr-2" size={16} />
        ) : (
          <LucideReact.Code className="text-blue-500 mr-2" size={16} />
        )}
        <span className="text-sm text-gray-700">
          {useDefault ? "Default template enabled" : "Custom template enabled"}
        </span>
      </div>

      {/* Included Claim Keys */}
      {!useDefault && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Included Claim Keys
          </h3>
          {claimKeys.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {claimKeys.map((key) => (
                <li
                  key={key}
                  className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
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
