import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A GitHub Security Advisory.
    */
    export interface global_advisory {
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
            user: AutoViewInputSubTypes.simple_user;
            type: AutoViewInputSubTypes.security_advisory_credit_types;
        }[] | null;
    }
    /**
     * A vulnerability describing the product and its affected versions within a GitHub Security Advisory.
    */
    export interface vulnerability {
        /**
         * The name of the package affected by the vulnerability.
        */
        "package": {
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
    }
    /**
     * The package's language or package management ecosystem.
    */
    export type security_advisory_ecosystems = "rubygems" | "npm" | "pip" | "maven" | "nuget" | "composer" | "go" | "rust" | "erlang" | "actions" | "pub" | "other" | "swift";
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
    export interface simple_user {
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
    }
    /**
     * The type of credit the user is receiving.
    */
    export type security_advisory_credit_types = "analyst" | "finder" | "reporter" | "coordinator" | "remediation_developer" | "remediation_reviewer" | "remediation_verifier" | "tool" | "sponsor" | "other";
}
export type AutoViewInput = AutoViewInputSubTypes.global_advisory;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const publishedDate = new Date(value.published_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const reviewedDate = value.github_reviewed_at
    ? new Date(value.github_reviewed_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;
  const updatedDate = new Date(value.updated_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const severityStyles: Record<AutoViewInput["severity"], string> = {
    critical: "bg-red-100 text-red-800",
    high: "bg-orange-100 text-orange-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-blue-100 text-blue-800",
    unknown: "bg-gray-100 text-gray-800",
  };

  const affectedCount = value.vulnerabilities?.length ?? 0;
  const cweCount = value.cwes?.length ?? 0;
  const creditsCount = value.credits?.length ?? 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{value.ghsa_id}</h2>
          {value.cve_id && (
            <p className="mt-1 text-sm text-gray-500">CVE: {value.cve_id}</p>
          )}
        </div>
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full ${
            severityStyles[value.severity]
          }`}
        >
          {value.severity.charAt(0).toUpperCase() + value.severity.slice(1)}
        </span>
      </div>

      {/* Summary */}
      {value.summary && (
        <p className="text-gray-700 line-clamp-2">{value.summary}</p>
      )}

      {/* Key Dates & CVSS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="mr-1" />
          Published: {publishedDate}
        </div>
        {reviewedDate && (
          <div className="flex items-center">
            <LucideReact.CheckCircle size={16} className="mr-1 text-green-500" />
            Reviewed: {reviewedDate}
          </div>
        )}
        <div className="flex items-center">
          <LucideReact.RefreshCw size={16} className="mr-1" />
          Updated: {updatedDate}
        </div>
        <div className="flex items-center">
          <LucideReact.Shield size={16} className="mr-1" />
          CVSS: {value.cvss?.score != null ? value.cvss.score.toFixed(1) : "N/A"}
        </div>
      </div>

      {/* Identifiers */}
      {value.identifiers && (
        <div className="flex flex-wrap gap-2">
          {value.identifiers.map((id, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full"
            >
              {id.type}: {id.value}
            </span>
          ))}
        </div>
      )}

      {/* Counts */}
      <div className="flex flex-wrap gap-6 text-gray-600">
        <div className="flex items-center">
          <LucideReact.Box size={16} className="mr-1" />
          Affected: {affectedCount}
        </div>
        <div className="flex items-center">
          <LucideReact.Tag size={16} className="mr-1" />
          CWEs: {cweCount}
        </div>
        {creditsCount > 0 && (
          <div className="flex items-center">
            <LucideReact.Users size={16} className="mr-1" />
            Contributors: {creditsCount}
          </div>
        )}
      </div>
    </div>
  );
}
