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
  const stateColorMap: Record<AutoViewInputSubTypes.dependabot_alert['state'], string> = {
    open: 'text-amber-500',
    fixed: 'text-green-500',
    dismissed: 'text-gray-500',
    auto_dismissed: 'text-purple-500',
  };
  const stateIconMap: Record<AutoViewInputSubTypes.dependabot_alert['state'], React.ComponentType<any>> = {
    open: LucideReact.AlertCircle,
    fixed: LucideReact.CheckCircle,
    dismissed: LucideReact.XCircle,
    auto_dismissed: LucideReact.XCircle,
  };
  const StateIcon = stateIconMap[value.state];
  const formatDate = (iso?: string | null) =>
    iso
      ? new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
      : '-';
  const dismissReason = value.dismissed_reason?.replace(/_/g, ' ') ?? '';
  const vulnerabilityCount = value.security_advisory.vulnerabilities.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header: Alert ID and State */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Dependabot Alert #{value.number}
        </h2>
        <div className={`flex items-center ${stateColorMap[value.state]}`}>
          <StateIcon size={20} strokeWidth={2} />
          <span className="ml-1 capitalize">{value.state.replace('_', ' ')}</span>
        </div>
      </div>

      {/* Dependency Info */}
      {value.dependency.package && (
        <div className="flex items-center text-sm text-gray-700">
          <LucideReact.Package size={16} className="text-gray-400" />
          <span className="ml-1">
            {value.dependency.package.name} ({value.dependency.package.ecosystem})
          </span>
        </div>
      )}

      {/* Advisory Summary */}
      <div className="border-t pt-2 space-y-2">
        <div className="flex items-center text-sm text-gray-700">
          <LucideReact.AlertTriangle size={16} className="text-red-500" />
          <span className="ml-1 font-medium capitalize">
            {value.security_advisory.severity}
          </span>
          <span className="ml-2 text-gray-500">
            ({vulnerabilityCount} vuln{vulnerabilityCount !== 1 ? 's' : ''})
          </span>
        </div>
        <p className="text-sm text-gray-900 line-clamp-2">
          {value.security_advisory.summary}
        </p>
      </div>

      {/* CVSS Score */}
      <div className="flex items-center text-sm text-gray-700">
        <LucideReact.BarChart2 size={16} className="text-purple-500" />
        <span className="ml-1">
          CVSS Score: {value.security_advisory.cvss.score.toFixed(1)}
        </span>
      </div>

      {/* Timeline */}
      <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
        <div className="flex items-center">
          <LucideReact.Calendar size={14} />
          <span className="ml-1">Created: {formatDate(value.created_at)}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.RefreshCw size={14} />
          <span className="ml-1">Updated: {formatDate(value.updated_at)}</span>
        </div>
        {value.dismissed_at && (
          <div className="flex items-center">
            <LucideReact.XCircle size={14} />
            <span className="ml-1">Dismissed: {formatDate(value.dismissed_at)}</span>
          </div>
        )}
        {value.fixed_at && (
          <div className="flex items-center">
            <LucideReact.CheckCircle size={14} />
            <span className="ml-1">Fixed: {formatDate(value.fixed_at)}</span>
          </div>
        )}
      </div>

      {/* Dismiss Reason & Comment */}
      {dismissReason && (
        <div className="text-sm text-gray-700">
          <span className="font-medium">Reason:</span> {dismissReason}
        </div>
      )}
      {value.dismissed_comment && (
        <p className="text-sm text-gray-700 line-clamp-2">
          "{value.dismissed_comment}"
        </p>
      )}

      {/* Link */}
      {value.html_url && (
        <div className="flex items-center text-xs text-gray-500 truncate">
          <LucideReact.Link size={14} />
          <span className="ml-1 break-all">{value.html_url}</span>
        </div>
      )}
    </div>
  );
}
