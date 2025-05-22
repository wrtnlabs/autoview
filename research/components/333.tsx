import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A list of default code security configurations
   */
  export type code_security_default_configurations = {
    /**
     * The visibility of newly created repositories for which the code security configuration will be applied to by default
     */
    default_for_new_repos?: any;
    configuration?: AutoViewInputSubTypes.code_security_configuration;
  }[];
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
export type AutoViewInput =
  AutoViewInputSubTypes.code_security_default_configurations;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const configs = value ?? [];

  const formatDate = (dateStr?: string): string => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "enabled":
        return <LucideReact.CheckCircle size={16} className="text-green-500" />;
      case "disabled":
        return <LucideReact.XCircle size={16} className="text-red-500" />;
      default:
        return <LucideReact.Clock size={16} className="text-amber-500" />;
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <ol className="space-y-4">
      {configs.map((item, idx) => {
        const cfg = item.configuration;
        if (!cfg) return null;
        const defaultForNew = item.default_for_new_repos ?? "Not Set";

        return (
          <li key={idx} className="p-4 bg-white rounded-lg shadow">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <LucideReact.Cog size={20} className="text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {cfg.name ?? "Unnamed Configuration"}
                </h2>
              </div>
              <span className="mt-2 sm:mt-0 px-2 py-1 text-sm font-medium text-white bg-blue-500 rounded">
                {cfg.target_type ?? "unknown"}
              </span>
            </div>

            {/* Default For New Repos */}
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
              <LucideReact.GitBranch size={16} />
              <span>Default for new repos: {String(defaultForNew)}</span>
            </div>

            {/* Status Grid */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-700">
              <div className="flex items-center gap-1">
                {getStatusIcon(cfg.advanced_security)}
                <span>Advanced Security</span>
              </div>
              <div className="flex items-center gap-1">
                {getStatusIcon(cfg.dependency_graph)}
                <span>Dependency Graph</span>
              </div>
              <div className="flex items-center gap-1">
                {getStatusIcon(cfg.dependabot_alerts)}
                <span>Dependabot Alerts</span>
              </div>
              <div className="flex items-center gap-1">
                {getStatusIcon(cfg.dependabot_security_updates)}
                <span>Security Updates</span>
              </div>
              <div className="flex items-center gap-1">
                {getStatusIcon(cfg.code_scanning_default_setup)}
                <span>Code Scanning</span>
              </div>
              <div className="flex items-center gap-1">
                {getStatusIcon(cfg.secret_scanning)}
                <span>Secret Scanning</span>
              </div>
              <div className="flex items-center gap-1">
                {cfg.enforcement === "enforced" ? (
                  <LucideReact.Lock size={16} className="text-green-500" />
                ) : (
                  <LucideReact.Unlock size={16} className="text-red-500" />
                )}
                <span>Enforcement</span>
              </div>
            </div>

            {/* Timestamps */}
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <LucideReact.Calendar size={14} />
                <span>Created: {formatDate(cfg.created_at)}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Edit2 size={14} />
                <span>Updated: {formatDate(cfg.updated_at)}</span>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
