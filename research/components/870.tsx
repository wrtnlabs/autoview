import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  export type secret_scanning_location = {
    /**
     * The location type. Because secrets may be found in different types of resources (ie. code, comments, issues, pull requests, discussions), this field identifies the type of resource where the secret was found.
     */
    type?:
      | "commit"
      | "wiki_commit"
      | "issue_title"
      | "issue_body"
      | "issue_comment"
      | "discussion_title"
      | "discussion_body"
      | "discussion_comment"
      | "pull_request_title"
      | "pull_request_body"
      | "pull_request_comment"
      | "pull_request_review"
      | "pull_request_review_comment";
    details?:
      | AutoViewInputSubTypes.secret_scanning_location_commit
      | AutoViewInputSubTypes.secret_scanning_location_wiki_commit
      | AutoViewInputSubTypes.secret_scanning_location_issue_title
      | AutoViewInputSubTypes.secret_scanning_location_issue_body
      | AutoViewInputSubTypes.secret_scanning_location_issue_comment
      | AutoViewInputSubTypes.secret_scanning_location_discussion_title
      | AutoViewInputSubTypes.secret_scanning_location_discussion_body
      | AutoViewInputSubTypes.secret_scanning_location_discussion_comment
      | AutoViewInputSubTypes.secret_scanning_location_pull_request_title
      | AutoViewInputSubTypes.secret_scanning_location_pull_request_body
      | AutoViewInputSubTypes.secret_scanning_location_pull_request_comment
      | AutoViewInputSubTypes.secret_scanning_location_pull_request_review
      | AutoViewInputSubTypes.secret_scanning_location_pull_request_review_comment;
  };
  /**
   * Represents a 'commit' secret scanning location type. This location type shows that a secret was detected inside a commit to a repository.
   */
  export type secret_scanning_location_commit = {
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
  };
  /**
   * Represents a 'wiki_commit' secret scanning location type. This location type shows that a secret was detected inside a commit to a repository wiki.
   */
  export type secret_scanning_location_wiki_commit = {
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
  };
  /**
   * Represents an 'issue_title' secret scanning location type. This location type shows that a secret was detected in the title of an issue.
   */
  export type secret_scanning_location_issue_title = {
    /**
     * The API URL to get the issue where the secret was detected.
     */
    issue_title_url: string;
  };
  /**
   * Represents an 'issue_body' secret scanning location type. This location type shows that a secret was detected in the body of an issue.
   */
  export type secret_scanning_location_issue_body = {
    /**
     * The API URL to get the issue where the secret was detected.
     */
    issue_body_url: string;
  };
  /**
   * Represents an 'issue_comment' secret scanning location type. This location type shows that a secret was detected in a comment on an issue.
   */
  export type secret_scanning_location_issue_comment = {
    /**
     * The API URL to get the issue comment where the secret was detected.
     */
    issue_comment_url: string;
  };
  /**
   * Represents a 'discussion_title' secret scanning location type. This location type shows that a secret was detected in the title of a discussion.
   */
  export type secret_scanning_location_discussion_title = {
    /**
     * The URL to the discussion where the secret was detected.
     */
    discussion_title_url: string;
  };
  /**
   * Represents a 'discussion_body' secret scanning location type. This location type shows that a secret was detected in the body of a discussion.
   */
  export type secret_scanning_location_discussion_body = {
    /**
     * The URL to the discussion where the secret was detected.
     */
    discussion_body_url: string;
  };
  /**
   * Represents a 'discussion_comment' secret scanning location type. This location type shows that a secret was detected in a comment on a discussion.
   */
  export type secret_scanning_location_discussion_comment = {
    /**
     * The API URL to get the discussion comment where the secret was detected.
     */
    discussion_comment_url: string;
  };
  /**
   * Represents a 'pull_request_title' secret scanning location type. This location type shows that a secret was detected in the title of a pull request.
   */
  export type secret_scanning_location_pull_request_title = {
    /**
     * The API URL to get the pull request where the secret was detected.
     */
    pull_request_title_url: string;
  };
  /**
   * Represents a 'pull_request_body' secret scanning location type. This location type shows that a secret was detected in the body of a pull request.
   */
  export type secret_scanning_location_pull_request_body = {
    /**
     * The API URL to get the pull request where the secret was detected.
     */
    pull_request_body_url: string;
  };
  /**
   * Represents a 'pull_request_comment' secret scanning location type. This location type shows that a secret was detected in a comment on a pull request.
   */
  export type secret_scanning_location_pull_request_comment = {
    /**
     * The API URL to get the pull request comment where the secret was detected.
     */
    pull_request_comment_url: string;
  };
  /**
   * Represents a 'pull_request_review' secret scanning location type. This location type shows that a secret was detected in a review on a pull request.
   */
  export type secret_scanning_location_pull_request_review = {
    /**
     * The API URL to get the pull request review where the secret was detected.
     */
    pull_request_review_url: string;
  };
  /**
   * Represents a 'pull_request_review_comment' secret scanning location type. This location type shows that a secret was detected in a review comment on a pull request.
   */
  export type secret_scanning_location_pull_request_review_comment = {
    /**
     * The API URL to get the pull request review comment where the secret was detected.
     */
    pull_request_review_comment_url: string;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.secret_scanning_location[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const truncate = (s: string, max = 50): string =>
    s.length > max
      ? `${s.slice(0, Math.floor(max / 2))}…${s.slice(-Math.floor(max / 2))}`
      : s;

  const typeLabels: Record<string, string> = {
    commit: "Commit",
    wiki_commit: "Wiki Commit",
    issue_title: "Issue Title",
    issue_body: "Issue Body",
    issue_comment: "Issue Comment",
    discussion_title: "Discussion Title",
    discussion_body: "Discussion Body",
    discussion_comment: "Discussion Comment",
    pull_request_title: "Pull Request Title",
    pull_request_body: "Pull Request Body",
    pull_request_comment: "Pull Request Comment",
    pull_request_review: "Pull Request Review",
    pull_request_review_comment: "Pull Request Review Comment",
  };

  const getTypeIcon = (type?: string): JSX.Element => {
    switch (type) {
      case "commit":
        return <LucideReact.GitCommit className="text-gray-500" size={20} />;
      case "wiki_commit":
        return <LucideReact.BookOpen className="text-gray-500" size={20} />;
      default:
        return <LucideReact.Link className="text-gray-500" size={20} />;
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="space-y-4">
      {value.map((item, idx) => {
        const label = typeLabels[item.type || ""] || "Unknown";
        const icon = getTypeIcon(item.type);

        return (
          <div
            key={idx}
            className="p-4 bg-white rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-2 mb-2 sm:mb-0">
              {icon}
              <span className="font-semibold text-gray-800">{label}</span>
            </div>
            <div className="flex flex-col space-y-1 text-sm text-gray-600">
              {item.type === "commit" &&
                (() => {
                  const d =
                    item.details as AutoViewInputSubTypes.secret_scanning_location_commit;
                  return (
                    <>
                      <div>
                        Path: <span className="font-mono">{d.path}</span>
                      </div>
                      <div>
                        Lines: {d.start_line}-{d.end_line}
                      </div>
                      <div>
                        Commit SHA:{" "}
                        <span className="font-mono">
                          {d.commit_sha.slice(0, 7)}
                        </span>
                      </div>
                    </>
                  );
                })()}
              {item.type === "wiki_commit" &&
                (() => {
                  const d =
                    item.details as AutoViewInputSubTypes.secret_scanning_location_wiki_commit;
                  return (
                    <>
                      <div>
                        Path: <span className="font-mono">{d.path}</span>
                      </div>
                      <div>
                        Lines: {d.start_line}-{d.end_line}
                      </div>
                      <div>
                        Commit SHA:{" "}
                        <span className="font-mono">
                          {d.commit_sha.slice(0, 7)}
                        </span>
                      </div>
                    </>
                  );
                })()}
              {item.type !== "commit" &&
                item.type !== "wiki_commit" &&
                (() => {
                  const det = item.details as Record<string, string>;
                  const [_, url] = Object.entries(det)[0];
                  return (
                    <div className="flex items-center gap-1 break-all">
                      <LucideReact.Link size={16} className="text-gray-400" />
                      <span>{truncate(url)}</span>
                    </div>
                  );
                })()}
            </div>
          </div>
        );
      })}
    </div>
  );
}
