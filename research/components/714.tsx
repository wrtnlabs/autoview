import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A Dependabot alert.
   */
  export type dependabot_alert = {
    number: AutoViewInputSubTypes.alert_number;
    /**
     * The state of the Dependabot alert.
     */
    state: "auto_dismissed" | "dismissed" | "fixed" | "open";
    /**
     * Details for the vulnerable dependency.
     */
    dependency: {
      package?: AutoViewInputSubTypes.dependabot_alert_package;
      /**
       * The full path to the dependency manifest file, relative to the root of the repository.
       */
      manifest_path?: string;
      /**
       * The execution scope of the vulnerable dependency.
       */
      scope?: "development" | "runtime" | null;
      /**
       * The vulnerable dependency's relationship to your project.
       *
       * > [!NOTE]
       * > We are rolling out support for dependency relationship across ecosystems. This value will be "unknown" for all dependencies in unsupported ecosystems.
       *
       */
      relationship?: "unknown" | "direct" | "transitive" | null;
    };
    security_advisory: AutoViewInputSubTypes.dependabot_alert_security_advisory;
    security_vulnerability: AutoViewInputSubTypes.dependabot_alert_security_vulnerability;
    url: AutoViewInputSubTypes.alert_url;
    html_url: AutoViewInputSubTypes.alert_html_url;
    created_at: AutoViewInputSubTypes.alert_created_at;
    updated_at: AutoViewInputSubTypes.alert_updated_at;
    dismissed_at: AutoViewInputSubTypes.alert_dismissed_at;
    dismissed_by: AutoViewInputSubTypes.nullable_simple_user;
    /**
     * The reason that the alert was dismissed.
     */
    dismissed_reason:
      | "fix_started"
      | "inaccurate"
      | "no_bandwidth"
      | "not_used"
      | "tolerable_risk"
      | null;
    /**
     * An optional comment associated with the alert's dismissal.
     */
    dismissed_comment: (string & tags.MaxLength<280>) | null;
    fixed_at: AutoViewInputSubTypes.alert_fixed_at;
    auto_dismissed_at?: AutoViewInputSubTypes.alert_auto_dismissed_at;
  };
  /**
   * The security alert number.
   */
  export type alert_number = number & tags.Type<"int32">;
  /**
   * Details for the vulnerable package.
   */
  export type dependabot_alert_package = {
    /**
     * The package's language or package management ecosystem.
     */
    ecosystem: string;
    /**
     * The unique package name within its ecosystem.
     */
    name: string;
  };
  /**
   * Details for the GitHub Security Advisory.
   */
  export type dependabot_alert_security_advisory = {
    /**
     * The unique GitHub Security Advisory ID assigned to the advisory.
     */
    ghsa_id: string;
    /**
     * The unique CVE ID assigned to the advisory.
     */
    cve_id: string | null;
    /**
     * A short, plain text summary of the advisory.
     */
    summary: string;
    /**
     * A long-form Markdown-supported description of the advisory.
     */
    description: string;
    /**
     * Vulnerable version range information for the advisory.
     */
    vulnerabilities: AutoViewInputSubTypes.dependabot_alert_security_vulnerability[];
    /**
     * The severity of the advisory.
     */
    severity: "low" | "medium" | "high" | "critical";
    /**
     * Details for the advisory pertaining to the Common Vulnerability Scoring System.
     */
    cvss: {
      /**
       * The overall CVSS score of the advisory.
       */
      score: number;
      /**
       * The full CVSS vector string for the advisory.
       */
      vector_string: string | null;
    };
    cvss_severities?: AutoViewInputSubTypes.cvss_severities;
    epss?: AutoViewInputSubTypes.security_advisory_epss;
    /**
     * Details for the advisory pertaining to Common Weakness Enumeration.
     */
    cwes: {
      /**
       * The unique CWE ID.
       */
      cwe_id: string;
      /**
       * The short, plain text name of the CWE.
       */
      name: string;
    }[];
    /**
     * Values that identify this advisory among security information sources.
     */
    identifiers: {
      /**
       * The type of advisory identifier.
       */
      type: "CVE" | "GHSA";
      /**
       * The value of the advisory identifer.
       */
      value: string;
    }[];
    /**
     * Links to additional advisory information.
     */
    references: {
      /**
       * The URL of the reference.
       */
      url: string;
    }[];
    /**
     * The time that the advisory was published in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
     */
    published_at: string;
    /**
     * The time that the advisory was last modified in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
     */
    updated_at: string;
    /**
     * The time that the advisory was withdrawn in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
     */
    withdrawn_at: (string & tags.Format<"date-time">) | null;
  };
  /**
   * Details pertaining to one vulnerable version range for the advisory.
   */
  export type dependabot_alert_security_vulnerability = {
    package: AutoViewInputSubTypes.dependabot_alert_package;
    /**
     * The severity of the vulnerability.
     */
    severity: "low" | "medium" | "high" | "critical";
    /**
     * Conditions that identify vulnerable versions of this vulnerability's package.
     */
    vulnerable_version_range: string;
    /**
     * Details pertaining to the package version that patches this vulnerability.
     */
    first_patched_version: {
      /**
       * The package version that patches this vulnerability.
       */
      identifier: string;
    } | null;
  };
  export type cvss_severities = {
    cvss_v3?: {
      /**
       * The CVSS 3 vector string.
       */
      vector_string: string | null;
      /**
       * The CVSS 3 score.
       */
      score: (number & tags.Minimum<0> & tags.Maximum<10>) | null;
    } | null;
    cvss_v4?: {
      /**
       * The CVSS 4 vector string.
       */
      vector_string: string | null;
      /**
       * The CVSS 4 score.
       */
      score: (number & tags.Minimum<0> & tags.Maximum<10>) | null;
    } | null;
  } | null;
  /**
   * The EPSS scores as calculated by the [Exploit Prediction Scoring System](https://www.first.org/epss).
   */
  export type security_advisory_epss = {
    percentage?: number & tags.Minimum<0> & tags.Maximum<100>;
    percentile?: number & tags.Minimum<0> & tags.Maximum<100>;
  } | null;
  /**
   * The REST API URL of the alert resource.
   */
  export type alert_url = string;
  /**
   * The GitHub URL of the alert resource.
   */
  export type alert_html_url = string;
  /**
   * The time that the alert was created in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
   */
  export type alert_created_at = string;
  /**
   * The time that the alert was last updated in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
   */
  export type alert_updated_at = string;
  /**
   * The time that the alert was dismissed in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
   */
  export type alert_dismissed_at = (string & tags.Format<"date-time">) | null;
  /**
   * A GitHub user.
   *
   * @title Simple User
   */
  export type nullable_simple_user = {
    name?: string | null;
    email?: string | null;
    login: string;
    id: number & tags.Type<"int32">;
    node_id: string;
    avatar_url: string & tags.Format<"uri">;
    gravatar_id: string | null;
    url: string & tags.Format<"uri">;
    html_url: string & tags.Format<"uri">;
    followers_url: string & tags.Format<"uri">;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string & tags.Format<"uri">;
    organizations_url: string & tags.Format<"uri">;
    repos_url: string & tags.Format<"uri">;
    events_url: string;
    received_events_url: string & tags.Format<"uri">;
    type: string;
    site_admin: boolean;
    starred_at?: string;
    user_view_type?: string;
  } | null;
  /**
   * The time that the alert was no longer detected and was considered fixed in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
   */
  export type alert_fixed_at = (string & tags.Format<"date-time">) | null;
  /**
   * The time that the alert was auto-dismissed in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
   */
  export type alert_auto_dismissed_at =
    | (string & tags.Format<"date-time">)
    | null;
}
export type AutoViewInput = AutoViewInputSubTypes.dependabot_alert[];

export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Map severity levels to badge styles
  const severityClass: Record<string, string> = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-orange-100 text-orange-800",
    critical: "bg-red-100 text-red-800",
  };

  // Map alert states to icons
  const stateIcon: Record<string, JSX.Element> = {
    open: <LucideReact.AlertCircle className="text-blue-500" size={16} />,
    fixed: <LucideReact.CheckCircle className="text-green-500" size={16} />,
    dismissed: <LucideReact.XCircle className="text-gray-500" size={16} />,
    auto_dismissed: <LucideReact.Clock className="text-amber-500" size={16} />,
  };

  // Format ISO date to a short, human-readable string
  const formatDate = (iso: string | null): string =>
    iso
      ? new Date(iso).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "—";

  // Empty state
  if (!Array.isArray(value) || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-lg">No alerts available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {value.map((alert) => (
        <div
          key={alert.number}
          className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          {/* Header: Alert #, State, Severity */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-gray-700">
              {stateIcon[alert.state]}
              <span className="font-semibold">
                Alert #{alert.number} •{" "}
                {alert.state.replace("_", " ").toUpperCase()}
              </span>
            </div>
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded ${severityClass[alert.security_advisory.severity]}`}
            >
              {alert.security_advisory.severity.toUpperCase()}
            </span>
          </div>

          {/* Advisory Summary */}
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {alert.security_advisory.summary}
          </p>

          {/* Key Metadata */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
            {alert.dependency["package"] && (
              <div className="flex items-center gap-1">
                <LucideReact.Package size={16} className="text-gray-400" />
                <span>{alert.dependency["package"].name}</span>
              </div>
            )}
            {alert.dependency.manifest_path && (
              <div className="flex items-center gap-1">
                <LucideReact.FileText size={16} className="text-gray-400" />
                <span className="truncate max-w-xs">
                  {alert.dependency.manifest_path}
                </span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <LucideReact.Calendar size={16} className="text-gray-400" />
              <span>Created {formatDate(alert.created_at)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
