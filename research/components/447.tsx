import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A software package
   *
   * @title Package
   */
  export type _package = {
    /**
     * Unique identifier of the package.
     */
    id: number & tags.Type<"int32">;
    /**
     * The name of the package.
     */
    name: string;
    package_type:
      | "npm"
      | "maven"
      | "rubygems"
      | "docker"
      | "nuget"
      | "container";
    url: string;
    html_url: string;
    /**
     * The number of versions of the package.
     */
    version_count: number & tags.Type<"int32">;
    visibility: "private" | "public";
    owner?: AutoViewInputSubTypes.nullable_simple_user;
    repository?: AutoViewInputSubTypes.nullable_minimal_repository;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
  };
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
   * Minimal Repository
   *
   * @title Minimal Repository
   */
  export type nullable_minimal_repository = {
    id: number & tags.Type<"int32">;
    node_id: string;
    name: string;
    full_name: string;
    owner: AutoViewInputSubTypes.simple_user;
    private: boolean;
    html_url: string & tags.Format<"uri">;
    description: string | null;
    fork: boolean;
    url: string & tags.Format<"uri">;
    archive_url: string;
    assignees_url: string;
    blobs_url: string;
    branches_url: string;
    collaborators_url: string;
    comments_url: string;
    commits_url: string;
    compare_url: string;
    contents_url: string;
    contributors_url: string & tags.Format<"uri">;
    deployments_url: string & tags.Format<"uri">;
    downloads_url: string & tags.Format<"uri">;
    events_url: string & tags.Format<"uri">;
    forks_url: string & tags.Format<"uri">;
    git_commits_url: string;
    git_refs_url: string;
    git_tags_url: string;
    git_url?: string;
    issue_comment_url: string;
    issue_events_url: string;
    issues_url: string;
    keys_url: string;
    labels_url: string;
    languages_url: string & tags.Format<"uri">;
    merges_url: string & tags.Format<"uri">;
    milestones_url: string;
    notifications_url: string;
    pulls_url: string;
    releases_url: string;
    ssh_url?: string;
    stargazers_url: string & tags.Format<"uri">;
    statuses_url: string;
    subscribers_url: string & tags.Format<"uri">;
    subscription_url: string & tags.Format<"uri">;
    tags_url: string & tags.Format<"uri">;
    teams_url: string & tags.Format<"uri">;
    trees_url: string;
    clone_url?: string;
    mirror_url?: string | null;
    hooks_url: string & tags.Format<"uri">;
    svn_url?: string;
    homepage?: string | null;
    language?: string | null;
    forks_count?: number & tags.Type<"int32">;
    stargazers_count?: number & tags.Type<"int32">;
    watchers_count?: number & tags.Type<"int32">;
    /**
     * The size of the repository, in kilobytes. Size is calculated hourly. When a repository is initially created, the size is 0.
     */
    size?: number & tags.Type<"int32">;
    default_branch?: string;
    open_issues_count?: number & tags.Type<"int32">;
    is_template?: boolean;
    topics?: string[];
    has_issues?: boolean;
    has_projects?: boolean;
    has_wiki?: boolean;
    has_pages?: boolean;
    has_downloads?: boolean;
    has_discussions?: boolean;
    archived?: boolean;
    disabled?: boolean;
    visibility?: string;
    pushed_at?: (string & tags.Format<"date-time">) | null;
    created_at?: (string & tags.Format<"date-time">) | null;
    updated_at?: (string & tags.Format<"date-time">) | null;
    permissions?: {
      admin?: boolean;
      maintain?: boolean;
      push?: boolean;
      triage?: boolean;
      pull?: boolean;
    };
    role_name?: string;
    temp_clone_token?: string;
    delete_branch_on_merge?: boolean;
    subscribers_count?: number & tags.Type<"int32">;
    network_count?: number & tags.Type<"int32">;
    code_of_conduct?: AutoViewInputSubTypes.code_of_conduct;
    license?: {
      key?: string;
      name?: string;
      spdx_id?: string;
      url?: string;
      node_id?: string;
    } | null;
    forks?: number & tags.Type<"int32">;
    open_issues?: number & tags.Type<"int32">;
    watchers?: number & tags.Type<"int32">;
    allow_forking?: boolean;
    web_commit_signoff_required?: boolean;
    security_and_analysis?: AutoViewInputSubTypes.security_and_analysis;
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
   * Code Of Conduct
   *
   * @title Code Of Conduct
   */
  export type code_of_conduct = {
    key: string;
    name: string;
    url: string & tags.Format<"uri">;
    body?: string;
    html_url: (string & tags.Format<"uri">) | null;
  };
  export type security_and_analysis = {
    advanced_security?: {
      status?: "enabled" | "disabled";
    };
    code_security?: {
      status?: "enabled" | "disabled";
    };
    /**
     * Enable or disable Dependabot security updates for the repository.
     */
    dependabot_security_updates?: {
      /**
       * The enablement status of Dependabot security updates for the repository.
       */
      status?: "enabled" | "disabled";
    };
    secret_scanning?: {
      status?: "enabled" | "disabled";
    };
    secret_scanning_push_protection?: {
      status?: "enabled" | "disabled";
    };
    secret_scanning_non_provider_patterns?: {
      status?: "enabled" | "disabled";
    };
    secret_scanning_ai_detection?: {
      status?: "enabled" | "disabled";
    };
  } | null;
}
export type AutoViewInput = AutoViewInputSubTypes._package[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived data: sort packages by most recently updated
  const packages = React.useMemo(
    () =>
      [...value].sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      ),
    [value],
  );

  // 2. Date formatting helper
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 3. Render UI
  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {packages.map((pkg) => (
        <div
          key={pkg.id}
          className="bg-white p-4 rounded-lg shadow flex flex-col h-full"
        >
          {/* Header: Package name */}
          <div className="flex items-center mb-2">
            <LucideReact.Package
              size={20}
              className="text-indigo-500 mr-2 flex-shrink-0"
            />
            <h3 className="text-lg font-medium text-gray-900 truncate">
              {pkg.name}
            </h3>
          </div>

          {/* Metadata: type, versions, visibility */}
          <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-3 mb-3">
            <div className="flex items-center">
              <LucideReact.Tag
                size={16}
                className="text-gray-400 mr-1 flex-shrink-0"
              />
              <span className="capitalize">{pkg.package_type}</span>
            </div>
            <div className="flex items-center">
              <LucideReact.List
                size={16}
                className="text-gray-400 mr-1 flex-shrink-0"
              />
              <span>{pkg.version_count} versions</span>
            </div>
            <div className="flex items-center">
              {pkg.visibility === "private" ? (
                <LucideReact.Lock
                  size={16}
                  className="text-red-500 mr-1 flex-shrink-0"
                />
              ) : (
                <LucideReact.Globe
                  size={16}
                  className="text-green-500 mr-1 flex-shrink-0"
                />
              )}
              <span className="capitalize">{pkg.visibility}</span>
            </div>
          </div>

          {/* Optional: owner and repository */}
          {(pkg.owner || pkg.repository) && (
            <div className="flex flex-wrap items-center text-sm text-gray-600 space-x-4 mb-3">
              {pkg.owner && (
                <div className="flex items-center">
                  <img
                    src={pkg.owner.avatar_url}
                    alt={pkg.owner.login}
                    className="w-6 h-6 rounded-full mr-1 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        pkg.owner!.login,
                      )}&background=0D8ABC&color=fff`;
                    }}
                  />
                  <span className="truncate">{pkg.owner.login}</span>
                </div>
              )}
              {pkg.repository && (
                <div className="flex items-center">
                  <LucideReact.GitBranch
                    size={16}
                    className="text-gray-400 mr-1 flex-shrink-0"
                  />
                  <a
                    href={pkg.repository.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline truncate"
                    title={pkg.repository.full_name}
                  >
                    {pkg.repository.full_name}
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Footer: creation & update dates */}
          <div className="mt-auto pt-3 border-t border-gray-100 text-xs text-gray-400 space-y-1">
            <div className="flex items-center">
              <LucideReact.Calendar size={14} className="mr-1 flex-shrink-0" />
              <span>
                Created:{" "}
                <time dateTime={pkg.created_at}>
                  {formatDate(pkg.created_at)}
                </time>
              </span>
            </div>
            <div className="flex items-center">
              <LucideReact.Calendar size={14} className="mr-1 flex-shrink-0" />
              <span>
                Updated:{" "}
                <time dateTime={pkg.updated_at}>
                  {formatDate(pkg.updated_at)}
                </time>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
