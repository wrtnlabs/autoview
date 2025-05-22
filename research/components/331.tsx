import LucideReact from "lucide-react";
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
export type AutoViewInput = AutoViewInputSubTypes.code_security_configuration[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Helper: format ISO date to "Jan 1, 2023" style
  const formatDate = (iso?: string): string =>
    iso
      ? new Date(iso).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "";

  // Helper: render a status badge with icon
  const renderStatus = (
    label: string,
    status?: "enabled" | "disabled" | "not_set",
  ): JSX.Element => {
    const key =
      status === "enabled"
        ? "enabled"
        : status === "disabled"
          ? "disabled"
          : "not_set";
    const icons = {
      enabled: LucideReact.CheckCircle,
      disabled: LucideReact.XCircle,
      not_set: LucideReact.MinusCircle,
    } as const;
    const colors = {
      enabled: "text-green-500",
      disabled: "text-red-500",
      not_set: "text-gray-400",
    } as const;
    const Icon = icons[key];
    return (
      <div key={label} className="flex items-center gap-1 text-xs">
        <Icon size={16} className={colors[key]} />
        <span className={key === "not_set" ? "text-gray-500" : "text-gray-700"}>
          {label}
        </span>
      </div>
    );
  };

  // Main render
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-400">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2 text-sm">
          No security configurations available.
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {value.map((config, idx) => {
        const key = config.id != null ? `cfg-${config.id}` : `cfg-${idx}`;
        return (
          <div
            key={key}
            className="p-4 bg-white rounded-lg shadow-sm flex flex-col sm:flex-row sm:justify-between gap-4"
          >
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-lg font-semibold text-gray-800">
                  {config.name ?? "Unnamed Configuration"}
                </span>
                <span className="px-2 py-0.5 text-xs font-medium text-white bg-blue-500 rounded">
                  {config.target_type ?? "global"}
                </span>
                {config.enforcement === "enforced" ? (
                  <LucideReact.Lock size={18} className="text-green-500" />
                ) : (
                  <LucideReact.Unlock size={18} className="text-gray-400" />
                )}
              </div>
              {config.description && (
                <p className="mt-1 text-gray-600 text-sm line-clamp-2">
                  {config.description}
                </p>
              )}
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {renderStatus("Advanced Security", config.advanced_security)}
                {renderStatus("Dependency Graph", config.dependency_graph)}
                {renderStatus(
                  "Autosubmit",
                  config.dependency_graph_autosubmit_action,
                )}
                {renderStatus("Dependabot Alerts", config.dependabot_alerts)}
                {renderStatus(
                  "Security Updates",
                  config.dependabot_security_updates,
                )}
                {renderStatus(
                  "Code Scanning Setup",
                  config.code_scanning_default_setup,
                )}
                {renderStatus("Secret Scanning", config.secret_scanning)}
                {renderStatus(
                  "Vulnerability Reporting",
                  config.private_vulnerability_reporting,
                )}
              </div>
            </div>
            <div className="flex flex-col items-start sm:items-end text-gray-500 text-xs whitespace-nowrap">
              <div className="flex items-center gap-1">
                <LucideReact.Calendar size={16} />
                <span>
                  {formatDate(config.updated_at || config.created_at)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
