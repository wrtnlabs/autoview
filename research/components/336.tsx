import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiEnterprisesCodeSecurityConfigurationsDefaults {
    export type PutResponse = {
      /**
       * Specifies which types of repository this security configuration is applied to by default.
       */
      default_for_new_repos?:
        | "all"
        | "none"
        | "private_and_internal"
        | "public";
      configuration?: AutoViewInputSubTypes.code_security_configuration;
    };
  }
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
  AutoViewInputSubTypes.IApiEnterprisesCodeSecurityConfigurationsDefaults.PutResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const config = value.configuration;

  const defaultReposMap: Record<string, string> = {
    all: "All repositories",
    none: "No repositories",
    private_and_internal: "Private & Internal",
    public: "Public",
  };
  const defaultReposLabel = value.default_for_new_repos
    ? defaultReposMap[value.default_for_new_repos] ||
      value.default_for_new_repos
    : "Not specified";

  const formatDate = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

  const features: { label: string; status?: string }[] = config
    ? [
        { label: "Advanced Security", status: config.advanced_security },
        { label: "Dependency Graph", status: config.dependency_graph },
        { label: "Dependabot Alerts", status: config.dependabot_alerts },
        {
          label: "Security Updates",
          status: config.dependabot_security_updates,
        },
        {
          label: "Code Scanning Setup",
          status: config.code_scanning_default_setup,
        },
        { label: "Secret Scanning", status: config.secret_scanning },
        { label: "Enforcement", status: config.enforcement },
      ].filter((f) => f.status != null)
    : [];

  const renderStatusIcon = (status: string) => {
    switch (status) {
      case "enabled":
      case "enforced":
        return (
          <LucideReact.CheckCircle
            size={16}
            className="text-green-500"
            aria-label="Enabled"
          />
        );
      case "disabled":
      case "unenforced":
        return (
          <LucideReact.XCircle
            size={16}
            className="text-red-500"
            aria-label="Disabled"
          />
        );
      case "not_set":
        return (
          <LucideReact.Clock
            size={16}
            className="text-gray-400"
            aria-label="Not set"
          />
        );
      default:
        return (
          <LucideReact.AlertTriangle
            size={16}
            className="text-gray-400"
            aria-label={status}
          />
        );
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!config) {
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow">
        <LucideReact.AlertCircle size={24} className="text-gray-400" />
        <p className="mt-2 text-gray-500">No configuration available.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {config.name || "Default Security Configuration"}
          </h2>
          {config.target_type && (
            <span className="mt-1 inline-block text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
              {config.target_type.charAt(0).toUpperCase() +
                config.target_type.slice(1)}
            </span>
          )}
        </div>
        <div className="mt-2 sm:mt-0 text-sm text-gray-600">
          <span className="font-medium">New Repos:</span> {defaultReposLabel}
        </div>
      </header>

      {config.description && (
        <p className="mt-3 text-sm text-gray-600 line-clamp-3">
          {config.description}
        </p>
      )}

      {features.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {features.map((f) => (
            <div key={f.label} className="flex items-center gap-2">
              {renderStatusIcon(f.status!)}
              <span className="text-sm text-gray-700">{f.label}</span>
            </div>
          ))}
        </div>
      )}

      <footer className="flex flex-col sm:flex-row sm:justify-between text-gray-500 text-xs mt-4 space-y-2 sm:space-y-0">
        {config.created_at && (
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={14} className="text-gray-400" />
            <span>Created: {formatDate(config.created_at)}</span>
          </div>
        )}
        {config.updated_at && (
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={14} className="text-gray-400" />
            <span>Updated: {formatDate(config.updated_at)}</span>
          </div>
        )}
      </footer>
    </div>
  );
}
