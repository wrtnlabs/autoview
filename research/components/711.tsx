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
  const { content, commit } = value;
  const fileName = content?.name ?? "Unknown File";
  const filePath = content?.path;
  const commitMessage = commit.message ?? "No commit message";
  const authorName = commit.author?.name ?? "Unknown Author";
  const authorDate = commit.author?.date
    ? new Date(commit.author.date).toLocaleString()
    : "Unknown Date";
  const shortSha = commit.sha ? commit.sha.slice(0, 7) : "";
  const isVerified = commit.verification?.verified ?? false;
  const verificationReason = commit.verification?.reason;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4 max-w-full">
      {/* File header */}
      <div className="flex items-center space-x-2">
        <LucideReact.FileText className="text-indigo-500" size={20} />
        <h2 className="font-semibold text-lg text-gray-800 truncate">{fileName}</h2>
        {filePath && (
          <span className="text-gray-500 text-sm truncate flex-1">{filePath}</span>
        )}
      </div>

      {/* Commit message */}
      <p className="text-gray-700 line-clamp-2">{commitMessage}</p>

      {/* Metadata footer */}
      <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4">
        <div className="flex items-center space-x-1">
          <LucideReact.User size={16} className="text-gray-400" />
          <span>{authorName}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>{authorDate}</span>
        </div>
        {shortSha && (
          <div className="flex items-center space-x-1">
            <LucideReact.Hash size={16} className="text-gray-400" />
            <span className="font-mono">{shortSha}</span>
          </div>
        )}
        <div className="flex items-center space-x-1">
          {isVerified ? (
            <span role="img" aria-label="Verified">
              <LucideReact.CheckCircle className="text-green-500" size={16} />
            </span>
          ) : (
            <span role="img" aria-label="Unverified">
              <LucideReact.AlertTriangle className="text-red-500" size={16} />
            </span>
          )}
          {verificationReason && (
            <span className="text-xs text-gray-500">{verificationReason}</span>
          )}
        </div>
      </div>
    </div>
  );
}
