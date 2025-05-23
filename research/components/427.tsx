import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
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
export type AutoViewInput = AutoViewInputSubTypes.code_security_default_configurations;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const getStatusIcon = (status?: "enabled" | "disabled" | "not_set") => {
    if (status === "enabled") {
      return <LucideReact.CheckCircle className="text-green-500" size={16} />;
    }
    if (status === "disabled") {
      return <LucideReact.XCircle className="text-red-500" size={16} />;
    }
    return <LucideReact.MinusCircle className="text-gray-400" size={16} />;
  };

  const formatDate = (iso?: string) =>
    iso ? new Date(iso).toLocaleString([], { dateStyle: "medium", timeStyle: "short" }) : "—";

  const truncate = (text: string | undefined, length = 100) =>
    text && text.length > length ? text.substring(0, length) + "…" : text || "—";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {value.map((entry, idx) => {
        const config = entry.configuration;
        if (!config) return null;
        return (
          <div key={idx} className="p-4 bg-white rounded-lg shadow-md flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {config.name || "Unnamed Configuration"}
              </h2>
              {config.html_url && (
                <a
                  href={config.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="View configuration"
                >
                  <LucideReact.Link2 size={20} />
                </a>
              )}
            </div>

            {/* Default for new repos */}
            {entry.default_for_new_repos !== undefined && (
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <LucideReact.GitBranch size={16} className="mr-1" />
                <span>
                  Default visibility:{" "}
                  <span className="font-medium">{String(entry.default_for_new_repos)}</span>
                </span>
              </div>
            )}

            {/* Enforcement Badge */}
            {config.enforcement && (
              <div
                className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full mb-3 ${
                  config.enforcement === "enforced"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {config.enforcement.charAt(0).toUpperCase() + config.enforcement.slice(1)}
              </div>
            )}

            {/* Description */}
            {config.description && (
              <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                {truncate(config.description, 120)}
              </p>
            )}

            {/* Feature Status Grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 flex-grow">
              <div className="flex items-center text-sm text-gray-700">
                {getStatusIcon(config.advanced_security)}
                <span className="ml-2 truncate">Advanced Security</span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                {getStatusIcon(config.dependency_graph)}
                <span className="ml-2 truncate">Dependency Graph</span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                {getStatusIcon(config.dependabot_alerts)}
                <span className="ml-2 truncate">Dependabot Alerts</span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                {getStatusIcon(config.dependabot_security_updates)}
                <span className="ml-2 truncate">Security Updates</span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                {getStatusIcon(config.code_scanning_default_setup)}
                <span className="ml-2 truncate">Code Scanning</span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                {getStatusIcon(config.secret_scanning)}
                <span className="ml-2 truncate">Secret Scanning</span>
              </div>
            </div>

            {/* Timestamps */}
            <div className="flex items-center text-xs text-gray-500 justify-between">
              <div className="flex items-center">
                <LucideReact.Calendar size={14} className="mr-1" />
                <span>Created: {formatDate(config.created_at)}</span>
              </div>
              <div className="flex items-center">
                <LucideReact.RefreshCw size={14} className="mr-1" />
                <span>Updated: {formatDate(config.updated_at)}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
