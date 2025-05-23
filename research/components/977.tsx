import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Repository invitations let you manage who you collaborate with.
     *
     * @title Repository Invitation
    */
    export interface repository_invitation {
        /**
         * Unique identifier of the repository invitation.
        */
        id: number & tags.Type<"int32">;
        repository: AutoViewInputSubTypes.minimal_repository;
        invitee: AutoViewInputSubTypes.nullable_simple_user;
        inviter: AutoViewInputSubTypes.nullable_simple_user;
        /**
         * The permission associated with the invitation.
        */
        permissions: "read" | "write" | "admin" | "triage" | "maintain";
        created_at: string & tags.Format<"date-time">;
        /**
         * Whether or not the invitation has expired
        */
        expired?: boolean;
        /**
         * URL for the repository invitation
        */
        url: string;
        html_url: string;
        node_id: string;
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
}
export type AutoViewInput = AutoViewInputSubTypes.repository_invitation[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getPermissionClasses = (perm: string): string => {
    switch (perm) {
      case "read":
        return "bg-green-100 text-green-800";
      case "write":
        return "bg-blue-100 text-blue-800";
      case "admin":
        return "bg-red-100 text-red-800";
      case "triage":
        return "bg-yellow-100 text-yellow-800";
      case "maintain":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // 3. Return the React element.
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2">No invitations available</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {value.map((invitation) => {
        const { id, repository, invitee, inviter, permissions, created_at, expired } =
          invitation;

        return (
          <div key={id} className="p-4 bg-white rounded-lg shadow">
            {/* Repository */}
            <div className="flex items-center text-lg font-semibold text-indigo-600 truncate">
              <LucideReact.GitBranch size={20} className="mr-2 flex-shrink-0" />
              <span className="truncate">{repository.full_name}</span>
            </div>

            {/* Permissions */}
            <div className="mt-2">
              <span
                className={`inline-block px-2 py-1 text-xs font-medium rounded ${getPermissionClasses(
                  permissions,
                )}`}
              >
                {permissions.charAt(0).toUpperCase() + permissions.slice(1)}
              </span>
            </div>

            {/* Invitee & Inviter */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center">
                <LucideReact.User size={16} className="text-gray-500 mr-1 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Invitee:</span>
                {invitee ? (
                  <>
                    <img
                      src={invitee.avatar_url}
                      alt={invitee.login}
                      className="ml-2 w-6 h-6 rounded-full object-cover bg-gray-100 flex-shrink-0"
                      onError={(e) =>
                        (e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          invitee.login,
                        )}&background=ccc&color=fff`)
                      }
                    />
                    <span className="ml-1 text-sm text-gray-800 truncate">
                      {invitee.login}
                    </span>
                  </>
                ) : (
                  <span className="ml-2 text-sm text-gray-500">None</span>
                )}
              </div>
              <div className="flex items-center">
                <LucideReact.User size={16} className="text-gray-500 mr-1 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Inviter:</span>
                {inviter ? (
                  <>
                    <img
                      src={inviter.avatar_url}
                      alt={inviter.login}
                      className="ml-2 w-6 h-6 rounded-full object-cover bg-gray-100 flex-shrink-0"
                      onError={(e) =>
                        (e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          inviter.login,
                        )}&background=bbb&color=fff`)
                      }
                    />
                    <span className="ml-1 text-sm text-gray-800 truncate">
                      {inviter.login}
                    </span>
                  </>
                ) : (
                  <span className="ml-2 text-sm text-gray-500">None</span>
                )}
              </div>
            </div>

            {/* Created date & expired status */}
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <LucideReact.Calendar size={16} className="mr-1 flex-shrink-0" />
              <span>{formatDate(created_at)}</span>
              {expired && (
                <div className="ml-auto flex items-center text-red-500">
                  <LucideReact.XCircle size={16} className="mr-1 flex-shrink-0" />
                  <span>Expired</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
