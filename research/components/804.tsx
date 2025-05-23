import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * License Content
     *
     * @title License Content
    */
    export interface license_content {
        name: string;
        path: string;
        sha: string;
        size: number & tags.Type<"int32">;
        url: string & tags.Format<"uri">;
        html_url: (string & tags.Format<"uri">) | null;
        git_url: (string & tags.Format<"uri">) | null;
        download_url: (string & tags.Format<"uri">) | null;
        type: string;
        content: string;
        encoding: string;
        _links: {
            git: (string & tags.Format<"uri">) | null;
            html: (string & tags.Format<"uri">) | null;
            self: string & tags.Format<"uri">;
        };
        license: AutoViewInputSubTypes.nullable_license_simple;
    }
    /**
     * License Simple
     *
     * @title License Simple
    */
    export type nullable_license_simple = {
        key: string;
        name: string;
        url: (string & tags.Format<"uri">) | null;
        spdx_id: string | null;
        node_id: string;
        html_url?: string & tags.Format<"uri">;
    } | null;
}
export type AutoViewInput = AutoViewInputSubTypes.license_content;



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const formattedSize =
    value.size < 1024
      ? `${value.size} B`
      : `${(value.size / 1024).toFixed(2)} KB`;
  const licenseInfo = value.license
    ? `${value.license.name}${value.license.spdx_id ? ` (${value.license.spdx_id})` : ''}`
    : 'No license metadata';
  const maxPreview = 200;
  const contentPreview =
    value.content.length > maxPreview
      ? `${value.content.slice(0, maxPreview)}...`
      : value.content;

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-md max-w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LucideReact.FileText size={20} className="text-indigo-500" aria-hidden="true" />
          <span className="text-lg font-semibold text-gray-800">{value.name}</span>
        </div>
        <span className="text-sm text-gray-500">{formattedSize}</span>
      </div>

      <div className="flex items-center gap-2 text-gray-600">
        <LucideReact.Folder size={16} className="text-gray-400" aria-hidden="true" />
        <span className="truncate">{value.path}</span>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.Tag size={16} className="text-gray-400" aria-hidden="true" />
          <span>Type: {value.type}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Code size={16} className="text-gray-400" aria-hidden="true" />
          <span>Encoding: {value.encoding}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <LucideReact.BadgeCheck
          size={16}
          className={value.license ? 'text-green-500' : 'text-gray-400'}
          aria-hidden="true"
        />
        <span className="text-gray-700">
          License:{' '}
          <span className={value.license ? 'text-gray-800' : 'text-gray-500'}>
            {licenseInfo}
          </span>
        </span>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-1">Content Preview:</h4>
        <pre className="bg-gray-100 p-2 rounded text-sm font-mono text-gray-800 overflow-hidden line-clamp-4">
          {contentPreview}
        </pre>
      </div>

      <div className="space-y-1 text-sm">
        {value.url && (
          <div className="flex items-center gap-1 text-gray-600">
            <LucideReact.Link size={16} className="text-gray-400" aria-hidden="true" />
            <span className="truncate">{value.url}</span>
          </div>
        )}
        {value.html_url && (
          <div className="flex items-center gap-1 text-gray-600">
            <LucideReact.Link2 size={16} className="text-gray-400" aria-hidden="true" />
            <span className="truncate">{value.html_url}</span>
          </div>
        )}
        {value.git_url && (
          <div className="flex items-center gap-1 text-gray-600">
            <LucideReact.GitBranch size={16} className="text-gray-400" aria-hidden="true" />
            <span className="truncate">{value.git_url}</span>
          </div>
        )}
        {value.download_url && (
          <div className="flex items-center gap-1 text-gray-600">
            <LucideReact.Download size={16} className="text-gray-400" aria-hidden="true" />
            <span className="truncate">{value.download_url}</span>
          </div>
        )}
      </div>
    </div>
  );
}
