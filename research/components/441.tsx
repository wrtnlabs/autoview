import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A Dependabot alert.
   */
  export type dependabot_alert_with_repository = {
    number: AutoViewInputSubTypes.alert_number;
    /**
     * The state of the Dependabot alert.
     */
    state: "auto_dismissed" | "dismissed" | "fixed" | "open";
    /**
     * Details for the vulnerable dependency.
     */
    dependency: {
      package?: AutoViewInputSubTypes.dependabot_alert_package;
      /**
       * The full path to the dependency manifest file, relative to the root of the repository.
       */
      manifest_path?: string;
      /**
       * The execution scope of the vulnerable dependency.
       */
      scope?: "development" | "runtime" | null;
      /**
       * The vulnerable dependency's relationship to your project.
       *
       * > [!NOTE]
       * > We are rolling out support for dependency relationship across ecosystems. This value will be "unknown" for all dependencies in unsupported ecosystems.
       *
       */
      relationship?: "unknown" | "direct" | "transitive" | null;
    };
    security_advisory: AutoViewInputSubTypes.dependabot_alert_security_advisory;
    security_vulnerability: AutoViewInputSubTypes.dependabot_alert_security_vulnerability;
    url: AutoViewInputSubTypes.alert_url;
    html_url: AutoViewInputSubTypes.alert_html_url;
    created_at: AutoViewInputSubTypes.alert_created_at;
    updated_at: AutoViewInputSubTypes.alert_updated_at;
    dismissed_at: AutoViewInputSubTypes.alert_dismissed_at;
    dismissed_by: AutoViewInputSubTypes.nullable_simple_user;
    /**
     * The reason that the alert was dismissed.
     */
    dismissed_reason:
      | "fix_started"
      | "inaccurate"
      | "no_bandwidth"
      | "not_used"
      | "tolerable_risk"
      | null;
    /**
     * An optional comment associated with the alert's dismissal.
     */
    dismissed_comment: (string & tags.MaxLength<280>) | null;
    fixed_at: AutoViewInputSubTypes.alert_fixed_at;
    auto_dismissed_at?: AutoViewInputSubTypes.alert_auto_dismissed_at;
    repository: AutoViewInputSubTypes.simple_repository;
  };
  /**
   * The security alert number.
   */
  export type alert_number = number & tags.Type<"int32">;
  /**
   * Details for the vulnerable package.
   */
  export type dependabot_alert_package = {
    /**
     * The package's language or package management ecosystem.
     */
    ecosystem: string;
    /**
     * The unique package name within its ecosystem.
     */
    name: string;
  };
  /**
   * Details for the GitHub Security Advisory.
   */
  export type dependabot_alert_security_advisory = {
    /**
     * The unique GitHub Security Advisory ID assigned to the advisory.
     */
    ghsa_id: string;
    /**
     * The unique CVE ID assigned to the advisory.
     */
    cve_id: string | null;
    /**
     * A short, plain text summary of the advisory.
     */
    summary: string;
    /**
     * A long-form Markdown-supported description of the advisory.
     */
    description: string;
    /**
     * Vulnerable version range information for the advisory.
     */
    vulnerabilities: AutoViewInputSubTypes.dependabot_alert_security_vulnerability[];
    /**
     * The severity of the advisory.
     */
    severity: "low" | "medium" | "high" | "critical";
    /**
     * Details for the advisory pertaining to the Common Vulnerability Scoring System.
     */
    cvss: {
      /**
       * The overall CVSS score of the advisory.
       */
      score: number;
      /**
       * The full CVSS vector string for the advisory.
       */
      vector_string: string | null;
    };
    cvss_severities?: AutoViewInputSubTypes.cvss_severities;
    epss?: AutoViewInputSubTypes.security_advisory_epss;
    /**
     * Details for the advisory pertaining to Common Weakness Enumeration.
     */
    cwes: {
      /**
       * The unique CWE ID.
       */
      cwe_id: string;
      /**
       * The short, plain text name of the CWE.
       */
      name: string;
    }[];
    /**
     * Values that identify this advisory among security information sources.
     */
    identifiers: {
      /**
       * The type of advisory identifier.
       */
      type: "CVE" | "GHSA";
      /**
       * The value of the advisory identifer.
       */
      value: string;
    }[];
    /**
     * Links to additional advisory information.
     */
    references: {
      /**
       * The URL of the reference.
       */
      url: string;
    }[];
    /**
     * The time that the advisory was published in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
     */
    published_at: string;
    /**
     * The time that the advisory was last modified in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
     */
    updated_at: string;
    /**
     * The time that the advisory was withdrawn in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
     */
    withdrawn_at: (string & tags.Format<"date-time">) | null;
  };
  /**
   * Details pertaining to one vulnerable version range for the advisory.
   */
  export type dependabot_alert_security_vulnerability = {
    package: AutoViewInputSubTypes.dependabot_alert_package;
    /**
     * The severity of the vulnerability.
     */
    severity: "low" | "medium" | "high" | "critical";
    /**
     * Conditions that identify vulnerable versions of this vulnerability's package.
     */
    vulnerable_version_range: string;
    /**
     * Details pertaining to the package version that patches this vulnerability.
     */
    first_patched_version: {
      /**
       * The package version that patches this vulnerability.
       */
      identifier: string;
    } | null;
  };
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
   * The REST API URL of the alert resource.
   */
  export type alert_url = string;
  /**
   * The GitHub URL of the alert resource.
   */
  export type alert_html_url = string;
  /**
   * The time that the alert was created in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
   */
  export type alert_created_at = string;
  /**
   * The time that the alert was last updated in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
   */
  export type alert_updated_at = string;
  /**
   * The time that the alert was dismissed in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
   */
  export type alert_dismissed_at = (string & tags.Format<"date-time">) | null;
  /**
   * A GitHub user.
   *
   * @title Simple User
   */
  export type nullable_simple_user = {
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
  } | null;
  /**
   * The time that the alert was no longer detected and was considered fixed in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
   */
  export type alert_fixed_at = (string & tags.Format<"date-time">) | null;
  /**
   * The time that the alert was auto-dismissed in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
   */
  export type alert_auto_dismissed_at =
    | (string & tags.Format<"date-time">)
    | null;
  /**
   * A GitHub repository.
   *
   * @title Simple Repository
   */
  export type simple_repository = {
    /**
     * A unique identifier of the repository.
     */
    id: number & tags.Type<"int32">;
    /**
     * The GraphQL identifier of the repository.
     */
    node_id: string;
    /**
     * The name of the repository.
     */
    name: string;
    /**
     * The full, globally unique, name of the repository.
     */
    full_name: string;
    owner: AutoViewInputSubTypes.simple_user;
    /**
     * Whether the repository is private.
     */
    private: boolean;
    /**
     * The URL to view the repository on GitHub.com.
     */
    html_url: string;
    /**
     * The repository description.
     */
    description: string | null;
    /**
     * Whether the repository is a fork.
     */
    fork: boolean;
    /**
     * The URL to get more information about the repository from the GitHub API.
     */
    url: string;
    /**
     * A template for the API URL to download the repository as an archive.
     */
    archive_url: string;
    /**
     * A template for the API URL to list the available assignees for issues in the repository.
     */
    assignees_url: string;
    /**
     * A template for the API URL to create or retrieve a raw Git blob in the repository.
     */
    blobs_url: string;
    /**
     * A template for the API URL to get information about branches in the repository.
     */
    branches_url: string;
    /**
     * A template for the API URL to get information about collaborators of the repository.
     */
    collaborators_url: string;
    /**
     * A template for the API URL to get information about comments on the repository.
     */
    comments_url: string;
    /**
     * A template for the API URL to get information about commits on the repository.
     */
    commits_url: string;
    /**
     * A template for the API URL to compare two commits or refs.
     */
    compare_url: string;
    /**
     * A template for the API URL to get the contents of the repository.
     */
    contents_url: string;
    /**
     * A template for the API URL to list the contributors to the repository.
     */
    contributors_url: string;
    /**
     * The API URL to list the deployments of the repository.
     */
    deployments_url: string;
    /**
     * The API URL to list the downloads on the repository.
     */
    downloads_url: string;
    /**
     * The API URL to list the events of the repository.
     */
    events_url: string;
    /**
     * The API URL to list the forks of the repository.
     */
    forks_url: string;
    /**
     * A template for the API URL to get information about Git commits of the repository.
     */
    git_commits_url: string;
    /**
     * A template for the API URL to get information about Git refs of the repository.
     */
    git_refs_url: string;
    /**
     * A template for the API URL to get information about Git tags of the repository.
     */
    git_tags_url: string;
    /**
     * A template for the API URL to get information about issue comments on the repository.
     */
    issue_comment_url: string;
    /**
     * A template for the API URL to get information about issue events on the repository.
     */
    issue_events_url: string;
    /**
     * A template for the API URL to get information about issues on the repository.
     */
    issues_url: string;
    /**
     * A template for the API URL to get information about deploy keys on the repository.
     */
    keys_url: string;
    /**
     * A template for the API URL to get information about labels of the repository.
     */
    labels_url: string;
    /**
     * The API URL to get information about the languages of the repository.
     */
    languages_url: string;
    /**
     * The API URL to merge branches in the repository.
     */
    merges_url: string;
    /**
     * A template for the API URL to get information about milestones of the repository.
     */
    milestones_url: string;
    /**
     * A template for the API URL to get information about notifications on the repository.
     */
    notifications_url: string;
    /**
     * A template for the API URL to get information about pull requests on the repository.
     */
    pulls_url: string;
    /**
     * A template for the API URL to get information about releases on the repository.
     */
    releases_url: string;
    /**
     * The API URL to list the stargazers on the repository.
     */
    stargazers_url: string;
    /**
     * A template for the API URL to get information about statuses of a commit.
     */
    statuses_url: string;
    /**
     * The API URL to list the subscribers on the repository.
     */
    subscribers_url: string;
    /**
     * The API URL to subscribe to notifications for this repository.
     */
    subscription_url: string;
    /**
     * The API URL to get information about tags on the repository.
     */
    tags_url: string;
    /**
     * The API URL to list the teams on the repository.
     */
    teams_url: string;
    /**
     * A template for the API URL to create or retrieve a raw Git tree of the repository.
     */
    trees_url: string;
    /**
     * The API URL to list the hooks on the repository.
     */
    hooks_url: string;
  };
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
}
export type AutoViewInput =
  AutoViewInputSubTypes.dependabot_alert_with_repository[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const severityBadgeClasses: Record<string, string> = {
    low: "bg-green-100 text-green-800",
    medium: "bg-amber-100 text-amber-800",
    high: "bg-red-100 text-red-800",
    critical: "bg-red-200 text-red-900",
  };

  function getStateIcon(state: string): JSX.Element {
    switch (state) {
      case "open":
        return <LucideReact.Clock className="text-amber-500" size={16} />;
      case "fixed":
        return <LucideReact.CheckCircle className="text-green-500" size={16} />;
      case "dismissed":
        return <LucideReact.XCircle className="text-gray-500" size={16} />;
      case "auto_dismissed":
        return <LucideReact.Repeat className="text-purple-500" size={16} />;
      default:
        return <LucideReact.AlertCircle className="text-gray-500" size={16} />;
    }
  }

  function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).replace("_", " ");
  }

  function formatDate(iso: string): string {
    try {
      return new Date(iso).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return iso;
    }
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!Array.isArray(value) || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <span className="text-sm">No Dependabot alerts to display.</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {value.map((alert, idx) => (
        <div
          key={idx}
          className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          {/* Header: Repository & State */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <LucideReact.GitBranch className="text-gray-500" size={16} />
                <span className="text-sm font-medium text-gray-700 truncate">
                  {alert.repository.full_name}
                </span>
              </div>
              <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                {alert.dependency.package ? (
                  <>
                    <LucideReact.Package size={14} />
                    <span className="truncate">
                      {alert.dependency.package.name} (
                      {alert.dependency.package.ecosystem})
                    </span>
                  </>
                ) : alert.dependency.manifest_path ? (
                  <>
                    <LucideReact.FileText size={14} />
                    <span className="truncate">
                      {alert.dependency.manifest_path}
                    </span>
                  </>
                ) : null}
              </div>
            </div>
            <div className="flex items-center space-x-1">
              {getStateIcon(alert.state)}
              <span className="text-xs font-medium text-gray-600">
                {capitalize(alert.state)}
              </span>
            </div>
          </div>

          {/* Severity, Created Date */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span
              className={`px-2 py-0.5 rounded ${severityBadgeClasses[alert.security_advisory.severity]}`}
            >
              {alert.security_advisory.severity.toUpperCase()}
            </span>
            <div className="flex items-center text-gray-500">
              <LucideReact.Calendar size={14} className="mr-1" />
              <span>{formatDate(alert.created_at)}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <LucideReact.AlertTriangle size={14} className="mr-1" />
              <span>
                {alert.security_advisory.vulnerabilities.length} vulnerable
                versions
              </span>
            </div>
          </div>

          {/* Advisory Summary */}
          <h3 className="mt-2 text-sm font-semibold text-gray-800 line-clamp-2">
            {alert.security_advisory.summary}
          </h3>

          {/* Footer: Dismissed/Fixed Info */}
          {(alert.fixed_at || alert.dismissed_at) && (
            <div className="mt-2 flex items-center space-x-2 text-xs text-gray-500">
              {alert.fixed_at && (
                <div className="flex items-center">
                  <LucideReact.CheckCircle
                    size={14}
                    className="mr-1 text-green-500"
                  />
                  <span>Fixed: {formatDate(alert.fixed_at)}</span>
                </div>
              )}
              {alert.dismissed_at && (
                <div className="flex items-center">
                  <LucideReact.XCircle
                    size={14}
                    className="mr-1 text-gray-500"
                  />
                  <span>Dismissed: {formatDate(alert.dismissed_at)}</span>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
