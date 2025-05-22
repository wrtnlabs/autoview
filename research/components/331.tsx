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
  const configs = Array.isArray(value) ? value : [];

  // Format ISO date into a short, readable string.
  function formatDate(dateStr?: string): string {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  // Render a status badge with color coding for "enabled", "disabled", "not_set", "enforced", "unenforced".
  function renderBadge(status?: string): React.ReactNode {
    let colorClasses = "bg-gray-200 text-gray-700";
    if (status === "enabled" || status === "enforced") {
      colorClasses = "bg-green-100 text-green-800";
    } else if (status === "disabled" || status === "unenforced") {
      colorClasses = "bg-red-100 text-red-800";
    } else if (status === "not_set") {
      colorClasses = "bg-yellow-100 text-yellow-800";
    }
    return (
      <span
        className={`inline-block px-2 py-0.5 text-xs font-semibold rounded ${colorClasses}`}
      >
        {status ?? "-"}
      </span>
    );
  }

  // Main render
  return (
    <div className="space-y-6">
      {configs.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          No configurations available.
        </div>
      ) : (
        configs.map((cfg, idx) => (
          <div
            key={idx}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Header: Name, Type, Enforcement */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2
                className="text-lg font-semibold text-gray-800 truncate"
                title={cfg.name}
              >
                {cfg.name || "Unnamed Configuration"}
              </h2>
              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                <span className="text-sm text-gray-500 capitalize">
                  {cfg.target_type || "Unknown"}
                </span>
                {renderBadge(cfg.enforcement)}
              </div>
            </div>

            {/* Optional description, truncated to two lines */}
            {cfg.description && (
              <p
                className="mt-2 text-gray-600 line-clamp-2"
                title={cfg.description}
              >
                {cfg.description}
              </p>
            )}

            {/* Feature status grid */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <div className="text-xs text-gray-500">Advanced Security</div>
                {renderBadge(cfg.advanced_security)}
              </div>
              <div>
                <div className="text-xs text-gray-500">Dependency Graph</div>
                {renderBadge(cfg.dependency_graph)}
              </div>
              <div>
                <div className="text-xs text-gray-500">Dependabot Alerts</div>
                {renderBadge(cfg.dependabot_alerts)}
              </div>
              <div>
                <div className="text-xs text-gray-500">
                  Dependabot Updates
                </div>
                {renderBadge(cfg.dependabot_security_updates)}
              </div>
              <div>
                <div className="text-xs text-gray-500">
                  Code Scanning Setup
                </div>
                {renderBadge(cfg.code_scanning_default_setup)}
              </div>
              <div>
                <div className="text-xs text-gray-500">Secret Scanning</div>
                {renderBadge(cfg.secret_scanning)}
              </div>
            </div>

            {/* Timestamps */}
            <div className="mt-4 flex flex-col sm:flex-row sm:space-x-6 text-xs text-gray-500">
              <div>Created: {formatDate(cfg.created_at)}</div>
              <div>Updated: {formatDate(cfg.updated_at)}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
