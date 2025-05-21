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
  const severityMap: Record<NonNullable<AutoViewInput['severity']>, { label: string; classes: string }> = {
    critical: { label: 'Critical', classes: 'bg-red-100 text-red-800' },
    high:     { label: 'High',     classes: 'bg-orange-100 text-orange-800' },
    medium:   { label: 'Medium',   classes: 'bg-yellow-100 text-yellow-800' },
    low:      { label: 'Low',      classes: 'bg-green-100 text-green-800' },
  };

  const stateMap: Record<AutoViewInput['state'], { label: string; classes: string }> = {
    published: { label: 'Published', classes: 'bg-blue-100 text-blue-800' },
    closed:    { label: 'Closed',    classes: 'bg-gray-100 text-gray-800' },
    withdrawn: { label: 'Withdrawn', classes: 'bg-yellow-100 text-yellow-800' },
    draft:     { label: 'Draft',     classes: 'bg-indigo-100 text-indigo-800' },
    triage:    { label: 'Triage',    classes: 'bg-purple-100 text-purple-800' },
  };

  const formatDate = (iso: string | null): string | null => {
    if (!iso) return null;
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const publishedDate = formatDate(value.published_at);
  const updatedDate   = formatDate(value.updated_at);

  const shortDescription = value.description
    ? value.description.length > 200
      ? value.description.slice(0, 200) + '...'
      : value.description
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900 truncate">{value.ghsa_id}</h2>
          {value.cve_id && (
            <p className="text-sm text-gray-600 mt-1 truncate">CVE: {value.cve_id}</p>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mt-3 sm:mt-0 sm:ml-4">
          <span className={`${stateMap[value.state].classes} text-xs font-medium px-2 py-1 rounded`}>
            {stateMap[value.state].label}
          </span>
          {value.severity && (
            <span className={`${severityMap[value.severity].classes} text-xs font-medium px-2 py-1 rounded`}>
              {severityMap[value.severity].label}
            </span>
          )}
        </div>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-3">
        {shortDescription || value.summary}
      </p>

      <div className="flex flex-wrap justify-between text-sm text-gray-600 mb-4">
        {publishedDate && <span>Published: {publishedDate}</span>}
        {updatedDate   && <span>Updated: {updatedDate}</span>}
      </div>

      {value.cvss && (value.cvss.score !== null) && (
        <div className="mt-2 flex items-center text-sm">
          <span className="font-medium mr-2">CVSS Score:</span>
          <span className="font-mono bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
            {value.cvss.score}
          </span>
          {value.cvss.vector_string && (
            <span className="font-mono bg-gray-100 text-gray-800 px-2 py-0.5 rounded ml-2">
              {value.cvss.vector_string}
            </span>
          )}
        </div>
      )}

      {value.cwe_ids && value.cwe_ids.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {value.cwe_ids.map((id) => (
            <span key={id} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
              {id}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
