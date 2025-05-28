import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Thread
     *
     * @title Thread
    */
    export interface thread {
        id: string;
        repository: AutoViewInputSubTypes.minimal_repository;
        subject: {
            title: string;
            url: string;
            latest_comment_url: string;
            type: string;
        };
        reason: string;
        unread: boolean;
        updated_at: string;
        last_read_at: string | null;
        url: string;
        subscription_url: string;
    }
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
export type AutoViewInput = AutoViewInputSubTypes.thread;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const updatedDate = new Date(value.updated_at);
  const formattedUpdated = updatedDate.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  const lastReadDate = value.last_read_at ? new Date(value.last_read_at) : null;
  const formattedLastRead = lastReadDate
    ? lastReadDate.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : null;

  const ownerLogin = value.repository.owner.login;
  const avatarUrl = value.repository.owner.avatar_url;
  const avatarFallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    ownerLogin,
  )}&background=random&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow flex items-start space-x-3">
      {/* Unread indicator */}
      {value.unread ? (
        <span className="flex-shrink-0 mt-1 w-2 h-2 bg-blue-500 rounded-full" />
      ) : (
        <span className="flex-shrink-0 mt-1 w-2 h-2 bg-gray-300 rounded-full" />
      )}

      {/* Repository owner's avatar */}
      <div className="flex-shrink-0">
        <div className="w-8 h-8">
          <img
            src={avatarUrl}
            onError={(e) => {
              (e.target as HTMLImageElement).src = avatarFallbackUrl;
            }}
            alt={`${ownerLogin} avatar`}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        {/* Repository name and updated time */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500 space-x-1">
            <LucideReact.GitBranch size={16} className="text-gray-400" />
            <span>{value.repository.full_name}</span>
          </div>
          <time dateTime={value.updated_at} className="text-xs text-gray-400">
            {formattedUpdated}
          </time>
        </div>

        {/* Thread subject title */}
        <h3 className="mt-1 text-sm font-medium text-gray-900 line-clamp-2">
          {value.subject.title}
        </h3>

        {/* Metadata: type, reason, last read */}
        <div className="mt-2 flex flex-wrap items-center text-xs text-gray-500 space-x-3">
          <div className="flex items-center space-x-1">
            <LucideReact.MessageCircle size={14} className="text-gray-400" />
            <span>{value.subject.type}</span>
          </div>
          <div className="flex items-center space-x-1">
            <LucideReact.Info size={14} className="text-gray-400" />
            <span>{value.reason}</span>
          </div>
          {formattedLastRead && (
            <div className="flex items-center space-x-1">
              <LucideReact.Calendar size={14} className="text-gray-400" />
              <span>Last read: {formattedLastRead}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
