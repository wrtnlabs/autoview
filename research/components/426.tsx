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
    ? new Date(value.created_at).toLocaleString()
    : null;
  const updatedAt = value.updated_at
    ? new Date(value.updated_at).toLocaleString()
    : null;

  const statusClasses: Record<"enabled" | "disabled" | "not_set", string> = {
    enabled: "bg-green-100 text-green-800",
    disabled: "bg-red-100 text-red-800",
    not_set: "bg-gray-100 text-gray-800",
  };

  function renderBadge(
    label: string,
    status?: "enabled" | "disabled" | "not_set"
  ): React.ReactNode {
    if (!status) return null;
    const cls = statusClasses[status] || statusClasses.not_set;
    const pretty = status.replace(/_/g, " ").replace(/\b\w/g, (c) =>
      c.toUpperCase()
    );
    return (
      <span
        key={label}
        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}
      >
        {label}: {pretty}
      </span>
    );
  }

  // Aggregate core feature statuses
  const featureBadges: React.ReactNode[] = [
    renderBadge("Advanced Security", value.advanced_security),
    renderBadge("Dependency Graph", value.dependency_graph),
    renderBadge("Auto Dependency", value.dependency_graph_autosubmit_action),
    renderBadge("Dependabot Alerts", value.dependabot_alerts),
    renderBadge("Dependabot Updates", value.dependabot_security_updates),
    renderBadge(
      "Code Scanning Setup",
      value.code_scanning_default_setup
    ),
    renderBadge(
      "Scanning Delegated Dismissal",
      value.code_scanning_delegated_alert_dismissal
    ),
    renderBadge("Secret Scanning", value.secret_scanning),
    renderBadge(
      "Push Protection",
      value.secret_scanning_push_protection
    ),
    renderBadge(
      "Delegated Bypass",
      value.secret_scanning_delegated_bypass
    ),
    renderBadge(
      "Validity Checks",
      value.secret_scanning_validity_checks
    ),
    renderBadge(
      "Non-Provider Patterns",
      value.secret_scanning_non_provider_patterns
    ),
    renderBadge(
      "Generic Secrets",
      value.secret_scanning_generic_secrets
    ),
    renderBadge(
      "Delegated Dismissal",
      value.secret_scanning_delegated_alert_dismissal
    ),
    renderBadge(
      "Private Vuln Reporting",
      value.private_vulnerability_reporting
    ),
  ].filter(Boolean);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <header className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 truncate">
          {value.name || "Unnamed Configuration"}
        </h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {value.target_type && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
              Type: {value.target_type.charAt(0).toUpperCase() + value.target_type.slice(1)}
            </span>
          )}
          {value.enforcement && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-medium">
              {value.enforcement.charAt(0).toUpperCase() + value.enforcement.slice(1)}
            </span>
          )}
        </div>
      </header>

      {value.description && (
        <p className="text-gray-700 text-sm line-clamp-3 mb-4">
          {value.description}
        </p>
      )}

      {featureBadges.length > 0 && (
        <section className="mb-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">
            Features
          </h3>
          <div className="flex flex-wrap gap-2">
            {featureBadges}
          </div>
        </section>
      )}

      {/* Options Details */}
      {value.dependency_graph_autosubmit_action_options && (
        <section className="mb-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-1">
            Auto Dependency Options
          </h3>
          <p className="text-gray-700 text-xs">
            Labeled Runners:{" "}
            {value.dependency_graph_autosubmit_action_options.labeled_runners
              ? "Yes"
              : "No"}
          </p>
        </section>
      )}

      {value.code_scanning_default_setup_options && (
        <section className="mb-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-1">
            Scan Setup Options
          </h3>
          <p className="text-gray-700 text-xs">
            Runner Type:{" "}
            {value.code_scanning_default_setup_options.runner_type ||
              "Not Set"}
          </p>
          {value.code_scanning_default_setup_options.runner_label && (
            <p className="text-gray-700 text-xs">
              Runner Label:{" "}
              {value.code_scanning_default_setup_options.runner_label}
            </p>
          )}
        </section>
      )}

      {value.secret_scanning_delegated_bypass_options?.reviewers && (
        <section className="mb-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-1">
            Bypass Reviewers
          </h3>
          <p className="text-gray-700 text-xs">
            Total Reviewers:{" "}
            {value.secret_scanning_delegated_bypass_options.reviewers.length}
          </p>
        </section>
      )}

      {/* Metadata */}
      <footer className="pt-4 border-t border-gray-200 text-gray-500 text-xs">
        {createdAt && <div>Created: {createdAt}</div>}
        {updatedAt && <div>Updated: {updatedAt}</div>}
      </footer>
    </div>
  );
}
