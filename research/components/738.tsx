import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput =
  AutoViewInputSubTypes.IApiReposEnvironmentsDeploymentProtectionRulesApps.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const apps =
    value.available_custom_deployment_protection_rule_integrations ?? [];
  const integrationCount = value.total_count ?? apps.length;
  const hasApps = apps.length > 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <div className="flex items-center text-gray-700">
        <LucideReact.ShieldCheck
          size={20}
          className="text-gray-500"
          aria-hidden="true"
        />
        <span className="ml-2 font-semibold">
          Custom Deployment Protections: {integrationCount}
        </span>
      </div>

      {hasApps ? (
        <ul className="mt-4 space-y-3">
          {apps.map((app) => (
            <li
              key={app.id}
              className="flex flex-col sm:flex-row sm:justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <LucideReact.Tag
                  size={16}
                  className="text-blue-500"
                  aria-hidden="true"
                />
                <span className="font-medium text-gray-800">{app.slug}</span>
              </div>
              <div className="mt-2 sm:mt-0 sm:ml-4 flex items-center text-sm text-gray-500 break-all">
                <LucideReact.Link size={16} aria-hidden="true" />
                <span className="ml-1">{app.integration_url}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 flex items-center text-gray-400">
          <LucideReact.AlertCircle size={20} aria-hidden="true" />
          <span className="ml-2">
            No custom deployment protection rule integrations available.
          </span>
        </div>
      )}
    </div>
  );
}
