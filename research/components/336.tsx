import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiEnterprisesCodeSecurityConfigurationsDefaults {
        export type PutResponse = {
            /**
             * Specifies which types of repository this security configuration is applied to by default.
            */
            default_for_new_repos?: "all" | "none" | "private_and_internal" | "public";
            configuration?: AutoViewInputSubTypes.code_security_configuration;
        };
    }
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
export type AutoViewInput = AutoViewInputSubTypes.IApiEnterprisesCodeSecurityConfigurationsDefaults.PutResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.

  // Helper to format ISO date-time strings
  const formatDate = (iso?: string): string =>
    iso ? new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }) : "-";

  // Badge generator for statuses
  const statusBadge = (status?: string): JSX.Element => {
    const mapping: Record<string, { label: string; classes: string }> = {
      enabled: { label: "Enabled", classes: "bg-green-100 text-green-800" },
      disabled: { label: "Disabled", classes: "bg-red-100 text-red-800" },
      not_set: { label: "Not Set", classes: "bg-gray-100 text-gray-800" },
    };
    const { label, classes } = mapping[status ?? "not_set"] ?? mapping.not_set;
    return (
      <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded ${classes}`}>
        {label}
      </span>
    );
  };

  // Badge for enforcement
  const enforcementBadge = (enf?: string): JSX.Element => {
    const mapping: Record<string, { label: string; classes: string }> = {
      enforced: { label: "Enforced", classes: "bg-green-200 text-green-800" },
      unenforced: { label: "Unenforced", classes: "bg-yellow-200 text-yellow-800" },
    };
    const { label, classes } = mapping[enf ?? "unenforced"] ?? mapping.unenforced;
    return (
      <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded ${classes}`}>
        {label}
      </span>
    );
  };

  // Human-readable default_for_new_repos
  const defaultMap: Record<string, string> = {
    all: "All",
    none: "None",
    private_and_internal: "Private & Internal",
    public: "Public",
  };
  const defaultLabel = value.default_for_new_repos
    ? defaultMap[value.default_for_new_repos]
    : "-";

  const cfg = value.configuration;
  if (!cfg) {
    return (
      <div className="p-4 bg-white rounded-lg shadow text-center text-gray-500">
        No configuration available.
      </div>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md flex flex-col space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-xl font-semibold text-gray-900 truncate">{cfg.name || "Unnamed Configuration"}</h2>
        <div className="flex items-center space-x-2">
          {enforcementBadge(cfg.enforcement)}
          <span className="text-sm text-gray-600">Default repos: {defaultLabel}</span>
        </div>
      </div>

      {/* Subheader */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-700">
          Type: {cfg.target_type?.replace(/(^\w|_\w)/g, (c) => c.replace("_", "").toUpperCase()) || "-"}
        </span>
        {cfg.id != null && (
          <span className="text-sm text-gray-500">ID: {cfg.id}</span>
        )}
      </div>

      {/* Description */}
      {cfg.description && (
        <p className="text-gray-600 text-sm line-clamp-2">{cfg.description}</p>
      )}

      {/* Feature statuses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Column 1 */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-800">Core Security</h3>
          <div className="flex flex-wrap gap-2">
            {statusBadge(cfg.advanced_security)}
            {statusBadge(cfg.dependency_graph)}
            {statusBadge(cfg.dependency_graph_autosubmit_action)}
            {statusBadge(cfg.dependabot_alerts)}
            {statusBadge(cfg.dependabot_security_updates)}
          </div>
          {cfg.dependency_graph_autosubmit_action_options?.labeled_runners != null && (
            <p className="text-sm text-gray-600">
              Auto-submit runners:{" "}
              {cfg.dependency_graph_autosubmit_action_options.labeled_runners
                ? "Labeled"
                : "Standard"}
            </p>
          )}
        </div>

        {/* Column 2 */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-800">Scanning & Alerts</h3>
          <div className="flex flex-wrap gap-2">
            {statusBadge(cfg.code_scanning_default_setup)}
            {statusBadge(cfg.code_scanning_delegated_alert_dismissal)}
            {statusBadge(cfg.secret_scanning)}
            {statusBadge(cfg.secret_scanning_push_protection)}
            {statusBadge(cfg.secret_scanning_delegated_bypass)}
            {statusBadge(cfg.secret_scanning_validity_checks)}
            {statusBadge(cfg.secret_scanning_non_provider_patterns)}
            {statusBadge(cfg.secret_scanning_generic_secrets)}
            {statusBadge(cfg.secret_scanning_delegated_alert_dismissal)}
            {statusBadge(cfg.private_vulnerability_reporting)}
          </div>
          {cfg.code_scanning_default_setup_options && (
            <p className="text-sm text-gray-600">
              Scan runner:{" "}
              {cfg.code_scanning_default_setup_options.runner_type === "labeled"
                ? cfg.code_scanning_default_setup_options.runner_label || "Labeled"
                : cfg.code_scanning_default_setup_options.runner_type === "standard"
                ? "Standard"
                : "Not Set"}
            </p>
          )}
          {cfg.secret_scanning_delegated_bypass_options?.reviewers?.length ? (
            <p className="text-sm text-gray-600">
              Bypass reviewers: {cfg.secret_scanning_delegated_bypass_options.reviewers.length}
            </p>
          ) : null}
        </div>
      </div>

      {/* Links & timestamps */}
      <div className="flex flex-col sm:flex-row sm:justify-between text-xs text-gray-500">
        <div className="flex flex-col space-y-1">
          {cfg.url && <span>API URL: {cfg.url}</span>}
          {cfg.html_url && <span>HTML URL: {cfg.html_url}</span>}
        </div>
        <div className="flex flex-col space-y-1">
          <span>Created: {formatDate(cfg.created_at)}</span>
          <span>Updated: {formatDate(cfg.updated_at)}</span>
        </div>
      </div>
    </div>
  );
}
