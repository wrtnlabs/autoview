import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
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
export type AutoViewInput = AutoViewInputSubTypes.code_security_default_configurations;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const configs = Array.isArray(value) ? value : [];

  const formatDate = (date?: string) =>
    date
      ? new Date(date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "enabled":
      case "enforced":
        return (
          <LucideReact.CheckCircle
            className="text-green-500"
            size={16}
            aria-label="Enabled"
          />
        );
      case "disabled":
      case "unenforced":
        return (
          <LucideReact.XCircle
            className="text-red-500"
            size={16}
            aria-label="Disabled"
          />
        );
      case "not_set":
        return (
          <LucideReact.MinusCircle
            className="text-gray-400"
            size={16}
            aria-label="Not set"
          />
        );
      default:
        return (
          <LucideReact.HelpCircle
            className="text-gray-400"
            size={16}
            aria-label="Unknown"
          />
        );
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {configs.length === 0 ? (
        <div className="flex items-center text-gray-500 space-x-2">
          <LucideReact.AlertCircle
            size={24}
            className="text-gray-400"
            aria-label="No data"
          />
          <span>No default configurations available.</span>
        </div>
      ) : (
        configs.map((item, idx) => {
          const cfg = item.configuration;
          if (!cfg) return null;

          return (
            <div
              key={idx}
              className="p-4 bg-white rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {cfg.name ?? "Unnamed Configuration"}
                </h3>
                {item.default_for_new_repos != null && (
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    Default for new repos:{" "}
                    <span className="font-medium">
                      {String(item.default_for_new_repos)}
                    </span>
                  </span>
                )}
              </div>
              {cfg.description && (
                <p className="mt-1 text-gray-600 text-sm line-clamp-2">
                  {cfg.description}
                </p>
              )}
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                <div className="flex items-center space-x-1">
                  <LucideReact.Target
                    size={16}
                    className="text-gray-500"
                    aria-label="Target type"
                  />
                  <span className="text-sm text-gray-700 capitalize truncate">
                    {cfg.target_type ?? "not_set"}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(cfg.advanced_security)}
                  <span className="text-sm text-gray-700">
                    Advanced Security
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(cfg.dependency_graph)}
                  <span className="text-sm text-gray-700">
                    Dependency Graph
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(cfg.dependabot_alerts)}
                  <span className="text-sm text-gray-700">
                    Dependabot Alerts
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(cfg.dependabot_security_updates)}
                  <span className="text-sm text-gray-700">
                    Security Updates
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(cfg.code_scanning_default_setup)}
                  <span className="text-sm text-gray-700">
                    Code Scanning
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(cfg.secret_scanning)}
                  <span className="text-sm text-gray-700">
                    Secret Scanning
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(cfg.enforcement)}
                  <span className="text-sm text-gray-700 capitalize">
                    Enforcement
                  </span>
                </div>
              </div>
              {(cfg.created_at || cfg.updated_at) && (
                <div className="mt-4 flex flex-wrap text-xs text-gray-500 gap-4">
                  {cfg.created_at && (
                    <div className="flex items-center space-x-1">
                      <LucideReact.Calendar
                        size={14}
                        className="text-gray-400"
                        aria-label="Created date"
                      />
                      <span>Created: {formatDate(cfg.created_at)}</span>
                    </div>
                  )}
                  {cfg.updated_at && (
                    <div className="flex items-center space-x-1">
                      <LucideReact.Calendar
                        size={14}
                        className="text-gray-400"
                        aria-label="Updated date"
                      />
                      <span>Updated: {formatDate(cfg.updated_at)}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
