import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposEnvironmentsDeploymentProtectionRulesApps {
        export interface GetResponse {
            /**
             * The total number of custom deployment protection rule integrations available for this environment.
            */
            total_count?: number & tags.Type<"int32">;
            available_custom_deployment_protection_rule_integrations?: AutoViewInputSubTypes.custom_deployment_rule_app[];
        }
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposEnvironmentsDeploymentProtectionRulesApps.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalCount = value.total_count ?? 0;
  const integrations = value.available_custom_deployment_protection_rule_integrations ?? [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <LucideReact.Shield size={20} className="mr-2 text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-800">
            Custom Deployment Protection Rule Integrations
          </h2>
        </div>
        <span className="bg-gray-100 text-gray-600 text-sm font-medium px-2 py-0.5 rounded">
          {totalCount} total
        </span>
      </div>

      {integrations.length > 0 ? (
        <ul className="space-y-3">
          {integrations.map((app) => (
            <li
              key={app.id}
              className="flex flex-col space-y-1 p-3 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center text-gray-700">
                <LucideReact.Tag size={16} className="mr-2 text-gray-500" />
                <span className="font-medium truncate">{app.slug}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <LucideReact.Link size={16} className="mr-2" />
                <span className="truncate">{app.integration_url}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center text-gray-400 py-8">
          <LucideReact.AlertCircle size={24} className="mb-2" />
          <span className="text-sm">
            No custom deployment protection rule integrations available.
          </span>
        </div>
      )}
    </div>
  );
}
