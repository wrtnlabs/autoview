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
export type AutoViewInput = AutoViewInputSubTypes.global_advisory;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const {
    ghsa_id,
    cve_id,
    summary,
    description,
    severity,
    type,
    published_at,
    updated_at,
    github_reviewed_at,
    cvss,
    epss,
    identifiers,
    references,
    vulnerabilities,
    cwes,
    credits,
  } = value;

  const formatDate = (dateStr?: string | null) =>
    dateStr
      ? new Date(dateStr).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "N/A";

  const severityColors: Record<string, string> = {
    critical: "bg-red-100 text-red-800",
    high: "bg-yellow-100 text-yellow-800",
    medium: "bg-amber-100 text-amber-800",
    low: "bg-blue-100 text-blue-800",
    unknown: "bg-gray-100 text-gray-800",
  };

  const typeColors: Record<string, string> = {
    reviewed: "bg-green-100 text-green-800",
    unreviewed: "bg-gray-100 text-gray-800",
    malware: "bg-red-100 text-red-800",
  };

  const identCount = identifiers?.length ?? 0;
  const refsCount = references?.length ?? 0;
  const vulnCount = vulnerabilities?.length ?? 0;
  const cweCount = cwes?.length ?? 0;
  const creditCount = credits?.length ?? 0;

  const cvssScore =
    cvss?.score != null ? cvss.score.toFixed(1) : null;
  const cvssVector = cvss?.vector_string ?? null;
  const epssPct =
    epss?.percentage != null
      ? `${epss.percentage.toFixed(1)}%`
      : null;
  const epssPerc =
    epss?.percentile != null
      ? `${epss.percentile.toFixed(1)}th`
      : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {ghsa_id}
          </h2>
          {cve_id && (
            <p className="text-sm text-gray-500">{cve_id}</p>
          )}
        </div>
        <div className="flex space-x-2 mt-2 sm:mt-0">
          <span
            className={`px-2 py-1 text-xs font-medium rounded ${severityColors[severity]}`}
          >
            {severity.charAt(0).toUpperCase() + severity.slice(1)}
          </span>
          <span
            className={`px-2 py-1 text-xs font-medium rounded ${typeColors[type]}`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        </div>
      </header>

      <p className="mt-3 text-gray-800 font-medium">{summary}</p>
      {description && (
        <p className="mt-2 text-gray-600 line-clamp-3">
          {description}
        </p>
      )}

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
        <div>
          <span className="font-medium">Published:</span>{" "}
          {formatDate(published_at)}
        </div>
        <div>
          <span className="font-medium">Updated:</span>{" "}
          {formatDate(updated_at)}
        </div>
        {github_reviewed_at && (
          <div>
            <span className="font-medium">Reviewed:</span>{" "}
            {formatDate(github_reviewed_at)}
          </div>
        )}
        {cvssScore && (
          <div>
            <span className="font-medium">CVSS Score:</span>{" "}
            {cvssScore}
            {cvssVector && (
              <span className="ml-1 text-gray-500">
                ({cvssVector})
              </span>
            )}
          </div>
        )}
        {epssPct && (
          <div>
            <span className="font-medium">EPSS:</span> {epssPct} (
            {epssPerc})
          </div>
        )}
        <div>
          <span className="font-medium">Identifiers:</span> {identCount}
        </div>
        <div>
          <span className="font-medium">References:</span> {refsCount}
        </div>
        {vulnCount > 0 && (
          <div>
            <span className="font-medium">Vulnerabilities:</span>{" "}
            {vulnCount}
          </div>
        )}
        {cweCount > 0 && (
          <div>
            <span className="font-medium">CWEs:</span> {cweCount}
          </div>
        )}
        {creditCount > 0 && (
          <div>
            <span className="font-medium">Contributors:</span>{" "}
            {creditCount}
          </div>
        )}
      </div>
    </article>
  );
}
