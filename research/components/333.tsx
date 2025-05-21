import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.code_security_default_configurations;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const configs = value;
  const formatDate = (iso?: string) =>
    iso ? new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A';

  const renderStatus = (label: string, status?: string) => {
    const map: Record<string, { text: string; color: string }> = {
      enabled: { text: 'Enabled', color: 'bg-green-100 text-green-800' },
      disabled: { text: 'Disabled', color: 'bg-red-100 text-red-800' },
      not_set: { text: 'Not Set', color: 'bg-gray-100 text-gray-800' },
    };
    const entry = status && map[status] ? map[status] : { text: 'Unknown', color: 'bg-gray-100 text-gray-800' };
    return (
      <div key={label} className="flex items-center space-x-2">
        <span className="text-xs text-gray-600">{label}:</span>
        <span className={`px-2 py-0.5 text-xs font-medium rounded ${entry.color}`}>{entry.text}</span>
      </div>
    );
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!configs || configs.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No default code security configurations available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {configs.map((item, idx) => {
        const cfg = item.configuration;
        if (!cfg) return null;
        return (
          <div key={idx} className="flex flex-col p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-semibold text-gray-800 truncate">
                {cfg.name ?? 'Unnamed'}
              </h2>
              {cfg.target_type && (
                <span className="px-2 py-0.5 text-xs font-medium text-blue-800 bg-blue-100 rounded">
                  {cfg.target_type}
                </span>
              )}
            </div>

            {item.default_for_new_repos !== undefined && (
              <p className="text-xs text-gray-500 mb-1">
                Default for new repos: <span className="font-medium">{String(item.default_for_new_repos)}</span>
              </p>
            )}

            {cfg.description && (
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{cfg.description}</p>
            )}

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 flex-1">
              {renderStatus('Advanced Sec.', cfg.advanced_security)}
              {renderStatus('Dependency Graph', cfg.dependency_graph)}
              {renderStatus('Dependabot Alerts', cfg.dependabot_alerts)}
              {renderStatus('Security Updates', cfg.dependabot_security_updates)}
              {renderStatus('Code Scan Setup', cfg.code_scanning_default_setup)}
              {renderStatus('Secret Scanning', cfg.secret_scanning)}
            </div>

            <div className="mt-4 text-xs text-gray-400 space-y-0.5">
              <div>Created: {formatDate(cfg.created_at)}</div>
              <div>Updated: {formatDate(cfg.updated_at)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
