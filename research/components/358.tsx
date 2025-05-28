import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * License Simple
     *
     * @title License Simple
    */
    export interface license_simple {
        key: string;
        name: string;
        url: (string & tags.Format<"uri">) | null;
        spdx_id: string | null;
        node_id: string;
        html_url?: string & tags.Format<"uri">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.license_simple[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const hasData = Array.isArray(value) && value.length > 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="w-full">
      {!hasData ? (
        <div className="flex flex-col items-center justify-center py-8 text-gray-500">
          <LucideReact.AlertCircle size={48} className="text-gray-400" />
          <p className="mt-2 text-sm">No licenses available.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {value.map((license) => {
            // Choose URL if available, else fallback to html_url
            const linkUrl = license.url ?? license.html_url ?? null;
            return (
              <li
                key={license.key}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
              >
                <div className="flex items-center">
                  <LucideReact.FileText size={20} className="text-gray-400 mr-3" />
                  <div className="overflow-hidden">
                    <p className="text-gray-900 font-medium truncate">{license.name}</p>
                    {license.spdx_id && (
                      <p className="text-gray-500 text-sm truncate">{license.spdx_id}</p>
                    )}
                  </div>
                </div>
                {linkUrl && (
                  <a
                    href={linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 text-gray-400 hover:text-blue-500"
                    aria-label={`View ${license.name} license`}
                  >
                    <LucideReact.Link size={16} strokeWidth={1.5} />
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
