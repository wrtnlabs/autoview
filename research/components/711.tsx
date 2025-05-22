import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * File Commit
     *
     * @title File Commit
    */
    export type file_commit = {
        content: {
            name?: string;
            path?: string;
            sha?: string;
            size?: number & tags.Type<"int32">;
            url?: string;
            html_url?: string;
            git_url?: string;
            download_url?: string;
            type?: string;
            _links?: {
                self?: string;
                git?: string;
                html?: string;
            };
        } | null;
        commit: {
            sha?: string;
            node_id?: string;
            url?: string;
            html_url?: string;
            author?: {
                date?: string;
                name?: string;
                email?: string;
            };
            committer?: {
                date?: string;
                name?: string;
                email?: string;
            };
            message?: string;
            tree?: {
                url?: string;
                sha?: string;
            };
            parents?: {
                url?: string;
                html_url?: string;
                sha?: string;
            }[];
            verification?: {
                verified?: boolean;
                reason?: string;
                signature?: string | null;
                payload?: string | null;
                verified_at?: string | null;
            };
        };
    };
}
export type AutoViewInput = AutoViewInputSubTypes.file_commit;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const filePath = value.content?.path ?? value.content?.name ?? "—";
  const fileName = value.content?.name ?? "";
  const rawSize = value.content?.size;
  const formattedSize = rawSize != null
    ? rawSize < 1024
      ? `${rawSize} B`
      : rawSize < 1024 * 1024
      ? `${(rawSize / 1024).toFixed(1)} KB`
      : `${(rawSize / 1024 / 1024).toFixed(1)} MB`
    : "—";

  const commitSha = value.commit.sha ? value.commit.sha.substring(0, 7) : "—";
  const commitMessage = value.commit.message?.trim() || "No commit message";
  const authorName = value.commit.author?.name || "Unknown";
  const authorDate = value.commit.author?.date
    ? new Date(value.commit.author.date).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";
  const verifiedFlag = value.commit.verification?.verified;
  const verificationLabel = verifiedFlag ? "Verified" : "Unverified";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden ring-1 ring-gray-200">
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
        <h2
          className="text-lg font-semibold text-gray-800 truncate"
          title={filePath}
        >
          {filePath}
        </h2>
      </div>
      <div className="px-4 py-3 space-y-3">
        <p className="text-gray-700 text-sm line-clamp-2">{commitMessage}</p>
        <div className="flex flex-wrap items-center text-xs text-gray-600 space-x-2">
          <span className="font-mono">{commitSha}</span>
          <span>by {authorName}</span>
          <span>on {authorDate}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-gray-500">Size: {formattedSize}</span>
          {value.content?.type && (
            <span className="text-gray-500">Type: {value.content.type}</span>
          )}
          {verifiedFlag != null && (
            <span
              className={`px-2 py-0.5 rounded-full text-white ${
                verifiedFlag ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {verificationLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
