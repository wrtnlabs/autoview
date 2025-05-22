import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * The GitHub Pages deployment status.
   *
   * @title GitHub Pages
   */
  export type page_deployment = {
    /**
     * The ID of the GitHub Pages deployment. This is the Git SHA of the deployed commit.
     */
    id: (number & tags.Type<"int32">) | string;
    /**
     * The URI to monitor GitHub Pages deployment status.
     */
    status_url: string;
    /**
     * The URI to the deployed GitHub Pages.
     */
    page_url: string;
    /**
     * The URI to the deployed GitHub Pages preview.
     */
    preview_url?: string;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.page_deployment;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Derive a short commit SHA or ID for readability
  const rawId = value.id;
  const idStr = typeof rawId === "number" ? rawId.toString() : rawId;
  const shortId = idStr.length > 7 ? `${idStr.slice(0, 7)}…` : idStr;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Deployment ID */}
      <div className="flex items-center mb-3">
        <LucideReact.GitCommit size={16} className="text-gray-500 mr-2" />
        <span className="text-gray-700 font-medium">Deployment ID:</span>
        <span className="ml-1 font-mono text-sm text-gray-600">{shortId}</span>
      </div>

      {/* Production Page URL */}
      <div className="flex items-start mb-3">
        <LucideReact.Link
          size={16}
          className="text-blue-500 mr-2 flex-shrink-0"
        />
        <div className="flex-1">
          <span className="block text-gray-700 font-medium">Live Page:</span>
          <p className="break-all text-blue-600 text-sm">{value.page_url}</p>
        </div>
      </div>

      {/* Preview Page URL (optional) */}
      {value.preview_url && (
        <div className="flex items-start">
          <LucideReact.Eye
            size={16}
            className="text-gray-500 mr-2 flex-shrink-0"
          />
          <div className="flex-1">
            <span className="block text-gray-700 font-medium">
              Preview Page:
            </span>
            <p className="break-all text-blue-600 text-sm">
              {value.preview_url}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
