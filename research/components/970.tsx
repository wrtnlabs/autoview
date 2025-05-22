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
export type AutoViewInput = AutoViewInputSubTypes._package;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const {
    name,
    package_type,
    version_count,
    visibility,
    html_url,
    owner,
    repository,
    created_at,
    updated_at,
  } = value;

  // Format dates
  const createdAt = new Date(created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const updatedAt = new Date(updated_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Badge class mapping for package types
  const typeBadgeMap: Record<string, string> = {
    npm: "bg-indigo-100 text-indigo-800",
    maven: "bg-emerald-100 text-emerald-800",
    rubygems: "bg-red-100 text-red-800",
    docker: "bg-blue-100 text-blue-800",
    nuget: "bg-purple-100 text-purple-800",
    container: "bg-yellow-100 text-yellow-800",
  };
  const typeBadgeClasses =
    typeBadgeMap[package_type] || "bg-gray-100 text-gray-800";

  // Badge for visibility
  const isPublic = visibility === "public";

  // Placeholder for owner avatar
  const ownerName = owner?.name || owner?.login || "User";
  const avatarPlaceholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    ownerName,
  )}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full p-4 bg-white rounded-lg shadow-md flex flex-col">
      {/* Header: Name and badges */}
      <div className="flex justify-between items-start">
        <h2
          className="text-lg font-semibold text-gray-900 truncate"
          title={name}
        >
          {name}
        </h2>
        <div className="flex items-center space-x-2">
          <span
            className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${typeBadgeClasses}`}
          >
            {package_type.toUpperCase()}
          </span>
          <span className="inline-flex items-center text-xs font-medium bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">
            Versions: {version_count}
          </span>
        </div>
      </div>

      {/* Visibility and link */}
      <div className="mt-2 flex items-center text-sm text-gray-600 space-x-4">
        <div className="flex items-center">
          {isPublic ? (
            <LucideReact.Globe size={16} className="text-blue-500" />
          ) : (
            <LucideReact.Lock size={16} className="text-gray-500" />
          )}
          <span className="ml-1">{isPublic ? "Public" : "Private"}</span>
        </div>
        <a
          href={html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:underline text-blue-600"
        >
          <LucideReact.Link size={16} />
          <span className="ml-1 truncate">View</span>
        </a>
      </div>

      {/* Owner */}
      {owner && (
        <div className="mt-4 flex items-center">
          <img
            src={owner.avatar_url}
            alt={owner.login}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = avatarPlaceholder;
            }}
            className="h-8 w-8 rounded-full object-cover"
          />
          <a
            href={owner.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 text-sm font-medium text-blue-600 hover:underline"
          >
            {owner.login}
          </a>
        </div>
      )}

      {/* Repository */}
      {repository && (
        <div className="mt-3 flex items-center text-sm text-gray-700">
          <LucideReact.GitBranch size={16} className="text-gray-500" />
          <a
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 hover:underline text-blue-600 truncate"
            title={repository.full_name}
          >
            {repository.full_name}
          </a>
        </div>
      )}

      {/* Timestamps */}
      <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-gray-500">
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span className="ml-1">Created: {createdAt}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span className="ml-1">Updated: {updatedAt}</span>
        </div>
      </div>
    </div>
  );
}
