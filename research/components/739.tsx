import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.deployment_protection_rule;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { id, enabled, app } = value;
  const { slug, integration_url } = app;

  // Derive a human-readable rule name from the slug (e.g., "custom-rule-app" → "Custom Rule App")
  const ruleName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Remove protocol for a cleaner URL display
  const displayUrl = integration_url.replace(/^https?:\/\//, "");

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header: Rule Name and Status */}
      <div className="flex items-center justify-between mb-3">
        <h2
          className="text-lg font-semibold text-gray-800 truncate"
          title={ruleName}
        >
          {ruleName}
        </h2>
        <span role="img" aria-label={enabled ? "Enabled" : "Disabled"}>
          {enabled ? (
            <LucideReact.CheckCircle
              className="text-green-500"
              size={20}
              strokeWidth={1.5}
            />
          ) : (
            <LucideReact.XCircle
              className="text-red-500"
              size={20}
              strokeWidth={1.5}
            />
          )}
        </span>
      </div>

      {/* Rule ID */}
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <LucideReact.Hash
          className="text-gray-400"
          size={16}
          strokeWidth={1.5}
        />
        <span className="ml-1">Rule ID: {id}</span>
      </div>

      {/* Integration URL */}
      <div className="flex items-center text-sm text-gray-600">
        <LucideReact.Link
          className="text-gray-400"
          size={16}
          strokeWidth={1.5}
        />
        <span className="ml-1 truncate" title={integration_url}>
          {displayUrl}
        </span>
      </div>
    </div>
  );
}
