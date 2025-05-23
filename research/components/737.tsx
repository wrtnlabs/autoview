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
  const { enabled, app } = value;
  const statusText = enabled ? "Enabled" : "Disabled";
  const statusClasses = enabled
    ? "text-green-800 bg-green-100"
    : "text-red-800 bg-red-100";
  const displayName = app.slug
    .split(/[-_]/g)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {displayName}
        </h2>
        <span
          className={`px-2 py-0.5 rounded-full text-sm font-medium ${statusClasses}`}
          aria-label={`Rule is ${statusText.toLowerCase()}`}
        >
          {statusText}
        </span>
      </div>
      <div className="flex items-center text-sm text-gray-600 gap-1 truncate">
        <LucideReact.Link size={16} className="text-gray-400 flex-shrink-0" />
        <span className="truncate">{app.integration_url}</span>
      </div>
    </div>
  );
}
