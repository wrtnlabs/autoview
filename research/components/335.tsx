import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.code_security_configuration;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdAt = value.created_at
    ? new Date(value.created_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
    : undefined;
  const updatedAt = value.updated_at
    ? new Date(value.updated_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
    : undefined;

  const targetLabel = value.target_type
    ? value.target_type.charAt(0).toUpperCase() + value.target_type.slice(1)
    : undefined;

  // Gather feature statuses, omitting "not_set" or undefined
  const features: { label: string; status: "enabled" | "disabled"; }[] = [];
  const statusMap: [string, keyof AutoViewInput][] = [
    ["Advanced Security", "advanced_security"],
    ["Dependency Graph", "dependency_graph"],
    ["Autosubmit Dependencies", "dependency_graph_autosubmit_action"],
    ["Dependabot Alerts", "dependabot_alerts"],
    ["Dependabot Security Updates", "dependabot_security_updates"],
    ["Code Scanning Setup", "code_scanning_default_setup"],
    ["Delegated Alert Dismissal", "code_scanning_delegated_alert_dismissal"],
    ["Secret Scanning", "secret_scanning"],
    ["Push Protection", "secret_scanning_push_protection"],
    ["Delegated Bypass", "secret_scanning_delegated_bypass"],
    ["Validity Checks", "secret_scanning_validity_checks"],
    ["Non-Provider Patterns", "secret_scanning_non_provider_patterns"],
    ["Generic Secret Scanning", "secret_scanning_generic_secrets"],
    ["Alert Dismissal (Secret)", "secret_scanning_delegated_alert_dismissal"],
    ["Private Vulnerability Reporting", "private_vulnerability_reporting"],
  ];
  statusMap.forEach(([label, key]) => {
    const v = value[key] as any;
    if (v === "enabled" || v === "disabled") {
      features.push({ label, status: v });
    }
  });

  // Include runner options if set
  if (
    value.dependency_graph_autosubmit_action === "enabled" &&
    value.dependency_graph_autosubmit_action_options?.labeled_runners != null
  ) {
    features.push({
      label: "Autosubmit Runner Type",
      status: value.dependency_graph_autosubmit_action_options.labeled_runners
        ? "enabled"
        : "disabled",
    });
  }
  if (
    value.code_scanning_default_setup === "enabled" &&
    value.code_scanning_default_setup_options
  ) {
    const opts = value.code_scanning_default_setup_options;
    if (opts.runner_type && opts.runner_type !== "not_set") {
      features.push({
        label: `Scanning Runner (${opts.runner_type})`,
        status: "enabled",
      });
    }
    if (opts.runner_label) {
      features.push({ label: `Runner Label`, status: "enabled" });
    }
  }
  if (
    value.secret_scanning_delegated_bypass === "enabled" &&
    value.secret_scanning_delegated_bypass_options?.reviewers
  ) {
    features.push({
      label: `Bypass Reviewers (${value.secret_scanning_delegated_bypass_options.reviewers.length})`,
      status: "enabled",
    });
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 truncate">
          {value.name || "Configuration"}
        </h2>
        <div className="flex space-x-2">
          {targetLabel && (
            <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded">
              {targetLabel}
            </span>
          )}
          {value.enforcement && (
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded ${
                value.enforcement === "enforced"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {value.enforcement.charAt(0).toUpperCase() +
                value.enforcement.slice(1)}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      {value.description && (
        <p className="text-gray-600 text-sm line-clamp-3">
          {value.description}
        </p>
      )}

      {/* Feature Grid */}
      {features.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {features.map((f, i) => (
            <span
              key={i}
              className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                f.status === "enabled"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {f.label}
            </span>
          ))}
        </div>
      )}

      {/* Metadata */}
      <div className="flex justify-between text-gray-500 text-xs">
        {createdAt && <div>Created: {createdAt}</div>}
        {updatedAt && <div>Updated: {updatedAt}</div>}
      </div>
    </div>
  );
}
