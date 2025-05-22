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
  const title = value.name || 'Unnamed Configuration';
  const scope = value.target_type
    ? value.target_type.charAt(0).toUpperCase() + value.target_type.slice(1)
    : 'Unknown Scope';
  const description = value.description || 'No description provided';
  const shortDescription =
    description.length > 100 ? `${description.slice(0, 100)}...` : description;
  const formatDate = (dateString?: string): string =>
    dateString
      ? new Date(dateString).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : 'N/A';
  const createdAt = formatDate(value.created_at);
  const updatedAt = formatDate(value.updated_at);
  const badgeStyles: Record<string, string> = {
    enabled: 'bg-green-100 text-green-800',
    disabled: 'bg-red-100 text-red-800',
    not_set: 'bg-gray-100 text-gray-800',
  };
  const statuses: { label: string; status?: 'enabled' | 'disabled' | 'not_set' }[] = [
    { label: 'Advanced Security', status: value.advanced_security },
    { label: 'Dependency Graph', status: value.dependency_graph },
    { label: 'Dependabot Alerts', status: value.dependabot_alerts },
    { label: 'Dependabot Updates', status: value.dependabot_security_updates },
    { label: 'Code Scanning', status: value.code_scanning_default_setup },
    { label: 'Secret Scanning', status: value.secret_scanning },
  ];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  const element = (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-600">
          {scope} &middot;{' '}
          <span
            className={`font-medium ${
              value.enforcement === 'enforced' ? 'text-green-600' : 'text-red-600'
            }`}>
            {value.enforcement === 'enforced' ? 'Enforced' : 'Unenforced'}
          </span>
        </p>
      </header>
      <section className="mb-4">
        <p className="text-gray-700 text-sm line-clamp-2">{shortDescription}</p>
      </section>
      <section className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
        {statuses
          .filter((item) => item.status && item.status !== 'not_set')
          .map((item) => (
            <span
              key={item.label}
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                badgeStyles[item.status as string]
              }`}>
              {item.label}: {item.status === 'enabled' ? 'Enabled' : 'Disabled'}
            </span>
          ))}
      </section>
      <footer className="text-xs text-gray-500">
        <p>Created: {createdAt}</p>
        <p>Updated: {updatedAt}</p>
      </footer>
    </div>
  );

  // 3. Return the React element.
  return element;
}
