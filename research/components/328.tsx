import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Code Of Conduct
     *
     * @title Code Of Conduct
    */
    export interface code_of_conduct {
        key: string;
        name: string;
        url: string & tags.Format<"uri">;
        body?: string;
        html_url: (string & tags.Format<"uri">) | null;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.code_of_conduct[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation: ensure we have an array to render
  const items = Array.isArray(value) ? value : [];

  // 2. Empty state
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="text-gray-300 mb-2" />
        <p className="text-lg">No code of conduct available</p>
      </div>
    );
  }

  // 3. Compose the visual structure
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.key} className="p-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <LucideReact.FileText size={20} className="text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-800 truncate">{item.name}</h3>
          </div>
          {item.body && (
            <p className="text-sm text-gray-600 line-clamp-3 mb-2">{item.body}</p>
          )}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:underline"
            >
              <LucideReact.Link size={16} className="mr-1" aria-label="Raw URL" />
              <span>Raw</span>
            </a>
            {item.html_url && (
              <a
                href={item.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:underline"
              >
                <LucideReact.Link size={16} className="mr-1" aria-label="HTML URL" />
                <span>HTML</span>
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
