import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Community Profile
     *
     * @title Community Profile
    */
    export interface community_profile {
        health_percentage: number & tags.Type<"int32">;
        description: string | null;
        documentation: string | null;
        files: {
            code_of_conduct: AutoViewInputSubTypes.nullable_code_of_conduct_simple;
            code_of_conduct_file: AutoViewInputSubTypes.nullable_community_health_file;
            license: AutoViewInputSubTypes.nullable_license_simple;
            contributing: AutoViewInputSubTypes.nullable_community_health_file;
            readme: AutoViewInputSubTypes.nullable_community_health_file;
            issue_template: AutoViewInputSubTypes.nullable_community_health_file;
            pull_request_template: AutoViewInputSubTypes.nullable_community_health_file;
        };
        updated_at: (string & tags.Format<"date-time">) | null;
        content_reports_enabled?: boolean;
    }
    /**
     * Code of Conduct Simple
     *
     * @title Code Of Conduct Simple
    */
    export type nullable_code_of_conduct_simple = {
        url: string & tags.Format<"uri">;
        key: string;
        name: string;
        html_url: (string & tags.Format<"uri">) | null;
    } | null;
    /**
     * @title Community Health File
    */
    export type nullable_community_health_file = {
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
    } | null;
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
export type AutoViewInput = AutoViewInputSubTypes.community_profile;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Destructure and derive primary values
  const {
    health_percentage,
    description,
    documentation,
    files,
    updated_at,
    content_reports_enabled = false,
  } = value;

  // Format the updated date
  const formattedUpdatedAt = updated_at
    ? new Date(updated_at).toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })
    : '—';

  // Assemble a list of available health‐related files and links
  const fileItems: { label: string; url: string }[] = [];

  // Code of Conduct (simple)
  if (files.code_of_conduct) {
    const f = files.code_of_conduct;
    const url = f.html_url ?? f.url;
    if (url) fileItems.push({ label: f.name, url });
  }

  // License
  if (files.license) {
    const f = files.license;
    const url = f.html_url ?? f.url ?? '';
    if (url) fileItems.push({ label: f.name, url });
  }

  // Other community health files
  const genericFiles: { key: keyof typeof files; label: string }[] = [
    { key: 'code_of_conduct_file', label: 'Code of Conduct File' },
    { key: 'contributing', label: 'Contributing Guidelines' },
    { key: 'readme', label: 'README' },
    { key: 'issue_template', label: 'Issue Template' },
    { key: 'pull_request_template', label: 'Pull Request Template' },
  ];
  genericFiles.forEach(({ key, label }) => {
    const f = files[key] as AutoViewInputSubTypes.nullable_community_health_file | null;
    if (f?.html_url) {
      fileItems.push({ label, url: f.html_url });
    }
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-6 bg-white rounded-lg shadow-md flex flex-col space-y-6">
      {/* Health Score */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Health Score</span>
          <span className="text-sm font-medium text-gray-900">
            {health_percentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              health_percentage >= 75
                ? 'bg-green-500'
                : health_percentage >= 40
                ? 'bg-yellow-400'
                : 'bg-red-500'
            }`}
            style={{ width: `${health_percentage}%` }}
          />
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="text-gray-700 text-sm line-clamp-3">
          {description}
        </p>
      )}

      {/* Documentation Link */}
      {documentation && (
        <div className="flex items-center gap-2 text-sm text-indigo-600 hover:underline">
          <LucideReact.BookOpen size={16} className="text-indigo-500" />
          <a
            href={documentation}
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      )}

      {/* Metadata: Updated Date & Content Reports */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 space-y-1 sm:space-y-0">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} />
          <span>Updated: {formattedUpdatedAt}</span>
        </div>
        <div className="flex items-center gap-1">
          {content_reports_enabled ? (
            <>
              <LucideReact.CheckCircle
                size={16}
                className="text-green-500"
              />
              <span>Content Reports Enabled</span>
            </>
          ) : (
            <>
              <LucideReact.XCircle
                size={16}
                className="text-red-500"
              />
              <span>Content Reports Disabled</span>
            </>
          )}
        </div>
      </div>

      {/* Health Files */}
      {fileItems.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Health Files
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {fileItems.map((file) => (
              <a
                key={file.label}
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-indigo-600 hover:bg-indigo-50 p-2 rounded"
              >
                <LucideReact.FileText
                  size={16}
                  className="text-indigo-500"
                />
                <span className="truncate">{file.label}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
