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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const getStatusIcon = (status?: "enabled" | "disabled" | "not_set") => {
    const s = status ?? "not_set";
    if (s === "enabled")
      return <LucideReact.CheckCircle className="text-green-500" size={16} />;
    if (s === "disabled")
      return <LucideReact.XCircle className="text-red-500" size={16} />;
    return <LucideReact.Clock className="text-amber-500" size={16} />;
  };

  const formatStatus = (
    status?: "enabled" | "disabled" | "not_set",
  ): string => {
    const s = status ?? "not_set";
    return s === "enabled"
      ? "Enabled"
      : s === "disabled"
        ? "Disabled"
        : "Not Set";
  };

  const formatDate = (iso?: string): string =>
    iso
      ? new Date(iso).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "-";

  // Aggregate feature toggles for display
  const featureRows: {
    label: string;
    status?: "enabled" | "disabled" | "not_set";
  }[] = [
    { label: "GitHub Advanced Security", status: value.advanced_security },
    { label: "Dependency Graph", status: value.dependency_graph },
    {
      label: "Automatic Dependency Submission",
      status: value.dependency_graph_autosubmit_action,
    },
    { label: "Dependabot Alerts", status: value.dependabot_alerts },
    {
      label: "Dependabot Security Updates",
      status: value.dependabot_security_updates,
    },
    {
      label: "Code Scanning Default Setup",
      status: value.code_scanning_default_setup,
    },
    {
      label: "Code Scanning Delegated Dismissal",
      status: value.code_scanning_delegated_alert_dismissal,
    },
    { label: "Secret Scanning", status: value.secret_scanning },
    { label: "Push Protection", status: value.secret_scanning_push_protection },
    {
      label: "Secret Scanning Delegated Bypass",
      status: value.secret_scanning_delegated_bypass,
    },
    { label: "Validity Checks", status: value.secret_scanning_validity_checks },
    {
      label: "Non-Provider Patterns",
      status: value.secret_scanning_non_provider_patterns,
    },
    {
      label: "Copilot Secret Scanning",
      status: value.secret_scanning_generic_secrets,
    },
    {
      label: "Secret Scanning Delegated Dismissal",
      status: value.secret_scanning_delegated_alert_dismissal,
    },
    {
      label: "Private Vulnerability Reporting",
      status: value.private_vulnerability_reporting,
    },
  ];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      {/* Header: Name, target_type and enforcement */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 truncate">
          {value.name || "Unnamed Configuration"}
        </h2>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded">
            {(value.target_type ?? "global").toUpperCase()}
          </span>
          <span
            className={`px-2 py-1 text-xs font-medium rounded ${
              value.enforcement === "enforced"
                ? "text-green-800 bg-green-100"
                : "text-gray-800 bg-gray-100"
            }`}
          >
            {value.enforcement === "enforced" ? "Enforced" : "Unenforced"}
          </span>
        </div>
        {value.description && (
          <p className="mt-4 text-gray-600 text-sm line-clamp-3">
            {value.description}
          </p>
        )}
      </div>

      {/* Features */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Features</h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
          {featureRows.map((f) => (
            <div key={f.label} className="flex items-center">
              {getStatusIcon(f.status)}
              <span className="ml-2">{f.label}:</span>
              <span className="ml-1 font-medium">{formatStatus(f.status)}</span>
            </div>
          ))}

          {/* Show Autosubmit option */}
          {value.dependency_graph_autosubmit_action === "enabled" &&
            value.dependency_graph_autosubmit_action_options
              ?.labeled_runners !== undefined && (
              <div className="flex items-center">
                <LucideReact.Tag className="text-gray-500" size={16} />
                <span className="ml-2">Labeled Runners:</span>
                <span className="ml-1 font-medium">
                  {value.dependency_graph_autosubmit_action_options
                    .labeled_runners
                    ? "Yes"
                    : "No"}
                </span>
              </div>
            )}

          {/* Show Code Scanning runner details */}
          {value.code_scanning_default_setup === "enabled" &&
            value.code_scanning_default_setup_options && (
              <div className="flex items-center">
                <LucideReact.GitPullRequest
                  className="text-gray-500"
                  size={16}
                />
                <span className="ml-2">Scanner Runner:</span>
                <span className="ml-1 font-medium">
                  {value.code_scanning_default_setup_options.runner_type ===
                  "labeled"
                    ? `Labeled (${value.code_scanning_default_setup_options.runner_label || "–"})`
                    : value.code_scanning_default_setup_options.runner_type ===
                        "standard"
                      ? "Standard"
                      : "Not Set"}
                </span>
              </div>
            )}

          {/* Show Delegated Bypass reviewers count */}
          {value.secret_scanning_delegated_bypass_options?.reviewers && (
            <div className="flex items-center">
              <LucideReact.Users className="text-gray-500" size={16} />
              <span className="ml-2">Bypass Reviewers:</span>
              <span className="ml-1 font-medium">
                {
                  value.secret_scanning_delegated_bypass_options.reviewers
                    .length
                }
              </span>
            </div>
          )}
        </dl>
      </div>

      {/* Links and Timestamps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
        {value.url && (
          <div className="flex items-center">
            <LucideReact.Link className="text-gray-400" size={16} />
            <span className="ml-2 truncate">{value.url}</span>
          </div>
        )}
        {value.html_url && (
          <div className="flex items-center">
            <LucideReact.Link className="text-gray-400" size={16} />
            <span className="ml-2 truncate">{value.html_url}</span>
          </div>
        )}
        <div className="flex items-center">
          <LucideReact.Calendar className="text-gray-400" size={16} />
          <span className="ml-2">Created:</span>
          <span className="ml-1 font-medium">
            {formatDate(value.created_at)}
          </span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar className="text-gray-400" size={16} />
          <span className="ml-2">Updated:</span>
          <span className="ml-1 font-medium">
            {formatDate(value.updated_at)}
          </span>
        </div>
      </div>
    </div>
  );
}
