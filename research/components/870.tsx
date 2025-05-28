import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface secret_scanning_location {
        /**
         * The location type. Because secrets may be found in different types of resources (ie. code, comments, issues, pull requests, discussions), this field identifies the type of resource where the secret was found.
        */
        type?: "commit" | "wiki_commit" | "issue_title" | "issue_body" | "issue_comment" | "discussion_title" | "discussion_body" | "discussion_comment" | "pull_request_title" | "pull_request_body" | "pull_request_comment" | "pull_request_review" | "pull_request_review_comment";
        details?: AutoViewInputSubTypes.secret_scanning_location_commit | AutoViewInputSubTypes.secret_scanning_location_wiki_commit | AutoViewInputSubTypes.secret_scanning_location_issue_title | AutoViewInputSubTypes.secret_scanning_location_issue_body | AutoViewInputSubTypes.secret_scanning_location_issue_comment | AutoViewInputSubTypes.secret_scanning_location_discussion_title | AutoViewInputSubTypes.secret_scanning_location_discussion_body | AutoViewInputSubTypes.secret_scanning_location_discussion_comment | AutoViewInputSubTypes.secret_scanning_location_pull_request_title | AutoViewInputSubTypes.secret_scanning_location_pull_request_body | AutoViewInputSubTypes.secret_scanning_location_pull_request_comment | AutoViewInputSubTypes.secret_scanning_location_pull_request_review | AutoViewInputSubTypes.secret_scanning_location_pull_request_review_comment;
    }
    /**
     * Represents a 'commit' secret scanning location type. This location type shows that a secret was detected inside a commit to a repository.
    */
    export interface secret_scanning_location_commit {
        /**
         * The file path in the repository
        */
        path: string;
        /**
         * Line number at which the secret starts in the file
        */
        start_line: number;
        /**
         * Line number at which the secret ends in the file
        */
        end_line: number;
        /**
         * The column at which the secret starts within the start line when the file is interpreted as 8BIT ASCII
        */
        start_column: number;
        /**
         * The column at which the secret ends within the end line when the file is interpreted as 8BIT ASCII
        */
        end_column: number;
        /**
         * SHA-1 hash ID of the associated blob
        */
        blob_sha: string;
        /**
         * The API URL to get the associated blob resource
        */
        blob_url: string;
        /**
         * SHA-1 hash ID of the associated commit
        */
        commit_sha: string;
        /**
         * The API URL to get the associated commit resource
        */
        commit_url: string;
    }
    /**
     * Represents a 'wiki_commit' secret scanning location type. This location type shows that a secret was detected inside a commit to a repository wiki.
    */
    export interface secret_scanning_location_wiki_commit {
        /**
         * The file path of the wiki page
        */
        path: string;
        /**
         * Line number at which the secret starts in the file
        */
        start_line: number;
        /**
         * Line number at which the secret ends in the file
        */
        end_line: number;
        /**
         * The column at which the secret starts within the start line when the file is interpreted as 8-bit ASCII.
        */
        start_column: number;
        /**
         * The column at which the secret ends within the end line when the file is interpreted as 8-bit ASCII.
        */
        end_column: number;
        /**
         * SHA-1 hash ID of the associated blob
        */
        blob_sha: string;
        /**
         * The GitHub URL to get the associated wiki page
        */
        page_url: string;
        /**
         * SHA-1 hash ID of the associated commit
        */
        commit_sha: string;
        /**
         * The GitHub URL to get the associated wiki commit
        */
        commit_url: string;
    }
    /**
     * Represents an 'issue_title' secret scanning location type. This location type shows that a secret was detected in the title of an issue.
    */
    export interface secret_scanning_location_issue_title {
        /**
         * The API URL to get the issue where the secret was detected.
        */
        issue_title_url: string;
    }
    /**
     * Represents an 'issue_body' secret scanning location type. This location type shows that a secret was detected in the body of an issue.
    */
    export interface secret_scanning_location_issue_body {
        /**
         * The API URL to get the issue where the secret was detected.
        */
        issue_body_url: string;
    }
    /**
     * Represents an 'issue_comment' secret scanning location type. This location type shows that a secret was detected in a comment on an issue.
    */
    export interface secret_scanning_location_issue_comment {
        /**
         * The API URL to get the issue comment where the secret was detected.
        */
        issue_comment_url: string;
    }
    /**
     * Represents a 'discussion_title' secret scanning location type. This location type shows that a secret was detected in the title of a discussion.
    */
    export interface secret_scanning_location_discussion_title {
        /**
         * The URL to the discussion where the secret was detected.
        */
        discussion_title_url: string;
    }
    /**
     * Represents a 'discussion_body' secret scanning location type. This location type shows that a secret was detected in the body of a discussion.
    */
    export interface secret_scanning_location_discussion_body {
        /**
         * The URL to the discussion where the secret was detected.
        */
        discussion_body_url: string;
    }
    /**
     * Represents a 'discussion_comment' secret scanning location type. This location type shows that a secret was detected in a comment on a discussion.
    */
    export interface secret_scanning_location_discussion_comment {
        /**
         * The API URL to get the discussion comment where the secret was detected.
        */
        discussion_comment_url: string;
    }
    /**
     * Represents a 'pull_request_title' secret scanning location type. This location type shows that a secret was detected in the title of a pull request.
    */
    export interface secret_scanning_location_pull_request_title {
        /**
         * The API URL to get the pull request where the secret was detected.
        */
        pull_request_title_url: string;
    }
    /**
     * Represents a 'pull_request_body' secret scanning location type. This location type shows that a secret was detected in the body of a pull request.
    */
    export interface secret_scanning_location_pull_request_body {
        /**
         * The API URL to get the pull request where the secret was detected.
        */
        pull_request_body_url: string;
    }
    /**
     * Represents a 'pull_request_comment' secret scanning location type. This location type shows that a secret was detected in a comment on a pull request.
    */
    export interface secret_scanning_location_pull_request_comment {
        /**
         * The API URL to get the pull request comment where the secret was detected.
        */
        pull_request_comment_url: string;
    }
    /**
     * Represents a 'pull_request_review' secret scanning location type. This location type shows that a secret was detected in a review on a pull request.
    */
    export interface secret_scanning_location_pull_request_review {
        /**
         * The API URL to get the pull request review where the secret was detected.
        */
        pull_request_review_url: string;
    }
    /**
     * Represents a 'pull_request_review_comment' secret scanning location type. This location type shows that a secret was detected in a review comment on a pull request.
    */
    export interface secret_scanning_location_pull_request_review_comment {
        /**
         * The API URL to get the pull request review comment where the secret was detected.
        */
        pull_request_review_comment_url: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.secret_scanning_location[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Configuration for each location type: label, icon, and detail renderer
  const typeConfig: Record<string, {
    label: string;
    icon: JSX.Element;
    render: (details: any) => JSX.Element;
  }> = {
    commit: {
      label: "Commit",
      icon: <LucideReact.GitCommit className="text-indigo-500" size={20} />,
      render: (d) => (
        <div className="space-y-1 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <LucideReact.FileText size={16} className="text-gray-500" />
            <span className="truncate">{d?.path || "—"}</span>
          </div>
          <div>
            Lines{" "}
            <span className="font-semibold">{d?.start_line ?? "–"}</span>–
            <span className="font-semibold">{d?.end_line ?? "–"}</span>, Col{" "}
            <span className="font-semibold">{d?.start_column ?? "–"}</span>–
            <span className="font-semibold">{d?.end_column ?? "–"}</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.Hash size={16} className="text-gray-500" />
            <span className="font-mono">
              {d?.commit_sha ? d.commit_sha.slice(0, 7) : "unknown"}
            </span>
          </div>
        </div>
      ),
    },
    wiki_commit: {
      label: "Wiki Commit",
      icon: <LucideReact.BookOpen className="text-indigo-500" size={20} />,
      render: (d) => (
        <div className="space-y-1 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <LucideReact.FileText size={16} className="text-gray-500" />
            <span className="truncate">{d?.path || "—"}</span>
          </div>
          <div>
            Lines{" "}
            <span className="font-semibold">{d?.start_line ?? "–"}</span>–
            <span className="font-semibold">{d?.end_line ?? "–"}</span>, Col{" "}
            <span className="font-semibold">{d?.start_column ?? "–"}</span>–
            <span className="font-semibold">{d?.end_column ?? "–"}</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.Hash size={16} className="text-gray-500" />
            <span className="font-mono">
              {d?.commit_sha ? d.commit_sha.slice(0, 7) : "unknown"}
            </span>
          </div>
        </div>
      ),
    },
    issue_title: {
      label: "Issue Title",
      icon: <LucideReact.Flag className="text-yellow-500" size={20} />,
      render: (d) => (
        <div className="flex items-center gap-1 text-sm text-gray-700">
          <LucideReact.Link size={16} className="text-gray-500" />
          <span className="truncate">{d?.issue_title_url || "—"}</span>
        </div>
      ),
    },
    issue_body: {
      label: "Issue Body",
      icon: <LucideReact.Flag className="text-yellow-500" size={20} />,
      render: (d) => (
        <div className="flex items-center gap-1 text-sm text-gray-700">
          <LucideReact.Link size={16} className="text-gray-500" />
          <span className="truncate">{d?.issue_body_url || "—"}</span>
        </div>
      ),
    },
    issue_comment: {
      label: "Issue Comment",
      icon: <LucideReact.MessageCircle className="text-yellow-500" size={20} />,
      render: (d) => (
        <div className="flex items-center gap-1 text-sm text-gray-700">
          <LucideReact.Link size={16} className="text-gray-500" />
          <span className="truncate">{d?.issue_comment_url || "—"}</span>
        </div>
      ),
    },
    discussion_title: {
      label: "Discussion Title",
      icon: <LucideReact.MessageSquare className="text-green-500" size={20} />,
      render: (d) => (
        <div className="flex items-center gap-1 text-sm text-gray-700">
          <LucideReact.Link size={16} className="text-gray-500" />
          <span className="truncate">{d?.discussion_title_url || "—"}</span>
        </div>
      ),
    },
    discussion_body: {
      label: "Discussion Body",
      icon: <LucideReact.MessageSquare className="text-green-500" size={20} />,
      render: (d) => (
        <div className="flex items-center gap-1 text-sm text-gray-700">
          <LucideReact.Link size={16} className="text-gray-500" />
          <span className="truncate">{d?.discussion_body_url || "—"}</span>
        </div>
      ),
    },
    discussion_comment: {
      label: "Discussion Comment",
      icon: <LucideReact.MessageSquare className="text-green-500" size={20} />,
      render: (d) => (
        <div className="flex items-center gap-1 text-sm text-gray-700">
          <LucideReact.Link size={16} className="text-gray-500" />
          <span className="truncate">{d?.discussion_comment_url || "—"}</span>
        </div>
      ),
    },
    pull_request_title: {
      label: "PR Title",
      icon: <LucideReact.GitPullRequest className="text-blue-500" size={20} />,
      render: (d) => (
        <div className="flex items-center gap-1 text-sm text-gray-700">
          <LucideReact.Link size={16} className="text-gray-500" />
          <span className="truncate">{d?.pull_request_title_url || "—"}</span>
        </div>
      ),
    },
    pull_request_body: {
      label: "PR Body",
      icon: <LucideReact.GitPullRequest className="text-blue-500" size={20} />,
      render: (d) => (
        <div className="flex items-center gap-1 text-sm text-gray-700">
          <LucideReact.Link size={16} className="text-gray-500" />
          <span className="truncate">{d?.pull_request_body_url || "—"}</span>
        </div>
      ),
    },
    pull_request_comment: {
      label: "PR Comment",
      icon: <LucideReact.MessageCircle className="text-blue-500" size={20} />,
      render: (d) => (
        <div className="flex items-center gap-1 text-sm text-gray-700">
          <LucideReact.Link size={16} className="text-gray-500" />
          <span className="truncate">{d?.pull_request_comment_url || "—"}</span>
        </div>
      ),
    },
    pull_request_review: {
      label: "PR Review",
      icon: <LucideReact.GitPullRequest className="text-blue-500" size={20} />,
      render: (d) => (
        <div className="flex items-center gap-1 text-sm text-gray-700">
          <LucideReact.Link size={16} className="text-gray-500" />
          <span className="truncate">{d?.pull_request_review_url || "—"}</span>
        </div>
      ),
    },
    pull_request_review_comment: {
      label: "PR Review Comment",
      icon: <LucideReact.MessageCircle className="text-blue-500" size={20} />,
      render: (d) => (
        <div className="flex items-center gap-1 text-sm text-gray-700">
          <LucideReact.Link size={16} className="text-gray-500" />
          <span className="truncate">
            {d?.pull_request_review_comment_url || "—"}
          </span>
        </div>
      ),
    },
  };

  const items = value || [];

  // No data fallback
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={32} />
        <span className="mt-2 text-sm">No scanning locations available.</span>
      </div>
    );
  }

  // Render list of scanning locations
  return (
    <ul className="space-y-4" aria-label="Secret scanning locations">
      {items.map((loc, idx) => {
        const cfg = loc.type ? typeConfig[loc.type] : undefined;
        return (
          <li
            key={idx}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              {cfg?.icon}
              <span className="font-medium text-gray-800">
                {cfg?.label || "Unknown Location"}
              </span>
            </div>
            {cfg
              ? cfg.render(loc.details)
              : (
                <span className="text-sm text-gray-500">
                  Details unavailable
                </span>
              )}
          </li>
        );
      })}
    </ul>
  );
}
