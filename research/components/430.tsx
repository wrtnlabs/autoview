import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsCodeSecurityConfigurationsDefaults {
        export interface PutResponse {
            /**
             * Specifies which types of repository this security configuration is applied to by default.
            */
            default_for_new_repos?: "all" | "none" | "private_and_internal" | "public";
            configuration?: AutoViewInputSubTypes.code_security_configuration;
        }
    }
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsCodeSecurityConfigurationsDefaults.PutResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const defaultScopeMap: Record<string, string> = {
    all: "All Repositories",
    none: "None",
    private_and_internal: "Private & Internal",
    public: "Public",
  };
  const defaultScopeLabel =
    value.default_for_new_repos && defaultScopeMap[value.default_for_new_repos]
      ? defaultScopeMap[value.default_for_new_repos]
      : "Not Set";

  const config = value.configuration;
  const formatDate = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

  const targetTypeMap: Record<string, string> = {
    global: "Global",
    organization: "Organization",
    enterprise: "Enterprise",
  };

  const renderStatus = (
    status?: "enabled" | "disabled" | "not_set"
  ): React.ReactNode => {
    if (status === "enabled") {
      return (
        <div className="flex items-center gap-1 text-green-600">
          <LucideReact.CheckCircle size={16} />
          <span>Enabled</span>
        </div>
      );
    }
    if (status === "disabled") {
      return (
        <div className="flex items-center gap-1 text-red-600">
          <LucideReact.XCircle size={16} />
          <span>Disabled</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1 text-gray-400">
        <LucideReact.MinusCircle size={16} />
        <span>Not Set</span>
      </div>
    );
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!config) {
    return (
      <div className="flex items-center p-4 bg-gray-50 rounded-lg">
        <LucideReact.AlertCircle size={24} className="text-gray-400" />
        <span className="ml-2 text-gray-600">No Configuration Available</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {config.name ?? "Unnamed Configuration"}
        </h2>
        <span className="mt-1 sm:mt-0 text-sm uppercase text-gray-500">
          {config.target_type
            ? targetTypeMap[config.target_type] || config.target_type
            : "Global"}
        </span>
      </div>

      {/* Basic Settings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
        <div className="flex items-center gap-2">
          <LucideReact.GitBranch size={16} className="text-gray-400" />
          <span>Default for New Repos:</span>
          <span className="ml-auto font-medium text-gray-800">
            {defaultScopeLabel}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>Status Enforcement:</span>
          <span className="ml-auto flex items-center gap-1">
            {config.enforcement === "enforced" ? (
              <>
                <LucideReact.CheckCircle size={16} className="text-green-500" />
                <span className="text-green-600">Enforced</span>
              </>
            ) : (
              <>
                <LucideReact.XCircle size={16} className="text-red-500" />
                <span className="text-red-600">Unenforced</span>
              </>
            )}
          </span>
        </div>
      </div>

      {/* Security Features */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Security Features
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
          {/* Advanced Security */}
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <div className="flex items-center gap-2 text-gray-600">
              <LucideReact.ShieldCheck size={16} />
              <span>Advanced Security</span>
            </div>
            {renderStatus(config.advanced_security)}
          </div>

          {/* Dependency Graph */}
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <div className="flex items-center gap-2 text-gray-600">
              <LucideReact.Database size={16} />
              <span>Dependency Graph</span>
            </div>
            {renderStatus(config.dependency_graph)}
          </div>

          {/* Auto Submit Dependencies */}
          <div className="flex flex-col p-2 bg-gray-50 rounded">
            <div className="flex items-center justify-between text-gray-600">
              <div className="flex items-center gap-2">
                <LucideReact.RotateCcw size={16} />
                <span>Auto-Submit Dependencies</span>
              </div>
              {renderStatus(config.dependency_graph_autosubmit_action)}
            </div>
            {config.dependency_graph_autosubmit_action === "enabled" &&
              config.dependency_graph_autosubmit_action_options && (
                <div className="mt-1 ml-6 text-xs text-gray-500">
                  Runners:{" "}
                  {config.dependency_graph_autosubmit_action_options
                    .labeled_runners
                    ? "Labeled"
                    : "Standard"}
                </div>
              )}
          </div>

          {/* Dependabot Alerts */}
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <div className="flex items-center gap-2 text-gray-600">
              <LucideReact.ShieldAlert size={16} />
              <span>Dependabot Alerts</span>
            </div>
            {renderStatus(config.dependabot_alerts)}
          </div>

          {/* Security Updates */}
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <div className="flex items-center gap-2 text-gray-600">
              <LucideReact.ShieldCheck size={16} />
              <span>Security Updates</span>
            </div>
            {renderStatus(config.dependabot_security_updates)}
          </div>

          {/* Code Scanning */}
          <div className="flex flex-col p-2 bg-gray-50 rounded">
            <div className="flex items-center justify-between text-gray-600">
              <div className="flex items-center gap-2">
                <LucideReact.Code size={16} />
                <span>Code Scanning</span>
              </div>
              {renderStatus(config.code_scanning_default_setup)}
            </div>
            {config.code_scanning_default_setup === "enabled" &&
              config.code_scanning_default_setup_options && (
                <div className="mt-1 ml-6 text-xs text-gray-500">
                  Runner:{" "}
                  {config.code_scanning_default_setup_options.runner_type ===
                  "labeled"
                    ? config.code_scanning_default_setup_options.runner_label ||
                      "Labeled"
                    : config.code_scanning_default_setup_options.runner_type ===
                        "standard"
                    ? "Standard"
                    : "Not Set"}
                </div>
              )}
          </div>

          {/* Delegated Dismissal */}
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <div className="flex items-center gap-2 text-gray-600">
              <LucideReact.ShieldOff size={16} />
              <span>Delegated Dismissal</span>
            </div>
            {renderStatus(config.code_scanning_delegated_alert_dismissal)}
          </div>

          {/* Secret Scanning */}
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <div className="flex items-center gap-2 text-gray-600">
              <LucideReact.Lock size={16} />
              <span>Secret Scanning</span>
            </div>
            {renderStatus(config.secret_scanning)}
          </div>

          {/* Push Protection */}
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <div className="flex items-center gap-2 text-gray-600">
              <LucideReact.ShieldPlus size={16} />
              <span>Push Protection</span>
            </div>
            {renderStatus(config.secret_scanning_push_protection)}
          </div>

          {/* Delegated Bypass */}
          <div className="flex flex-col p-2 bg-gray-50 rounded">
            <div className="flex items-center justify-between text-gray-600">
              <div className="flex items-center gap-2">
                <LucideReact.UserCheck size={16} />
                <span>Delegated Bypass</span>
              </div>
              {renderStatus(config.secret_scanning_delegated_bypass)}
            </div>
            {config.secret_scanning_delegated_bypass === "enabled" &&
              config.secret_scanning_delegated_bypass_options && (
                <div className="mt-1 ml-6 text-xs text-gray-500">
                  Reviewers:{" "}
                  {
                    config.secret_scanning_delegated_bypass_options.reviewers
                      ?.length ?? 0
                  }
                </div>
              )}
          </div>

          {/* Validity Checks */}
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <div className="flex items-center gap-2 text-gray-600">
              <LucideReact.ShieldCheck size={16} />
              <span>Validity Checks</span>
            </div>
            {renderStatus(config.secret_scanning_validity_checks)}
          </div>

          {/* Non-Provider Patterns */}
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <div className="flex items-center gap-2 text-gray-600">
              <LucideReact.Tag size={16} />
              <span>Non-Provider Patterns</span>
            </div>
            {renderStatus(config.secret_scanning_non_provider_patterns)}
          </div>

          {/* Copilot Secrets */}
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <div className="flex items-center gap-2 text-gray-600">
              <LucideReact.Key size={16} />
              <span>Copilot Secrets</span>
            </div>
            {renderStatus(config.secret_scanning_generic_secrets)}
          </div>

          {/* Secret Dismissal */}
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <div className="flex items-center gap-2 text-gray-600">
              <LucideReact.ShieldOff size={16} />
              <span>Secret Dismissal</span>
            </div>
            {renderStatus(config.secret_scanning_delegated_alert_dismissal)}
          </div>

          {/* Vulnerability Reporting */}
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <div className="flex items-center gap-2 text-gray-600">
              <LucideReact.Bug size={16} />
              <span>Vulnerability Reporting</span>
            </div>
            {renderStatus(config.private_vulnerability_reporting)}
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="mt-4 text-xs text-gray-500 space-y-1">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={14} />
          <span>Created: {formatDate(config.created_at)}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={14} />
          <span>Updated: {formatDate(config.updated_at)}</span>
        </div>
        {config.html_url && (
          <div className="flex items-center gap-1">
            <LucideReact.Link size={14} />
            <a
              href={config.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-500 truncate"
            >
              View on GitHub
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
