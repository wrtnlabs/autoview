import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.code_security_configuration[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const configs = value;
  const formatDate = (iso?: string): string =>
    iso
      ? new Date(iso).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "—";

  // Define which feature flags to display and their styling
  const featureDefinitions: {
    key: keyof AutoViewInputSubTypes.code_security_configuration;
    label: string;
    color: string;
  }[] = [
    { key: "advanced_security", label: "Advanced Sec", color: "blue" },
    { key: "dependency_graph", label: "Dep. Graph", color: "purple" },
    { key: "dependabot_alerts", label: "Dependabot Alerts", color: "indigo" },
    {
      key: "dependabot_security_updates",
      label: "Sec Updates",
      color: "teal",
    },
    {
      key: "code_scanning_default_setup",
      label: "Code Scan",
      color: "yellow",
    },
    { key: "secret_scanning", label: "Secret Scan", color: "pink" },
  ];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-6">
      {configs.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-6 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <span className="mt-3 text-lg">No configurations available</span>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {configs.map((cfg, idx) => (
            <div
              key={idx}
              className="flex flex-col bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <h3 className="flex-1 text-lg font-semibold text-gray-800 truncate">
                    {cfg.name || "Unnamed Configuration"}
                  </h3>
                  {cfg.html_url && (
                    <div className="flex items-center text-gray-500 ml-3">
                      <LucideReact.Link size={16} />
                    </div>
                  )}
                </div>
                {cfg.description && (
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {cfg.description}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  {/* Enforcement Badge */}
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      cfg.enforcement === "enforced"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {cfg.enforcement === "enforced" ? (
                      <LucideReact.CheckCircle
                        size={12}
                        className="mr-1 text-green-500"
                      />
                    ) : (
                      <LucideReact.XCircle
                        size={12}
                        className="mr-1 text-gray-500"
                      />
                    )}
                    {cfg.enforcement === "enforced"
                      ? "Enforced"
                      : "Unenforced"}
                  </span>
                  {/* Feature Flags */}
                  {featureDefinitions.map(({ key, label, color }) => {
                    const status = cfg[key] as
                      | "enabled"
                      | "disabled"
                      | "not_set"
                      | undefined;
                    if (!status || status === "not_set") return null;
                    const isEnabled = status === "enabled";
                    return (
                      <span
                        key={key as string}
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-${color}-100 text-${color}-800`}
                      >
                        {isEnabled ? (
                          <LucideReact.CheckCircle
                            size={12}
                            className={`mr-1 text-${color}-500`}
                          />
                        ) : (
                          <LucideReact.XCircle
                            size={12}
                            className={`mr-1 text-${color}-500`}
                          />
                        )}
                        {label}: {status}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="mt-auto border-t border-gray-100 px-4 py-2 flex items-center text-xs text-gray-500">
                <LucideReact.Calendar size={14} className="mr-1" />
                <span>
                  Updated: {formatDate(cfg.updated_at)}{" "}
                  {cfg.created_at && (
                    <span className="ml-3">Created: {formatDate(cfg.created_at)}</span>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
