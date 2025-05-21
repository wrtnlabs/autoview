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
  const { commit, content } = value;
  const message = commit.message ?? 'No commit message';
  const shaFull = commit.sha ?? '';
  const shaShort = shaFull.slice(0, 7) || '—';
  const authorInfo = commit.author ?? commit.committer;
  const authorName = authorInfo?.name ?? 'Unknown Author';
  const dateRaw = authorInfo?.date;
  const formattedDate = dateRaw
    ? new Date(dateRaw).toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })
    : 'Date Unknown';
  const isVerified = commit.verification?.verified === true;

  function formatBytes(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    const kb = bytes / 1024;
    if (kb < 1024) return kb.toFixed(1) + ' KB';
    const mb = kb / 1024;
    return mb.toFixed(1) + ' MB';
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md border border-gray-200">
      {/* Commit Message */}
      <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
        {message}
      </h2>

      {/* Author & Date */}
      <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500 space-x-2">
        <span>{authorName}</span>
        <span>·</span>
        <span>{formattedDate}</span>
      </div>

      {/* SHA & Verification Badge */}
      <div className="mt-3 flex items-center space-x-2">
        <span className="text-sm text-gray-600">SHA: {shaShort}</span>
        <span
          className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
            isVerified
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {isVerified ? 'Verified' : 'Unverified'}
        </span>
      </div>

      {/* File Details */}
      {content && (
        <div className="mt-4 border-t border-gray-100 pt-4 text-sm text-gray-700 space-y-2">
          <div className="flex justify-between">
            <span className="font-medium text-gray-800">File:</span>
            <span className="truncate">{content.name ?? '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-800">Path:</span>
            <span className="truncate">{content.path ?? '—'}</span>
          </div>
          {typeof content.size === 'number' && (
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">Size:</span>
              <span>{formatBytes(content.size)}</span>
            </div>
          )}
          {content.type && (
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">Type:</span>
              <span className="capitalize">{content.type}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
