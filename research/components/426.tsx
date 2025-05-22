import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A code security configuration
   */
  export type code_security_configuration = {
    /**
     * The ID of the code security configuration
     */
    id?: number & tags.Type<"int32">;
    /**
     * The name of the code security configuration. Must be unique within the organization.
     */
    name?: string;
    /**
     * The type of the code security configuration.
     */
    target_type?: "global" | "organization" | "enterprise";
    /**
     * A description of the code security configuration
     */
    description?: string;
    /**
     * The enablement status of GitHub Advanced Security
     */
    advanced_security?: "enabled" | "disabled";
    /**
     * The enablement status of Dependency Graph
     */
    dependency_graph?: "enabled" | "disabled" | "not_set";
    /**
     * The enablement status of Automatic dependency submission
     */
    dependency_graph_autosubmit_action?: "enabled" | "disabled" | "not_set";
    /**
     * Feature options for Automatic dependency submission
     */
    dependency_graph_autosubmit_action_options?: {
      /**
       * Whether to use runners labeled with 'dependency-submission' or standard GitHub runners.
       */
      labeled_runners?: boolean;
    };
    /**
     * The enablement status of Dependabot alerts
     */
    dependabot_alerts?: "enabled" | "disabled" | "not_set";
    /**
     * The enablement status of Dependabot security updates
     */
    dependabot_security_updates?: "enabled" | "disabled" | "not_set";
    /**
     * The enablement status of code scanning default setup
     */
    code_scanning_default_setup?: "enabled" | "disabled" | "not_set";
    /**
     * Feature options for code scanning default setup
     */
    code_scanning_default_setup_options?: {
      /**
       * Whether to use labeled runners or standard GitHub runners.
       */
      runner_type?: "standard" | "labeled" | "not_set" | null;
      /**
       * The label of the runner to use for code scanning when runner_type is 'labeled'.
       */
      runner_label?: string | null;
    } | null;
    /**
     * The enablement status of code scanning delegated alert dismissal
     */
    code_scanning_delegated_alert_dismissal?:
      | "enabled"
      | "disabled"
      | "not_set";
    /**
     * The enablement status of secret scanning
     */
    secret_scanning?: "enabled" | "disabled" | "not_set";
    /**
     * The enablement status of secret scanning push protection
     */
    secret_scanning_push_protection?: "enabled" | "disabled" | "not_set";
    /**
     * The enablement status of secret scanning delegated bypass
     */
    secret_scanning_delegated_bypass?: "enabled" | "disabled" | "not_set";
    /**
     * Feature options for secret scanning delegated bypass
     */
    secret_scanning_delegated_bypass_options?: {
      /**
       * The bypass reviewers for secret scanning delegated bypass
       */
      reviewers?: {
        /**
         * The ID of the team or role selected as a bypass reviewer
         */
        reviewer_id: number & tags.Type<"int32">;
        /**
         * The type of the bypass reviewer
         */
        reviewer_type: "TEAM" | "ROLE";
      }[];
    };
    /**
     * The enablement status of secret scanning validity checks
     */
    secret_scanning_validity_checks?: "enabled" | "disabled" | "not_set";
    /**
     * The enablement status of secret scanning non-provider patterns
     */
    secret_scanning_non_provider_patterns?: "enabled" | "disabled" | "not_set";
    /**
     * The enablement status of Copilot secret scanning
     */
    secret_scanning_generic_secrets?: "enabled" | "disabled" | "not_set";
    /**
     * The enablement status of secret scanning delegated alert dismissal
     */
    secret_scanning_delegated_alert_dismissal?:
      | "enabled"
      | "disabled"
      | "not_set";
    /**
     * The enablement status of private vulnerability reporting
     */
    private_vulnerability_reporting?: "enabled" | "disabled" | "not_set";
    /**
     * The enforcement status for a security configuration
     */
    enforcement?: "enforced" | "unenforced";
    /**
     * The URL of the configuration
     */
    url?: string;
    /**
     * The URL of the configuration
     */
    html_url?: string;
    created_at?: string & tags.Format<"date-time">;
    updated_at?: string & tags.Format<"date-time">;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.code_security_configuration;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Map status values to icons
  const formatStatus = (
    status?: "enabled" | "disabled" | "not_set",
  ): React.ReactNode => {
    switch (status) {
      case "enabled":
        return <LucideReact.CheckCircle className="text-green-500" size={16} />;
      case "disabled":
        return <LucideReact.XCircle className="text-red-500" size={16} />;
      default:
        return <LucideReact.Clock className="text-amber-500" size={16} />;
    }
  };

  // Format dates
  const formattedCreated = value.created_at
    ? new Date(value.created_at).toLocaleString()
    : "—";
  const formattedUpdated = value.updated_at
    ? new Date(value.updated_at).toLocaleString()
    : "—";

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header: Name and Enforcement Badge */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.name ?? "Unnamed Configuration"}
        </h2>
        <span
          className={`px-2 py-0.5 text-xs font-medium rounded-full ${
            value.enforcement === "enforced"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {value.enforcement === "enforced" ? "Enforced" : "Unenforced"}
        </span>
      </div>

      {/* Target Type Badge */}
      {value.target_type && (
        <div className="mt-1">
          <span className="inline-block px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full capitalize">
            {value.target_type}
          </span>
        </div>
      )}

      {/* Description */}
      {value.description && (
        <p className="text-gray-600 mt-2 text-sm line-clamp-2">
          {value.description}
        </p>
      )}

      {/* Feature Status Grid */}
      <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2">
          {formatStatus(value.advanced_security)}
          <span>Advanced Security</span>
        </div>
        <div className="flex items-center gap-2">
          {formatStatus(value.dependency_graph)}
          <span>Dependency Graph</span>
        </div>
        <div className="flex items-center gap-2">
          {formatStatus(value.dependabot_alerts)}
          <span>Dependabot Alerts</span>
        </div>
        <div className="flex items-center gap-2">
          {formatStatus(value.dependabot_security_updates)}
          <span>Security Updates</span>
        </div>
        <div className="flex items-center gap-2 col-span-2">
          {formatStatus(value.code_scanning_default_setup)}
          <span>Code Scanning Setup</span>
        </div>
        <div className="flex items-center gap-2">
          {formatStatus(value.secret_scanning)}
          <span>Secret Scanning</span>
        </div>
        <div className="flex items-center gap-2">
          {formatStatus(value.private_vulnerability_reporting)}
          <span>Private Vulnerabilities</span>
        </div>
      </div>

      {/* Timestamps */}
      <div className="flex items-center text-xs text-gray-500 mt-4 space-x-4">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={14} />
          <span>Created: {formattedCreated}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={14} />
          <span>Updated: {formattedUpdated}</span>
        </div>
      </div>

      {/* Configuration URL */}
      {value.html_url && (
        <div className="flex items-center text-sm text-gray-700 mt-2">
          <LucideReact.Link size={16} className="mr-1 text-gray-500" />
          <span className="truncate">{value.html_url}</span>
        </div>
      )}
    </div>
  );
}
