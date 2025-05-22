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
export type AutoViewInput = AutoViewInputSubTypes._package;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const updatedDate = new Date(value.updated_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const urlHostname = (() => {
    try {
      return new URL(value.html_url).hostname;
    } catch {
      return value.html_url;
    }
  })();
  const ownerAvatarFallback = (login: string): string =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(login)}&background=0D8ABC&color=fff`;

  const typeColors: Record<string, string> = {
    npm: "bg-red-100 text-red-800",
    maven: "bg-blue-100 text-blue-800",
    rubygems: "bg-pink-100 text-pink-800",
    docker: "bg-cyan-100 text-cyan-800",
    nuget: "bg-purple-100 text-purple-800",
    container: "bg-gray-100 text-gray-800",
  };
  const typeColor =
    typeColors[value.package_type] || "bg-gray-100 text-gray-800";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <LucideReact.Package size={28} className="text-indigo-500" />
        </div>
        <div className="ml-3 flex-1">
          <h2 className="text-xl font-semibold text-gray-900 truncate">
            {value.name}
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${typeColor}`}
            >
              {value.package_type.toUpperCase()}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
              <LucideReact.Tag size={12} className="mr-1" /> v
              {value.version_count}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium">
              {value.visibility === "public" ? (
                <>
                  <LucideReact.Unlock
                    size={12}
                    className="mr-1 text-green-500"
                  />
                  <span className="text-green-700">Public</span>
                </>
              ) : (
                <>
                  <LucideReact.Lock size={12} className="mr-1 text-red-500" />
                  <span className="text-red-700">Private</span>
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      {(value.owner || value.repository) && (
        <div className="mt-4 grid grid-cols-1 gap-4">
          {value.owner && (
            <div className="flex items-center">
              <img
                src={value.owner.avatar_url}
                alt={value.owner.login}
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    ownerAvatarFallback(value.owner!.login);
                }}
              />
              <span className="ml-2 text-sm text-gray-700 truncate">
                {value.owner.login}
              </span>
            </div>
          )}
          {value.repository && (
            <div className="flex items-center text-sm text-gray-700">
              <LucideReact.GitBranch size={16} className="text-gray-500 mr-1" />
              <span className="truncate">{value.repository.full_name}</span>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 flex flex-col sm:flex-row sm:space-x-4 text-sm text-gray-500">
        <div className="flex items-center mt-2 sm:mt-0">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span>Created: {createdDate}</span>
        </div>
        <div className="flex items-center mt-2 sm:mt-0">
          <LucideReact.RefreshCw size={16} className="mr-1" />
          <span>Updated: {updatedDate}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center text-sm text-gray-500">
        <LucideReact.Link size={16} className="mr-1" />
        <span className="truncate">{urlHostname}</span>
      </div>
    </div>
  );
  // 3. Return the React element.
  //    All displayed data is appropriately filtered, transformed, and formatted.
}
