import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * A GitHub Security Advisory.
    */
    export type global_advisory = {
        /**
         * The GitHub Security Advisory ID.
        */
        ghsa_id: string;
        /**
         * The Common Vulnerabilities and Exposures (CVE) ID.
        */
        cve_id: string | null;
        /**
         * The API URL for the advisory.
        */
        url: string;
        /**
         * The URL for the advisory.
        */
        html_url: string;
        /**
         * The API URL for the repository advisory.
        */
        repository_advisory_url: (string & tags.Format<"uri">) | null;
        /**
         * A short summary of the advisory.
        */
        summary: string;
        /**
         * A detailed description of what the advisory entails.
        */
        description: (string & tags.MaxLength<65535>) | null;
        /**
         * The type of advisory.
        */
        type: "reviewed" | "unreviewed" | "malware";
        /**
         * The severity of the advisory.
        */
        severity: "critical" | "high" | "medium" | "low" | "unknown";
        /**
         * The URL of the advisory's source code.
        */
        source_code_location: (string & tags.Format<"uri">) | null;
        identifiers: {
            /**
             * The type of identifier.
            */
            type: "CVE" | "GHSA";
            /**
             * The identifier value.
            */
            value: string;
        }[] | null;
        references: string[] | null;
        /**
         * The date and time of when the advisory was published, in ISO 8601 format.
        */
        published_at: string;
        /**
         * The date and time of when the advisory was last updated, in ISO 8601 format.
        */
        updated_at: string;
        /**
         * The date and time of when the advisory was reviewed by GitHub, in ISO 8601 format.
        */
        github_reviewed_at: (string & tags.Format<"date-time">) | null;
        /**
         * The date and time when the advisory was published in the National Vulnerability Database, in ISO 8601 format.
         * This field is only populated when the advisory is imported from the National Vulnerability Database.
        */
        nvd_published_at: (string & tags.Format<"date-time">) | null;
        /**
         * The date and time of when the advisory was withdrawn, in ISO 8601 format.
        */
        withdrawn_at: (string & tags.Format<"date-time">) | null;
        /**
         * The products and respective version ranges affected by the advisory.
        */
        vulnerabilities: any[] | null;
        cvss: {
            /**
             * The CVSS vector.
            */
            vector_string: string | null;
            /**
             * The CVSS score.
            */
            score: (number & tags.Minimum<0> & tags.Maximum<10>) | null;
        } | null;
        cvss_severities?: AutoViewInputSubTypes.cvss_severities;
        epss?: AutoViewInputSubTypes.security_advisory_epss;
        cwes: {
            /**
             * The Common Weakness Enumeration (CWE) identifier.
            */
            cwe_id: string;
            /**
             * The name of the CWE.
            */
            name: string;
        }[] | null;
        /**
         * The users who contributed to the advisory.
        */
        credits: {
            user: any;
            type: any;
        }[] | null;
    };
    export type vulnerability = any;
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
    export type simple_user = any;
    export type security_advisory_credit_types = any;
}
export type AutoViewInput = AutoViewInputSubTypes.global_advisory[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const advisories = value ?? [];
  const formatDate = (iso: string): string => {
    try {
      return new Date(iso).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return iso;
    }
  };
  const severityColors: Record<AutoViewInputSubTypes.global_advisory["severity"], string> = {
    critical: "bg-red-100 text-red-800",
    high: "bg-orange-100 text-orange-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-green-100 text-green-800",
    unknown: "bg-gray-100 text-gray-800",
  };
  const typeColors: Record<AutoViewInputSubTypes.global_advisory["type"], string> = {
    reviewed: "bg-blue-100 text-blue-800",
    unreviewed: "bg-gray-100 text-gray-800",
    malware: "bg-red-200 text-red-900",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (advisories.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No security advisories to display.
      </div>
    );
  }

  // 3. Return the React element.
  return (
    <div className="space-y-4">
      {advisories.map((item) => (
        <div
          key={item.ghsa_id}
          className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-gray-900 truncate">
                {item.ghsa_id}
                {item.cve_id ? ` • ${item.cve_id}` : ""}
              </h2>
            </div>
            <div className="flex space-x-2 ml-4">
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${severityColors[item.severity]}`}
              >
                {item.severity.charAt(0).toUpperCase() + item.severity.slice(1)}
              </span>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${typeColors[item.type]}`}
              >
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </span>
            </div>
          </div>

          <p className="mt-2 text-gray-700 text-sm line-clamp-3">
            {item.summary}
          </p>

          <div className="mt-3 text-sm text-gray-500 space-y-1">
            <div>Published: {formatDate(item.published_at)}</div>
            {item.updated_at !== item.published_at && (
              <div>Updated: {formatDate(item.updated_at)}</div>
            )}
            {item.cvss?.score != null && (
              <div>
                CVSS Score:{" "}
                <span className="font-medium text-gray-900">
                  {item.cvss.score.toFixed(1)}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
