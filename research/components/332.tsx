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
export type AutoViewInput = AutoViewInputSubTypes.code_security_configuration;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDateTime = (iso?: string): string =>
    iso
      ? new Date(iso).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "";

  const createdAt = formatDateTime(value.created_at);
  const updatedAt = formatDateTime(value.updated_at);

  // Map of features with string-based statuses
  const featureStatuses: {
    label: string;
    status?: "enabled" | "disabled" | "not_set";
  }[] = [
    { label: "Advanced Security", status: value.advanced_security },
    { label: "Dependency Graph", status: value.dependency_graph },
    {
      label: "Autosubmit Action",
      status: value.dependency_graph_autosubmit_action,
    },
    { label: "Dependabot Alerts", status: value.dependabot_alerts },
    {
      label: "Dependabot Security Updates",
      status: value.dependabot_security_updates,
    },
    { label: "Code Scanning Setup", status: value.code_scanning_default_setup },
    {
      label: "Scanning Delegated Dismissal",
      status: value.code_scanning_delegated_alert_dismissal,
    },
    { label: "Secret Scanning", status: value.secret_scanning },
    { label: "Push Protection", status: value.secret_scanning_push_protection },
    {
      label: "Delegated Bypass",
      status: value.secret_scanning_delegated_bypass,
    },
    { label: "Validity Checks", status: value.secret_scanning_validity_checks },
    {
      label: "Non-Provider Patterns",
      status: value.secret_scanning_non_provider_patterns,
    },
    {
      label: "Copilot Scanning",
      status: value.secret_scanning_generic_secrets,
    },
    {
      label: "Alert Delegated Dismissal",
      status: value.secret_scanning_delegated_alert_dismissal,
    },
    {
      label: "Vulnerability Reporting",
      status: value.private_vulnerability_reporting,
    },
  ];

  // Boolean option
  const labeledRunners =
    value.dependency_graph_autosubmit_action_options?.labeled_runners;
  // Runner configuration
  const runnerType = value.code_scanning_default_setup_options?.runner_type;
  const runnerLabel = value.code_scanning_default_setup_options?.runner_label;
  // Bypass reviewers
  const bypassReviewers =
    value.secret_scanning_delegated_bypass_options?.reviewers;

  // Helper for status icons
  const statusIcon = (
    status?: "enabled" | "disabled" | "not_set",
  ): JSX.Element => {
    if (status === "enabled") {
      return <LucideReact.CheckCircle className="text-green-500" size={16} />;
    }
    if (status === "disabled") {
      return <LucideReact.XCircle className="text-red-500" size={16} />;
    }
    return <LucideReact.Clock className="text-gray-400" size={16} />;
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-2">
          <LucideReact.GitBranch className="text-gray-600" size={24} />
          <h2 className="text-xl font-semibold text-gray-900 truncate">
            {value.name ?? "Configuration"}
          </h2>
        </div>
        {value.target_type && (
          <span className="mt-2 sm:mt-0 inline-block px-2 py-0.5 text-xs font-medium uppercase bg-blue-100 text-blue-800 rounded">
            {value.target_type}
          </span>
        )}
      </div>

      {/* Description */}
      {value.description && (
        <p className="text-gray-700 text-sm line-clamp-3">
          {value.description}
        </p>
      )}

      {/* Feature status grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {featureStatuses
          .filter((f) => f.status !== undefined)
          .map((f) => (
            <div
              key={f.label}
              className="flex items-center space-x-2 bg-gray-50 p-2 rounded"
            >
              {statusIcon(f.status)}
              <span className="text-sm text-gray-800">{f.label}</span>
            </div>
          ))}
      </div>

      {/* Options & Reviewers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {typeof labeledRunners === "boolean" && (
          <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
            {labeledRunners ? (
              <LucideReact.CheckCircle className="text-green-500" size={16} />
            ) : (
              <LucideReact.XCircle className="text-red-500" size={16} />
            )}
            <span className="text-sm text-gray-800">
              Autosubmit uses labeled runners
            </span>
          </div>
        )}
        {runnerType && (
          <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
            <LucideReact.Cpu className="text-gray-600" size={16} />
            <span className="text-sm text-gray-800">
              Runner Type: {runnerType === "not_set" ? "Not set" : runnerType}
            </span>
          </div>
        )}
        {runnerLabel && (
          <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
            <LucideReact.Tag className="text-gray-600" size={16} />
            <span className="text-sm text-gray-800">
              Runner Label: {runnerLabel}
            </span>
          </div>
        )}
        {bypassReviewers && bypassReviewers.length > 0 && (
          <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
            <LucideReact.Users className="text-gray-600" size={16} />
            <span className="text-sm text-gray-800">
              Bypass Reviewers: {bypassReviewers.length}
            </span>
          </div>
        )}
      </div>

      {/* Footer details */}
      <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
        {value.enforcement && (
          <div className="flex items-center space-x-2">
            <LucideReact.Shield className="text-gray-600" size={16} />
            <span>
              Enforcement:
              <span
                className={
                  value.enforcement === "enforced"
                    ? "text-green-600 ml-1"
                    : "text-red-600 ml-1"
                }
              >
                {value.enforcement}
              </span>
            </span>
          </div>
        )}
        {createdAt && (
          <div className="flex items-center space-x-2">
            <LucideReact.Calendar className="text-gray-400" size={16} />
            <span>Created: {createdAt}</span>
          </div>
        )}
        {updatedAt && (
          <div className="flex items-center space-x-2">
            <LucideReact.Calendar className="text-gray-400" size={16} />
            <span>Updated: {updatedAt}</span>
          </div>
        )}
        {value.url && (
          <div className="flex items-center space-x-2">
            <LucideReact.Link className="text-gray-400" size={16} />
            <span className="truncate">{value.url}</span>
          </div>
        )}
        {value.html_url && (
          <div className="flex items-center space-x-2">
            <LucideReact.Link className="text-gray-400" size={16} />
            <span className="truncate">{value.html_url}</span>
          </div>
        )}
      </div>
    </div>
  );
}
