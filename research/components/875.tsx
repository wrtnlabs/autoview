import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * A repository security advisory.
    */
    export type repository_advisory = {
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
         * A short summary of the advisory.
        */
        summary: string;
        /**
         * A detailed description of what the advisory entails.
        */
        description: (string & tags.MaxLength<65535>) | null;
        /**
         * The severity of the advisory.
        */
        severity: "critical" | "high" | "medium" | "low" | null;
        /**
         * The author of the advisory.
        */
        author: any | null;
        /**
         * The publisher of the advisory.
        */
        publisher: any | null;
        identifiers: {
            /**
             * The type of identifier.
            */
            type: "CVE" | "GHSA";
            /**
             * The identifier value.
            */
            value: string;
        }[];
        /**
         * The state of the advisory.
        */
        state: "published" | "closed" | "withdrawn" | "draft" | "triage";
        /**
         * The date and time of when the advisory was created, in ISO 8601 format.
        */
        created_at: (string & tags.Format<"date-time">) | null;
        /**
         * The date and time of when the advisory was last updated, in ISO 8601 format.
        */
        updated_at: (string & tags.Format<"date-time">) | null;
        /**
         * The date and time of when the advisory was published, in ISO 8601 format.
        */
        published_at: (string & tags.Format<"date-time">) | null;
        /**
         * The date and time of when the advisory was closed, in ISO 8601 format.
        */
        closed_at: (string & tags.Format<"date-time">) | null;
        /**
         * The date and time of when the advisory was withdrawn, in ISO 8601 format.
        */
        withdrawn_at: (string & tags.Format<"date-time">) | null;
        submission: {
            /**
             * Whether a private vulnerability report was accepted by the repository's administrators.
            */
            accepted: boolean;
        } | null;
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
         * A list of only the CWE IDs.
        */
        cwe_ids: string[] | null;
        credits: {
            /**
             * The username of the user credited.
            */
            login?: string;
            type?: any;
        }[] | null;
        credits_detailed: any[] | null;
        /**
         * A list of users that collaborate on the advisory.
        */
        collaborating_users: any[] | null;
        /**
         * A list of teams that collaborate on the advisory.
        */
        collaborating_teams: any[] | null;
        /**
         * A temporary private fork of the advisory's repository for collaborating on a fix.
        */
        private_fork: any | null;
    };
    export type simple_user = any;
    export type repository_advisory_vulnerability = any;
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
    export type security_advisory_credit_types = any;
    export type repository_advisory_credit = any;
    export type team = any;
    export type simple_repository = any;
}
export type AutoViewInput = AutoViewInputSubTypes.repository_advisory;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const severityLabel = value.severity
    ? value.severity.charAt(0).toUpperCase() + value.severity.slice(1)
    : "Unknown";
  const severityBg =
    value.severity === "critical"
      ? "bg-red-600"
      : value.severity === "high"
      ? "bg-red-500"
      : value.severity === "medium"
      ? "bg-yellow-500"
      : value.severity === "low"
      ? "bg-green-500"
      : "bg-gray-500";

  const stateLabel =
    value.state.charAt(0).toUpperCase() + value.state.slice(1);
  const stateBg =
    value.state === "published"
      ? "bg-green-100 text-green-800"
      : value.state === "closed"
      ? "bg-gray-100 text-gray-800"
      : value.state === "withdrawn"
      ? "bg-gray-100 text-gray-800"
      : value.state === "draft"
      ? "bg-blue-100 text-blue-800"
      : "bg-yellow-100 text-yellow-800";

  const publishedAtFormatted = value.published_at
    ? new Date(value.published_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

  const cveIdDisplay = value.cve_id || "—";

  const cvssScore =
    value.cvss && typeof value.cvss.score === "number"
      ? value.cvss.score.toFixed(1)
      : null;
  const cvssVector = value.cvss?.vector_string || null;

  const cweList = value.cwes || [];
  const cweNames =
    cweList.length > 0
      ? cweList
          .slice(0, 3)
          .map((c) => c.name)
          .join(", ") + (cweList.length > 3 ? ` +${cweList.length - 3} more` : "")
      : null;

  const creditsCount = value.credits ? value.credits.length : 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-150">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {value.summary}
        </h2>
        <div className="mt-2 sm:mt-0 flex space-x-2">
          <span
            className={`px-2 py-1 text-xs font-medium text-white rounded ${severityBg}`}
          >
            {severityLabel}
          </span>
          <span
            className={`px-2 py-1 text-xs font-medium rounded ${stateBg}`}
          >
            {stateLabel}
          </span>
        </div>
      </header>

      <section className="mt-3 text-sm text-gray-700 space-y-1">
        <div>
          <span className="font-medium">GHSA ID:</span> {value.ghsa_id}
        </div>
        <div>
          <span className="font-medium">CVE ID:</span> {cveIdDisplay}
        </div>
        <div>
          <span className="font-medium">Published:</span>{" "}
          {publishedAtFormatted}
        </div>
        {value.description && (
          <p className="mt-2 text-gray-600 line-clamp-3">
            {value.description}
          </p>
        )}
      </section>

      <section className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
        {cvssScore !== null && (
          <div>
            <span className="font-medium">CVSS Score:</span> {cvssScore}/10
          </div>
        )}
        {cvssVector && (
          <div>
            <span className="font-medium">CVSS Vector:</span> {cvssVector}
          </div>
        )}
        {cweNames && (
          <div>
            <span className="font-medium">CWEs:</span> {cweNames}
          </div>
        )}
        <div>
          <span className="font-medium">Credits:</span> {creditsCount}
        </div>
      </section>

      <footer className="mt-4 text-xs text-gray-500">
        <span className="font-medium">Identifiers:</span>{" "}
        {value.identifiers.map((id, idx) => (
          <span key={idx} className="mr-2">
            {id.type}:{id.value}
          </span>
        ))}
      </footer>
    </article>
  );
}
