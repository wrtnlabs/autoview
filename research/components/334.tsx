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
  const name = value.name ?? "Unnamed Configuration";
  const targetType = value.target_type ?? "global";
  const description = value.description ?? "";
  const formatDate = (dateStr?: string) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "—";

  // Features to display with labels and their corresponding keys in the data
  const features: { key: keyof AutoViewInput; label: string }[] = [
    { key: "advanced_security", label: "Advanced Security" },
    { key: "dependency_graph", label: "Dependency Graph" },
    {
      key: "dependency_graph_autosubmit_action",
      label: "Automatic Dependency Submission",
    },
    { key: "dependabot_alerts", label: "Dependabot Alerts" },
    {
      key: "dependabot_security_updates",
      label: "Dependabot Security Updates",
    },
    {
      key: "code_scanning_default_setup",
      label: "Code Scanning Default Setup",
    },
    { key: "secret_scanning", label: "Secret Scanning" },
    {
      key: "private_vulnerability_reporting",
      label: "Private Vulnerability Reporting",
    },
  ];

  // Helper to get icon, color, and label for feature statuses
  const getStatusMeta = (
    status?: "enabled" | "disabled" | "not_set",
  ): { icon: JSX.Element; label: string } => {
    if (status === "enabled") {
      return {
        icon: <LucideReact.CheckCircle size={16} className="text-green-500" />,
        label: "Enabled",
      };
    }
    if (status === "disabled") {
      return {
        icon: <LucideReact.XCircle size={16} className="text-red-500" />,
        label: "Disabled",
      };
    }
    return {
      icon: <LucideReact.MinusCircle size={16} className="text-gray-400" />,
      label: "Not Set",
    };
  };

  // Enforcement status meta
  const enforcementMeta = (() => {
    if (value.enforcement === "enforced") {
      return {
        icon: <LucideReact.ShieldCheck size={16} className="text-green-500" />,
        label: "Enforced",
      };
    }
    if (value.enforcement === "unenforced") {
      return {
        icon: <LucideReact.ShieldOff size={16} className="text-red-500" />,
        label: "Unenforced",
      };
    }
    return {
      icon: <LucideReact.MinusCircle size={16} className="text-gray-400" />,
      label: "Unknown",
    };
  })();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{name}</h2>
        <span className="px-2 py-0.5 text-xs font-medium text-blue-800 bg-blue-100 rounded">
          {targetType.charAt(0).toUpperCase() + targetType.slice(1)}
        </span>
      </div>

      {/* Description */}
      {description && (
        <p className="mt-2 text-gray-600 text-sm line-clamp-3">{description}</p>
      )}

      {/* Features Grid */}
      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        {features.map(({ key, label }) => {
          const statusValue = (value as any)[key] as
            | "enabled"
            | "disabled"
            | "not_set"
            | undefined;
          const { icon, label: statusLabel } = getStatusMeta(statusValue);
          return (
            <div
              key={key}
              className="flex items-center justify-between px-2 py-1"
            >
              <div className="flex items-center gap-1">
                {icon}
                <span className="text-gray-700">{label}</span>
              </div>
              <span className="text-gray-500">{statusLabel}</span>
            </div>
          );
        })}

        {/* Enforcement */}
        <div className="flex items-center justify-between px-2 py-1">
          <div className="flex items-center gap-1">
            {enforcementMeta.icon}
            <span className="text-gray-700">Enforcement</span>
          </div>
          <span className="text-gray-500">{enforcementMeta.label}</span>
        </div>
      </div>

      {/* Timestamps */}
      <div className="mt-4 border-t pt-2 flex flex-col sm:flex-row sm:space-x-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={14} className="text-gray-400" />
          <span>Created: {formatDate(value.created_at)}</span>
        </div>
        <div className="flex items-center gap-1 mt-1 sm:mt-0">
          <LucideReact.Calendar size={14} className="text-gray-400" />
          <span>Updated: {formatDate(value.updated_at)}</span>
        </div>
      </div>
    </div>
  );
}
