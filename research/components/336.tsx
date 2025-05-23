import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiEnterprisesCodeSecurityConfigurationsDefaults {
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
export type AutoViewInput = AutoViewInputSubTypes.IApiEnterprisesCodeSecurityConfigurationsDefaults.PutResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { default_for_new_repos, configuration } = value;

  const defaultRepoLabels: Record<string, string> = {
    all: "All repositories",
    none: "No repositories",
    private_and_internal: "Private & internal",
    public: "Public",
  };

  const formatDate = (dateStr?: string): string =>
    dateStr ? new Date(dateStr).toLocaleString() : "N/A";

  const getStatusIcon = (status?: string): JSX.Element => {
    switch (status) {
      case "enabled":
        return <LucideReact.CheckCircle size={16} className="text-green-500" />;
      case "disabled":
        return <LucideReact.XCircle size={16} className="text-red-500" />;
      case "not_set":
        return <LucideReact.MinusCircle size={16} className="text-amber-500" />;
      default:
        return <LucideReact.HelpCircle size={16} className="text-gray-400" />;
    }
  };

  const getEnforcementIcon = (status?: string): JSX.Element => {
    return status === "enforced" ? (
      <LucideReact.ShieldCheck size={16} className="text-green-500" />
    ) : status === "unenforced" ? (
      <LucideReact.ShieldOff size={16} className="text-red-500" />
    ) : (
      <LucideReact.HelpCircle size={16} className="text-gray-400" />
    );
  };

  if (!configuration) {
    return (
      <div className="p-4 text-center text-gray-500">
        <LucideReact.AlertCircle size={24} className="mx-auto mb-2" />
        <span>No configuration available</span>
      </div>
    );
  }

  // Prepare a list of simple status items
  const statusItems: { label: string; status?: string }[] = [
    { label: "Advanced Security", status: configuration.advanced_security },
    { label: "Dependency Graph", status: configuration.dependency_graph },
    { label: "Auto Dependency Submission", status: configuration.dependency_graph_autosubmit_action },
    { label: "Dependabot Alerts", status: configuration.dependabot_alerts },
    { label: "Dependabot Security Updates", status: configuration.dependabot_security_updates },
    { label: "Code Scanning Setup", status: configuration.code_scanning_default_setup },
    { label: "Code Scanning Dismissal Delegation", status: configuration.code_scanning_delegated_alert_dismissal },
    { label: "Secret Scanning", status: configuration.secret_scanning },
    { label: "Push Protection", status: configuration.secret_scanning_push_protection },
    { label: "Delegated Bypass", status: configuration.secret_scanning_delegated_bypass },
    { label: "Validity Checks", status: configuration.secret_scanning_validity_checks },
    { label: "Non-Provider Patterns", status: configuration.secret_scanning_non_provider_patterns },
    { label: "Copilot Secret Scanning", status: configuration.secret_scanning_generic_secrets },
    { label: "Alert Dismissal Delegation", status: configuration.secret_scanning_delegated_alert_dismissal },
    { label: "Vulnerability Reporting", status: configuration.private_vulnerability_reporting },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center mb-3">
        <LucideReact.Settings size={20} className="text-gray-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">
          {configuration.name || "Unnamed Configuration"}
        </h2>
      </div>

      {/* Description */}
      {configuration.description && (
        <p className="text-sm text-gray-700 line-clamp-3 mb-4">
          {configuration.description}
        </p>
      )}

      {/* Default for new repositories */}
      <div className="flex items-center mb-4 text-sm text-gray-600">
        <LucideReact.GitBranch size={16} className="text-gray-500 mr-1" />
        <span>
          Default for new repos:{" "}
          {defaultRepoLabels[default_for_new_repos || ""] || "Not set"}
        </span>
      </div>

      {/* Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-4 text-sm">
        {statusItems.map(({ label, status }) => (
          <div key={label} className="flex items-center justify-between">
            <span className="text-gray-700">{label}</span>
            {getStatusIcon(status)}
          </div>
        ))}
      </div>

      {/* Dependency Graph - Runner Options */}
      {configuration.dependency_graph_autosubmit_action_options && (
        <div className="flex items-center justify-between mb-3 text-sm">
          <span className="text-gray-700">Uses Labeled Runners</span>
          {configuration.dependency_graph_autosubmit_action_options.labeled_runners ? (
            <LucideReact.CheckCircle size={16} className="text-green-500" />
          ) : (
            <LucideReact.XCircle size={16} className="text-red-500" />
          )}
        </div>
      )}

      {/* Code Scanning Runner Options */}
      {configuration.code_scanning_default_setup_options && (
        <div className="mb-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Runner Type</span>
            <span className="capitalize text-gray-800">
              {configuration.code_scanning_default_setup_options.runner_type ||
                "Not set"}
            </span>
          </div>
          {configuration.code_scanning_default_setup_options.runner_label && (
            <div className="flex items-center justify-between mt-1">
              <span className="text-gray-700">Runner Label</span>
              <span className="text-gray-800">
                {configuration.code_scanning_default_setup_options.runner_label}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Secret Scanning Bypass Reviewers */}
      {configuration.secret_scanning_delegated_bypass_options?.reviewers && (
        <div className="flex items-center mb-4 text-sm">
          <LucideReact.Users size={16} className="text-gray-500 mr-1" />
          <span>
            Bypass Reviewers:{" "}
            {configuration.secret_scanning_delegated_bypass_options.reviewers.length}
          </span>
        </div>
      )}

      {/* Enforcement */}
      <div className="flex items-center mb-4 text-sm">
        {getEnforcementIcon(configuration.enforcement)}
        <span className="ml-2 text-gray-700">
          Enforcement:{" "}
          {configuration.enforcement
            ? configuration.enforcement.charAt(0).toUpperCase() +
              configuration.enforcement.slice(1)
            : "Not set"}
        </span>
      </div>

      {/* Timestamps */}
      <div className="flex flex-col text-xs text-gray-500 space-y-1">
        <div className="flex items-center">
          <LucideReact.Calendar size={14} className="mr-1" />
          Created: {formatDate(configuration.created_at)}
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar size={14} className="mr-1" />
          Updated: {formatDate(configuration.updated_at)}
        </div>
      </div>
    </div>
  );
}
