import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * File Commit
     *
     * @title File Commit
    */
    export interface file_commit {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.file_commit;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const fileName = value.content?.name || "Unknown file";
  const filePath = value.content?.path;
  const fileType = value.content?.type;
  const fileSize = value.content?.size;
  const commitSha = value.commit.sha ? value.commit.sha.slice(0, 7) : "unknown";
  const commitMessage = value.commit.message || "";
  const author = value.commit.author;
  const commitDate = author?.date
    ? new Date(author.date).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;
  const verified = value.commit.verification?.verified;

  function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* File Info */}
      <div className="flex items-center space-x-3">
        <LucideReact.FileText size={24} className="text-indigo-500 flex-shrink-0" />
        <div className="min-w-0">
          <div className="text-lg font-semibold text-gray-900 truncate">{fileName}</div>
          {filePath && <div className="text-sm text-gray-500 truncate">{filePath}</div>}
        </div>
      </div>

      {/* File Metadata */}
      {(fileSize != null || fileType) && (
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          {fileSize != null && (
            <div className="flex items-center space-x-1">
              <LucideReact.HardDrive size={16} className="text-gray-400" />
              <span>{formatSize(fileSize)}</span>
            </div>
          )}
          {fileType && (
            <div className="flex items-center space-x-1">
              <LucideReact.Tag size={16} className="text-gray-400" />
              <span>{fileType}</span>
            </div>
          )}
        </div>
      )}

      {/* Commit Info */}
      <div className="border-t border-gray-100 pt-4 space-y-2">
        <div className="flex items-center space-x-2">
          <LucideReact.Code size={20} className="text-gray-500 flex-shrink-0" />
          <span className="font-mono text-gray-800">{commitSha}</span>
          {verified != null &&
            (verified ? (
              <LucideReact.CheckCircle
                size={16}
                className="text-green-500"
                role="img"
                aria-label="Verified"
              />
            ) : (
              <LucideReact.AlertTriangle
                size={16}
                className="text-red-500"
                role="img"
                aria-label="Unverified"
              />
            ))}
        </div>
        {commitMessage && <p className="text-gray-700 line-clamp-2">{commitMessage}</p>}
        {(author?.name || commitDate) && (
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            {author?.name && (
              <div className="flex items-center space-x-1">
                <LucideReact.User size={16} className="text-gray-400" />
                <span>{author.name}</span>
              </div>
            )}
            {commitDate && (
              <div className="flex items-center space-x-1">
                <LucideReact.Calendar size={16} className="text-gray-400" />
                <span>{commitDate}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
