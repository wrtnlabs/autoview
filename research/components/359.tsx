import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * License
   *
   * @title License
   */
  export type license = {
    key: string;
    name: string;
    spdx_id: string | null;
    url: (string & tags.Format<"uri">) | null;
    node_id: string;
    html_url: string & tags.Format<"uri">;
    description: string;
    implementation: string;
    permissions: string[];
    conditions: string[];
    limitations: string[];
    body: string;
    featured: boolean;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.license;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const {
    name,
    spdx_id,
    html_url,
    description,
    implementation,
    permissions,
    conditions,
    limitations,
    featured,
  } = value;

  // Truncate long text for mobile-first readability
  const truncate = (text: string, max = 200): string =>
    text.length > max ? text.slice(0, max) + "…" : text;

  const shortDescription = truncate(description, 180);
  const shortImplementation = truncate(implementation, 180);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header: License name, featured indicator, SPDX badge */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-1">
          {name}
          {featured && (
            <LucideReact.Star
              className="text-yellow-500"
              size={16}
              strokeWidth={2}
              aria-label="Featured license"
            />
          )}
        </h2>
        {spdx_id && (
          <span className="text-xs font-medium bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
            {spdx_id}
          </span>
        )}
      </div>

      {/* Link to full license */}
      {html_url && (
        <div className="mb-3">
          <a
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:underline text-sm"
          >
            <LucideReact.Link size={16} className="mr-1" /> View full license
          </a>
        </div>
      )}

      {/* Description */}
      <section className="mb-4">
        <h3 className="text-sm font-medium text-gray-800 mb-1">Description</h3>
        <p className="text-gray-700 text-sm line-clamp-3">{shortDescription}</p>
      </section>

      {/* Implementation overview */}
      <section className="mb-4">
        <h3 className="text-sm font-medium text-gray-800 mb-1">
          Implementation
        </h3>
        <p className="text-gray-700 text-sm line-clamp-3">
          {shortImplementation}
        </p>
      </section>

      {/* Permissions */}
      {permissions.length > 0 && (
        <section className="mb-4">
          <h4 className="text-sm font-medium text-gray-800 mb-1">
            Permissions
          </h4>
          <div className="flex flex-wrap gap-1">
            {permissions.map((perm, idx) => (
              <span
                key={idx}
                className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded"
              >
                {perm}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Conditions */}
      {conditions.length > 0 && (
        <section className="mb-4">
          <h4 className="text-sm font-medium text-gray-800 mb-1">Conditions</h4>
          <div className="flex flex-wrap gap-1">
            {conditions.map((cond, idx) => (
              <span
                key={idx}
                className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded"
              >
                {cond}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Limitations */}
      {limitations.length > 0 && (
        <section>
          <h4 className="text-sm font-medium text-gray-800 mb-1">
            Limitations
          </h4>
          <div className="flex flex-wrap gap-1">
            {limitations.map((lim, idx) => (
              <span
                key={idx}
                className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded"
              >
                {lim}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
