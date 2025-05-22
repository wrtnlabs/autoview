import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
    identifiers:
      | {
          /**
           * The type of identifier.
           */
          type: "CVE" | "GHSA";
          /**
           * The identifier value.
           */
          value: string;
        }[]
      | null;
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
    vulnerabilities: AutoViewInputSubTypes.vulnerability[] | null;
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
    cwes:
      | {
          /**
           * The Common Weakness Enumeration (CWE) identifier.
           */
          cwe_id: string;
          /**
           * The name of the CWE.
           */
          name: string;
        }[]
      | null;
    /**
     * The users who contributed to the advisory.
     */
    credits:
      | {
          user: AutoViewInputSubTypes.simple_user;
          type: AutoViewInputSubTypes.security_advisory_credit_types;
        }[]
      | null;
  };
  /**
   * A vulnerability describing the product and its affected versions within a GitHub Security Advisory.
   */
  export type vulnerability = {
    /**
     * The name of the package affected by the vulnerability.
     */
    package: {
      ecosystem: AutoViewInputSubTypes.security_advisory_ecosystems;
      /**
       * The unique package name within its ecosystem.
       */
      name: string | null;
    } | null;
    /**
     * The range of the package versions affected by the vulnerability.
     */
    vulnerable_version_range: string | null;
    /**
     * The package version that resolves the vulnerability.
     */
    first_patched_version: string | null;
    /**
     * The functions in the package that are affected by the vulnerability.
     */
    vulnerable_functions: string[] | null;
  };
  /**
   * The package's language or package management ecosystem.
   */
  export type security_advisory_ecosystems =
    | "rubygems"
    | "npm"
    | "pip"
    | "maven"
    | "nuget"
    | "composer"
    | "go"
    | "rust"
    | "erlang"
    | "actions"
    | "pub"
    | "other"
    | "swift";
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
   * A GitHub user.
   *
   * @title Simple User
   */
  export type simple_user = {
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
  };
  /**
   * The type of credit the user is receiving.
   */
  export type security_advisory_credit_types =
    | "analyst"
    | "finder"
    | "reporter"
    | "coordinator"
    | "remediation_developer"
    | "remediation_reviewer"
    | "remediation_verifier"
    | "tool"
    | "sponsor"
    | "other";
}
export type AutoViewInput = AutoViewInputSubTypes.global_advisory;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const publishedDate = new Date(value.published_at).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );
  const updatedDate = new Date(value.updated_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const cveIdentifier =
    value.cve_id ??
    value.identifiers?.find((id) => id.type === "CVE")?.value ??
    null;

  const severityStyles = {
    critical: {
      label: "Critical",
      bg: "bg-red-100",
      text: "text-red-800",
      icon: (
        <LucideReact.AlertTriangle
          className="w-4 h-4 mr-1 text-red-600"
          aria-hidden="true"
        />
      ),
    },
    high: {
      label: "High",
      bg: "bg-orange-100",
      text: "text-orange-800",
      icon: (
        <LucideReact.AlertTriangle
          className="w-4 h-4 mr-1 text-orange-600"
          aria-hidden="true"
        />
      ),
    },
    medium: {
      label: "Medium",
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      icon: (
        <LucideReact.AlertTriangle
          className="w-4 h-4 mr-1 text-yellow-600"
          aria-hidden="true"
        />
      ),
    },
    low: {
      label: "Low",
      bg: "bg-green-100",
      text: "text-green-800",
      icon: (
        <LucideReact.CheckCircle
          className="w-4 h-4 mr-1 text-green-600"
          aria-hidden="true"
        />
      ),
    },
    unknown: {
      label: "Unknown",
      bg: "bg-gray-100",
      text: "text-gray-800",
      icon: (
        <LucideReact.HelpCircle
          className="w-4 h-4 mr-1 text-gray-600"
          aria-hidden="true"
        />
      ),
    },
  } as const;

  const sev = severityStyles[value.severity];

  const vulnerabilities = value.vulnerabilities ?? [];
  const displayVulns = vulnerabilities.slice(0, 3);
  const moreCount = vulnerabilities.length - displayVulns.length;

  const cvssScore = value.cvss?.score;
  const cvssVector = value.cvss?.vector_string;

  const refsCount = value.references?.length ?? 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{value.summary}</h2>
        <div className="mt-3 sm:mt-0 flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${sev.bg} ${sev.text}`}
          >
            {sev.icon}
            {sev.label}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded">
            <LucideReact.Hash
              className="w-4 h-4 mr-1 text-blue-600"
              aria-hidden="true"
            />
            {value.ghsa_id}
          </span>
          {cveIdentifier && (
            <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-800 text-xs font-medium rounded">
              <LucideReact.Hash
                className="w-4 h-4 mr-1 text-gray-600"
                aria-hidden="true"
              />
              {cveIdentifier}
            </span>
          )}
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-4">
        <a
          href={value.html_url}
          className="inline-flex items-center hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LucideReact.Link className="w-4 h-4 mr-1" aria-hidden="true" />
          Details
        </a>
        {value.repository_advisory_url && (
          <a
            href={value.repository_advisory_url}
            className="inline-flex items-center hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LucideReact.GitBranch
              className="w-4 h-4 mr-1"
              aria-hidden="true"
            />
            Repo Advisory
          </a>
        )}
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
        <div className="flex items-center">
          <LucideReact.Calendar
            className="w-4 h-4 mr-2 text-gray-400"
            aria-hidden="true"
          />
          <span>Published: {publishedDate}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar
            className="w-4 h-4 mr-2 text-gray-400"
            aria-hidden="true"
          />
          <span>Updated: {updatedDate}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Activity
            className="w-4 h-4 mr-2 text-gray-400"
            aria-hidden="true"
          />
          <span>
            CVSS:{" "}
            {cvssScore != null ? (
              <>
                {cvssScore.toFixed(1)}
                {cvssVector && (
                  <span className="ml-1 text-xs font-mono">{cvssVector}</span>
                )}
              </>
            ) : (
              "N/A"
            )}
          </span>
        </div>
        <div className="flex items-center">
          <LucideReact.FileText
            className="w-4 h-4 mr-2 text-gray-400"
            aria-hidden="true"
          />
          <span>References: {refsCount}</span>
        </div>
      </div>

      {/* Vulnerabilities */}
      {vulnerabilities.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Affected Packages
          </h3>
          <ul className="space-y-2 text-gray-800 text-sm">
            {displayVulns.map((v, i) => {
              const pkgName = v.package?.name ?? "Unknown";
              const range = v.vulnerable_version_range ?? "N/A";
              return (
                <li key={i} className="flex items-center">
                  <LucideReact.Box
                    className="w-4 h-4 mr-2 text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="font-medium">{pkgName}</span>
                  <span className="ml-1 text-gray-600">({range})</span>
                </li>
              );
            })}
            {moreCount > 0 && (
              <li className="text-gray-500 text-xs">+{moreCount} more</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
