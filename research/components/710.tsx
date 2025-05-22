import { tags } from "typia";
import React from "react";
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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const healthPercent = Math.max(0, Math.min(100, value.health_percentage));
  const updatedAt = value.updated_at
    ? new Date(value.updated_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'N/A';

  const fileLinks: { label: string; url: string }[] = [];

  if (value.documentation) {
    fileLinks.push({ label: 'Documentation', url: value.documentation });
  }

  const coc = value.files.code_of_conduct;
  if (coc) {
    const cocUrl = coc.html_url || coc.url;
    fileLinks.push({ label: 'Code of Conduct', url: cocUrl });
  }

  const cocFile = value.files.code_of_conduct_file;
  if (cocFile) {
    const cocFileUrl = cocFile.html_url || cocFile.url;
    fileLinks.push({ label: 'Code of Conduct File', url: cocFileUrl });
  }

  const license = value.files.license;
  const licenseUrl = license?.html_url || license?.url;
  if (license && licenseUrl) {
    fileLinks.push({ label: 'License', url: licenseUrl });
  }

  const contributing = value.files.contributing;
  if (contributing) {
    const contribUrl = contributing.html_url || contributing.url;
    fileLinks.push({ label: 'Contributing', url: contribUrl });
  }

  const readme = value.files.readme;
  if (readme) {
    const readmeUrl = readme.html_url || readme.url;
    fileLinks.push({ label: 'Readme', url: readmeUrl });
  }

  const issueTemplate = value.files.issue_template;
  if (issueTemplate) {
    const issueUrl = issueTemplate.html_url || issueTemplate.url;
    fileLinks.push({ label: 'Issue Template', url: issueUrl });
  }

  const prTemplate = value.files.pull_request_template;
  if (prTemplate) {
    const prUrl = prTemplate.html_url || prTemplate.url;
    fileLinks.push({ label: 'Pull Request Template', url: prUrl });
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="w-full sm:w-auto">
          <div className="flex items-center">
            <span className="text-gray-800 font-semibold mr-2">Health: {healthPercent}%</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${healthPercent}%` }}
              />
            </div>
          </div>
          {value.content_reports_enabled !== undefined && (
            <span
              className={`inline-block mt-2 px-2 py-0.5 text-xs font-medium rounded-full ${
                value.content_reports_enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {value.content_reports_enabled ? 'Reports Enabled' : 'Reports Disabled'}
            </span>
          )}
        </div>
        <div className="mt-2 sm:mt-0 text-xs text-gray-500">Updated: {updatedAt}</div>
      </header>

      {value.description && (
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{value.description}</p>
      )}

      {fileLinks.length > 0 && (
        <ul className="space-y-2">
          {fileLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm break-all"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
