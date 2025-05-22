import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Code security configuration associated with a repository and attachment status
   */
  export type code_security_configuration_for_repository = {
    /**
     * The attachment status of the code security configuration on the repository.
     */
    status?:
      | "attached"
      | "attaching"
      | "detached"
      | "removed"
      | "enforced"
      | "failed"
      | "updating"
      | "removed_by_enterprise";
    configuration?: AutoViewInputSubTypes.code_security_configuration;
  };
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
  AutoViewInputSubTypes.code_security_configuration_for_repository;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.

  // Map repository status to labels, icons, and colors
  const statusMap: Record<
    string,
    {
      label: string;
      icon: React.ComponentType<any>;
      color: string;
      spin?: boolean;
    }
  > = {
    attached: {
      label: "Attached",
      icon: LucideReact.CheckCircle,
      color: "text-green-500",
    },
    attaching: {
      label: "Attaching",
      icon: LucideReact.Loader,
      color: "text-amber-500",
      spin: true,
    },
    detached: {
      label: "Detached",
      icon: LucideReact.XCircle,
      color: "text-red-500",
    },
    removed: {
      label: "Removed",
      icon: LucideReact.Trash2,
      color: "text-gray-500",
    },
    enforced: {
      label: "Enforced",
      icon: LucideReact.ShieldCheck,
      color: "text-blue-500",
    },
    failed: {
      label: "Failed",
      icon: LucideReact.AlertTriangle,
      color: "text-red-500",
    },
    updating: {
      label: "Updating",
      icon: LucideReact.RefreshCw,
      color: "text-amber-500",
      spin: true,
    },
    removed_by_enterprise: {
      label: "Removed by Enterprise",
      icon: LucideReact.Building,
      color: "text-gray-500",
    },
  };
  const statusInfo = value.status ? statusMap[value.status] : undefined;
  const StatusIcon = statusInfo?.icon;
  const statusLabel = statusInfo?.label;
  const statusColor = statusInfo?.color;
  const statusSpin = statusInfo?.spin;

  // Configuration details
  const config = value.configuration;

  // Date formatting utility
  const formatDate = (dateStr?: string) =>
    dateStr ? new Date(dateStr).toLocaleString() : "";

  const createdAt = config?.created_at ? formatDate(config.created_at) : null;
  const updatedAt = config?.updated_at ? formatDate(config.updated_at) : null;

  // If there's no configuration, show a placeholder
  if (!config) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md flex items-center gap-2 text-gray-500">
        <LucideReact.AlertCircle size={20} />
        <span>No configuration available.</span>
      </div>
    );
  }

  // Define which security features to display
  const featureDefs = [
    { label: "Advanced Security", status: config.advanced_security },
    { label: "Dependency Graph", status: config.dependency_graph },
    { label: "Dependabot Alerts", status: config.dependabot_alerts },
    {
      label: "Dependabot Security Updates",
      status: config.dependabot_security_updates,
    },
    {
      label: "Code Scanning Default Setup",
      status: config.code_scanning_default_setup,
    },
    { label: "Secret Scanning", status: config.secret_scanning },
  ] as const;

  const featureIconMap: Record<
    "enabled" | "disabled",
    {
      icon: React.ComponentType<any>;
      color: string;
    }
  > = {
    enabled: { icon: LucideReact.CheckCircle, color: "text-green-500" },
    disabled: { icon: LucideReact.XCircle, color: "text-red-500" },
  };

  // Filter out unset features and map to displayable items
  const features = featureDefs
    .filter((f) => f.status && f.status !== "not_set")
    .map((f) => {
      const key = f.status === "enabled" ? "enabled" : "disabled";
      return {
        label: f.label,
        Icon: featureIconMap[key].icon,
        color: featureIconMap[key].color,
      };
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header: Configuration Name and Repository Status */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          {config.name || "Configuration"}
        </h2>
        {StatusIcon && statusLabel && (
          <div className="flex items-center">
            <StatusIcon
              size={18}
              className={`${statusColor} ${statusSpin ? "animate-spin" : ""}`}
            />
            <span className={`ml-1 text-sm font-medium ${statusColor}`}>
              {statusLabel}
            </span>
          </div>
        )}
      </div>

      {/* Target Type Badge */}
      {config.target_type && (
        <div className="mt-2 inline-flex items-center bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded">
          <LucideReact.Tag size={12} className="mr-1" />
          {config.target_type.charAt(0).toUpperCase() +
            config.target_type.slice(1)}
        </div>
      )}

      {/* Description */}
      {config.description && (
        <p className="mt-3 text-gray-600 text-sm line-clamp-2">
          {config.description}
        </p>
      )}

      {/* Features Grid */}
      {features.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {features.map((feat, idx) => {
            const FeatureIcon = feat.Icon;
            return (
              <div key={feat.label} className="flex items-center gap-1">
                <FeatureIcon size={16} className={feat.color} />
                <span className="text-gray-700 text-sm">{feat.label}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Enforcement Status */}
      {config.enforcement && (
        <div className="mt-4 flex items-center">
          <LucideReact.Lock size={16} className="text-gray-500" />
          <span className="ml-2 text-gray-700 text-sm">
            Enforcement:&nbsp;
            {config.enforcement.charAt(0).toUpperCase() +
              config.enforcement.slice(1)}
          </span>
        </div>
      )}

      {/* Footer: Creation and Update Dates */}
      <div className="mt-4 text-gray-500 text-xs flex gap-4">
        {createdAt && (
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={14} />
            <span>Created: {createdAt}</span>
          </div>
        )}
        {updatedAt && (
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={14} />
            <span>Updated: {updatedAt}</span>
          </div>
        )}
      </div>
    </div>
  );
}
