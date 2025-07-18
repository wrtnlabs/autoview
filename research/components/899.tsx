import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Minimal Repository
     *
     * @title Minimal Repository
    */
    export interface minimal_repository {
        id: number & tags.Type<"int32">;
        node_id: string;
        name: string;
        full_name: string;
        owner: AutoViewInputSubTypes.simple_user;
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
     * Code Of Conduct
     *
     * @title Code Of Conduct
    */
    export interface code_of_conduct {
        key: string;
        name: string;
        url: string & tags.Format<"uri">;
        body?: string;
        html_url: (string & tags.Format<"uri">) | null;
    }
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
export type AutoViewInput = AutoViewInputSubTypes.minimal_repository[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso?: string | null): string =>
    iso
      ? new Date(iso).toLocaleDateString("default", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  const cards = value.map((repo) => {
    const updated = formatDate(repo.updated_at);
    const stars = repo.stargazers_count ?? 0;
    const forks = repo.forks_count ?? repo.forks ?? 0;
    const watchers = repo.watchers_count ?? repo.watchers ?? 0;
    const issues = repo.open_issues_count ?? repo.open_issues ?? 0;
    const language = repo.language;
    const license = repo.license?.name;
    const topics = repo.topics ?? [];
    const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      repo.owner.name ?? repo.owner.login,
    )}&background=0D8ABC&color=fff`;

    return (
      <div key={repo.id} className="p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src={repo.owner.avatar_url}
              alt={`${repo.owner.login} avatar`}
              className="w-8 h-8 rounded-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = avatarFallback;
              }}
            />
            <span className="text-gray-700 font-medium">{repo.owner.login}</span>
          </div>
          {repo.private ? (
            <LucideReact.Lock className="text-gray-500" size={16} />
          ) : (
            <LucideReact.Globe className="text-green-500" size={16} />
          )}
        </div>
        <h2 className="mt-2 text-lg font-semibold text-blue-600 truncate">{repo.name}</h2>
        <p className="mt-1 text-gray-600 text-sm line-clamp-2">
          {repo.description ?? "No description available."}
        </p>
        <div className="mt-3 flex flex-wrap items-center text-gray-500 text-sm space-x-4">
          <div className="flex items-center space-x-1">
            <LucideReact.Star size={16} className="text-yellow-500" />
            <span>{stars}</span>
          </div>
          <div className="flex items-center space-x-1">
            <LucideReact.GitBranch size={16} className="text-gray-500" />
            <span>{forks}</span>
          </div>
          <div className="flex items-center space-x-1">
            <LucideReact.Eye size={16} className="text-gray-500" />
            <span>{watchers}</span>
          </div>
          <div className="flex items-center space-x-1">
            <LucideReact.AlertCircle size={16} className="text-gray-500" />
            <span>{issues}</span>
          </div>
          {language && (
            <div className="flex items-center space-x-1">
              <LucideReact.Tag size={16} className="text-indigo-500" />
              <span>{language}</span>
            </div>
          )}
          {license && (
            <div className="flex items-center space-x-1">
              <LucideReact.BookOpen size={16} className="text-gray-500" />
              <span>{license}</span>
            </div>
          )}
          {updated && (
            <div className="flex items-center space-x-1 ml-auto">
              <LucideReact.Calendar size={16} className="text-gray-500" />
              <span>Updated {updated}</span>
            </div>
          )}
        </div>
        {topics.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
              >
                {topic}
              </span>
            ))}
            {topics.length > 3 && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                +{topics.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    );
  });

  // 3. Return the React element.
  return <div className="space-y-4">{cards}</div>;
}
