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
  const formatDate = (iso?: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { dateStyle: "medium", timeStyle: "short" });
  };

  const getStateBadge = (
    state?: "enabled" | "disabled" | "not_set"
  ): React.ReactNode => {
    if (!state) return null;
    const map: Record<string, [string, string, string]> = {
      enabled: ["Enabled", "bg-green-100", "text-green-800"],
      disabled: ["Disabled", "bg-red-100", "text-red-800"],
      not_set: ["Not Set", "bg-gray-100", "text-gray-800"],
    };
    const [label, bg, text] = map[state] || map.not_set;
    return (
      <span
        className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${bg} ${text}`}
      >
        {label}
      </span>
    );
  };

  // Prepare feature list
  const features: { label: string; status?: "enabled" | "disabled" | "not_set" }[] = [
    { label: "Advanced Security", status: value.advanced_security },
    { label: "Dependency Graph", status: value.dependency_graph },
    { label: "Autosubmit", status: value.dependency_graph_autosubmit_action },
    { label: "Dependabot Alerts", status: value.dependabot_alerts },
    { label: "Dependabot Security Updates", status: value.dependabot_security_updates },
    { label: "Code Scanning Setup", status: value.code_scanning_default_setup },
    { label: "Delegated Scan Dismissal", status: value.code_scanning_delegated_alert_dismissal },
    { label: "Secret Scanning", status: value.secret_scanning },
    { label: "Push Protection", status: value.secret_scanning_push_protection },
    { label: "Delegated Bypass", status: value.secret_scanning_delegated_bypass },
    { label: "Validity Checks", status: value.secret_scanning_validity_checks },
    { label: "Non-Provider Patterns", status: value.secret_scanning_non_provider_patterns },
    { label: "Copilot Scanning", status: value.secret_scanning_generic_secrets },
    { label: "Delegated Alert Dismissal", status: value.secret_scanning_delegated_alert_dismissal },
    { label: "Vulnerability Reporting", status: value.private_vulnerability_reporting },
  ];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <header>
        <h2 className="text-xl font-semibold text-gray-900 truncate">
          {value.name || "Unnamed Configuration"}
        </h2>
        <div className="mt-1 text-sm text-gray-500">
          {value.target_type
            ? value.target_type.charAt(0).toUpperCase() + value.target_type.slice(1)
            : "Type Unknown"}
        </div>
      </header>

      {value.description && (
        <p className="mt-3 text-gray-700 line-clamp-2">{value.description}</p>
      )}

      <section className="mt-4 grid grid-cols-2 gap-2">
        {features.map((feat, i) =>
          feat.status ? (
            <div key={i} className="flex items-center space-x-2">
              <span className="text-gray-700 text-sm">{feat.label}:</span>
              {getStateBadge(feat.status)}
            </div>
          ) : null
        )}
      </section>

      {/* Sub-options */}
      {value.dependency_graph_autosubmit_action_options?.labeled_runners != null && (
        <div className="mt-3 ml-4 text-sm text-gray-600">
          <span className="font-medium">Autosubmit Runner:</span>{" "}
          {value.dependency_graph_autosubmit_action_options.labeled_runners
            ? "Labeled"
            : "Standard"}
        </div>
      )}

      {value.code_scanning_default_setup_options && (
        <div className="mt-3 ml-4 space-y-1 text-sm text-gray-600">
          <div>
            <span className="font-medium">Scanner Runner:</span>{" "}
            {value.code_scanning_default_setup_options.runner_type || "Not Set"}
          </div>
          {value.code_scanning_default_setup_options.runner_label && (
            <div>
              <span className="font-medium">Runner Label:</span>{" "}
              {value.code_scanning_default_setup_options.runner_label}
            </div>
          )}
        </div>
      )}

      {value.secret_scanning_delegated_bypass_options?.reviewers && (
        <div className="mt-3 ml-4">
          <span className="font-medium text-gray-700 text-sm">
            Bypass Reviewers:
          </span>
          <div className="mt-1 flex flex-wrap gap-1">
            {value.secret_scanning_delegated_bypass_options.reviewers.map(
              (r, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-gray-200 text-gray-800 text-xs rounded"
                >
                  {r.reviewer_type}:{r.reviewer_id}
                </span>
              )
            )}
          </div>
        </div>
      )}

      {/* Enforcement */}
      {value.enforcement && (
        <div className="mt-4 flex items-center space-x-2">
          <span className="text-gray-700 text-sm">Enforcement:</span>
          {value.enforcement === "enforced" ? (
            <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">
              Enforced
            </span>
          ) : (
            <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800">
              Unenforced
            </span>
          )}
        </div>
      )}

      {/* URLs */}
      {value.html_url && (
        <div className="mt-4 text-blue-600 text-sm truncate">{value.html_url}</div>
      )}

      {/* Timestamps */}
      {(value.created_at || value.updated_at) && (
        <div className="mt-4 text-xs text-gray-400 space-y-1">
          {value.created_at && <div>Created: {formatDate(value.created_at)}</div>}
          {value.updated_at && <div>Updated: {formatDate(value.updated_at)}</div>}
        </div>
      )}
    </article>
  );
}
