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
export type AutoViewInput = AutoViewInputSubTypes.code_security_configuration[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const configs: AutoViewInput = value || [];

  const formatDate = (dateStr?: string): string =>
    dateStr
      ? new Date(dateStr).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : '—';

  const featureList: { key: keyof AutoViewInputSubTypes.code_security_configuration; label: string }[] = [
    { key: 'advanced_security', label: 'Advanced Security' },
    { key: 'dependency_graph', label: 'Dependency Graph' },
    { key: 'dependabot_alerts', label: 'Dependabot Alerts' },
    { key: 'dependabot_security_updates', label: 'Security Updates' },
    { key: 'code_scanning_default_setup', label: 'Code Scanning' },
    { key: 'secret_scanning', label: 'Secret Scanning' },
  ];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (configs.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No configurations available.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {configs.map((cfg, idx) => {
        const keyId = cfg.id != null ? cfg.id : idx;
        return (
          <div key={keyId} className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {cfg.name || 'Unnamed Configuration'}
              </h3>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  cfg.enforcement === 'enforced'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {cfg.enforcement === 'enforced' ? 'Enforced' : 'Unenforced'}
              </span>
            </div>
            <div className="mt-1 text-sm text-gray-500">
              Type: {cfg.target_type || '—'} &middot; Updated:{' '}
              {formatDate(cfg.updated_at)}
            </div>
            {cfg.description && (
              <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                {cfg.description}
              </p>
            )}
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {featureList.map(({ key, label }) => {
                const val = cfg[key];
                const status =
                  val === 'enabled'
                    ? 'Enabled'
                    : val === 'disabled'
                    ? 'Disabled'
                    : 'Not set';
                const isEnabled = val === 'enabled';
                return (
                  <span
                    key={key}
                    className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${
                      isEnabled
                        ? 'bg-green-50 text-green-700'
                        : 'bg-gray-50 text-gray-700'
                    }`}
                  >
                    {label}: {status}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
