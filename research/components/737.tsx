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
  //    Derive a human-readable app name from its slug.
  const appName = value.app.slug
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Display the app name, integration URL, rule ID, and enabled status.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {appName}
        </h3>
        <div className="flex items-center">
          {value.enabled ? (
            <LucideReact.CheckCircle
              size={16}
              className="text-green-500"
              aria-label="Enabled"
              role="img"
            />
          ) : (
            <LucideReact.XCircle
              size={16}
              className="text-red-500"
              aria-label="Disabled"
              role="img"
            />
          )}
        </div>
      </div>

      <div className="mt-3 space-y-2 text-sm text-gray-600">
        <div className="flex items-center truncate">
          <LucideReact.Link
            size={16}
            className="text-gray-400 mr-1 flex-shrink-0"
            aria-hidden="true"
          />
          <span className="truncate">{value.app.integration_url}</span>
        </div>
        <div>
          <span className="font-medium text-gray-800">Rule ID:</span>{" "}
          <span>{value.id}</span>
        </div>
      </div>
    </div>
  );
}
