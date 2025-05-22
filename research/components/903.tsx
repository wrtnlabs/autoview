import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiSearchRepositories {
    export type GetResponse = {
      total_count: number & tags.Type<"int32">;
      incomplete_results: boolean;
      items: AutoViewInputSubTypes.repo_search_result_item[];
    };
  }
  /**
   * Repo Search Result Item
   *
   * @title Repo Search Result Item
   */
  export type repo_search_result_item = {
    id: number & tags.Type<"int32">;
    node_id: string;
    name: string;
    full_name: string;
    owner: AutoViewInputSubTypes.nullable_simple_user;
    private: boolean;
    html_url: string & tags.Format<"uri">;
    description: string | null;
    fork: boolean;
    url: string & tags.Format<"uri">;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
    pushed_at: string & tags.Format<"date-time">;
    homepage: (string & tags.Format<"uri">) | null;
    size: number & tags.Type<"int32">;
    stargazers_count: number & tags.Type<"int32">;
    watchers_count: number & tags.Type<"int32">;
    language: string | null;
    forks_count: number & tags.Type<"int32">;
    open_issues_count: number & tags.Type<"int32">;
    master_branch?: string;
    default_branch: string;
    score: number;
    forks_url: string & tags.Format<"uri">;
    keys_url: string;
    collaborators_url: string;
    teams_url: string & tags.Format<"uri">;
    hooks_url: string & tags.Format<"uri">;
    issue_events_url: string;
    events_url: string & tags.Format<"uri">;
    assignees_url: string;
    branches_url: string;
    tags_url: string & tags.Format<"uri">;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string & tags.Format<"uri">;
    stargazers_url: string & tags.Format<"uri">;
    contributors_url: string & tags.Format<"uri">;
    subscribers_url: string & tags.Format<"uri">;
    subscription_url: string & tags.Format<"uri">;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string & tags.Format<"uri">;
    archive_url: string;
    downloads_url: string & tags.Format<"uri">;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string & tags.Format<"uri">;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string & tags.Format<"uri">;
    forks: number & tags.Type<"int32">;
    open_issues: number & tags.Type<"int32">;
    watchers: number & tags.Type<"int32">;
    topics?: string[];
    mirror_url: (string & tags.Format<"uri">) | null;
    has_issues: boolean;
    has_projects: boolean;
    has_pages: boolean;
    has_wiki: boolean;
    has_downloads: boolean;
    has_discussions?: boolean;
    archived: boolean;
    /**
     * Returns whether or not this repository disabled.
     */
    disabled: boolean;
    /**
     * The repository visibility: public, private, or internal.
     */
    visibility?: string;
    license: AutoViewInputSubTypes.nullable_license_simple;
    permissions?: {
      admin: boolean;
      maintain?: boolean;
      push: boolean;
      triage?: boolean;
      pull: boolean;
    };
    text_matches?: AutoViewInputSubTypes.search_result_text_matches;
    temp_clone_token?: string;
    allow_merge_commit?: boolean;
    allow_squash_merge?: boolean;
    allow_rebase_merge?: boolean;
    allow_auto_merge?: boolean;
    delete_branch_on_merge?: boolean;
    allow_forking?: boolean;
    is_template?: boolean;
    web_commit_signoff_required?: boolean;
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
   * License Simple
   *
   * @title License Simple
   */
  export type nullable_license_simple = {
    key: string;
    name: string;
    url: (string & tags.Format<"uri">) | null;
    spdx_id: string | null;
    node_id: string;
    html_url?: string & tags.Format<"uri">;
  } | null;
  /**
   * @title Search Result Text Matches
   */
  export type search_result_text_matches = {
    object_url?: string;
    object_type?: string | null;
    property?: string;
    fragment?: string;
    matches?: {
      text?: string;
      indices?: (number & tags.Type<"int32">)[];
    }[];
  }[];
}
export type AutoViewInput =
  AutoViewInputSubTypes.IApiSearchRepositories.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const total = value.total_count;
  const incomplete = value.incomplete_results;
  const headerText = incomplete
    ? `${total.toLocaleString()} (partial results)`
    : `${total.toLocaleString()} results`;

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const avatarFallback = (login?: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      login || "User",
    )}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-gray-50">
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Repositories</h2>
        <div className="text-sm text-gray-600">{headerText}</div>
      </header>

      {value.items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <p className="mt-2 text-lg">No repositories found.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {value.items.map((item) => (
            <li
              key={item.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row">
                <div className="flex-shrink-0 p-4">
                  <img
                    src={
                      item.owner?.avatar_url ||
                      avatarFallback(item.owner?.login)
                    }
                    alt={item.owner?.login || "Owner avatar"}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = avatarFallback(
                        item.owner?.login,
                      );
                    }}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4 flex flex-col justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 truncate">
                      {item.full_name}
                    </h3>
                    {item.description && (
                      <p className="mt-1 text-gray-700 text-sm line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center text-gray-600 text-sm gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <LucideReact.Star size={16} className="text-yellow-500" />
                      <span>{item.stargazers_count.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <LucideReact.GitBranch
                        size={16}
                        className="text-gray-500"
                      />
                      <span>{item.forks_count.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <LucideReact.Eye size={16} className="text-gray-500" />
                      <span>{item.watchers_count.toLocaleString()}</span>
                    </div>
                    {item.language && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded">
                        {item.language}
                      </span>
                    )}
                    <div className="flex items-center gap-1">
                      <LucideReact.Calendar
                        size={16}
                        className="text-gray-400"
                      />
                      <span>{formatDate(item.updated_at)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
