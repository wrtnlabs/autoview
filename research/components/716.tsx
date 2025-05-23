import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A Dependabot alert.
    */
    export interface dependabot_alert {
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
    }
    /**
     * The security alert number.
    */
    export type alert_number = number & tags.Type<"int32">;
    /**
     * Details for the vulnerable package.
    */
    export interface dependabot_alert_package {
        /**
         * The package's language or package management ecosystem.
        */
        ecosystem: string;
        /**
         * The unique package name within its ecosystem.
        */
        name: string;
    }
    /**
     * Details for the GitHub Security Advisory.
    */
    export interface dependabot_alert_security_advisory {
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
    }
    /**
     * Details pertaining to one vulnerable version range for the advisory.
    */
    export interface dependabot_alert_security_vulnerability {
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
    }
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
  type StateKey = AutoViewInputSubTypes.dependabot_alert["state"];
  const stateConfig: Record<
    StateKey,
    {
      label: string;
      Icon: React.ComponentType<any>;
      iconColor: string;
      badgeBg: string;
      badgeText: string;
    }
  > = {
    open: {
      label: "Open",
      Icon: LucideReact.AlertCircle,
      iconColor: "text-amber-500",
      badgeBg: "bg-amber-100",
      badgeText: "text-amber-800",
    },
    fixed: {
      label: "Fixed",
      Icon: LucideReact.CheckCircle,
      iconColor: "text-green-500",
      badgeBg: "bg-green-100",
      badgeText: "text-green-800",
    },
    dismissed: {
      label: "Dismissed",
      Icon: LucideReact.XCircle,
      iconColor: "text-red-500",
      badgeBg: "bg-red-100",
      badgeText: "text-red-800",
    },
    auto_dismissed: {
      label: "Auto Dismissed",
      Icon: LucideReact.Clock,
      iconColor: "text-gray-500",
      badgeBg: "bg-gray-100",
      badgeText: "text-gray-800",
    },
  };
  const config = stateConfig[value.state];

  const formatDate = (dateStr: string | null): string => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const severityConfig: { bg: string; text: string } = {
    low: { bg: "bg-green-100", text: "text-green-800" },
    medium: { bg: "bg-yellow-100", text: "text-yellow-800" },
    high: { bg: "bg-orange-100", text: "text-orange-800" },
    critical: { bg: "bg-red-100", text: "text-red-800" },
  }[value.security_advisory.severity];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header: Alert number and state */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <config.Icon className={config.iconColor} size={20} />
          <h2 className="text-lg font-semibold">
            Alert #{value.number} – {config.label}
          </h2>
        </div>
        <span
          className={`px-2 py-1 text-sm font-medium rounded ${config.badgeBg} ${config.badgeText}`}
        >
          {config.label}
        </span>
      </div>

      {/* Dependency details */}
      <div className="space-y-2">
        {value.dependency.package && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <LucideReact.Tag size={16} className="text-gray-400" />
            <span>
              {value.dependency.package.name} (
              {value.dependency.package.ecosystem})
            </span>
          </div>
        )}
        {value.dependency.manifest_path && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <LucideReact.FileText size={16} className="text-gray-400" />
            <span>{value.dependency.manifest_path}</span>
          </div>
        )}
        {(value.dependency.scope || value.dependency.relationship) && (
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            {value.dependency.scope && (
              <span>Scope: {value.dependency.scope}</span>
            )}
            {value.dependency.relationship && (
              <span>
                Relationship: {value.dependency.relationship}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Advisory summary */}
      <div className="space-y-2">
        <h3 className="text-md font-semibold line-clamp-2">
          {value.security_advisory.summary}
        </h3>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={16} />
            <span>
              Published:{" "}
              {formatDate(value.security_advisory.published_at)}
            </span>
          </div>
          <span
            className={`px-2 py-0.5 text-xs font-medium uppercase rounded ${severityConfig.bg} ${severityConfig.text}`}
          >
            {value.security_advisory.severity}
          </span>
        </div>
        {value.security_advisory.vulnerabilities.length > 0 && (
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {value.security_advisory.vulnerabilities.map((v, idx) => (
              <li key={idx}>
                {v["package"].name}: {v.vulnerable_version_range}
                {v.first_patched_version?.identifier && (
                  <> (Patched in {v.first_patched_version.identifier})</>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Link to GitHub alert */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <LucideReact.Link size={16} />
        <a
          href={value.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-600 truncate"
        >
          View on GitHub
        </a>
      </div>

      {/* Timing details */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} />
          <span>Created: {formatDate(value.created_at)}</span>
        </div>
        {value.fixed_at && (
          <div className="flex items-center gap-1">
            <LucideReact.CheckCircle
              size={16}
              className="text-green-500"
            />
            <span>Fixed: {formatDate(value.fixed_at)}</span>
          </div>
        )}
      </div>

      {/* Dismissal details (if applicable) */}
      {(value.state === "dismissed" ||
        value.state === "auto_dismissed") &&
        value.dismissed_at && (
          <div className="space-y-1 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <LucideReact.Calendar size={16} />
              <span>Dismissed: {formatDate(value.dismissed_at)}</span>
            </div>
            {value.dismissed_by && (
              <div className="flex items-center gap-1">
                <LucideReact.User size={16} />
                <span>{value.dismissed_by.login}</span>
              </div>
            )}
            {value.dismissed_reason && (
              <div>
                Reason: {value.dismissed_reason.replace("_", " ")}
              </div>
            )}
            {value.dismissed_comment && (
              <div className="italic">
                "{value.dismissed_comment}"
              </div>
            )}
          </div>
        )}
    </div>
  );
}
