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
  // 1. Derived and formatted values
  const name = value.name ?? '—';
  const targetType = value.target_type
    ? value.target_type.charAt(0).toUpperCase() + value.target_type.slice(1)
    : '—';
  const description = value.description ?? '';
  const descriptionSnippet =
    description.length > 100 ? description.slice(0, 100) + '…' : description;

  const formatDate = (dateStr?: string) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : '—';

  const created = formatDate(value.created_at);
  const updated = formatDate(value.updated_at);

  // feature statuses to display
  const featureStatuses: { label: string; status?: string }[] = [
    { label: 'Advanced Security', status: value.advanced_security },
    { label: 'Dependency Graph', status: value.dependency_graph },
    { label: 'Dependabot Alerts', status: value.dependabot_alerts },
    { label: 'Code Scanning', status: value.code_scanning_default_setup },
    { label: 'Secret Scanning', status: value.secret_scanning },
    { label: 'Vulnerability Reporting', status: value.private_vulnerability_reporting },
  ];

  const renderStatus = (status?: string) => {
    const map: Record<string, { text: string; bg: string; textColor: string }> = {
      enabled: { text: 'Enabled', bg: 'bg-green-100', textColor: 'text-green-800' },
      disabled: { text: 'Disabled', bg: 'bg-red-100', textColor: 'text-red-800' },
      not_set: { text: 'Not set', bg: 'bg-gray-100', textColor: 'text-gray-800' },
    };
    const cfg = status && map[status] ? map[status] : map.not_set;
    return (
      <span className={`${cfg.bg} ${cfg.textColor} px-2 py-1 text-xs rounded-full`}>
        {cfg.text}
      </span>
    );
  };

  const enforcementBadge =
    value.enforcement === 'enforced' ? (
      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full ml-2">
        Enforced
      </span>
    ) : (
      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full ml-2">
        Unenforced
      </span>
    );

  // 2. Visual structure with Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex items-center">
        <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
        {enforcementBadge}
      </div>
      <div className="text-sm text-gray-500 mt-1">{targetType}</div>
      {descriptionSnippet && (
        <p className="text-gray-700 mt-2 line-clamp-2">{descriptionSnippet}</p>
      )}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {featureStatuses.map((feat) => (
          <div
            key={feat.label}
            className="flex items-center justify-between bg-gray-50 p-2 rounded"
          >
            <span className="text-sm text-gray-800">{feat.label}</span>
            {renderStatus(feat.status)}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-4">
        <div>Created: {created}</div>
        <div>Updated: {updated}</div>
      </div>
    </div>
  );
}
