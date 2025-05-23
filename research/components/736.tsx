import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposEnvironmentsDeploymentProtectionRules {
        export interface GetResponse {
            /**
             * The number of enabled custom deployment protection rules for this environment
            */
            total_count?: number & tags.Type<"int32">;
            custom_deployment_protection_rules?: AutoViewInputSubTypes.deployment_protection_rule[];
        }
    }
    /**
     * Deployment protection rule
     *
     * @title Deployment protection rule
    */
    export interface deployment_protection_rule {
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
    }
    /**
     * A GitHub App that is providing a custom deployment protection rule.
     *
     * @title Custom deployment protection rule app
    */
    export interface custom_deployment_rule_app {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiReposEnvironmentsDeploymentProtectionRules.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const rules = value.custom_deployment_protection_rules ?? [];
  const totalCustom = rules.length;
  const displayedTotal = value.total_count ?? totalCustom;
  const enabledCount = rules.filter(rule => rule.enabled).length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <header className="flex items-center mb-3">
        <LucideReact.Shield className="text-gray-600 mr-2" size={20} />
        <h2 className="text-lg font-semibold text-gray-800">
          Deployment Protection Rules
        </h2>
      </header>

      <div className="text-sm text-gray-600 mb-4">
        <span>
          Total custom rules:&nbsp;
          <span className="font-medium text-gray-800">{displayedTotal}</span>
        </span>
        {totalCustom > 0 && (
          <span className="ml-3">
            Enabled:&nbsp;
            <span className="font-medium text-green-600">{enabledCount}</span>
          </span>
        )}
      </div>

      {totalCustom === 0 ? (
        <div className="flex flex-col items-center text-gray-400 py-6">
          <LucideReact.AlertCircle size={24} />
          <p className="mt-2 text-sm">No custom rules configured.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {rules.map(rule => (
            <li
              key={rule.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded"
            >
              <div className="flex items-center">
                {rule.enabled ? (
                  <LucideReact.CheckCircle
                    className="text-green-500 mr-2"
                    size={16}
                  />
                ) : (
                  <LucideReact.XCircle
                    className="text-red-500 mr-2"
                    size={16}
                  />
                )}
                <span className="text-gray-800 font-medium">
                  {rule.app.slug}
                </span>
              </div>
              <LucideReact.ChevronRight
                className="text-gray-300"
                size={16}
                strokeWidth={2}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
