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
  type Status = "enabled" | "disabled" | "not_set";
  const formatDate = (iso?: string): string =>
    iso
      ? new Date(iso).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "—";

  const createdAt = formatDate(value.created_at);
  const updatedAt = formatDate(value.updated_at);

  const statusIcons: Record<Status, JSX.Element> = {
    enabled: (
      <LucideReact.CheckCircle size={16} className="text-green-500" />
    ),
    disabled: <LucideReact.XCircle size={16} className="text-red-500" />,
    not_set: (
      <LucideReact.MinusCircle size={16} className="text-gray-400" />
    ),
  };

  const features: { label: string; status: Status }[] = [
    {
      label: "GitHub Advanced Security",
      status: (value.advanced_security as Status) ?? "not_set",
    },
    {
      label: "Dependency Graph",
      status: (value.dependency_graph as Status) ?? "not_set",
    },
    {
      label: "Auto Dependency Submission",
      status: (value.dependency_graph_autosubmit_action as Status) ??
        "not_set",
    },
    {
      label: "Dependabot Alerts",
      status: (value.dependabot_alerts as Status) ?? "not_set",
    },
    {
      label: "Dependabot Security Updates",
      status: (value.dependabot_security_updates as Status) ?? "not_set",
    },
    {
      label: "Code Scanning Default Setup",
      status: (value.code_scanning_default_setup as Status) ?? "not_set",
    },
    {
      label: "Secret Scanning",
      status: (value.secret_scanning as Status) ?? "not_set",
    },
  ];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {value.name ?? "Unnamed Configuration"}
        </h2>
        {value.target_type && (
          <span className="mt-2 sm:mt-0 inline-block px-2 py-1 text-xs font-medium text-white bg-indigo-600 rounded">
            {value.target_type.charAt(0).toUpperCase() +
              value.target_type.slice(1)}
          </span>
        )}
      </header>

      {value.description && (
        <p className="mt-3 text-gray-600 text-sm line-clamp-3">
          {value.description}
        </p>
      )}

      <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">
        {features.map(({ label, status }) => (
          <div
            key={label}
            className="flex items-center gap-2 text-sm text-gray-700"
          >
            {statusIcons[status]}
            <span className="truncate">{label}</span>
          </div>
        ))}
      </div>

      {value.enforcement && (
        <div className="mt-5 flex items-center text-sm text-gray-700">
          {value.enforcement === "enforced" ? (
            <LucideReact.CheckCircle
              size={16}
              className="text-green-500"
            />
          ) : (
            <LucideReact.XCircle size={16} className="text-red-500" />
          )}
          <span className="ml-2">
            Enforcement:{" "}
            <span className="font-medium">
              {value.enforcement.charAt(0).toUpperCase() +
                value.enforcement.slice(1)}
            </span>
          </span>
        </div>
      )}

      <footer className="mt-6 border-t pt-4 text-xs text-gray-500 space-y-1">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={14} className="text-gray-400" />
          <span>Created: {createdAt}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={14} className="text-gray-400" />
          <span>Updated: {updatedAt}</span>
        </div>
      </footer>
    </div>
  );
}
