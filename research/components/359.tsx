import { tags } from "typia";
import React from "react";
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
    description,
    implementation,
    permissions,
    conditions,
    limitations,
    featured,
  } = value;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
          {spdx_id && (
            <p className="mt-1 text-sm text-gray-500">SPDX ID: {spdx_id}</p>
          )}
        </div>
        {featured && (
          <span className="ml-2 px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded">
            Featured
          </span>
        )}
      </div>

      {description && (
        <p className="mt-4 text-gray-700 text-sm line-clamp-3">
          {description}
        </p>
      )}

      {implementation && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-800">Implementation</h3>
          <p className="mt-1 text-gray-700 text-sm line-clamp-2">
            {implementation}
          </p>
        </div>
      )}

      <div className="mt-4 space-y-4">
        {permissions.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-800">
              Permissions ({permissions.length})
            </h3>
            <div className="mt-1 flex flex-wrap gap-2">
              {permissions.map((perm, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded"
                >
                  {perm}
                </span>
              ))}
            </div>
          </div>
        )}

        {conditions.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-800">
              Conditions ({conditions.length})
            </h3>
            <div className="mt-1 flex flex-wrap gap-2">
              {conditions.map((cond, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs text-yellow-800 bg-yellow-100 rounded"
                >
                  {cond}
                </span>
              ))}
            </div>
          </div>
        )}

        {limitations.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-800">
              Limitations ({limitations.length})
            </h3>
            <div className="mt-1 flex flex-wrap gap-2">
              {limitations.map((lim, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs text-red-800 bg-red-100 rounded"
                >
                  {lim}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
  // 3. Return the React element.
}
