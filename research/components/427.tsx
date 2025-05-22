import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A list of default code security configurations
   */
  export type code_security_default_configurations = {
    /**
     * The visibility of newly created repositories for which the code security configuration will be applied to by default
     */
    default_for_new_repos?: any;
    configuration?: AutoViewInputSubTypes.code_security_configuration;
  }[];
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
  AutoViewInputSubTypes.code_security_default_configurations;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const targetTypeMap: Record<string, string> = {
    global: "Global",
    organization: "Organization",
    enterprise: "Enterprise",
  };

  const formatDate = (iso?: string): string | null => {
    if (!iso) return null;
    const date = new Date(iso);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!Array.isArray(value) || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <LucideReact.AlertCircle className="text-gray-400" size={48} />
        <p className="mt-4 text-gray-500">No configurations available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {value.map((item, idx) => {
        const conf = item.configuration;
        const defaultRaw = item.default_for_new_repos;
        const defaultForNew =
          typeof defaultRaw === "boolean"
            ? defaultRaw
              ? "Yes"
              : "No"
            : defaultRaw != null
              ? String(defaultRaw)
              : "Not Set";

        if (!conf) {
          return (
            <div
              key={idx}
              className="p-4 bg-white rounded-lg shadow flex items-center gap-2"
            >
              <LucideReact.AlertCircle size={20} className="text-gray-400" />
              <span className="text-gray-600">Configuration not provided.</span>
            </div>
          );
        }

        const createdAt = formatDate(conf.created_at);
        const updatedAt = formatDate(conf.updated_at);

        // Select core features to display
        const featureStatuses: { label: string; status?: string }[] = [
          { label: "Advanced Security", status: conf.advanced_security },
          { label: "Dependency Graph", status: conf.dependency_graph },
          {
            label: "Auto Dependency Submission",
            status: conf.dependency_graph_autosubmit_action,
          },
          { label: "Dependabot Alerts", status: conf.dependabot_alerts },
          {
            label: "Dependabot Sec. Updates",
            status: conf.dependabot_security_updates,
          },
          {
            label: "Code Scanning Setup",
            status: conf.code_scanning_default_setup,
          },
          { label: "Secret Scanning", status: conf.secret_scanning },
          {
            label: "Private Vulnerability Reporting",
            status: conf.private_vulnerability_reporting,
          },
        ].filter((f) => f.status && f.status !== "not_set");

        const enforcementBadge =
          conf.enforcement === "enforced" ? (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-xs font-medium">
              Enforced
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-xs font-medium">
              Unenforced
            </span>
          );

        return (
          <div
            key={idx}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center space-x-2">
                <LucideReact.ShieldOff size={20} className="text-indigo-500" />
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {conf.name ?? "Unnamed Configuration"}
                </h3>
              </div>
              <div className="mt-2 sm:mt-0 flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  {targetTypeMap[conf.target_type ?? ""] || "Type Not Set"}
                </span>
                {enforcementBadge}
              </div>
            </div>

            {conf.description && (
              <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                {conf.description}
              </p>
            )}

            <div className="mt-3 text-sm text-gray-500">
              Default for New Repos:{" "}
              <span className="font-medium text-gray-700">{defaultForNew}</span>
            </div>

            {featureStatuses.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {featureStatuses.map((f, i) => {
                  const enabled = f.status === "enabled";
                  const Icon = enabled
                    ? LucideReact.CheckCircle
                    : LucideReact.XCircle;
                  const colorClass = enabled
                    ? "text-green-500"
                    : "text-red-500";
                  return (
                    <div key={i} className="flex items-center gap-1 text-sm">
                      <Icon size={16} className={colorClass} strokeWidth={2} />
                      <span className="text-gray-700">{f.label}</span>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-4 flex flex-wrap text-xs text-gray-400 gap-4">
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
      })}
    </div>
  );
}
