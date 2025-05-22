import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  const file = value.content;
  const fileName = file?.name || "Unknown file";
  const filePath = file?.path;
  const fileSize = file?.size != null ? formatBytes(file.size) : null;

  const commit = value.commit;
  const fullSha = commit.sha || "";
  const shortSha = fullSha ? fullSha.slice(0, 7) : "Unknown";
  const commitMessage = commit.message || "No commit message";

  // Prefer author info; fall back to committer
  const actor = commit.author || commit.committer;
  const actorName = actor?.name || "Unknown author";
  const actorDateRaw = actor?.date;
  const actorDate = actorDateRaw
    ? new Date(actorDateRaw).toLocaleString()
    : null;

  const isVerified = commit.verification?.verified;

  function formatBytes(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* File Header */}
      <div className="flex items-center mb-2">
        <LucideReact.FileText size={20} className="text-gray-500 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {fileName}
        </h2>
      </div>

      {/* Optional Path and Size */}
      {filePath && (
        <p className="text-sm text-gray-500 truncate" title={filePath}>
          Path: {filePath}
        </p>
      )}
      {fileSize && (
        <p className="text-sm text-gray-500 mt-1">Size: {fileSize}</p>
      )}

      {/* Commit Details */}
      <div className="mt-4 border-t pt-4">
        <p className="text-base font-medium text-gray-800 line-clamp-2">
          {commitMessage}
        </p>
        <div className="flex flex-wrap items-center text-sm text-gray-600 mt-2 gap-4">
          {/* SHA */}
          <div className="flex items-center">
            <LucideReact.GitCommit size={16} className="text-gray-400 mr-1" />
            <span className="font-mono">{shortSha}</span>
          </div>

          {/* Author */}
          <div className="flex items-center">
            <LucideReact.User size={16} className="text-gray-400 mr-1" />
            <span>{actorName}</span>
          </div>

          {/* Date */}
          {actorDate && (
            <div className="flex items-center">
              <LucideReact.Calendar size={16} className="text-gray-400 mr-1" />
              <time dateTime={actorDateRaw!}>{actorDate}</time>
            </div>
          )}

          {/* Verification */}
          {isVerified != null && (
            <div className="flex items-center">
              {isVerified ? (
                <LucideReact.CheckCircle
                  size={16}
                  className="text-green-500"
                  aria-label="Verified"
                />
              ) : (
                <LucideReact.AlertTriangle
                  size={16}
                  className="text-red-500"
                  aria-label="Unverified"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
