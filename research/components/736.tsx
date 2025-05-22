import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiReposEnvironmentsDeploymentProtectionRules {
    export type GetResponse = {
      /**
       * The number of enabled custom deployment protection rules for this environment
       */
      total_count?: number & tags.Type<"int32">;
      custom_deployment_protection_rules?: AutoViewInputSubTypes.deployment_protection_rule[];
    };
  }
  /**
   * Deployment protection rule
   *
   * @title Deployment protection rule
   */
  export type deployment_protection_rule = {
    /**
     * The unique identifier for the deployment protection rule.
     */
    id: number & tags.Type<"int32">;
    /**
     * The node ID for the deployment protection rule.
     */
    node_id: string;
    /**
     * Whether the deployment protection rule is enabled for the environment.
     */
    enabled: boolean;
    app: AutoViewInputSubTypes.custom_deployment_rule_app;
  };
  /**
   * A GitHub App that is providing a custom deployment protection rule.
   *
   * @title Custom deployment protection rule app
   */
  export type custom_deployment_rule_app = {
    /**
     * The unique identifier of the deployment protection rule integration.
     */
    id: number & tags.Type<"int32">;
    /**
     * The slugified name of the deployment protection rule integration.
     */
    slug: string;
    /**
     * The URL for the endpoint to get details about the app.
     */
    integration_url: string;
    /**
     * The node ID for the deployment protection rule integration.
     */
    node_id: string;
  };
}
export type AutoViewInput =
  AutoViewInputSubTypes.IApiReposEnvironmentsDeploymentProtectionRules.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const rules = value.custom_deployment_protection_rules ?? [];
  const totalRules = rules.length;
  const enabledCount =
    typeof value.total_count === "number"
      ? value.total_count
      : rules.filter((r) => r.enabled).length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <LucideReact.ShieldCheck
            className="mr-2 text-blue-500"
            size={20}
            aria-hidden="true"
          />
          Deployment Protection Rules
        </h2>
        <div className="text-sm text-gray-600">
          <span className="font-medium text-gray-800">{enabledCount}</span> of{" "}
          {totalRules} enabled
        </div>
      </div>

      {/* Rules List or Empty State */}
      {totalRules > 0 ? (
        <ul className="space-y-2">
          {rules.map((rule) => (
            <li
              key={rule.id}
              className="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <div className="flex items-center space-x-2">
                {rule.enabled ? (
                  <LucideReact.CheckCircle
                    className="text-green-500"
                    size={16}
                    aria-hidden="true"
                  />
                ) : (
                  <LucideReact.XCircle
                    className="text-red-500"
                    size={16}
                    aria-hidden="true"
                  />
                )}
                <span className="text-gray-800 truncate">{rule.app.slug}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center py-6 text-gray-400">
          <LucideReact.AlertCircle
            className="mb-2"
            size={32}
            aria-hidden="true"
          />
          <span className="text-sm">No deployment protection rules</span>
        </div>
      )}
    </div>
  );
}
