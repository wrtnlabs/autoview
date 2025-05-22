import LucideReact from "lucide-react";
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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const packages = [...value].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  );

  const formatDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const typeColors: Record<
    AutoViewInputSubTypes._package["package_type"],
    string
  > = {
    npm: "bg-red-100 text-red-800",
    maven: "bg-green-100 text-green-800",
    rubygems: "bg-pink-100 text-pink-800",
    docker: "bg-blue-100 text-blue-800",
    nuget: "bg-purple-100 text-purple-800",
    container: "bg-indigo-100 text-indigo-800",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {packages.map((pkg) => (
        <div
          key={pkg.id}
          className="flex flex-col bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2 truncate">
              <LucideReact.Package size={20} className="text-indigo-500" />
              <h2 className="text-gray-900 font-semibold truncate">
                {pkg.name}
              </h2>
            </div>
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded ${typeColors[pkg.package_type]}`}
            >
              {pkg.package_type}
            </span>
          </div>

          <div className="px-4 space-y-2 flex-1">
            <div className="flex items-center text-sm text-gray-600">
              <LucideReact.Box size={16} className="mr-1" />
              <span>{pkg.version_count} versions</span>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              {pkg.visibility === "public" ? (
                <LucideReact.Globe
                  size={16}
                  className="text-green-500 mr-1"
                  aria-label="Public"
                />
              ) : (
                <LucideReact.Lock
                  size={16}
                  className="text-red-500 mr-1"
                  aria-label="Private"
                />
              )}
              <span className="capitalize">{pkg.visibility}</span>
            </div>

            {pkg.owner && (
              <div className="flex items-center text-sm text-gray-600">
                <img
                  src={pkg.owner.avatar_url}
                  alt={pkg.owner.login}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        pkg.owner!.login,
                      )}&background=random`;
                  }}
                  className="w-5 h-5 rounded-full object-cover mr-1"
                />
                <span>{pkg.owner.login}</span>
              </div>
            )}

            {pkg.repository && (
              <div className="flex items-center text-sm text-gray-600">
                <LucideReact.GitBranch size={16} className="mr-1" />
                <a
                  href={pkg.repository.html_url}
                  className="truncate text-blue-500 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {pkg.repository.full_name}
                </a>
              </div>
            )}
          </div>

          <div className="border-t px-4 py-3 bg-gray-50 text-xs text-gray-500 space-y-1">
            <div className="flex items-center">
              <LucideReact.Calendar size={14} className="mr-1" />
              <span>Created: {formatDate(pkg.created_at)}</span>
            </div>
            <div className="flex items-center">
              <LucideReact.Calendar size={14} className="mr-1" />
              <span>Updated: {formatDate(pkg.updated_at)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
