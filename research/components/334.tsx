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
  const name = value.name ?? "Unnamed Configuration";
  const description = value.description;
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

  // Badge generators
  const getStatusBadge = (label: string, status?: string) => {
    if (!status) return null;
    const text = status === "not_set" ? "Not Set" : status.charAt(0).toUpperCase() + status.slice(1);
    const colors =
      status === "enabled"
        ? { bg: "bg-green-100", text: "text-green-800" }
        : status === "disabled"
        ? { bg: "bg-red-100", text: "text-red-800" }
        : { bg: "bg-gray-100", text: "text-gray-500" };
    return (
      <span
        key={label}
        className={`${colors.bg} ${colors.text} px-2 py-0.5 rounded-full text-xs font-medium`}
      >
        {label}: {text}
      </span>
    );
  };

  const getScopeBadge = (scope?: string) => {
    if (!scope) return null;
    const caps = scope.charAt(0).toUpperCase() + scope.slice(1);
    const palette =
      scope === "global"
        ? { bg: "bg-blue-100", text: "text-blue-800" }
        : scope === "organization"
        ? { bg: "bg-indigo-100", text: "text-indigo-800" }
        : { bg: "bg-purple-100", text: "text-purple-800" };
    return (
      <span className={`${palette.bg} ${palette.text} px-2 py-0.5 rounded-full text-xs font-medium`}>
        Scope: {caps}
      </span>
    );
  };

  const enforcementBadge = (status?: string) => {
    if (!status) return null;
    const caps = status.charAt(0).toUpperCase() + status.slice(1);
    const colors =
      status === "enforced"
        ? { bg: "bg-green-50", text: "text-green-700" }
        : { bg: "bg-red-50", text: "text-red-700" };
    return (
      <span className={`${colors.bg} ${colors.text} px-2 py-0.5 rounded-full text-xs font-semibold`}>
        {caps}
      </span>
    );
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 truncate">{name}</h2>
        <div className="mt-2 sm:mt-0 flex flex-wrap gap-2">
          {getScopeBadge(value.target_type)}
          {enforcementBadge(value.enforcement)}
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{description}</p>
      )}

      {/* Feature Status Badges */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {getStatusBadge("Advanced Security", value.advanced_security)}
        {getStatusBadge("Dependency Graph", value.dependency_graph)}
        {getStatusBadge("Dependabot Alerts", value.dependabot_alerts)}
        {getStatusBadge("Dependabot Security Updates", value.dependabot_security_updates)}
        {getStatusBadge("Code Scanning Setup", value.code_scanning_default_setup)}
        {getStatusBadge("Secret Scanning", value.secret_scanning)}
        {getStatusBadge("Private Vuln Reporting", value.private_vulnerability_reporting)}
      </div>

      {/* Dates */}
      <div className="flex text-xs text-gray-500 space-x-4">
        {createdAt && <span>Created: {createdAt}</span>}
        {updatedAt && <span>Updated: {updatedAt}</span>}
      </div>
    </div>
  );
}
