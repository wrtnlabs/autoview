import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.deployment_protection_rule;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const statusText = value.enabled ? "Enabled" : "Disabled";
  const statusColor = value.enabled
    ? "bg-green-100 text-green-800"
    : "bg-red-100 text-red-800";
  // Convert slug to a human‐friendly title (e.g., "my-app" → "My App")
  const appName = value.app.slug
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:space-x-4">
      <div className="flex flex-col space-y-1">
        <h2 className="text-lg font-semibold text-gray-900">{appName}</h2>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-600">Integration URL:</span>
          <span className="mt-0.5 text-sm text-gray-500 truncate block sm:w-64">
            {value.app.integration_url}
          </span>
        </div>
      </div>
      <span
        className={`inline-flex items-center px-2 py-1 text-sm font-semibold rounded-full ${statusColor}`}
      >
        {statusText}
      </span>
    </div>
  );
}
