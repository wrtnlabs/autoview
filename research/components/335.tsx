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
export type AutoViewInput = AutoViewInputSubTypes.code_security_configuration;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const capitalize = (s?: string) =>
    s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
  const createdAt = value.created_at
    ? new Date(value.created_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : undefined;
  const updatedAt = value.updated_at
    ? new Date(value.updated_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : undefined;

  type StatusItem = { key: string; label: string; val?: string };
  const statusMap: StatusItem[] = [
    { key: "advanced_security", label: "Advanced Security", val: value.advanced_security },
    { key: "dependency_graph", label: "Dependency Graph", val: value.dependency_graph },
    { key: "dependency_graph_autosubmit_action", label: "Auto Dependency Submission", val: value.dependency_graph_autosubmit_action },
    { key: "dependabot_alerts", label: "Dependabot Alerts", val: value.dependabot_alerts },
    { key: "dependabot_security_updates", label: "Dependabot Security Updates", val: value.dependabot_security_updates },
    { key: "code_scanning_default_setup", label: "Code Scanning Setup", val: value.code_scanning_default_setup },
    { key: "code_scanning_delegated_alert_dismissal", label: "Scanning Alert Dismissal", val: value.code_scanning_delegated_alert_dismissal },
    { key: "secret_scanning", label: "Secret Scanning", val: value.secret_scanning },
    { key: "secret_scanning_push_protection", label: "Push Protection", val: value.secret_scanning_push_protection },
    { key: "secret_scanning_delegated_bypass", label: "Delegated Bypass", val: value.secret_scanning_delegated_bypass },
    { key: "secret_scanning_validity_checks", label: "Validity Checks", val: value.secret_scanning_validity_checks },
    { key: "secret_scanning_non_provider_patterns", label: "Non-Provider Patterns", val: value.secret_scanning_non_provider_patterns },
    { key: "secret_scanning_generic_secrets", label: "Copilot Scanning", val: value.secret_scanning_generic_secrets },
    { key: "secret_scanning_delegated_alert_dismissal", label: "Delegated Alert Dismissal", val: value.secret_scanning_delegated_alert_dismissal },
    { key: "private_vulnerability_reporting", label: "Vulnerability Reporting", val: value.private_vulnerability_reporting },
  ];
  const filteredStatuses = statusMap.filter(
    (item) => item.val && item.val !== "not_set"
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.name ?? "Unnamed Configuration"}
        </h2>
        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
          {capitalize(value.target_type)}
        </span>
      </div>

      {value.description && (
        <p className="text-gray-700 text-sm mb-3 line-clamp-3">
          {value.description}
        </p>
      )}

      {value.html_url || value.url ? (
        <div className="flex items-center text-blue-500 text-sm mb-4 truncate">
          <LucideReact.Link size={16} className="flex-shrink-0" />
          <span className="ml-1 truncate">
            {value.html_url ?? value.url}
          </span>
        </div>
      ) : null}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredStatuses.map((item) => (
          <div key={item.key} className="flex items-center gap-2">
            {item.val === "enabled" ? (
              <LucideReact.CheckCircle
                className="text-green-500 flex-shrink-0"
                size={16}
              />
            ) : (
              <LucideReact.XCircle
                className="text-red-500 flex-shrink-0"
                size={16}
              />
            )}
            <span className="text-gray-800 text-sm">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4 text-gray-500 text-xs">
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
}
