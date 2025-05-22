import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposEnvironmentsDeploymentProtectionRules.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Derive the list of rules and total count
  const rules = value.custom_deployment_protection_rules ?? [];
  const count = value.total_count ?? rules.length;

  // Helper to extract host from a URL string
  const formatHost = (url: string): string => {
    try {
      return new URL(url).host;
    } catch {
      return url;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full">
      <div className="mb-3">
        <h2 className="text-xl font-semibold text-gray-900">
          Deployment Protection Rules
        </h2>
        <p className="text-sm text-gray-500">
          {count} rule{count !== 1 ? 's' : ''}
        </p>
      </div>

      {rules.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No custom deployment protection rules configured.
        </p>
      ) : (
        <ul className="space-y-2">
          {rules.map((rule) => {
            const host = formatHost(rule.app.integration_url);
            return (
              <li
                key={rule.id}
                className="flex items-center justify-between bg-gray-50 rounded-md px-3 py-2"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-medium truncate">
                    {rule.app.slug}
                  </p>
                  <p className="text-gray-500 text-sm truncate">
                    {host}
                  </p>
                </div>
                <span
                  className={
                    `ml-3 px-2 py-1 text-xs font-semibold rounded-full ` +
                    (rule.enabled
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800')
                  }
                >
                  {rule.enabled ? 'Enabled' : 'Disabled'}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
