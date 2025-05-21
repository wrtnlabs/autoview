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
export type AutoViewInput = AutoViewInputSubTypes.commit;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const commitInfo = value.commit;
  const authorInfo = commitInfo.author;
  const authorName = authorInfo?.name ?? "Unknown Author";
  const authorEmail = authorInfo?.email;
  const rawDate = authorInfo?.date;
  const formattedDate = rawDate
    ? new Date(rawDate).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";
  const fullMessage = commitInfo.message ?? "";
  const [titleLine] = fullMessage.split("\n");
  // stats: either provided or derived from file diffs
  const additions =
    value.stats?.additions ??
    value.files?.reduce((sum, f) => sum + (f.additions ?? 0), 0) ??
    0;
  const deletions =
    value.stats?.deletions ??
    value.files?.reduce((sum, f) => sum + (f.deletions ?? 0), 0) ??
    0;
  const totalChanges =
    value.stats?.total ?? additions + deletions;
  const parentsCount = Array.isArray(value.parents)
    ? value.parents.length
    : 0;
  const filesCount = Array.isArray(value.files)
    ? value.files.length
    : 0;
  const truncatedSha = value.sha.slice(0, 7);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  //    Mobile-first, responsive, clean layout.
  return (
    <div className="w-full max-w-full p-4 bg-white rounded-lg shadow-md flex flex-col space-y-3">
      {/* Commit message */}
      <h3 className="text-lg font-semibold text-gray-800 truncate">
        {titleLine}
      </h3>
      {/* Full message truncated to two lines */}
      <p className="text-sm text-gray-600 line-clamp-2">{fullMessage}</p>

      {/* Metadata */}
      <div className="flex flex-wrap gap-2 text-xs text-gray-500">
        <span className="truncate">By {authorName}</span>
        {formattedDate && <span>{formattedDate}</span>}
        <span>SHA: {truncatedSha}</span>
        {parentsCount > 0 && (
          <span>
            {parentsCount} parent{parentsCount !== 1 ? "s" : ""}
          </span>
        )}
        {filesCount > 0 && (
          <span>
            {filesCount} file{filesCount !== 1 ? "s" : ""} changed
          </span>
        )}
        <span>+{additions}/-{deletions}</span>
        {totalChanges !== additions + deletions && (
          <span>{totalChanges} total changes</span>
        )}
      </div>
    </div>
  );
}
