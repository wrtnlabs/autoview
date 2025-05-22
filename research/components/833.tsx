import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Commit
     *
     * @title Commit
    */
    export type commit = {
        url: string & tags.Format<"uri">;
        sha: string;
        node_id: string;
        html_url: string & tags.Format<"uri">;
        comments_url: string & tags.Format<"uri">;
        commit: {
            url: string & tags.Format<"uri">;
            author: AutoViewInputSubTypes.nullable_git_user;
            committer: AutoViewInputSubTypes.nullable_git_user;
            message: string;
            comment_count: number & tags.Type<"int32">;
            tree: {
                sha: string;
                url: string & tags.Format<"uri">;
            };
            verification?: AutoViewInputSubTypes.verification;
        };
        author: any | any | null;
        committer: any | any | null;
        parents: {
            sha: string;
            url: string & tags.Format<"uri">;
            html_url?: string & tags.Format<"uri">;
        }[];
        stats?: {
            additions?: number & tags.Type<"int32">;
            deletions?: number & tags.Type<"int32">;
            total?: number & tags.Type<"int32">;
        };
        files?: AutoViewInputSubTypes.diff_entry[];
    };
    /**
     * Metaproperties for Git author/committer information.
     *
     * @title Git User
    */
    export type nullable_git_user = {
        name?: string;
        email?: string;
        date?: string;
    } | null;
    /**
     * @title Verification
    */
    export type verification = {
        verified: boolean;
        reason: string;
        payload: string | null;
        signature: string | null;
        verified_at: string | null;
    };
    export type simple_user = any;
    export type empty_object = any;
    /**
     * Diff Entry
     *
     * @title Diff Entry
    */
    export type diff_entry = {
        sha: string;
        filename: string;
        status: "added" | "removed" | "modified" | "renamed" | "copied" | "changed" | "unchanged";
        additions: number & tags.Type<"int32">;
        deletions: number & tags.Type<"int32">;
        changes: number & tags.Type<"int32">;
        blob_url: string & tags.Format<"uri">;
        raw_url: string & tags.Format<"uri">;
        contents_url: string & tags.Format<"uri">;
        patch?: string;
        previous_filename?: string;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.commit[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const commits = Array.isArray(value) ? value : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {commits.length === 0 ? (
        <p className="text-gray-500 text-center">No commits to display.</p>
      ) : (
        commits.map((commit) => {
          // Derive author name
          const authorName = commit.commit.author?.name ?? "Unknown Author";

          // Derive commit date
          const rawDate = commit.commit.author?.date ?? commit.commit.committer?.date ?? "";
          const formattedDate = rawDate
            ? new Date(rawDate).toLocaleString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Unknown date";

          // Short SHA
          const shortSha = commit.sha.slice(0, 7);

          // Parents count
          const parentsCount = Array.isArray(commit.parents) ? commit.parents.length : 0;

          // Files changed count
          const filesCount = Array.isArray(commit.files) ? commit.files.length : 0;

          // Stats
          const additions = commit.stats?.additions ?? 0;
          const deletions = commit.stats?.deletions ?? 0;
          const totalChanges = commit.stats?.total ?? additions + deletions;

          // Verification status
          const isVerified = commit.commit.verification?.verified === true;

          return (
            <div
              key={commit.sha}
              className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-gray-900 font-semibold text-lg line-clamp-2">
                {commit.commit.message}
              </h3>

              <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-sm text-gray-600">
                <span className="truncate">{authorName}</span>
                <span>·</span>
                <span className="whitespace-nowrap">{formattedDate}</span>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                  {shortSha}
                </span>
                {isVerified && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                    Verified
                  </span>
                )}
                {parentsCount > 0 && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                    {parentsCount} parent{parentsCount > 1 ? "s" : ""}
                  </span>
                )}
                {filesCount > 0 && (
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                    {filesCount} file{filesCount > 1 ? "s" : ""} changed
                  </span>
                )}
                {(additions > 0 || deletions > 0) && (
                  <>
                    {additions > 0 && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                        +{additions}
                      </span>
                    )}
                    {deletions > 0 && (
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">
                        -{deletions}
                      </span>
                    )}
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      {totalChanges} change{totalChanges !== 1 ? "s" : ""}
                    </span>
                  </>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
