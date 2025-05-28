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
  const formattedCreated = value.created_at
    ? new Date(value.created_at).toLocaleDateString()
    : 'N/A';
  const formattedUpdated = value.updated_at
    ? new Date(value.updated_at).toLocaleDateString()
    : 'N/A';

  // Choose an icon for the scope/type
  const ScopeIcon =
    value.target_type === 'global'
      ? LucideReact.Globe
      : value.target_type === 'organization'
      ? LucideReact.Users
      : LucideReact.Building;

  // Prepare a list of core feature statuses
  const featureStatuses: { label: string; status?: string }[] = [
    { label: 'Advanced Security', status: value.advanced_security },
    { label: 'Dependency Graph', status: value.dependency_graph },
    { label: 'Dependabot Alerts', status: value.dependabot_alerts },
    { label: 'Dependabot Sec. Updates', status: value.dependabot_security_updates },
    { label: 'Code Scanning Setup', status: value.code_scanning_default_setup ?? undefined },
    { label: 'Secret Scanning', status: value.secret_scanning },
    { label: 'Private Vuln. Reporting', status: value.private_vulnerability_reporting },
  ];

  // Map a status to an icon
  const renderStatusIcon = (status?: string) => {
    if (status === 'enabled')
      return <LucideReact.CheckCircle size={16} className="text-green-500" aria-label="Enabled" />;
    if (status === 'disabled')
      return <LucideReact.XCircle size={16} className="text-red-500" aria-label="Disabled" />;
    return <LucideReact.MinusCircle size={16} className="text-amber-500" aria-label="Not set" />;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header: Name and Enforcement */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LucideReact.Code size={20} className="text-indigo-500" aria-label="Configuration" />
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {value.name ?? 'Unnamed Configuration'}
          </h2>
        </div>
        <div className="flex items-center gap-1">
          {value.enforcement === 'enforced' ? (
            <LucideReact.CheckCircle
              size={20}
              className="text-green-500"
              aria-label="Enforced"
            />
          ) : (
            <LucideReact.XCircle
              size={20}
              className="text-red-500"
              aria-label="Unenforced"
            />
          )}
        </div>
      </div>

      {/* Description */}
      {value.description && (
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {value.description}
        </p>
      )}

      {/* Meta: Scope and Dates */}
      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <ScopeIcon size={16} className="text-gray-400" aria-label={value.target_type} />
          <span className="capitalize">{value.target_type}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-400" aria-label="Created date" />
          <span>Created: {formattedCreated}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-400" aria-label="Updated date" />
          <span>Updated: {formattedUpdated}</span>
        </div>
      </div>

      {/* Feature Status Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
        {featureStatuses.map(({ label, status }) => (
          <div key={label} className="flex items-center gap-1">
            {renderStatusIcon(status)}
            <span className="text-sm text-gray-700">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
