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
  const formatStatus = (
    status?: string
  ): { text: string; color: string } => {
    switch (status) {
      case "enabled":
        return { text: "Enabled", color: "bg-green-100 text-green-800" };
      case "disabled":
        return { text: "Disabled", color: "bg-red-100 text-red-800" };
      case "not_set":
        return { text: "Not Set", color: "bg-gray-100 text-gray-800" };
      case "enforced":
        return { text: "Enforced", color: "bg-green-100 text-green-800" };
      case "unenforced":
        return { text: "Unenforced", color: "bg-red-100 text-red-800" };
      default:
        return { text: "Not Set", color: "bg-gray-100 text-gray-800" };
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {value.map((item, index) => {
        const cfg = item.configuration;
        const defaultScope = item.default_for_new_repos ?? "—";
        const description =
          cfg?.description
            ? cfg.description.length > 100
              ? cfg.description.slice(0, 100) + "…"
              : cfg.description
            : "No description available";
        const statuses: [string, string | undefined][] = [
          ["Advanced Security", cfg?.advanced_security],
          ["Dependency Graph", cfg?.dependency_graph],
          ["Dependabot Alerts", cfg?.dependabot_alerts],
          ["Dependabot Security Updates", cfg?.dependabot_security_updates],
          ["Code Scanning Setup", cfg?.code_scanning_default_setup],
          ["Secret Scanning", cfg?.secret_scanning],
          ["Enforcement", cfg?.enforcement],
        ];

        return (
          <div
            key={cfg?.id ?? index}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="text-xs text-gray-500 mb-2">
              Default for New Repos:{" "}
              <span className="font-medium text-gray-700">
                {String(defaultScope)}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {cfg?.name ?? "Unnamed Configuration"}
            </h3>
            <p className="text-gray-600 text-sm mb-3">{description}</p>
            <div className="space-y-2">
              {statuses.map(([label, stat], idx) => {
                const { text, color } = formatStatus(stat);
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-700">{label}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${color}`}
                    >
                      {text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );

  // 3. Return the React element.
  //    Ensure all displayed data is appropriately filtered, transformed, and formatted according to the guidelines.
}
