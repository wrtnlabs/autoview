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
export type AutoViewInput = AutoViewInputSubTypes.dependabot_alert;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const stateInfo: Record<string, { label: string; icon: JSX.Element }> = {
    open: {
      label: "Open",
      icon: (
        <LucideReact.AlertCircle
          className="text-amber-500"
          size={16}
          aria-hidden="true"
        />
      ),
    },
    fixed: {
      label: "Fixed",
      icon: (
        <LucideReact.CheckCircle
          className="text-green-500"
          size={16}
          aria-hidden="true"
        />
      ),
    },
    dismissed: {
      label: "Dismissed",
      icon: (
        <LucideReact.XCircle
          className="text-gray-500"
          size={16}
          aria-hidden="true"
        />
      ),
    },
    auto_dismissed: {
      label: "Auto-dismissed",
      icon: (
        <LucideReact.Clock
          className="text-gray-500"
          size={16}
          aria-hidden="true"
        />
      ),
    },
  };

  const severityColors: Record<"critical" | "high" | "medium" | "low", string> =
    {
      critical: "bg-red-600",
      high: "bg-orange-500",
      medium: "bg-yellow-500",
      low: "bg-green-500",
    };

  const reasonMap: Record<string, string> = {
    fix_started: "Fix started",
    inaccurate: "Inaccurate",
    no_bandwidth: "No bandwidth",
    not_used: "Not used",
    tolerable_risk: "Tolerable risk",
  };

  const formatDate = (iso: string | null | undefined): string =>
    iso
      ? new Date(iso).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        })
      : "";

  const state = stateInfo[value.state] || stateInfo.open;
  const adv = value.security_advisory;
  const vuln = value.security_vulnerability;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md text-gray-800 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Alert #{value.number}</h2>
        <div className="flex items-center gap-1 text-sm font-medium">
          {state.icon}
          <span>{state.label}</span>
        </div>
      </div>

      {/* Dependency */}
      <div className="space-y-1">
        <div className="flex items-center gap-1 text-gray-700">
          <LucideReact.Package
            size={16}
            className="text-gray-500"
            aria-hidden="true"
          />
          {value.dependency.package ? (
            <span>
              {value.dependency.package.name}{" "}
              <span className="italic text-xs text-gray-500">
                ({value.dependency.package.ecosystem})
              </span>
            </span>
          ) : (
            <span className="italic text-gray-500">Unknown dependency</span>
          )}
        </div>
        {value.dependency.manifest_path && (
          <div className="flex items-center gap-1 text-gray-600 text-sm">
            <LucideReact.FileText
              size={16}
              className="text-gray-400"
              aria-hidden="true"
            />
            <span className="truncate">{value.dependency.manifest_path}</span>
          </div>
        )}
        {value.dependency.scope && (
          <div className="flex items-center gap-1 text-gray-600 text-sm">
            <LucideReact.Tag
              size={16}
              className="text-gray-400"
              aria-hidden="true"
            />
            <span className="capitalize">{value.dependency.scope}</span>
          </div>
        )}
        {value.dependency.relationship && (
          <div className="flex items-center gap-1 text-gray-600 text-sm">
            <LucideReact.Link
              size={16}
              className="text-gray-400"
              aria-hidden="true"
            />
            <span className="capitalize">{value.dependency.relationship}</span>
          </div>
        )}
      </div>

      {/* Advisory */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-medium text-gray-800">{adv.summary}</h3>
          <span
            className={`px-2 py-0.5 text-xs font-semibold text-white rounded ${severityColors[adv.severity]}`}
          >
            {adv.severity.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <LucideReact.Shield
            size={16}
            className="text-gray-400"
            aria-hidden="true"
          />
          <span>
            CVSS {adv.cvss.score.toFixed(1)}
            {adv.cvss.vector_string && ` (${adv.cvss.vector_string})`}
          </span>
        </div>
      </div>

      {/* Vulnerability */}
      <div className="space-y-1">
        <div className="flex items-center gap-1 text-gray-700">
          <LucideReact.AlertTriangle
            size={16}
            className="text-red-500"
            aria-hidden="true"
          />
          <span className="font-medium capitalize">
            {vuln.severity} severity
          </span>
        </div>
        <div className="text-sm text-gray-600">
          Affected versions:{" "}
          <code className="bg-gray-100 px-1 rounded">
            {vuln.vulnerable_version_range}
          </code>
        </div>
        {vuln.first_patched_version && (
          <div className="text-sm text-gray-600">
            First patched in:{" "}
            <span className="font-medium">
              {vuln.first_patched_version.identifier}
            </span>
          </div>
        )}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar
            size={16}
            aria-hidden="true"
            className="text-gray-400"
          />
          <span>Created:</span>
          <span className="ml-auto">{formatDate(value.created_at)}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.RefreshCw
            size={16}
            aria-hidden="true"
            className="text-gray-400"
          />
          <span>Updated:</span>
          <span className="ml-auto">{formatDate(value.updated_at)}</span>
        </div>
      </div>

      {/* Dismiss/Fixed Info */}
      {(value.state === "dismissed" || value.state === "auto_dismissed") && (
        <div className="border-t pt-2 text-sm text-gray-600 space-y-1">
          {value.state === "dismissed" && value.dismissed_by && (
            <div className="flex items-center gap-1">
              <LucideReact.UserX
                size={16}
                aria-hidden="true"
                className="text-gray-400"
              />
              <span>
                Dismissed by{" "}
                <span className="font-medium">{value.dismissed_by.login}</span>{" "}
                {formatDate(value.dismissed_at)}
              </span>
            </div>
          )}
          {value.dismissed_reason && (
            <div className="flex items-center gap-1">
              <LucideReact.Info
                size={16}
                aria-hidden="true"
                className="text-gray-400"
              />
              <span>
                Reason:{" "}
                {reasonMap[value.dismissed_reason] || value.dismissed_reason}
              </span>
            </div>
          )}
          {value.dismissed_comment && (
            <div className="pl-5 italic text-gray-500 truncate">{`“${value.dismissed_comment}”`}</div>
          )}
        </div>
      )}
      {value.state === "fixed" && value.fixed_at && (
        <div className="border-t pt-2 text-sm text-gray-600 flex items-center gap-1">
          <LucideReact.CheckCircle
            size={16}
            aria-hidden="true"
            className="text-green-500"
          />
          <span>Fixed on {formatDate(value.fixed_at)}</span>
        </div>
      )}
    </div>
  );
}
