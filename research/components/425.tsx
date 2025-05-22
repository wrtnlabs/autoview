import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
    code_scanning_delegated_alert_dismissal?:
      | "enabled"
      | "disabled"
      | "not_set";
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
    secret_scanning_delegated_alert_dismissal?:
      | "enabled"
      | "disabled"
      | "not_set";
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
  // Helper: format ISO date to "MMM D, YYYY"
  const formatDate = (iso?: string): string =>
    iso
      ? new Date(iso).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "—";

  // Helper: render status icons for "enabled" | "disabled" | "not_set"
  const renderStatus = (
    status?: "enabled" | "disabled" | "not_set",
  ): JSX.Element => {
    if (status === "enabled")
      return <LucideReact.CheckCircle className="text-green-500" size={16} />;
    if (status === "disabled")
      return <LucideReact.XCircle className="text-red-500" size={16} />;
    return <LucideReact.MinusCircle className="text-gray-400" size={16} />;
  };

  // Helper: render icon for target_type
  const renderTypeIcon = (
    type?: "global" | "organization" | "enterprise",
  ): JSX.Element => {
    switch (type) {
      case "global":
        return <LucideReact.Globe className="text-blue-500" size={16} />;
      case "organization":
        return <LucideReact.Users className="text-indigo-500" size={16} />;
      case "enterprise":
        return <LucideReact.Building className="text-gray-500" size={16} />;
      default:
        return <LucideReact.HelpCircle className="text-gray-400" size={16} />;
    }
  };

  // Empty state
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-4" />
        <p className="text-lg">No code security configurations found.</p>
      </div>
    );
  }

  // Main table view
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Name
            </th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
              Type
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Enforcement
            </th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
              Adv. Sec
            </th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
              Dep. Graph
            </th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
              Dep. Alerts
            </th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
              Code Scan
            </th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
              Secret Scan
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Updated
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {value.map((cfg, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              {/* Name */}
              <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-800">
                {cfg.name ?? "—"}
              </td>
              {/* Target Type */}
              <td className="px-4 py-3 text-center">
                {renderTypeIcon(cfg.target_type)}
              </td>
              {/* Enforcement */}
              <td className="px-4 py-3 whitespace-nowrap">
                {cfg.enforcement === "enforced" ? (
                  <span className="inline-flex items-center text-green-600">
                    <LucideReact.CheckCircle size={16} className="mr-1" />
                    Enforced
                  </span>
                ) : (
                  <span className="inline-flex items-center text-red-600">
                    <LucideReact.XCircle size={16} className="mr-1" />
                    Unenforced
                  </span>
                )}
              </td>
              {/* Advanced Security */}
              <td className="px-4 py-3 text-center">
                {renderStatus(cfg.advanced_security)}
              </td>
              {/* Dependency Graph */}
              <td className="px-4 py-3 text-center">
                {renderStatus(cfg.dependency_graph)}
              </td>
              {/* Dependabot Alerts */}
              <td className="px-4 py-3 text-center">
                {renderStatus(cfg.dependabot_alerts)}
              </td>
              {/* Code Scanning Default */}
              <td className="px-4 py-3 text-center">
                {renderStatus(cfg.code_scanning_default_setup)}
              </td>
              {/* Secret Scanning */}
              <td className="px-4 py-3 text-center">
                {renderStatus(cfg.secret_scanning)}
              </td>
              {/* Updated At */}
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <LucideReact.Calendar size={16} className="text-gray-400" />
                  <span>{formatDate(cfg.updated_at)}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
