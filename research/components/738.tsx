import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposEnvironmentsDeploymentProtectionRulesApps {
        export type GetResponse = {
            /**
             * The total number of custom deployment protection rule integrations available for this environment.
            */
            total_count?: number & tags.Type<"int32">;
            available_custom_deployment_protection_rule_integrations?: AutoViewInputSubTypes.custom_deployment_rule_app[];
        };
    }
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposEnvironmentsDeploymentProtectionRulesApps.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalCount = value.total_count ?? value.available_custom_deployment_protection_rule_integrations?.length ?? 0;
  const apps = value.available_custom_deployment_protection_rule_integrations ?? [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Custom Deployment Protection Rule Apps
        </h2>
        <span className="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded">
          {totalCount}
        </span>
      </div>
      {apps.length > 0 ? (
        <ul className="space-y-3">
          {apps.map((app) => (
            <li
              key={app.id}
              className="flex flex-col p-3 bg-gray-50 border border-gray-200 rounded"
            >
              <span className="font-medium text-gray-900 truncate">
                {app.slug}
              </span>
              <span className="mt-1 text-xs text-blue-600 break-all">
                {app.integration_url}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No integrations available.</p>
      )}
    </div>
  );
}
