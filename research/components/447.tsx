import { tags } from "typia";
import React from "react";
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
        package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
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
        owner: any;
        "private": boolean;
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
        code_of_conduct?: any;
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
        security_and_analysis?: any;
    } | null;
    export type simple_user = any;
    export type code_of_conduct = any;
    export type security_and_analysis = any;
}
export type AutoViewInput = AutoViewInputSubTypes._package[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalPackages = value.length;
  const totalVersions = value.reduce((sum, pkg) => sum + pkg.version_count, 0);
  const averageVersions =
    totalPackages > 0 ? (totalVersions / totalPackages).toFixed(1) : "0";

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const timeAgo = (dateStr: string): string => {
    const date = new Date(dateStr);
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
    ];
    for (const { label, seconds: sec } of intervals) {
      const count = Math.floor(seconds / sec);
      if (count >= 1) {
        return `${count} ${label}${count > 1 ? "s" : ""} ago`;
      }
    }
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4">
      {/* Summary */}
      <div className="mb-6 text-gray-700">
        <p className="text-sm">
          <span className="font-medium">{totalPackages}</span>{" "}
          package{totalPackages !== 1 ? "s" : ""} •{" "}
          <span className="font-medium">{totalVersions}</span> total versions •
          avg. <span className="font-medium">{averageVersions}</span> per
          package
        </p>
      </div>

      {/* Package Grid */}
      {totalPackages === 0 ? (
        <p className="text-center text-gray-500">No packages available.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {value.map((pkg) => (
            <div
              key={pkg.id}
              className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-lg font-semibold text-gray-900 truncate">
                {pkg.name}
              </h2>

              {/* Type & Visibility Badges */}
              <div className="flex items-center space-x-2 mt-2">
                <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                  {pkg.package_type}
                </span>
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded ${
                    pkg.visibility === "public"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {pkg.visibility.charAt(0).toUpperCase() +
                    pkg.visibility.slice(1)}
                </span>
              </div>

              {/* Version Count */}
              <p className="mt-2 text-sm text-gray-600">
                Versions: <span className="font-medium">{pkg.version_count}</span>
              </p>

              {/* Owner */}
              {pkg.owner && (
                <p className="mt-1 text-sm text-gray-600 truncate">
                  Owner:{" "}
                  <span className="font-medium">{pkg.owner.login}</span>
                </p>
              )}

              {/* Repository */}
              {pkg.repository && pkg.repository.full_name && (
                <p className="mt-1 text-sm text-gray-600 truncate">
                  Repo:{" "}
                  <span className="font-medium">
                    {pkg.repository.full_name}
                  </span>
                </p>
              )}

              {/* Dates */}
              <div className="mt-3 space-y-1">
                <p className="text-xs text-gray-500">
                  Created:{" "}
                  <span className="font-medium">
                    {formatDate(pkg.created_at)}
                  </span>
                </p>
                <p className="text-xs text-gray-500">
                  Updated:{" "}
                  <span className="font-medium">
                    {timeAgo(pkg.updated_at)}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
