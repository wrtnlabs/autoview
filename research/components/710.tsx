import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Community Profile
   *
   * @title Community Profile
   */
  export type community_profile = {
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
  };
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
  // Format the updated date to a human‐readable string
  const formattedDate = value.updated_at
    ? new Date(value.updated_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  // Collect available file links with labels and icons
  type FileLink = { label: string; url: string; icon: JSX.Element };
  const fileItems: FileLink[] = [];

  // Code of Conduct (simple)
  if (value.files.code_of_conduct) {
    const coc = value.files.code_of_conduct;
    const url = coc.html_url ?? coc.url;
    fileItems.push({
      label: coc.name,
      url,
      icon: <LucideReact.FileText size={16} className="text-indigo-500" />,
    });
  }

  // Helper to push community health files (readme, templates, etc.)
  const pushFile = (
    file: AutoViewInputSubTypes.nullable_community_health_file,
    label: string,
  ) => {
    if (file) {
      const url = file.html_url ?? file.url;
      fileItems.push({
        label,
        url,
        icon: <LucideReact.FileText size={16} className="text-indigo-500" />,
      });
    }
  };
  pushFile(value.files.code_of_conduct_file, "Code of Conduct File");
  pushFile(value.files.contributing, "Contributing Guide");
  pushFile(value.files.readme, "README");
  pushFile(value.files.issue_template, "Issue Template");
  pushFile(value.files.pull_request_template, "Pull Request Template");

  // License
  if (value.files.license) {
    const lic = value.files.license;
    const url = lic.html_url ?? lic.url ?? "";
    if (url) {
      fileItems.push({
        label: lic.name,
        url,
        icon: <LucideReact.BookOpen size={16} className="text-green-500" />,
      });
    }
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* 1. Health Percentage */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Community Health
          </span>
          <span className="text-sm font-semibold text-gray-900">
            {value.health_percentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
          <div
            className={`h-2 rounded-full ${
              value.health_percentage >= 75
                ? "bg-green-500"
                : value.health_percentage >= 40
                  ? "bg-yellow-400"
                  : "bg-red-500"
            }`}
            style={{ width: `${value.health_percentage}%` }}
          />
        </div>
      </div>

      {/* 2. Description (truncated) */}
      {value.description && (
        <div>
          <p className="text-gray-700 text-sm line-clamp-3">
            {value.description}
          </p>
        </div>
      )}

      {/* 3. Documentation Link */}
      {value.documentation && (
        <div className="flex items-center text-sm text-blue-600 hover:text-blue-800">
          <LucideReact.Link size={16} className="mr-1" />
          <a
            href={value.documentation}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Documentation
          </a>
        </div>
      )}

      {/* 4. Community Health Files & License */}
      {fileItems.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Resources</h3>
          <ul className="space-y-2">
            {fileItems.map((file) => (
              <li key={file.label}>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-gray-800 hover:text-indigo-600"
                >
                  {file.icon}
                  <span className="ml-2">{file.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 5. Footer: Updated date & Content Reports status */}
      {(formattedDate || value.content_reports_enabled !== undefined) && (
        <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-4">
          {formattedDate && (
            <div className="flex items-center">
              <LucideReact.Calendar size={16} className="mr-1" />
              <span>Updated on {formattedDate}</span>
            </div>
          )}
          {value.content_reports_enabled !== undefined && (
            <div className="flex items-center">
              {value.content_reports_enabled ? (
                <LucideReact.CheckCircle
                  size={16}
                  className="text-green-500 mr-1"
                />
              ) : (
                <LucideReact.XCircle size={16} className="text-red-500 mr-1" />
              )}
              <span>
                Content Reports{" "}
                {value.content_reports_enabled ? "Enabled" : "Disabled"}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
