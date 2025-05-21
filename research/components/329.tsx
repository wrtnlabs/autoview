import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Code Of Conduct
     *
     * @title Code Of Conduct
    */
    export type code_of_conduct = {
        key: string;
        name: string;
        url: string & tags.Format<"uri">;
        body?: string;
        html_url: (string & tags.Format<"uri">) | null;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.code_of_conduct;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants
  const { name, url, html_url, body } = value;
  const htmlUrlDisplay: string = html_url ?? "Not available";
  const hasBody: boolean = Boolean(body && body.trim());

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 truncate">
        {name}
      </h2>

      <div className="mt-4 text-sm text-gray-700 space-y-4">
        <div>
          <span className="font-medium">API URL:</span>
          <p className="mt-1 font-mono text-blue-600 break-all">
            {url}
          </p>
        </div>
        <div>
          <span className="font-medium">HTML URL:</span>
          <p
            className={
              "mt-1 font-mono break-all " +
              (html_url ? "text-blue-600" : "text-gray-400 italic")
            }
          >
            {htmlUrlDisplay}
          </p>
        </div>
      </div>

      {hasBody && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-800">Overview</h3>
          <p className="mt-1 text-sm text-gray-700 line-clamp-4">
            {body}
          </p>
        </div>
      )}
    </div>
  );
}
