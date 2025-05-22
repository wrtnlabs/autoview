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
  // Icon helper: returns status icon based on "enabled" | "disabled" | "not_set"
  const getIcon = (status?: "enabled" | "disabled" | "not_set") => {
    if (status === "enabled") {
      return (
        <LucideReact.CheckCircle
          className="text-green-500"
          size={16}
          aria-label="Enabled"
        />
      );
    }
    if (status === "disabled") {
      return (
        <LucideReact.XCircle
          className="text-red-500"
          size={16}
          aria-label="Disabled"
        />
      );
    }
    return (
      <LucideReact.MinusCircle
        className="text-gray-400"
        size={16}
        aria-label="Not set"
      />
    );
  };

  // Format ISO dates to locale strings
  const createdAt = value.created_at
    ? new Date(value.created_at).toLocaleString()
    : null;
  const updatedAt = value.updated_at
    ? new Date(value.updated_at).toLocaleString()
    : null;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 truncate">
            {value.name}
          </h2>
          <span className="inline-block mt-1 bg-blue-100 text-blue-800 text-xs font-medium uppercase px-2 py-0.5 rounded">
            {value.target_type}
          </span>
        </div>
      </div>

      {/* Description */}
      {value.description && (
        <p className="mt-4 text-gray-600 line-clamp-3">{value.description}</p>
      )}

      {/* Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {/* Advanced Security */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Advanced Security</span>
          {getIcon(value.advanced_security)}
        </div>

        {/* Dependency Graph */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Dependency Graph</span>
            {getIcon(value.dependency_graph)}
          </div>
          {value.dependency_graph_autosubmit_action && (
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-gray-500">Auto Submit</span>
              {getIcon(value.dependency_graph_autosubmit_action)}
            </div>
          )}
          {value.dependency_graph_autosubmit_action_options?.labeled_runners !=
            null && (
            <p className="text-xs text-gray-500 mt-0.5">
              Labeled runners:{" "}
              {value.dependency_graph_autosubmit_action_options.labeled_runners
                ? "Yes"
                : "No"}
            </p>
          )}
        </div>

        {/* Dependabot Alerts */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Dependabot Alerts</span>
          {getIcon(value.dependabot_alerts)}
        </div>

        {/* Security Updates */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Security Updates</span>
          {getIcon(value.dependabot_security_updates)}
        </div>

        {/* Code Scanning Setup */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Code Scanning</span>
            {getIcon(value.code_scanning_default_setup)}
          </div>
          {value.code_scanning_default_setup_options && (
            <p className="text-xs text-gray-500 mt-1">
              Runner:{" "}
              {value.code_scanning_default_setup_options.runner_type ?? "N/A"}
            </p>
          )}
        </div>

        {/* Delegated Dismissal */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Delegated Dismissal</span>
          {getIcon(value.code_scanning_delegated_alert_dismissal)}
        </div>

        {/* Secret Scanning */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Secret Scanning</span>
          {getIcon(value.secret_scanning)}
        </div>

        {/* Push Protection */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Push Protection</span>
          {getIcon(value.secret_scanning_push_protection)}
        </div>

        {/* Delegated Bypass */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Delegated Bypass</span>
            {getIcon(value.secret_scanning_delegated_bypass)}
          </div>
          {value.secret_scanning_delegated_bypass_options?.reviewers && (
            <p className="text-xs text-gray-500 mt-1">
              Reviewers:{" "}
              {value.secret_scanning_delegated_bypass_options.reviewers.length}
            </p>
          )}
        </div>

        {/* Validity Checks */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Validity Checks</span>
          {getIcon(value.secret_scanning_validity_checks)}
        </div>

        {/* Non-Provider Patterns */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Non-Provider Patterns</span>
          {getIcon(value.secret_scanning_non_provider_patterns)}
        </div>

        {/* Copilot Secrets */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Copilot Secrets</span>
          {getIcon(value.secret_scanning_generic_secrets)}
        </div>

        {/* Secret Dismissal */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Secret Dismissal</span>
          {getIcon(value.secret_scanning_delegated_alert_dismissal)}
        </div>

        {/* Vulnerability Reporting */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Vulnerability Reporting</span>
          {getIcon(value.private_vulnerability_reporting)}
        </div>

        {/* Enforcement */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Enforcement</span>
          <span className="text-sm font-medium text-gray-800">
            {value.enforcement === "enforced" ? "Enforced" : "Unenforced"}
          </span>
        </div>
      </div>

      {/* Timestamps */}
      {(createdAt || updatedAt) && (
        <div className="mt-6 text-xs text-gray-500 space-y-1">
          {createdAt && <div>Created: {createdAt}</div>}
          {updatedAt && <div>Updated: {updatedAt}</div>}
        </div>
      )}
    </div>
  );
}
