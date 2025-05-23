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
  const name = value.name ?? "Unnamed Configuration";
  const targetType = value.target_type ?? "not_set";
  const description = value.description;
  const createdAt = value.created_at ? new Date(value.created_at).toLocaleString() : undefined;
  const updatedAt = value.updated_at ? new Date(value.updated_at).toLocaleString() : undefined;
  const isEnforced = value.enforcement === "enforced";

  // Map feature flags to display labels and statuses
  const features: { label: string; status?: "enabled" | "disabled" | "not_set" }[] = [
    { label: "Advanced Security", status: value.advanced_security },
    { label: "Dependency Graph", status: value.dependency_graph },
    { label: "Dependency Autosubmit", status: value.dependency_graph_autosubmit_action },
    { label: "Dependabot Alerts", status: value.dependabot_alerts },
    { label: "Dependabot Security Updates", status: value.dependabot_security_updates },
    { label: "Code Scanning Setup", status: value.code_scanning_default_setup },
    { label: "Secret Scanning", status: value.secret_scanning },
    { label: "Push Protection", status: value.secret_scanning_push_protection },
    { label: "Private Vulnerability Reporting", status: value.private_vulnerability_reporting },
  ].filter((f) => f.status !== undefined);

  // Helper to render status icon
  const renderStatusIcon = (status?: string) => {
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
  return (
    <div className="p-6 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-900 truncate">{name}</h2>
          <span className="capitalize bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
            {targetType}
          </span>
          {value.enforcement && (
            <div className="flex items-center gap-1">
              {isEnforced ? (
                <LucideReact.ShieldCheck className="text-green-500" size={16} />
              ) : (
                <LucideReact.ShieldOff className="text-red-500" size={16} />
              )}
              <span className="text-xs text-gray-700">{isEnforced ? "Enforced" : "Unenforced"}</span>
            </div>
          )}
        </div>
      </div>

      {description && (
        <p className="mt-2 text-gray-600 text-sm line-clamp-3">{description}</p>
      )}

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-2">
            {renderStatusIcon(feature.status)}
            <span className="text-sm text-gray-700">{feature.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 text-gray-500 text-xs flex flex-wrap gap-4">
        {createdAt && (
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={16} />
            <span>Created: {createdAt}</span>
          </div>
        )}
        {updatedAt && (
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={16} />
            <span>Updated: {updatedAt}</span>
          </div>
        )}
        {value.html_url && (
          <div className="flex items-center gap-1 truncate">
            <LucideReact.Link size={16} />
            <span className="truncate">{value.html_url}</span>
          </div>
        )}
      </div>
    </div>
  );
}
