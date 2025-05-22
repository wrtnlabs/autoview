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
  const formatDate = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "—";

  type FeatureKey =
    | "advanced_security"
    | "dependency_graph"
    | "dependabot_alerts"
    | "dependabot_security_updates"
    | "code_scanning_default_setup"
    | "secret_scanning"
    | "private_vulnerability_reporting";

  const features: {
    key: FeatureKey;
    label: string;
    status?: "enabled" | "disabled" | "not_set";
  }[] = [
    {
      key: "advanced_security",
      label: "Advanced Security",
      status: value.advanced_security,
    },
    {
      key: "dependency_graph",
      label: "Dependency Graph",
      status: value.dependency_graph,
    },
    {
      key: "dependabot_alerts",
      label: "Dependabot Alerts",
      status: value.dependabot_alerts,
    },
    {
      key: "dependabot_security_updates",
      label: "Dependabot Security Updates",
      status: value.dependabot_security_updates,
    },
    {
      key: "code_scanning_default_setup",
      label: "Code Scanning Setup",
      status: value.code_scanning_default_setup,
    },
    {
      key: "secret_scanning",
      label: "Secret Scanning",
      status: value.secret_scanning,
    },
    {
      key: "private_vulnerability_reporting",
      label: "Vuln Reporting",
      status: value.private_vulnerability_reporting,
    },
  ];

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "enabled":
        return <LucideReact.CheckCircle className="text-green-500" size={16} />;
      case "disabled":
        return <LucideReact.XCircle className="text-red-500" size={16} />;
      default:
        return <LucideReact.MinusCircle className="text-gray-400" size={16} />;
    }
  };

  const enforcementIcon =
    value.enforcement === "enforced" ? (
      <LucideReact.Lock className="text-green-500" size={16} />
    ) : (
      <LucideReact.XCircle className="text-red-500" size={16} />
    );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {value.name || "—"}
          </h2>
          {value.target_type && (
            <span className="mt-1 inline-block text-xs font-medium uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
              {value.target_type}
            </span>
          )}
        </div>
        <div className="flex items-center ml-4 space-x-1">
          {enforcementIcon}
          <span
            className={`text-sm font-medium ${
              value.enforcement === "enforced"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {value.enforcement === "enforced" ? "Enforced" : "Unenforced"}
          </span>
        </div>
      </div>

      {/* Description */}
      {value.description && (
        <p className="mt-3 text-sm text-gray-600 line-clamp-2">
          {value.description}
        </p>
      )}

      {/* Feature Status Grid */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        {features.map(({ key, label, status }) =>
          status ? (
            <div
              key={key}
              className="flex items-center space-x-2 text-sm text-gray-700"
            >
              {getStatusIcon(status)}
              <span>{label}</span>
            </div>
          ) : null,
        )}
      </div>

      {/* Timestamps */}
      <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={14} className="text-gray-400" />
          <span>Created: {formatDate(value.created_at)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={14} className="text-gray-400" />
          <span>Updated: {formatDate(value.updated_at)}</span>
        </div>
      </div>
    </div>
  );
}
