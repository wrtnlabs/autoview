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
  const targetTypeLabel = value.target_type
    ? value.target_type.charAt(0).toUpperCase() + value.target_type.slice(1)
    : "Unknown";
  const formattedUpdatedAt = value.updated_at
    ? new Date(value.updated_at).toLocaleString()
    : undefined;

  // Build a list of feature statuses, filtering out any "not_set" or undefined entries.
  type Feature = { label: string; status: "enabled" | "disabled" };
  const features: Feature[] = [
    { label: "Advanced Security", status: value.advanced_security as any },
    { label: "Dependency Graph", status: value.dependency_graph as any },
    { label: "Autosubmit Dependencies", status: value.dependency_graph_autosubmit_action as any },
    { label: "Dependabot Alerts", status: value.dependabot_alerts as any },
    { label: "Dependabot Security Updates", status: value.dependabot_security_updates as any },
    { label: "Code Scanning Default Setup", status: value.code_scanning_default_setup as any },
    { label: "Delegated Scan Dismissal", status: value.code_scanning_delegated_alert_dismissal as any },
    { label: "Secret Scanning", status: value.secret_scanning as any },
    { label: "Push Protection", status: value.secret_scanning_push_protection as any },
    { label: "Bypass Delegation", status: value.secret_scanning_delegated_bypass as any },
    { label: "Validity Checks", status: value.secret_scanning_validity_checks as any },
    { label: "Non-Provider Patterns", status: value.secret_scanning_non_provider_patterns as any },
    { label: "Copilot Secrets", status: value.secret_scanning_generic_secrets as any },
    { label: "Alert Dismissal (Secret)", status: value.secret_scanning_delegated_alert_dismissal as any },
    { label: "Vulnerability Reporting", status: value.private_vulnerability_reporting as any },
  ].filter((f): f is Feature => f.status === "enabled" || f.status === "disabled");

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-4 flex flex-col space-y-4">
      {/* Header: Name, Type & Enforcement */}
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-gray-800 truncate">{value.name || "Unnamed Configuration"}</h2>
          <div className="mt-1 flex items-center space-x-2">
            <span className="uppercase text-xs font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
              {targetTypeLabel}
            </span>
            {value.enforcement === "enforced" ? (
              <div className="flex items-center text-green-600 text-sm">
                <LucideReact.Lock size={16} /><span className="ml-1">Enforced</span>
              </div>
            ) : (
              <div className="flex items-center text-red-600 text-sm">
                <LucideReact.Unlock size={16} /><span className="ml-1">Unenforced</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      {value.description && (
        <p className="text-sm text-gray-600 line-clamp-2">{value.description}</p>
      )}

      {/* Features Grid */}
      {features.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {features.map((feat) => (
            <div key={feat.label} className="flex items-center space-x-1 text-sm text-gray-700">
              {feat.status === "enabled" ? (
                <LucideReact.CheckCircle className="text-green-500" size={16} />
              ) : (
                <LucideReact.XCircle className="text-red-500" size={16} />
              )}
              <span className="truncate">{feat.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Footer: Last Updated */}
      {formattedUpdatedAt && (
        <div className="text-xs text-gray-500 flex items-center">
          <LucideReact.Calendar size={14} className="mr-1" />
          <span>Updated: {formattedUpdatedAt}</span>
        </div>
      )}
    </div>
  );
}
