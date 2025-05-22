import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiOrgsCodeSecurityConfigurationsDefaults {
    export type PutResponse = {
      /**
       * Specifies which types of repository this security configuration is applied to by default.
       */
      default_for_new_repos?:
        | "all"
        | "none"
        | "private_and_internal"
        | "public";
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
    code_scanning_delegated_alert_dismissal?:
      | "enabled"
      | "disabled"
      | "not_set";
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
    secret_scanning_delegated_alert_dismissal?:
      | "enabled"
      | "disabled"
      | "not_set";
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
export type AutoViewInput =
  AutoViewInputSubTypes.IApiOrgsCodeSecurityConfigurationsDefaults.PutResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const defaultMap: Record<
    NonNullable<AutoViewInput["default_for_new_repos"]>,
    string
  > = {
    all: "All repositories",
    none: "No repositories",
    private_and_internal: "Private & internal repos",
    public: "Public repositories",
  };
  const defaultLabel = value.default_for_new_repos
    ? defaultMap[value.default_for_new_repos]
    : "Not specified";

  const config = value.configuration;

  const scopeMap: Record<
    NonNullable<
      AutoViewInputSubTypes.code_security_configuration["target_type"]
    >,
    string
  > = {
    global: "Global",
    organization: "Organization",
    enterprise: "Enterprise",
  };
  const targetScope = config?.target_type
    ? scopeMap[config.target_type]
    : "Not specified";

  const enforcementLabel =
    config?.enforcement === "enforced"
      ? "Enforced"
      : config?.enforcement === "unenforced"
        ? "Unenforced"
        : "Not specified";

  const createdAt = config?.created_at
    ? new Date(config.created_at).toLocaleString()
    : "";
  const updatedAt = config?.updated_at
    ? new Date(config.updated_at).toLocaleString()
    : "";

  const name = config?.name ?? "Unnamed Configuration";
  const description = config?.description ?? "";

  type Status = "enabled" | "disabled" | "not_set" | undefined;
  const renderStatusIcon = (status: Status) => {
    if (status === "enabled") {
      return <LucideReact.CheckCircle className="text-green-500" size={16} />;
    }
    if (status === "disabled") {
      return <LucideReact.XCircle className="text-red-500" size={16} />;
    }
    return <LucideReact.MinusCircle className="text-gray-400" size={16} />;
  };

  const features: {
    key: keyof AutoViewInputSubTypes.code_security_configuration;
    label: string;
  }[] = [
    ["advanced_security", "Advanced Security"],
    ["dependency_graph", "Dependency Graph"],
    ["dependency_graph_autosubmit_action", "Auto-Dependency Submission"],
    ["dependabot_alerts", "Dependabot Alerts"],
    ["dependabot_security_updates", "Dependabot Security Updates"],
    ["code_scanning_default_setup", "Code Scanning Setup"],
    ["code_scanning_delegated_alert_dismissal", "Scanning Dismissal"],
    ["secret_scanning", "Secret Scanning"],
    ["secret_scanning_push_protection", "Push Protection"],
    ["secret_scanning_delegated_bypass", "Delegated Bypass"],
    ["secret_scanning_validity_checks", "Validity Checks"],
    ["secret_scanning_non_provider_patterns", "Non-Provider Patterns"],
    ["secret_scanning_generic_secrets", "Copilot Scanning"],
    ["secret_scanning_delegated_alert_dismissal", "Delegated Alert Dismissal"],
    ["private_vulnerability_reporting", "Vulnerability Reporting"],
  ].map(([k, l]) => ({ key: k as any, label: l }));

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-xl shadow-md space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{name}</h2>
        {config?.html_url && (
          <a
            href={config.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-500 hover:underline text-sm"
          >
            <LucideReact.Link size={16} className="mr-1" />
            View
          </a>
        )}
      </div>

      {/* Description */}
      {description && (
        <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
      )}

      {/* Basic Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.Hash size={16} className="text-gray-400" />
          <span>ID:</span>
          <span className="font-medium">{config?.id ?? "-"}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Globe size={16} className="text-gray-400" />
          <span>Scope:</span>
          <span className="font-medium">{targetScope}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.GitBranch size={16} className="text-gray-400" />
          <span>Default for new repos:</span>
          <span className="font-medium">{defaultLabel}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.ShieldCheck size={16} className="text-gray-400" />
          <span>Enforcement:</span>
          <span className="font-medium">{enforcementLabel}</span>
        </div>
      </div>

      {/* Feature Status Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
        {features.map((f) => {
          const val = config?.[f.key] as Status;
          return (
            <div
              key={f.key}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              {renderStatusIcon(val)}
              <span>{f.label}</span>
            </div>
          );
        })}
      </div>

      {/* Timestamps */}
      <div className="flex flex-wrap gap-4 text-xs text-gray-400">
        {createdAt && (
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={14} />
            <span>Created: {createdAt}</span>
          </div>
        )}
        {updatedAt && (
          <div className="flex items-center gap-1">
            <LucideReact.Edit2 size={14} />
            <span>Updated: {updatedAt}</span>
          </div>
        )}
      </div>
    </div>
  );
}
