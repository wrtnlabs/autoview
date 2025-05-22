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
  const displayId = value.ghsa_id + (value.cve_id ? ` / ${value.cve_id}` : '');
  const severityClasses: Record<string, { bg: string; text: string }> = {
    critical: { bg: 'bg-red-100', text: 'text-red-800' },
    high: { bg: 'bg-orange-100', text: 'text-orange-800' },
    medium: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    low: { bg: 'bg-green-100', text: 'text-green-800' },
    default: { bg: 'bg-gray-100', text: 'text-gray-800' },
  };
  const stateClasses: Record<string, { bg: string; text: string }> = {
    published: { bg: 'bg-green-100', text: 'text-green-800' },
    draft: { bg: 'bg-blue-100', text: 'text-blue-800' },
    triage: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    closed: { bg: 'bg-gray-100', text: 'text-gray-800' },
    withdrawn: { bg: 'bg-red-100', text: 'text-red-800' },
    default: { bg: 'bg-gray-100', text: 'text-gray-800' },
  };
  const sevKey = value.severity ?? 'default';
  const sevClass = severityClasses[sevKey] || severityClasses.default;
  const stateKey = value.state ?? 'default';
  const stClass = stateClasses[stateKey] || stateClasses.default;
  const publishedDate = value.published_at
    ? new Date(value.published_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'N/A';
  const cvssScore = value.cvss?.score != null ? value.cvss.score.toFixed(1) : 'N/A';
  const cvssVector = value.cvss?.vector_string ?? 'N/A';
  const identifiers = value.identifiers ?? [];
  const cweList = value.cwe_ids ?? (value.cwes?.map((c) => c.cwe_id) ?? []);
  const submissionAccepted = value.submission?.accepted ?? false;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <h2 className="text-xl font-semibold text-gray-800 truncate">{displayId}</h2>
        <div className="flex space-x-2 mt-2 sm:mt-0">
          <span className={`px-2 py-1 text-xs font-medium rounded ${sevClass.bg} ${sevClass.text}`}>
            {value.severity ?? 'Unknown'}
          </span>
          <span className={`px-2 py-1 text-xs font-medium rounded ${stClass.bg} ${stClass.text}`}>
            {value.state}
          </span>
        </div>
      </div>

      <p className="mt-2 text-gray-700 font-medium">{value.summary}</p>
      {value.description && (
        <p className="mt-2 text-gray-600 text-sm line-clamp-3">{value.description}</p>
      )}

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <span className="font-medium">Published:</span> {publishedDate}
        </div>
        <div>
          <span className="font-medium">Private Report:</span> {submissionAccepted ? 'Yes' : 'No'}
        </div>
        <div>
          <span className="font-medium">CVSS Score:</span> {cvssScore}
        </div>
        <div>
          <span className="font-medium">CVSS Vector:</span> {cvssVector}
        </div>
      </div>

      {identifiers.length > 0 && (
        <div className="mt-4">
          <div className="font-medium text-gray-800 mb-1">Identifiers:</div>
          <div className="flex flex-wrap gap-2">
            {identifiers.map((id, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded"
              >
                {id.type}: {id.value}
              </span>
            ))}
          </div>
        </div>
      )}

      {cweList.length > 0 && (
        <div className="mt-4">
          <div className="font-medium text-gray-800 mb-1">CWEs:</div>
          <div className="flex flex-wrap gap-2">
            {cweList.map((cwe, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded"
              >
                {cwe}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
