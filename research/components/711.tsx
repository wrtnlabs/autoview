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
  const commit = value.commit;

  // Derive file name and path
  const fileName = file?.name ?? file?.path?.split("/").pop() ?? "Unknown file";
  const filePath = file?.path ?? "";

  // Format file size
  const formatSize = (bytes: number = 0): string => {
    if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(1)} MB`;
    if (bytes >= 1e3) return `${(bytes / 1e3).toFixed(1)} KB`;
    return `${bytes} B`;
  };
  const fileSize = formatSize(file?.size);

  // Commit info
  const shortSha = commit.sha ? commit.sha.slice(0, 7) : "unknown";
  const author = commit.author ?? commit.committer;
  const authorName = author?.name ?? "Unknown author";
  const authorEmail = author?.email ?? "";
  const commitDate = author?.date
    ? new Date(author.date).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Unknown date";
  const message = commit.message ?? "";

  // Verification
  const verification = commit.verification;
  const isVerified = verification?.verified === true;

  // Parent count
  const parentCount = commit.parents?.length ?? 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-sm">
      {/* File Header */}
      <div className="flex items-center gap-2 mb-3">
        <LucideReact.FileText className="text-indigo-500" size={20} />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900 truncate">
            {fileName}
          </span>
          {filePath && (
            <span className="text-xs text-gray-500 truncate">{filePath}</span>
          )}
        </div>
        <span className="ml-auto text-xs text-gray-500">{fileSize}</span>
      </div>

      {/* Commit Message */}
      <div className="mb-3">
        <span className="block font-medium text-gray-800 line-clamp-2">
          {message || (
            <span className="text-gray-400 italic">No commit message</span>
          )}
        </span>
      </div>

      {/* Commit Metadata */}
      <div className="space-y-2 text-sm text-gray-700">
        {/* SHA */}
        <div className="flex items-center gap-1">
          <LucideReact.Hash size={16} className="text-gray-400" />
          <span className="font-mono">{shortSha}</span>
        </div>
        {/* Author */}
        <div className="flex items-center gap-1">
          <LucideReact.User size={16} className="text-gray-400" />
          <span>{authorName}</span>
          {authorEmail && (
            <div className="flex items-center gap-1 text-gray-500">
              <LucideReact.Mail size={14} />
              <span className="truncate">{authorEmail}</span>
            </div>
          )}
        </div>
        {/* Date */}
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>{commitDate}</span>
        </div>
        {/* Parents */}
        {parentCount > 0 && (
          <div className="flex items-center gap-1">
            <LucideReact.GitBranch size={16} className="text-gray-400" />
            <span>
              {parentCount} parent{parentCount > 1 ? "s" : ""}
            </span>
          </div>
        )}
        {/* Verification */}
        {verification && (
          <div className="flex items-center gap-1">
            {isVerified ? (
              <LucideReact.CheckCircle size={16} className="text-green-500" />
            ) : (
              <LucideReact.AlertTriangle size={16} className="text-red-500" />
            )}
            <span className={isVerified ? "text-green-600" : "text-red-600"}>
              {isVerified ? "Verified commit" : "Unverified commit"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
