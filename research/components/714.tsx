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
export type AutoViewInput = AutoViewInputSubTypes.dependabot_alert[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string | null): string =>
    iso
      ? new Date(iso).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "-";

  const stateConfig: Record<
    AutoViewInputSubTypes.dependabot_alert["state"],
    { text: string; icon: JSX.Element }
  > = {
    open: {
      text: "Open",
      icon: <LucideReact.Clock size={16} className="text-amber-500" />,
    },
    fixed: {
      text: "Fixed",
      icon: <LucideReact.CheckCircle size={16} className="text-green-500" />,
    },
    dismissed: {
      text: "Dismissed",
      icon: <LucideReact.XCircle size={16} className="text-red-500" />,
    },
    auto_dismissed: {
      text: "Auto-Dismissed",
      icon: <LucideReact.AlertCircle size={16} className="text-gray-500" />,
    },
  };

  const severityConfig: Record<
    AutoViewInputSubTypes.dependabot_alert_security_advisory["severity"],
    { text: string; color: string; icon: JSX.Element }
  > = {
    low: {
      text: "Low",
      color: "text-green-500",
      icon: <LucideReact.AlertTriangle size={16} className="text-green-500" />,
    },
    medium: {
      text: "Medium",
      color: "text-amber-500",
      icon: <LucideReact.AlertTriangle size={16} className="text-amber-500" />,
    },
    high: {
      text: "High",
      color: "text-orange-500",
      icon: <LucideReact.AlertTriangle size={16} className="text-orange-500" />,
    },
    critical: {
      text: "Critical",
      color: "text-red-500",
      icon: <LucideReact.AlertCircle size={16} className="text-red-500" />,
    },
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="grid gap-4">
      {value.map((alert) => {
        const state = stateConfig[alert.state];
        const sev = severityConfig[alert.security_advisory.severity];
        const pkg = alert.dependency.package;
        const depLabel = pkg
          ? `${pkg.ecosystem}/${pkg.name}`
          : alert.dependency.manifest_path || "-";

        return (
          <div
            key={alert.number}
            className="p-4 bg-white rounded-lg shadow-sm border border-gray-100"
          >
            {/* Header: state & number */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1">
                {state.icon}
                <span className="text-sm font-medium text-gray-700">
                  {state.text}
                </span>
              </div>
              <span className="text-sm text-gray-500">#{alert.number}</span>
            </div>

            {/* Dependency */}
            <div className="mb-1 text-sm text-gray-600">
              <span className="font-semibold">Dependency:</span> {depLabel}
            </div>

            {/* Advisory summary */}
            <div className="mb-2 text-sm text-gray-800 line-clamp-2">
              <span className="font-semibold">Advisory:</span>{" "}
              {alert.security_advisory.summary}
            </div>

            {/* Meta info */}
            <div className="flex flex-wrap items-center text-sm gap-4">
              {/* Severity */}
              <div className="flex items-center gap-1">
                {sev.icon}
                <span className={sev.color + " font-medium"}>
                  {sev.text}
                </span>
              </div>

              {/* CVSS score */}
              {alert.security_advisory.cvss.score != null && (
                <div className="flex items-center gap-1 text-gray-600">
                  <LucideReact.ShieldCheck size={16} className="text-blue-500" />
                  <span>CVSS {alert.security_advisory.cvss.score.toFixed(1)}</span>
                </div>
              )}

              {/* Created date */}
              <div className="flex items-center gap-1 text-gray-600">
                <LucideReact.Calendar size={16} className="text-gray-400" />
                <span>Created {formatDate(alert.created_at)}</span>
              </div>

              {/* Updated date */}
              <div className="flex items-center gap-1 text-gray-600">
                <LucideReact.Edit2 size={16} className="text-gray-400" />
                <span>Updated {formatDate(alert.updated_at)}</span>
              </div>
            </div>

            {/* Dismissed info */}
            {alert.dismissed_at && (
              <div className="mt-2 flex items-center gap-1 text-sm text-red-600">
                <LucideReact.XCircle size={16} className="text-red-400" />
                <span>
                  Dismissed {formatDate(alert.dismissed_at)}
                  {alert.dismissed_reason
                    ? ` (${alert.dismissed_reason.replace(/_/g, " ")})`
                    : ""}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
