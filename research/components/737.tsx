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
  const statusClasses = value.enabled
    ? "bg-green-100 text-green-800"
    : "bg-red-100 text-red-800";

  // Truncate the integration URL for mobile-friendly display
  const truncatedUrl =
    value.app.integration_url.length > 40
      ? `${value.app.integration_url.slice(0, 37)}...`
      : value.app.integration_url;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Deployment Protection Rule
      </h2>
      <div className="flex items-center mb-4">
        <span
          className={`inline-flex items-center px-2 py-1 text-sm font-medium rounded ${statusClasses}`}
        >
          {statusText}
        </span>
      </div>
      <dl className="space-y-3">
        <div>
          <dt className="text-sm font-medium text-gray-500">Application</dt>
          <dd className="mt-1 text-sm text-gray-700 truncate">
            {value.app.slug}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">
            Integration Endpoint
          </dt>
          <dd className="mt-1 text-sm text-blue-600 break-all">
            {truncatedUrl}
          </dd>
        </div>
      </dl>
    </div>
  );
}
