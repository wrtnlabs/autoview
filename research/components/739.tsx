import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  const statusColor = value.enabled ? "text-green-500" : "text-red-500";
  const StatusIcon = value.enabled
    ? LucideReact.CheckCircle
    : LucideReact.XCircle;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      {/* Status */}
      <div className="flex items-center space-x-2 mb-4">
        <span className="font-semibold text-gray-700">Status:</span>
        <StatusIcon className={statusColor} size={16} aria-label={statusText} />
        <span className="text-sm text-gray-800">{statusText}</span>
      </div>

      {/* App Slug */}
      <div className="flex items-center space-x-2 mb-3">
        <LucideReact.Tag
          className="text-gray-500"
          size={16}
          aria-label="App slug"
        />
        <span className="text-sm font-medium text-gray-800 truncate">
          {value.app.slug}
        </span>
      </div>

      {/* Integration URL */}
      <div className="flex items-start space-x-2">
        <LucideReact.Link
          className="text-gray-400 mt-0.5"
          size={16}
          aria-label="Integration URL"
        />
        <span className="text-sm text-blue-600 break-all">
          {value.app.integration_url}
        </span>
      </div>
    </div>
  );
}
