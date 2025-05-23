import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Code security configuration associated with a repository and attachment status
    */
    export interface code_security_configuration_for_repository {
        /**
         * The attachment status of the code security configuration on the repository.
        */
        status?: "attached" | "attaching" | "detached" | "removed" | "enforced" | "failed" | "updating" | "removed_by_enterprise";
        configuration?: AutoViewInputSubTypes.code_security_configuration;
    }
    /**
     * A code security configuration
    */
    export interface code_security_configuration {
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
        code_scanning_delegated_alert_dismissal?: "enabled" | "disabled" | "not_set";
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
        secret_scanning_delegated_alert_dismissal?: "enabled" | "disabled" | "not_set";
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.code_security_configuration_for_repository;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const status = value.status ?? "unknown";
  const statusMap = {
    attached: { icon: LucideReact.CheckCircle, color: "text-green-500", label: "Attached" },
    attaching: { icon: LucideReact.Loader, color: "text-blue-500 animate-spin", label: "Attaching" },
    detached: { icon: LucideReact.XCircle, color: "text-red-500", label: "Detached" },
    removed: { icon: LucideReact.Trash2, color: "text-red-500", label: "Removed" },
    enforced: { icon: LucideReact.ShieldCheck, color: "text-green-500", label: "Enforced" },
    failed: { icon: LucideReact.AlertTriangle, color: "text-red-500", label: "Failed" },
    updating: { icon: LucideReact.RefreshCw, color: "text-blue-500", label: "Updating" },
    removed_by_enterprise: { icon: LucideReact.Users, color: "text-gray-500", label: "Removed by Enterprise" },
    unknown: { icon: LucideReact.AlertCircle, color: "text-gray-400", label: status },
  } as const;
  const { icon: StatusIcon, color: statusColor, label: statusLabel } =
    statusMap[status as keyof typeof statusMap] ?? statusMap.unknown;

  const config = value.configuration;
  const formatDate = (d?: string): string | null =>
    d
      ? new Date(d).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : null;

  // Mapping feature flags to a consistent on/off/neutral indicator
  type FeatureValue = "enabled" | "disabled" | "not_set" | "enforced" | "unenforced" | undefined | null;
  const mapFeature = (val: FeatureValue) => {
    if (val === "enabled" || val === "enforced") {
      return { icon: LucideReact.CheckCircle, color: "text-green-500" };
    }
    if (val === "disabled" || val === "unenforced") {
      return { icon: LucideReact.XCircle, color: "text-red-500" };
    }
    return { icon: LucideReact.MinusCircle, color: "text-gray-400" };
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!config) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-400">
        <LucideReact.AlertCircle size={24} />
        <span className="ml-2">No configuration data available</span>
      </div>
    );
  }

  const features: { label: string; value: FeatureValue }[] = [
    { label: "Advanced Security", value: config.advanced_security },
    { label: "Dependency Graph", value: config.dependency_graph },
    { label: "Dep. Autosubmit", value: config.dependency_graph_autosubmit_action },
    { label: "Dependabot Alerts", value: config.dependabot_alerts },
    { label: "Security Updates", value: config.dependabot_security_updates },
    { label: "Code Scanning Setup", value: config.code_scanning_default_setup },
    { label: "Delegated Alert Dismissal", value: config.code_scanning_delegated_alert_dismissal },
    { label: "Secret Scanning", value: config.secret_scanning },
    { label: "Push Protection", value: config.secret_scanning_push_protection },
    { label: "Delegated Bypass", value: config.secret_scanning_delegated_bypass },
    { label: "Validity Checks", value: config.secret_scanning_validity_checks },
    { label: "Generic Secrets", value: config.secret_scanning_generic_secrets },
    { label: "Deleg. Alert Dismissal", value: config.secret_scanning_delegated_alert_dismissal },
    { label: "Private Vuln. Reporting", value: config.private_vulnerability_reporting },
    { label: "Enforcement", value: config.enforcement },
  ];

  const created = formatDate(config.created_at);
  const updated = formatDate(config.updated_at);

  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {config.name ?? "Code Security Configuration"}
        </h2>
        <div className="flex items-center gap-1">
          <StatusIcon size={20} className={statusColor} />
          <span className="text-sm font-medium capitalize text-gray-600">{statusLabel}</span>
        </div>
      </div>
      {config.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{config.description}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Target Type */}
        {config.target_type && (
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <LucideReact.Tag size={16} className="text-blue-500" />
            <span className="capitalize">{config.target_type}</span>
          </div>
        )}
        {/* Feature Flags */}
        {features.map(({ label, value: val }) => {
          const { icon: Icon, color } = mapFeature(val);
          const text =
            val === "not_set" || val === undefined || val === null
              ? "Not configured"
              : String(val).replace(/_/g, " ");
          return (
            <div key={label} className="flex items-center gap-2 text-sm text-gray-700">
              <Icon size={16} className={color} />
              <span className="whitespace-nowrap">{label}:</span>
              <span className="font-medium">{text}</span>
            </div>
          );
        })}
      </div>
      {(created || updated) && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
          {created && (
            <div className="flex items-center gap-2">
              <LucideReact.Calendar size={16} />
              <span>Created: {created}</span>
            </div>
          )}
          {updated && (
            <div className="flex items-center gap-2">
              <LucideReact.Calendar size={16} />
              <span>Updated: {updated}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
