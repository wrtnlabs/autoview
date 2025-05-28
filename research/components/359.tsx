import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * License
     *
     * @title License
    */
    export interface license {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.license;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Derived constants
  const spdxId = value.spdx_id ?? "N/A";
  const isFeatured = value.featured;
  const description = value.description;
  const implementation = value.implementation;
  const permissions = value.permissions;
  const conditions = value.conditions;
  const limitations = value.limitations;
  const previewBody = value.body;

  // Helper to render up to three items with a "+n more" indicator
  const renderList = (items: string[], label: string): JSX.Element | null => {
    if (items.length === 0) return null;
    const displayed = items.slice(0, 3);
    return (
      <div className="flex items-center flex-wrap gap-2">
        <span className="text-sm font-medium text-gray-600">{label}:</span>
        {displayed.map((item, idx) => (
          <span
            key={idx}
            className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded"
          >
            {item}
          </span>
        ))}
        {items.length > 3 && (
          <span className="text-xs text-gray-500">+{items.length - 3} more</span>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-1">
          {value.name}
          {isFeatured && (
            <LucideReact.Star className="text-yellow-500" size={20} />
          )}
        </h2>
        <span className="text-sm font-medium text-gray-500">{spdxId}</span>
      </div>

      {/* Short description */}
      {description && (
        <p className="mt-2 text-sm text-gray-700 line-clamp-2">
          {description}
        </p>
      )}

      {/* Implementation type */}
      {implementation && (
        <div className="mt-3 inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded">
          <LucideReact.Tag size={14} />
          <span>{implementation}</span>
        </div>
      )}

      {/* Permissions, Conditions, Limitations */}
      <div className="mt-4 space-y-2">
        {renderList(permissions, "Permissions")}
        {renderList(conditions, "Conditions")}
        {renderList(limitations, "Limitations")}
      </div>

      {/* Body preview */}
      {previewBody && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-800 mb-1">
            License Text Preview:
          </h3>
          <p className="text-sm text-gray-700 line-clamp-3 whitespace-pre-wrap">
            {previewBody}
          </p>
        </div>
      )}

      {/* HTML URL display (non-interactive) */}
      {value.html_url && (
        <div className="mt-4 flex items-center text-xs text-gray-500">
          <LucideReact.Link size={16} className="mr-1" />
          <span className="truncate">{value.html_url}</span>
        </div>
      )}
    </div>
  );
}
