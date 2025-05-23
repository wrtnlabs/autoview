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
export type AutoViewInput = AutoViewInputSubTypes.global_advisory[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const advisories = value;
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const severityMap: Record<
    AutoViewInputSubTypes.global_advisory["severity"],
    { label: string; icon: React.ComponentType<any>; color: string }
  > = {
    critical: {
      label: "Critical",
      icon: LucideReact.XCircle,
      color: "text-red-600",
    },
    high: {
      label: "High",
      icon: LucideReact.AlertTriangle,
      color: "text-red-500",
    },
    medium: {
      label: "Medium",
      icon: LucideReact.AlertTriangle,
      color: "text-amber-500",
    },
    low: {
      label: "Low",
      icon: LucideReact.AlertTriangle,
      color: "text-yellow-500",
    },
    unknown: {
      label: "Unknown",
      icon: LucideReact.HelpCircle,
      color: "text-gray-500",
    },
  };

  if (advisories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={32} className="mb-2" aria-hidden />
        <span>No security advisories available.</span>
      </div>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {advisories.map((adv) => {
        const {
          ghsa_id,
          cve_id,
          summary,
          severity,
          published_at,
          html_url,
          cvss,
          epss,
          vulnerabilities,
          cwes,
        } = adv;
        const { label: sevLabel, icon: SevIcon, color: sevColor } =
          severityMap[severity];
        return (
          <div
            key={ghsa_id}
            className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
              <div className="flex items-center gap-2">
                <SevIcon
                  size={20}
                  className={`${sevColor} flex-shrink-0`}
                  aria-label={sevLabel}
                />
                <span className={`text-sm font-medium ${sevColor}`}>
                  {sevLabel}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {ghsa_id}
                {cve_id ? ` / ${cve_id}` : ""}
              </span>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-lg font-semibold text-gray-800">{summary}</h3>
              <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                {adv.description ?? adv.summary}
              </p>
              <div className="mt-auto pt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <LucideReact.Calendar size={16} aria-hidden />
                  <span>{formatDate(published_at)}</span>
                </div>
                {cvss?.score != null && (
                  <div className="flex items-center gap-1">
                    <LucideReact.BarChart2 size={16} aria-hidden />
                    <span>{cvss.score.toFixed(1)}</span>
                  </div>
                )}
                {epss?.percentage != null && (
                  <div className="flex items-center gap-1">
                    <LucideReact.TrendingUp size={16} aria-hidden />
                    <span>{epss.percentage.toFixed(1)}%</span>
                  </div>
                )}
                {vulnerabilities && vulnerabilities.length > 0 && (
                  <div className="flex items-center gap-1">
                    <LucideReact.Package size={16} aria-hidden />
                    <span>{vulnerabilities.length} affected</span>
                  </div>
                )}
                {cwes && cwes.length > 0 && (
                  <div className="flex items-center gap-1">
                    <LucideReact.Shield size={16} aria-hidden />
                    <span>{cwes.length} CWEs</span>
                  </div>
                )}
                {html_url && (
                  <div className="flex items-center gap-1 truncate">
                    <LucideReact.Link size={16} aria-hidden />
                    <span className="truncate">{html_url}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
