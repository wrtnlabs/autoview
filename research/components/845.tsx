import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Content File
     *
     * @title Content File
    */
    export interface content_file {
        type: "file";
        encoding: string;
        size: number & tags.Type<"int32">;
        name: string;
        path: string;
        content: string;
        sha: string;
        url: string & tags.Format<"uri">;
        git_url: (string & tags.Format<"uri">) | null;
        html_url: (string & tags.Format<"uri">) | null;
        download_url: (string & tags.Format<"uri">) | null;
        _links: {
            git: (string & tags.Format<"uri">) | null;
            html: (string & tags.Format<"uri">) | null;
            self: string & tags.Format<"uri">;
        };
        target?: string;
        submodule_git_url?: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.content_file;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Convert raw bytes into human-readable format.
  const humanFileSize = (bytes: number, si = false): string => {
    const thresh = si ? 1000 : 1024;
    if (bytes < thresh) return `${bytes} B`;
    const units = si
      ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
      : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
    let u = -1;
    let num = bytes;
    do {
      num /= thresh;
      u++;
    } while (num >= thresh && u < units.length - 1);
    return `${num.toFixed(1)} ${units[u]}`;
  };

  const sizeDisplay = humanFileSize(value.size);
  const shaDisplay = value.sha;
  const fileName = value.name;
  const filePath = value.path;
  const encoding = value.encoding;
  const htmlUrl = value.html_url;
  const downloadUrl = value.download_url;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header: File name */}
      <div className="flex items-center mb-2">
        <LucideReact.FileText size={20} className="text-indigo-500 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {fileName}
        </h2>
      </div>
      {/* File path */}
      <p className="text-sm text-gray-600 break-all mb-4">{filePath}</p>
      {/* Metadata grid */}
      <div className="grid grid-cols-1 gap-y-2">
        <div className="flex items-center text-gray-700">
          <LucideReact.Code size={16} className="text-gray-400 mr-1" />
          <span className="text-sm">{encoding}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <LucideReact.Archive size={16} className="text-gray-400 mr-1" />
          <span className="text-sm">{sizeDisplay}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <LucideReact.Hash size={16} className="text-gray-400 mr-1" />
          <span className="text-sm break-all">{shaDisplay}</span>
        </div>
        {htmlUrl && (
          <div className="flex items-center text-gray-700">
            <LucideReact.Link size={16} className="text-gray-400 mr-1" />
            <span className="text-sm break-all">{htmlUrl}</span>
          </div>
        )}
        {downloadUrl && (
          <div className="flex items-center text-gray-700">
            <LucideReact.Download size={16} className="text-gray-400 mr-1" />
            <span className="text-sm break-all">{downloadUrl}</span>
          </div>
        )}
      </div>
    </div>
  );
}
