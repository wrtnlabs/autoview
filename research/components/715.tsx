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
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const stateMap = {
    open: {
      label: "Open",
      color: "text-amber-600 bg-amber-100",
      Icon: LucideReact.AlertCircle as React.ComponentType<any>,
    },
    fixed: {
      label: "Fixed",
      color: "text-green-600 bg-green-100",
      Icon: LucideReact.CheckCircle as React.ComponentType<any>,
    },
    dismissed: {
      label: "Dismissed",
      color: "text-gray-600 bg-gray-100",
      Icon: LucideReact.XCircle as React.ComponentType<any>,
    },
    auto_dismissed: {
      label: "Auto Dismissed",
      color: "text-blue-600 bg-blue-100",
      Icon: LucideReact.Clock as React.ComponentType<any>,
    },
  } as const;
  const {
    label: stateLabel,
    color: stateColor,
    Icon: StateIcon,
  } = stateMap[value.state];

  const severityColorMap = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-orange-100 text-orange-700",
    critical: "bg-red-100 text-red-700",
  } as const;
  const severityColor = severityColorMap[value.security_advisory.severity];

  const createdAt = new Date(value.created_at).toLocaleString();
  const updatedAt = new Date(value.updated_at).toLocaleString();

  let stateEventLabel = "";
  let stateDate = "";
  if (value.state === "fixed" && value.fixed_at) {
    stateEventLabel = "Fixed at:";
    stateDate = new Date(value.fixed_at).toLocaleString();
  } else if (value.state === "dismissed" && value.dismissed_at) {
    stateEventLabel = "Dismissed at:";
    stateDate = new Date(value.dismissed_at).toLocaleString();
  } else if (value.state === "auto_dismissed" && value.auto_dismissed_at) {
    stateEventLabel = "Auto dismissed at:";
    stateDate = new Date(value.auto_dismissed_at).toLocaleString();
  }

  const depPkg = value.dependency.package;
  const pkgDisplay = depPkg
    ? `${depPkg.ecosystem}/${depPkg.name}`
    : "Unknown package";
  const ghsa = value.security_advisory;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <StateIcon size={20} className={stateColor.split(" ")[0]} />
          <h2 className="text-lg font-semibold">Alert #{value.number}</h2>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded ${stateColor}`}>
          {stateLabel}
        </span>
      </div>

      {/* Dependency Section */}
      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-1">Dependency</div>
        <div className="text-sm font-medium">{pkgDisplay}</div>
        {value.dependency.manifest_path && (
          <div className="text-xs text-gray-500">
            Manifest: {value.dependency.manifest_path}
          </div>
        )}
        {value.dependency.scope && (
          <div className="text-xs text-gray-500">
            Scope: {capitalize(value.dependency.scope)}
          </div>
        )}
        {value.dependency.relationship && (
          <div className="text-xs text-gray-500">
            Relationship: {capitalize(value.dependency.relationship)}
          </div>
        )}
      </div>

      {/* Advisory Section */}
      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-1">Advisory</div>
        <div className="flex items-center text-sm font-medium gap-2 mb-1">
          <LucideReact.Tag size={16} className="text-gray-500" />
          <span>
            {ghsa.ghsa_id}
            {ghsa.cve_id ? ` / ${ghsa.cve_id}` : ""}
          </span>
        </div>
        <p className="text-sm text-gray-800 line-clamp-2">{ghsa.summary}</p>
        <div className="mt-2 flex items-center gap-4">
          <span
            className={`px-1.5 py-0.5 text-xs font-semibold rounded ${severityColor}`}
          >
            {capitalize(ghsa.severity)}
          </span>
          <div className="flex items-center text-sm text-gray-700 gap-1">
            <LucideReact.Shield size={16} />
            <span>{ghsa.cvss.score.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="text-xs text-gray-500 space-y-2">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={14} />
          <span>Created: {createdAt}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Edit2 size={14} />
          <span>Updated: {updatedAt}</span>
        </div>
        {stateDate && (
          <div className="flex items-center gap-1">
            <LucideReact.Clock size={14} />
            <span>
              {stateEventLabel} {stateDate}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
