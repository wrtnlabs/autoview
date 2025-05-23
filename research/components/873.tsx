import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A repository security advisory.
    */
    export interface repository_advisory {
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
        author: AutoViewInputSubTypes.simple_user | null;
        /**
         * The publisher of the advisory.
        */
        publisher: AutoViewInputSubTypes.simple_user | null;
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
        vulnerabilities: AutoViewInputSubTypes.repository_advisory_vulnerability[] | null;
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
            type?: AutoViewInputSubTypes.security_advisory_credit_types;
        }[] | null;
        credits_detailed: AutoViewInputSubTypes.repository_advisory_credit[] | null;
        /**
         * A list of users that collaborate on the advisory.
        */
        collaborating_users: AutoViewInputSubTypes.simple_user[] | null;
        /**
         * A list of teams that collaborate on the advisory.
        */
        collaborating_teams: AutoViewInputSubTypes.team[] | null;
        /**
         * A temporary private fork of the advisory's repository for collaborating on a fix.
        */
        private_fork: AutoViewInputSubTypes.simple_repository | null;
    }
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
     * A product affected by the vulnerability detailed in a repository security advisory.
    */
    export interface repository_advisory_vulnerability {
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
         * The package version(s) that resolve the vulnerability.
        */
        patched_versions: string | null;
        /**
         * The functions in the package that are affected.
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
     * The type of credit the user is receiving.
    */
    export type security_advisory_credit_types = "analyst" | "finder" | "reporter" | "coordinator" | "remediation_developer" | "remediation_reviewer" | "remediation_verifier" | "tool" | "sponsor" | "other";
    /**
     * A credit given to a user for a repository security advisory.
    */
    export interface repository_advisory_credit {
        user: AutoViewInputSubTypes.simple_user;
        type: AutoViewInputSubTypes.security_advisory_credit_types;
        /**
         * The state of the user's acceptance of the credit.
        */
        state: "accepted" | "declined" | "pending";
    }
    /**
     * Groups of organization members that gives permissions on specified repositories.
     *
     * @title Team
    */
    export interface team {
        id: number & tags.Type<"int32">;
        node_id: string;
        name: string;
        slug: string;
        description: string | null;
        privacy?: string;
        notification_setting?: string;
        permission: string;
        permissions?: {
            pull: boolean;
            triage: boolean;
            push: boolean;
            maintain: boolean;
            admin: boolean;
        };
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        members_url: string;
        repositories_url: string & tags.Format<"uri">;
        parent: AutoViewInputSubTypes.nullable_team_simple;
    }
    /**
     * Groups of organization members that gives permissions on specified repositories.
     *
     * @title Team Simple
    */
    export type nullable_team_simple = {
        /**
         * Unique identifier of the team
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * URL for the team
        */
        url: string;
        members_url: string;
        /**
         * Name of the team
        */
        name: string;
        /**
         * Description of the team
        */
        description: string | null;
        /**
         * Permission that the team will have for its repositories
        */
        permission: string;
        /**
         * The level of privacy this team should have
        */
        privacy?: string;
        /**
         * The notification setting the team has set
        */
        notification_setting?: string;
        html_url: string & tags.Format<"uri">;
        repositories_url: string & tags.Format<"uri">;
        slug: string;
        /**
         * Distinguished Name (DN) that team maps to within LDAP environment
        */
        ldap_dn?: string;
    } | null;
    /**
     * A GitHub repository.
     *
     * @title Simple Repository
    */
    export interface simple_repository {
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
        "private": boolean;
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.repository_advisory[];



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const advisories = value;
  const formatDate = (dateStr?: string | null): string =>
    dateStr
      ? new Date(dateStr).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
      : 'N/A';

  const severityConfig = {
    critical: { icon: <LucideReact.AlertCircle className="text-red-500" size={16} />, label: 'Critical' },
    high:     { icon: <LucideReact.AlertTriangle className="text-orange-500" size={16} />, label: 'High' },
    medium:   { icon: <LucideReact.AlertTriangle className="text-yellow-500" size={16} />, label: 'Medium' },
    low:      { icon: <LucideReact.Info className="text-green-500" size={16} />, label: 'Low' },
    null:     { icon: <LucideReact.HelpCircle className="text-gray-400" size={16} />, label: 'Unknown' },
  } as const;

  if (advisories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-4">No advisories available.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {advisories.map((adv) => {
        const sevKey = (adv.severity ?? 'null') as keyof typeof severityConfig;
        const config = severityConfig[sevKey];
        const vulnCount = adv.vulnerabilities?.length ?? 0;
        const author = adv.author;
        const pub = adv.publisher;
        const cvssScore = adv.cvss?.score;
        const cvssVec = adv.cvss?.vector_string;

        return (
          <div key={adv.ghsa_id} className="p-4 bg-white rounded-lg shadow flex flex-col">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-gray-800 truncate">{adv.summary}</h3>
              <div className="flex items-center gap-1">
                {config.icon}
                <span
                  className={`text-sm font-medium ${
                    sevKey === 'critical'
                      ? 'text-red-600'
                      : sevKey === 'high'
                      ? 'text-orange-600'
                      : sevKey === 'medium'
                      ? 'text-yellow-600'
                      : sevKey === 'low'
                      ? 'text-green-600'
                      : 'text-gray-500'
                  }`}
                >
                  {config.label}
                </span>
              </div>
            </div>

            <div className="mt-2 text-sm text-gray-500 flex flex-wrap gap-2">
              <span className="flex items-center gap-1">
                <LucideReact.Link size={14} />
                <a
                  href={adv.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline truncate"
                >
                  {adv.ghsa_id}
                </a>
              </span>
              {adv.cve_id && (
                <span className="flex items-center gap-1">
                  <LucideReact.Tag size={14} />
                  <span>CVE: {adv.cve_id}</span>
                </span>
              )}
              <span className="flex items-center gap-1">
                <LucideReact.Calendar size={14} />
                <span>Published: {formatDate(adv.published_at)}</span>
              </span>
            </div>

            {cvssScore != null && (
              <div className="mt-3 flex items-center text-sm text-gray-600">
                <LucideReact.Star className="text-yellow-500" size={16} />
                <span className="ml-1">CVSS: {cvssScore.toFixed(1)}</span>
                {cvssVec && <span className="ml-2 italic text-xs text-gray-400">{cvssVec}</span>}
              </div>
            )}

            <p className="mt-3 text-gray-700 text-sm line-clamp-3">
              {adv.description ?? adv.summary}
            </p>

            <div className="mt-auto pt-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <LucideReact.Bug size={16} />
                <span>
                  {vulnCount} {vulnCount === 1 ? 'Package' : 'Packages'}
                </span>
              </span>
              <div className="flex items-center gap-2">
                {author && (
                  <img
                    src={author.avatar_url}
                    alt={author.login}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        author.name ?? author.login
                      )}&background=0D8ABC&color=fff`;
                    }}
                    className="w-6 h-6 rounded-full"
                  />
                )}
                {pub && (
                  <img
                    src={pub.avatar_url}
                    alt={pub.login}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        pub.name ?? pub.login
                      )}&background=64748B&color=fff`;
                    }}
                    className="w-6 h-6 rounded-full"
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
