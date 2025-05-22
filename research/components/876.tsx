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
  const severityStyles: Record<string, { bg: string; text: string }> = {
    critical: { bg: 'bg-red-100', text: 'text-red-800' },
    high:     { bg: 'bg-orange-100', text: 'text-orange-800' },
    medium:   { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    low:      { bg: 'bg-green-100', text: 'text-green-800' },
    null:     { bg: 'bg-gray-100', text: 'text-gray-800' },
  };
  const severityKey = value.severity ?? 'null';
  const { bg: severityBg, text: severityText } = severityStyles[severityKey] || severityStyles.null;

  const publishedDate = value.published_at || value.created_at;
  const formattedDate = publishedDate
    ? new Date(publishedDate).toLocaleDateString(undefined, {
        month: 'short', day: 'numeric', year: 'numeric'
      })
    : null;

  const cvssScore = value.cvss?.score ?? null;
  const cvssVector = value.cvss?.vector_string ?? null;

  const cweList = Array.isArray(value.cwe_ids) ? value.cwe_ids.filter(Boolean) : [];
  const cweDisplay = cweList.length
    ? cweList.slice(0, 3).join(', ') + (cweList.length > 3 ? ', ...' : '')
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
        <div className="flex items-baseline space-x-2 truncate">
          <span className="text-lg font-semibold text-gray-900 truncate">{value.ghsa_id}</span>
          {value.cve_id && (
            <span className="text-sm text-gray-600 truncate">({value.cve_id})</span>
          )}
        </div>
        <span
          className={`mt-2 sm:mt-0 px-2 py-1 text-xs font-medium rounded ${severityBg} ${severityText}`}
        >
          {value.severity ? value.severity.charAt(0).toUpperCase() + value.severity.slice(1) : 'Unknown'}
        </span>
      </header>

      {value.summary && (
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">{value.summary}</p>
      )}

      {formattedDate && (
        <p className="text-gray-500 text-xs mb-3">Published: {formattedDate}</p>
      )}

      <div className="flex flex-wrap items-center text-xs text-gray-600 space-x-4 mb-2">
        {cvssScore != null && (
          <span>CVSS Score: <span className="font-medium text-gray-800">{cvssScore.toFixed(1)}</span></span>
        )}
        {cvssVector && (
          <span>Vector: <span className="font-medium text-gray-800 truncate">{cvssVector}</span></span>
        )}
        {value.state && (
          <span>State: <span className="font-medium text-gray-800">{value.state.charAt(0).toUpperCase() + value.state.slice(1)}</span></span>
        )}
        {cweDisplay && (
          <span>CWEs: <span className="font-medium text-gray-800">{cweDisplay}</span></span>
        )}
      </div>

      {value.description && (
        <div className="mt-2 text-gray-700 text-sm line-clamp-3">
          {value.description}
        </div>
      )}
    </div>
  );
}
