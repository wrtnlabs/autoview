import { tags } from "typia";
import React from "react";
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
            "package"?: AutoViewInputSubTypes.dependabot_alert_package;
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
        dismissed_reason: "fix_started" | "inaccurate" | "no_bandwidth" | "not_used" | "tolerable_risk" | null;
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
        "package": AutoViewInputSubTypes.dependabot_alert_package;
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
    export type alert_auto_dismissed_at = (string & tags.Format<"date-time">) | null;
}
export type AutoViewInput = AutoViewInputSubTypes.dependabot_alert;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const {
    number,
    state,
    dependency,
    security_advisory: advisory,
    html_url,
  } = value;

  // Format state badge
  const stateLabels: Record<string, string> = {
    open: "Open",
    fixed: "Fixed",
    dismissed: "Dismissed",
    auto_dismissed: "Auto Dismissed",
  };
  const stateColors: Record<string, string> = {
    open: "bg-blue-100 text-blue-800",
    fixed: "bg-green-100 text-green-800",
    dismissed: "bg-gray-100 text-gray-700",
    auto_dismissed: "bg-yellow-100 text-yellow-800",
  };
  const displayState = stateLabels[state] || state;
  const stateClass = stateColors[state] || "bg-gray-100 text-gray-700";

  // Package info
  const pkg = dependency["package"];
  const packageName = pkg?.name ?? "Unknown Package";
  const ecosystem = pkg?.ecosystem ?? "dependency";

  // Advisory info
  const severityColors: Record<string, string> = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
    critical: "bg-red-200 text-red-900",
  };
  const severityClass = severityColors[advisory.severity] ?? "bg-gray-100 text-gray-700";
  const publishedDate = new Date(advisory.published_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const cvssScore = advisory.cvss.score !== null && advisory.cvss.score !== undefined
    ? advisory.cvss.score.toFixed(1)
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col space-y-3">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-gray-900">
          Dependabot Alert #{number}
        </h2>
        <span className={`px-2 py-1 text-xs font-medium rounded ${stateClass}`}>
          {displayState}
        </span>
      </div>
      <div className="flex flex-wrap items-center text-sm text-gray-600 space-x-2">
        <span className="font-medium">{packageName}</span>
        <span className="capitalize">({ecosystem})</span>
      </div>
      <div className="flex flex-wrap items-center space-x-2">
        <span className={`px-2 py-0.5 text-xs font-medium uppercase rounded ${severityClass}`}>
          {advisory.severity}
        </span>
        {cvssScore && (
          <span className="text-sm font-medium text-gray-700">CVSS {cvssScore}</span>
        )}
        <span className="text-sm text-gray-500">{publishedDate}</span>
      </div>
      <p className="text-gray-700 text-sm line-clamp-3">{advisory.summary}</p>
      {advisory.vulnerabilities.length > 0 && (
        advisory.vulnerabilities.length <= 3 ? (
          <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
            {advisory.vulnerabilities.map((vul, idx) => (
              <li key={idx}>
                <span className="font-medium">{vul["package"].name}</span>:{" "}
                {vul.vulnerable_version_range}
                {vul.first_patched_version
                  ? ` → patched in ${vul.first_patched_version.identifier}`
                  : ""}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600">
            {advisory.vulnerabilities.length} vulnerable version ranges
          </p>
        )
      )}
      <div className="flex justify-end">
        <a
          href={html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
}
