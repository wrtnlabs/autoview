import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Code security configuration associated with a repository and attachment status
    */
    export type code_security_configuration_for_repository = {
        /**
         * The attachment status of the code security configuration on the repository.
        */
        status?: "attached" | "attaching" | "detached" | "removed" | "enforced" | "failed" | "updating" | "removed_by_enterprise";
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
    };
}
export type AutoViewInput = AutoViewInputSubTypes.code_security_configuration_for_repository;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { status, configuration } = value;
  const formatDate = (iso?: string): string =>
    iso
      ? new Date(iso).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";
  const formatStatus = (s: string): string =>
    s
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  // Badge color maps for attachment status and feature statuses
  const statusColorMap: Record<string, string> = {
    attached: "bg-green-100 text-green-800",
    enforced: "bg-green-100 text-green-800",
    attaching: "bg-yellow-100 text-yellow-800",
    updating: "bg-yellow-100 text-yellow-800",
    failed: "bg-red-100 text-red-800",
    detached: "bg-gray-100 text-gray-800",
    removed: "bg-gray-100 text-gray-800",
    removed_by_enterprise: "bg-gray-100 text-gray-800",
  };
  const featureColorMap: Record<string, string> = {
    enabled: "bg-green-100 text-green-800",
    disabled: "bg-red-100 text-red-800",
    not_set: "bg-gray-100 text-gray-800",
    enforced: "bg-green-100 text-green-800",
    unenforced: "bg-gray-100 text-gray-800",
  };

  // If there's no configuration, show a placeholder message
  if (!configuration) {
    const label = formatStatus(status ?? "unknown");
    const color = statusColorMap[status ?? ""] ?? "bg-gray-100 text-gray-800";
    return (
      <div className="p-4 bg-white rounded-lg shadow-md w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            No Configuration
          </h2>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${color}`}>
            {label}
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          No code security configuration details are available.
        </p>
      </div>
    );
  }

  // Prepare feature list
  const rawFeatures: { key: keyof typeof configuration; label: string }[] = [
    { key: "advanced_security", label: "Advanced Security" },
    { key: "dependency_graph", label: "Dependency Graph" },
    { key: "dependency_graph_autosubmit_action", label: "Autosubmit" },
    { key: "dependabot_alerts", label: "Dependabot Alerts" },
    { key: "dependabot_security_updates", label: "Dependabot Security Updates" },
    { key: "code_scanning_default_setup", label: "Code Scanning Setup" },
    { key: "code_scanning_delegated_alert_dismissal", label: "Delegated Alert Dismissal" },
    { key: "secret_scanning", label: "Secret Scanning" },
    { key: "secret_scanning_push_protection", label: "Push Protection" },
    { key: "secret_scanning_delegated_bypass", label: "Delegated Bypass" },
    { key: "private_vulnerability_reporting", label: "Private Reporting" },
    { key: "enforcement", label: "Enforcement" },
  ];

  const features = rawFeatures
    .map(({ key, label }) => {
      const val = configuration[key] as string | undefined;
      if (val == null) return null;
      const plain = formatStatus(val);
      const color = featureColorMap[val] ?? "bg-gray-100 text-gray-800";
      return { label, plain, color };
    })
    .filter(Boolean) as { label: string; plain: string; color: string }[];

  // Prepare status badge for repository-level attachment status
  const statusLabel = formatStatus(status ?? "unknown");
  const statusColor = statusColorMap[status ?? ""] ?? "bg-gray-100 text-gray-800";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-lg">
      {/* Header: Name and Attachment Status */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          {configuration.name ?? "Unnamed Configuration"}
        </h2>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor}`}>
          {statusLabel}
        </span>
      </div>

      {/* Description */}
      {configuration.description && (
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {configuration.description}
        </p>
      )}

      {/* Feature Grid */}
      {features.length > 0 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {features.map((f) => (
            <div key={f.label} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{f.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${f.color}`}>
                {f.plain}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Dates */}
      <div className="mt-4 flex flex-col space-y-1 text-xs text-gray-500">
        {configuration.created_at && (
          <div>Created: {formatDate(configuration.created_at)}</div>
        )}
        {configuration.updated_at && (
          <div>Updated: {formatDate(configuration.updated_at)}</div>
        )}
      </div>
    </div>
  );
}
