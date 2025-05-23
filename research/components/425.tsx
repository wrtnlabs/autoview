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
  const hasData = Array.isArray(value) && value.length > 0;

  const formatDate = (dateStr?: string): string =>
    dateStr
      ? new Date(dateStr).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "—";

  const renderStatusIcon = (status?: "enabled" | "disabled" | "not_set") => {
    switch (status) {
      case "enabled":
        return <LucideReact.CheckCircle className="text-green-500" size={16} />;
      case "disabled":
        return <LucideReact.XCircle className="text-red-500" size={16} />;
      case "not_set":
        return <LucideReact.Clock className="text-amber-500" size={16} />;
      default:
        return <LucideReact.HelpCircle className="text-gray-400" size={16} />;
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-sm">No configurations available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {value.map((config, idx) => (
        <div
          key={config.id ?? idx}
          className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 truncate">
              {config.name ?? "Unnamed Configuration"}
            </h2>
            {config.target_type && (
              <span
                className={
                  "px-2 py-0.5 text-xs font-medium uppercase rounded " +
                  {
                    global: "bg-blue-100 text-blue-800",
                    organization: "bg-indigo-100 text-indigo-800",
                    enterprise: "bg-purple-100 text-purple-800",
                  }[config.target_type]
                }
              >
                {config.target_type}
              </span>
            )}
          </div>

          {/* Description */}
          {config.description && (
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
              {config.description}
            </p>
          )}

          {/* Feature Status Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 text-sm text-gray-700">
            <div className="flex items-center gap-1">
              {renderStatusIcon(config.advanced_security)}
              <span>Advanced Security</span>
            </div>
            <div className="flex items-center gap-1">
              {renderStatusIcon(config.dependency_graph)}
              <span>Dependency Graph</span>
            </div>
            <div className="flex items-center gap-1">
              {renderStatusIcon(config.dependency_graph_autosubmit_action)}
              <span>Auto-Submit</span>
            </div>
            <div className="flex items-center gap-1">
              {renderStatusIcon(config.dependabot_alerts)}
              <span>Dependabot Alerts</span>
            </div>
            <div className="flex items-center gap-1">
              {renderStatusIcon(config.dependabot_security_updates)}
              <span>Security Updates</span>
            </div>
            <div className="flex items-center gap-1">
              {renderStatusIcon(config.code_scanning_default_setup)}
              <span>Code Scanning</span>
            </div>
            <div className="flex items-center gap-1">
              {renderStatusIcon(config.secret_scanning)}
              <span>Secret Scanning</span>
            </div>
            <div className="flex items-center gap-1">
              {renderStatusIcon(config.secret_scanning_push_protection)}
              <span>Push Protection</span>
            </div>
            {config.enforcement && (
              <div className="flex items-center gap-1">
                {config.enforcement === "enforced" ? (
                  <LucideReact.Lock className="text-green-500" size={16} />
                ) : (
                  <LucideReact.Unlock className="text-gray-500" size={16} />
                )}
                <span>Enforcement</span>
              </div>
            )}
          </div>

          {/* Footer: Dates */}
          <div className="flex flex-col sm:flex-row sm:justify-between mt-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <LucideReact.Calendar size={14} />
              <span>Created: {formatDate(config.created_at)}</span>
            </div>
            <div className="flex items-center gap-1 mt-1 sm:mt-0">
              <LucideReact.Calendar size={14} />
              <span>Updated: {formatDate(config.updated_at)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // 3. Return the React element.
  //    Ensure all displayed data is appropriately filtered, transformed, and formatted according to the guidelines.
}
