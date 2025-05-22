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
export type AutoViewInput = AutoViewInputSubTypes.repository_advisory[];



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
      : "—";

  const severityColor = (sev: AutoViewInputSubTypes.repository_advisory["severity"]) => {
    switch (sev) {
      case "critical":
        return "bg-red-600 text-white";
      case "high":
        return "bg-red-500 text-white";
      case "medium":
        return "bg-yellow-500 text-white";
      case "low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-300 text-gray-700";
    }
  };

  const stateColor = (state: AutoViewInputSubTypes.repository_advisory["state"]) => {
    switch (state) {
      case "published":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      case "withdrawn":
        return "bg-yellow-100 text-yellow-800";
      case "draft":
        return "bg-blue-100 text-blue-800";
      case "triage":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!Array.isArray(value) || value.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-sm text-center text-gray-500">
        No advisories available.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {value.map((advisory) => {
        const {
          ghsa_id,
          cve_id,
          summary,
          description,
          severity,
          state,
          published_at,
          created_at,
          cvss,
          identifiers,
        } = advisory;

        const displayDate = published_at
          ? formatDate(published_at)
          : published_at === null && created_at
          ? formatDate(created_at)
          : "—";

        const primaryScore =
          cvss && typeof cvss.score === "number" ? cvss.score.toFixed(1) : null;

        return (
          <div
            key={ghsa_id}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
              <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
                {summary}
              </h2>
              <div className="mt-2 sm:mt-0 flex space-x-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${severityColor(
                    severity
                  )}`}
                >
                  {severity ? severity.charAt(0).toUpperCase() + severity.slice(1) : "N/A"}
                </span>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${stateColor(
                    state
                  )}`}
                >
                  {state.charAt(0).toUpperCase() + state.slice(1)}
                </span>
              </div>
            </div>

            <div className="mt-2 text-sm text-gray-600 flex flex-wrap gap-2">
              <span className="font-medium">GHSA:</span>
              <span className="truncate">{ghsa_id}</span>
              {cve_id && (
                <>
                  <span className="font-medium">CVE:</span>
                  <span className="truncate">{cve_id}</span>
                </>
              )}
            </div>

            <div className="mt-2 text-sm text-gray-500">
              Published: <span className="font-medium">{displayDate}</span>
            </div>

            {description && (
              <p className="mt-3 text-gray-700 text-sm line-clamp-3">
                {description}
              </p>
            )}

            {primaryScore && (
              <div className="mt-3 flex items-center text-sm">
                <span className="font-medium text-gray-800 mr-1">CVSS:</span>
                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded">
                  {primaryScore}
                </span>
              </div>
            )}

            {identifiers && identifiers.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {identifiers.map((id) => (
                  <span
                    key={id.type + id.value}
                    className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
                  >
                    {id.type}: {id.value}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
